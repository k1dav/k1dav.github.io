---
title: "Kubernetes"
slug: "/notes/kubernetes"
tags:
  - "DevOps"
  - "Containerization"
  - "Cloud"
  - "Computing"
---
## What？

Kubernetes 是一個開源的[容器化](/docs/notes/container)編排系統，用來自動化部署、擴展（Scaling）以及管理容器化應用程式。簡單來說，Kubernetes 幫助你管理多個容器的運行，就像是一個強大的「容器指揮官」。在實務上，當你的應用程式需要處理大量流量、快速擴展或確保高可用性時，Kubernetes 是不可或缺的工具。

舉例來說，如果你有一個基於 [Docker](/docs/notes/docker) 的 Web 應用程式，需要在多台伺服器之間分散負載並確保服務不中斷，那麼 Kubernetes 可以幫助你完成這些工作，並且讓整個過程更自動化。

---

## Who？

1. **DevOps 工程師**：負責部署與維護應用程式的人。
2. **軟體開發者**：希望快速測試和部署自己開發的應用。
3. **系統架構師**：設計基礎設施與應用架構的人。
4. **企業**：特別是那些需要處理大量資料流量或分布式系統的大型企業。

例如，一家公司在雲端運行多個微服務，而每個微服務都由多個容器支撐，那麼 DevOps 團隊就會利用 Kubernetes 來簡化這些微服務的管理。

---

## When？

- **需要高可用性（High Availability）時**：你的應用需要 24/7 運作且不能中斷。
- **需要彈性擴展（Elastic Scaling）時**：當訪問量突然增加或減少時，你希望能自動增加或減少資源配置。
- **跨雲端部署時**：如果你的應用需要同時部署到多家雲端平台，例如 AWS 和 GCP。
- **進行 CI/CD 時**：希望透過自動化流程快速部署和迭代更新。

舉例來說，電商網站在促銷期間流量暴增，此時可以利用 Kubernetes 快速擴展資源以支撐高峰需求；而促銷結束後，又能縮減資源節省成本。

---

## Where？

Kubernetes 通常位於整體架構中的「基礎設施層」，負責管理底層資源（如容器、節點），並對上提供 API 供其他系統與工具互動。具體而言，它會出現在以下場景：

1. **本地環境（On-premises）**：
   - 在公司的內部伺服器上執行 Kubernetes，用於內部測試或本地敏感資料的處理。

2. **公有雲（Public Cloud）環境**：
   - 使用像 GKE (Google Kubernetes Engine)、EKS (AWS Elastic Kubernetes Service)、AKS (Azure Kubernetes Service) 等雲端平台所提供的托管版 Kubernetes。

3. **混合雲／多雲環境（Hybrid/Multi-cloud）**：
   - 同時協調各種不同來源的基礎設施，提供一致性的操作介面。

---

## Why？

1. **手動操作繁瑣問題**：
   想像一下，你有一百個 Docker 容器要啟動並維護，手動操作不僅耗費時間，還容易出錯。Kubernetes 提供了自動化工具，大幅降低了這部分工作量。

2. **資源浪費問題**：
   傳統伺服器通常無法靈活調整資源分配，而 Kubernetes 可以根據需求即時分配 CPU、記憶體等資源，提高效率。

3. **高可用性和彈性問題**：
   當某一台伺服器掛掉時，你希望系統能夠立即將工作轉移到其他健康節點上，而不用人工干預。Kubernetes 使用 Health Check 和自我修復機制確保服務穩定運作。

---

## How？

### 🛠️ 建立階段

按照以下步驟，可以建立一個簡單的 Kubernetes 工作負載：

1. 安裝 kubectl 工具以控制集群。
2. 部署一個 Pod 定義檔案，如下範例所示：

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-app
spec:
  containers:
    - name: app-container
      image: nginx
      ports:
        - containerPort: 80
```

3. 執行命令 `kubectl apply -f pod-definition.yaml` 創建 Pod。
4. 驗證 Pod 是否正確執行：`kubectl get pods`。

### 🔍 查詢階段

建立後可以透過以下方式進行查詢與監控：

1. 查看所有正在執行的 Pod 狀態：
   ```
   kubectl get pods
   ```
2. 獲取特定 Pod 的詳細資訊：
   ```
   kubectl describe pod <pod-name>
   ```
3. 查看日誌輸出以除錯：
   ```
   kubectl logs <pod-name>
   ```

---

## 補充說明

### 🔧 關鍵技術工具

| 工具名稱         | 功能                     | 適合場景                     |
|------------------|--------------------------|------------------------------|
| Minikube         | 本地執行單節點集群       | 開發與測試                   |
| kubeadm          | 快速初始化集群           | 生產環境                     |
| Helm             | 用於管理 Chart 的套件管理工具 | 自動化部署複雜應用           |
| K9s              | 提供互動式 CLI 管理界面  | 即時計劃及監控               |

### 📌 範例比較

以下是傳統 VM 部署與 Kubernetes 部署方式上的比較：

| 特性             | 傳統 VM 部署              | 使用 Kubernetes 部署         |
|------------------|---------------------------|------------------------------|
| 資源利用率       | 較低                      | 較高                         |
| 擴展速度         | 慢                        | 快                           |
| 自我修復能力     | 無                        | 有                           |

### 🧠 延伸／常見誤解

1. 誤解：「Kubernetes 是一種虛擬機技術。」
   - 澄清：它是一種編排工具，不直接提供虛擬機功能，但可以運行於虛擬機之上，也可以管理裸金屬伺服器上的容器。

2. 誤解：「只適合大型企業使用。」
   - 澄清：小型專案也能夠受益於 Kubernetes，例如提升開發效率和提高可靠性，只是規模較大會更凸顯其價值。
