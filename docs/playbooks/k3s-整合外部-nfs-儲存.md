---
title: "K3s - 整合外部 NFS 儲存"
slug: "/playbooks/k3s-整合外部-nfs-儲存"
tags:
  - "K3s"
  - "Kubernetes"
  - "NFS"
  - "Storage"
  - "PersistentVolume"
  - "Helm"
  - "StorageClass"
---
## K3s 整合外部 NFS 儲存

這篇筆記將詳細說明如何為 [K3s](/docs/playbooks/k3s) 叢集設定一個外部 [NFS](/docs/notes/nfs) 伺服器作為儲存後端，並透過 `nfs-subdir-external-provisioner` 來動態提供 Persistent Volume (PV)。

## 為何需要動態供應 (Dynamic Provisioning)？

在 Kubernetes 中，靜態供應 (Static Provisioning) 需要管理員手動建立 Persistent Volume (PV)。當應用程式需要儲存時，開發者再建立 Persistent Volume Claim (PVC) 來綁定到這些手動建立的 PV。這個過程繁瑣且缺乏彈性。

動態供應則完全自動化了這個流程。管理員只需設定好 `StorageClass`，之後當開發者建立 PVC 時，系統會自動地根據 `StorageClass` 的定義，動態地建立對應的 PV 並完成綁定。這大大簡化了儲存管理，提升了效率。

## 前置作業：在所有 K3s 節點安裝 NFS 客戶端

首先，您必須在 K3s 叢集的 **每一個節點** (包含 Master 與 Worker) 上安裝 NFS 客戶端工具，以確保 `kubelet` 能夠成功掛載 NFS 儲存。

```bash
# 更新套件列表並安裝 nfs-common
sudo apt update && sudo apt install -y nfs-common
```

安裝完成後，建議進行連線測試，以確認可以存取 NFS 伺服器並列出其分享的目錄。

```bash
# 假設您的 NFS 伺服器主機名稱為 nas-10g.home.me
# 列出該伺服器上的所有分享目錄
showmount -e nas-10g.home.me

# 建立一個本地臨時掛載點
sudo mkdir -p /mnt/nfs_test

# 手動掛載遠端 NFS 分享目錄至本地
# 請將 nas-10g.home.me:/volume1/PVE 替換成您實際的 NFS 路徑
sudo mount -t nfs nas-10g.home.me:/volume1/PVE /mnt/nfs_test

# 檢查是否掛載成功
df -h /mnt/nfs_test

# 卸載測試目錄
sudo umount /mnt/nfs_test
```

## 部署 NFS Subdir External Provisioner

`nfs-subdir-external-provisioner` 是一個動態儲存提供者 (Dynamic Provisioner)，它會監聽 Persistent Volume Claim (PVC) 的請求，並在您指定的 NFS 目錄下，為每一個 PVC 自動建立一個專屬的子目錄作為 Persistent Volume (PV)。

我們可以使用 [Helm](/docs/playbooks/helm) 來輕鬆部署。

```bash
# 新增 nfs-subdir-external-provisioner 的 Helm Repository
helm repo add nfs-subdir-external-provisioner https://kubernetes-sigs.github.io/nfs-subdir-external-provisioner/

# 更新 Helm Repositories
helm repo update

# 透過 Helm 安裝 nfs-subdir-external-provisioner
# 請務必將 nfs.server 和 nfs.path 替換成您自己的設定
helm upgrade --install nfs-subdir-external-provisioner nfs-subdir-external-provisioner/nfs-subdir-external-provisioner \
    --namespace nfs-provisioner \
    --create-namespace \
    --set nfs.server=nas-10g.home.me \
    --set nfs.path=/volume1/k3s-nfsstore \
    --set storageClass.name=nfs-client
```
> **注意**：
> - `nfs.server`: 您的 NFS 伺服器 IP 或主機名稱。
> - `nfs.path`: 您在 NFS 伺服器上分享出來的目錄路徑。
> - `storageClass.name`: 建立的 StorageClass 名稱，後續建立 PVC 時會用到。

## 驗證部署結果

部署完成後，您可以透過以下步驟進行驗證：

1.  **檢查 Pod 狀態**: 確認在 `nfs-provisioner` 命名空間下的 Pod 是否正常運行 (`Running`)。

    ```bash
    kubectl get pods -n nfs-provisioner
    ```

2.  **檢查 StorageClass**: 執行 `kubectl get sc`，應該會看到一個名為 `nfs-client` 的 StorageClass。

    ```bash
    kubectl get sc
    # 預期輸出應包含 nfs-client
    # NAME         PROVISIONER                                     RECLAIMPOLICY   VOLUMEBINDINGMODE   ALLOWVOLUMEEXPANSION   AGE
    # nfs-client   cluster.local/nfs-subdir-external-provisioner   Delete          Immediate           true                   ...
    ```

3.  **建立 PVC 進行測試**: 建立一個 PVC，並檢查它是否能夠成功綁定 (Status: `Bound`) 到一個由 `nfs-client` 動態建立的 PV。

    首先，建立一個名為 `test-pvc.yaml` 的檔案：
    ```yaml
    apiVersion: v1
    kind: PersistentVolumeClaim
    metadata:
      name: test-pvc-nfs
    spec:
      storageClassName: nfs-client
      accessModes:
        - ReadWriteOnce
      resources:
        requests:
          storage: 1Gi
    ```

    接著，在您的終端機執行：
    ```bash
    # 建立 PVC
    kubectl apply -f test-pvc.yaml

    # 檢查 PVC 狀態，應為 "Bound"
    kubectl get pvc test-pvc-nfs
    ```
    如果狀態為 `Bound`，代表 `nfs-subdir-external-provisioner` 已成功運作。您也可以到 NFS 伺服器的 `/volume1/k3s-nfsstore` 目錄下，會發現多了一個對應此 PVC 的資料夾。

## 總結
本篇筆記介紹了如何為 K3s 叢集整合外部 NFS 儲存，從安裝 NFS 客戶端、部署動態儲存供應商 `nfs-subdir-external-provisioner`，到最後的驗證步驟，提供了一套完整的解決方案。透過動態供應，可以大幅簡化 Kubernetes 的儲存管理，讓開發者能夠更專注於應用程式的部署。

## 參考資料
- [NFS Subdir External Provisioner GitHub Repository](https://github.com/kubernetes-sigs/nfs-subdir-external-provisioner)
