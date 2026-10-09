---
title: "K3s"
slug: "/playbooks/k3s"
tags:
  - "K3s"
  - "Kubernetes"
  - "K8s"
  - "Rancher"
  - "EdgeComputing"
  - "IoT"
  - "DevOps"
---
## K3s：輕量級 Kubernetes 發行版

K3s 是一個輕量級、符合標準的 [Kubernetes](/docs/notes/kubernetes) 發行版，由 Rancher Labs (現為 SUSE 的一部分) 所開發。它的設計目標是專為在資源受限的環境 (如邊緣運算、物聯網 IoT) 和開發環境中運行而設計。

## 核心架構元件

K3s 將標準 Kubernetes 的多個元件打包成一個單一的二進位檔，並分為 Server 和 Agent 兩種角色。

- **Server 節點**: 運行控制平面 (Control Plane) 的節點。它包含以下元件：
  - **Kube-APIServer**: Kubernetes API。
  - **Kube-Scheduler**: 負責 Pod 的調度。
  - **Kube-Controller-Manager**: 負責維護叢集狀態。
  - **Kine**: 一個精巧的 shim，可以將 etcd 的 API 請求轉換為對 SQLite, PostgreSQL 或 MySQL 的操作。
  - **Kubelet**: 節點代理程式。
  - **Containerd**: 容器執行時。
  - **Flannel**: 預設的 CNI 網路插件。

- **Agent 節點**: 運行工作負載 (Workload) 的節點。它包含以下元件：
  - **Kubelet**: 節點代理程式。
  - **Containerd**: 容器執行時。
  - **Flannel**: CNI 網路插件。

## K3s vs. K8s (標準 Kubernetes)

K3s 之所以「輕量」，是因為它對標準的 K8s (Kubernetes) 進行了大量的簡化和優化：

| 特性 | K3s | K8s (標準版) |
| :--- | :--- | :--- |
| **二進位檔大小** | 極小 (單一 < 100MB 的二進位檔) | 較大，由多個元件組成 |
| **資源消耗** | 非常低 (記憶體需求約 512MB) | 較高 (建議至少 2GB 記憶體) |
| **資料庫** | 預設使用內嵌的 SQLite，也支援外部的 etcd, MySQL, PostgreSQL | 預設且唯一支援 etcd |
| **容器執行時** | 預設使用 containerd | 支援 containerd, CRI-O 等 |
| **網路** | 內建 Flannel CNI，也支援其他 CNI | 需要自行選擇並安裝 CNI 外掛 |
| **部署複雜度** | 極低，一行指令即可安裝 | 相對複雜，需要設定多個元件 |

K3s 移除了許多 Kubernetes 中非必要的、舊有的或非預設的功能 (如 Alpha 功能、舊的 API 版本)，並將所有需要的元件打包成一個單一的二進位檔，大幅簡化了安裝和維運的複雜度。

## 快速安裝指令

K3s 以其極簡的安裝過程而聞名。通常只需一行指令即可啟動一個單節點的叢集：
```bash
curl -sfL https://get.k3s.io | sh -
```
這條指令會自���下載 K3s 的二進位檔，並將其設定為一個 systemd 服務來運行。

## 優勢與應用場景

- **輕量快速**: 資源佔用極少，啟動速度快，非常適合開發、測試和 CI/CD 環境。
- **易於安裝**: 一行 `curl` 指令就能完成單節點叢集的安裝，大幅降低了 Kubernetes 的入門門檻。
- **邊緣運算**: 非常適合部署在資源有限的邊緣裝置上，例如：樹莓派 (Raspberry Pi)、工業電腦等。
- **物聯網 (IoT)**: 在大量的 IoT 裝置上建立和管理容器化的應用程式。
- **開發環境**: 開發者可以在自己的筆記型電腦上快速啟動一個功能完整的 Kubernetes 叢集。

## 總結
K3s 是一個功能完整、符合 CNCF (雲原生計算基金會) 一致性認證的 Kubernetes 發行版。它並不是一個閹割版的 K8s，而是一個經過精心裁剪和優化的版本。對於中小型規模的部署、資源受限的場景以及開發測試環境來說，K3s 以其無與倫比的易用性和效率，成為了一個絕佳的選擇。
