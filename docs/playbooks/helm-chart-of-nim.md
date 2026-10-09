---
title: "Helm Chart Of NIM"
slug: "/playbooks/helm-chart-of-nim"
tags:
  - "Nvidia-NIM"
  - "Helm"
  - "Kubernetes"
  - "LLM-Deployment"
  - "GPU"
  - "MLOps"
  - "Troubleshooting"
---
## 使用 Helm Chart 部署 NVIDIA NIM

這篇筆記記錄了如何使用 Helm Chart 部署 NVIDIA Inference Microservices (NIM) 來運行大型語言模型 (LLM)，特別是針對多節點部署的環境設定和常見問題。

## 核心概念

- **NVIDIA NIM**: NVIDIA Inference Microservice (NIM) 是一個預先建構好的容器化微服務，它將 AI 模型（如 LLaMA）與高效的推論引擎（如 TensorRT-LLM）打包在一起，並提供標準化的 API 接口，旨在簡化 AI 模型的部署和擴展。
- **Helm Chart**: 使用 [Helm](/docs/playbooks/helm) 作為 [Kubernetes](/docs/notes/kubernetes) 的套件管理器，可以將部署 NIM 所需的複雜 Kubernetes 資源（如 Deployment, Service, PersistentVolumeClaim 等）打包成一個標準化的 Chart，透過 `values.yaml` 檔案即可輕鬆配置和部署。
- **MPI Operator**: 在多節點部署中，NIM 通常使用 MPI (Message Passing Interface) Operator 來協調和管理跨多個節點的推論任務，確保所有 GPU 能夠協同工作。

## 1. 環境準備

在部署 NVIDIA NIM Helm Chart 之前，需要確保您的 [Kubernetes](/docs/notes/kubernetes) 叢集具備以下條件：

-   **[Kubernetes](/docs/notes/kubernetes) 環境**: 一個正常運行的 Kubernetes 叢集。
-   **儲存掛載 (Storage Mount)**: 需要一個支援 `ReadWriteMany` 模式的 StorageClass，用於模型資料的持久化儲存。NVIDIA 建議使用 NFS 類型的儲存。
-   **[GPU Operator](/docs/notes/gpu-operator)**: NVIDIA GPU Operator 必須正確安裝並運行，以確保 Kubernetes 能夠識別和調度 GPU 資源。

## 2. 環境驗證

在部署 NIM 之前，建議先部署一個簡單的 CUDA 應用程式 (如 `vectoradd`) 來驗證 GPU Operator 是否正常工作，以及 GPU 資源是否可被 Kubernetes 正確調度。

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: cuda-vectoradd
spec:
  runtimeClassName: nvidia
  restartPolicy: OnFailure
  containers:
    - name: cuda-vectoradd
      image: "nvcr.io/nvidia/k8s/cuda-sample:vectoradd-cuda11.7.1-ubuntu20.04"
      resources:
        limits:
          nvidia.com/gpu: 8 # 請求 8 個 GPU 資源
```

## 3. LLaMA 3.1 405B 模型部署範例 (values.yaml)

以下是一個用於部署 LLaMA 3.1 405B Instruct 模型的 `values.yaml` 配置範例。此配置適用於多節點部署，並請求每個節點 8 個 GPU。

```yaml
image:
  # 調整為您實際使用的映像檔位置和版本
  repository: nvcr.io/nim/meta/llama-3.1-405b-instruct
  tag: 1.3.0
imagePullSecrets:
  - name: ngc-secret # NGC 憑證的 Secret 名稱
model:
  name: meta/llama-3_1-405b-instruct
  ngcAPISecret: ngc-api # NGC API Key 的 Secret 名稱
# NVIDIA 建議使用 NFS 類型的 ReadWriteMany 儲存類別。
persistence:
  enabled: true
  size: 400Gi
  accessMode: ReadWriteMany
  storageClass: nfs-client
  annotations:
    helm.sh/resource-policy: "keep" # 確保 PVC 在 Helm Release 刪除後保留
# 此值應與 `multiNode.gpusPerNode` 匹配
resources:
  limits:
    nvidia.com/gpu: 8
multiNode:
  enabled: true
  leaderWorkerSet:
    enabled: False # 如果使用 MPI Operator，通常不需要 Leader Worker Set
  workers: 2 # 工作節點數量
  gpusPerNode: 8 # 每個節點的 GPU 數量
# 模型下載可能需要較長時間。根據實際情況調整啟動探針的失敗閾值。
startupProbe:
  failureThreshold: 1500
```

## 4. 啟動模型

使用 Helm 命令來部署 NIM 模型。

```bash
helm upgrade --install llama-nim nim-llm-1.3.0.tgz -f values.yaml
```

## 5. 踩過的坑 (Troubleshooting)

### 多節點模型部署問題 (Leader Pod 沒有 GPU Resources)

**狀況描述**:
在部署多節點 NIM 模型時，可能會遇到 `Leader Pod` 或 `Launcher Pod` 沒有正確請求 GPU 資源，導致 Pod 啟動失敗或無法正常工作。

**可能原因與解決方案**:

-   **版本不匹配**:
    -   NIM 映像檔版本與 Helm Chart 版本之間有嚴格的對應關係。請務必查閱官方文件，確保使用的版本相互兼容。
-   **資源請求與限制**:
    -   **檢查 `values.yaml`**: 確保 `resources.limits."nvidia.com/gpu"` 的值已正確設定，並且與 `multiNode.gpusPerNode` 的值匹配。
    -   **檢查 Helm Chart 範本**: 如果 `values.yaml` 設定正確但 Pod 仍未獲得 GPU，可能需要檢查 Helm Chart 的 Go 範本，確認它是否正確地將資源限制應用到所有相關的 Pod (包括 Launcher Pod)。
-   **MPI Operator 日誌**:
    -   檢查 MPI Operator 的日誌，看是否有關於資源調度或 Pod 啟動的錯誤訊息。
-   **Pod 狀態分析**:
    -   透過 `kubectl describe pod <pod-name>` 和 `kubectl logs <pod-name>` 查看詳細的錯誤訊息，判斷是資源不足、配置錯誤還是其他問題。

## 總結
使用 Helm Chart 部署 NVIDIA NIM 是在 Kubernetes 環境中快速上線大型語言模型的有效方法。然而，在多節點部署中，成功的關鍵在於確保環境的正確配置，特別是 GPU Operator 的正常運行、儲存的正確掛載，以及 NIM 映像檔與 Helm Chart 版本的兼容性。當遇到��題時，應從 Pod 的資源請求、狀態和日誌入手，逐步排查問題。
