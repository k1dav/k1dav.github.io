---
title: "Helm"
slug: "/playbooks/helm"
tags:
  - "Helm"
  - "Kubernetes"
  - "K8s"
  - "PackageManager"
  - "DevOps"
  - "CI-CD"
---
## Helm：Kubernetes 的套件管理器

Helm 是 [Kubernetes](/docs/notes/kubernetes) 的套件管理器 (Package Manager)。它就像是 Linux 世界的 `apt` 或 `yum`，或是 macOS 的 `brew`，但它是專為 Kubernetes 應用程式所設計的。Helm 讓開發者和維運人員可以更輕鬆地定義、安裝、升級和管理複雜的 Kubernetes 應用程式。

## 核心概念

- **Chart**: Helm 的套件格式。一個 Chart 是一個包含了所有必要資源定義的檔案集合，用來描述一個相關的 Kubernetes 資源群組。
- **Release**: 一個 Chart 被安裝到 Kubernetes 叢集中的一個實例。同一個 Chart 可以被安裝多次，每一次都會產生一個新的 Release。
- **Repository**: 用來存放和分享 Chart 的地方。

## Chart 結構

一個典型的 Helm Chart 包含以下目錄結構：

```
my-chart/
├── Chart.yaml          # 包含 Chart 的元數據 (名稱、版本、描述等)
├── values.yaml         # Chart 的預設設定值
├── charts/             # 存��此 Chart 所依賴的其他 Chart
└── templates/          # 存放 Kubernetes 資源的範本檔案
    ├── deployment.yaml
    ├── service.yaml
    └── ...
```

## Helm 2 vs. Helm 3

Helm 3 進行了重大的架構改進，最核心的變化是**移除了 Tiller** (Helm 2 的伺服器端元件)。

| 特性 | Helm 2 | Helm 3 |
| :--- | :--- | :--- |
| **架構** | C/S 架構 (Client + Tiller Server) | 僅有 Client |
| **安全性** | Tiller 權限過高，有安全隱患 | 直接使用 Kubeconfig 的權限，更安全 |
| **Release 管理**| 全域 (Tiller 管理所有 Release) | 以命名空間 (Namespace) 為範圍 |
| **易用性** | 設定較複雜 | 更簡單、更直觀 |

## 主要功能

- **應用程式封裝**: 將一個應用程式所需的所有 Kubernetes 資源 (Deployment, Service, ConfigMap 等) 全部打包到一個 Chart 中，方便重複部署和分享。
- **版本控制與升級**: Helm 對 Release 進行版本控制，讓你可以輕鬆地升級應用程式到新的版本，或是在發生問題時，快速地回滾到一個已知的穩定版本。
- **依賴管理**: 一個 Chart 可以依賴另一個 Chart。Helm 會自動處理這些依賴關係。
- **範本化 (Templating)**: Helm Chart 使用 Go 範本語言，讓你可以將設定值參數化，用同一份 Chart 適應不同���境。

## 總結
Helm 透過將複雜的 Kubernetes YAML 檔案「打包」成標準化的 Chart，極大地簡化了雲原生應用的部署、管理和分享。它是 Kubernetes 生態中事實上的標準套件管理器，也是實現 DevOps 和 CI/CD 自動化流程不可或缺的關鍵工具。
