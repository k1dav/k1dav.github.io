---
title: "Container"
slug: "/notes/container"
tags:
  - "DevOps"
  - "Cloud"
  - "Computing"
  - "Virtualization"
---
## What？

容器化（Containerization）是一種軟體部署技術，它將應用程式與其所需的所有依賴（如程式庫、設定檔案等）封裝在一個獨立、輕量且可攜的單元中，稱為 Container。這樣可以讓應用程式在各種環境中穩定運行，不受底層系統差異影響。

舉例來說，像是 [Docker](/docs/notes/docker) 就是一個常見的容器化工具。透過 Docker，你可以將一個 Web 應用程式連同它所需的 Python runtime、設定檔案及其他依賴打包成一個 Container，並保證它能在開發者的筆電上或雲端伺服器上無縫執行。

---

## Who？

1. **開發者（Developers）**  
   開發者使用容器來快速建立一致的測試環境，避免「我的電腦可以跑，但你的不行」這類問題。
   
2. **運維工程師（DevOps / SysAdmins）**  
   容器減少了部署過程中的兼容性問題，使得應用程式能更簡單地跨伺服器或雲端部署。

3. **企業客戶**  
   企業希望其應用能快速擴展並具備高可靠性，而容器化技術正好提供了這些優勢。

---

## When？

- **開發與測試階段**  
  開發人員需要一致、可重現的環境進行測試。
  
- **部署到生產環境時**  
  容器保證了應用程式從開發到生產環境都能保持一致性。
  
- **微服務架構設計時**  
  每個微服務都可以打包成獨立的 Container，讓管理和擴展更加方便。

舉例來說，如果你正在設計一個基於 Kubernetes 的分散式系統，那麼每個 Pod 裡通常就會包含多個 Container。

---

## Where？

1. **基礎架構層（Infrastructure Layer）**  
   像是雲端平台（AWS、Google Cloud），它們提供了支援容器運行的基礎設施。

2. **應用層（Application Layer）**  
   開發者將應用封裝為 Container，以便更容易移植和管理。

3. **編排層（Orchestration Layer）**  
   使用工具如 Kubernetes 設置和管理多個 Container 的調度、擴展及監控。

---

## Why？

1. **跨平台兼容性問題**  
   傳統方法中，軟體可能因操作系統版本不同而無法正常執行，而 Container 的獨立性避免了這些問題。
   
2. **資源利用效率低下**  
   相較於虛擬機（[Virtual Machine](/docs/notes/virtual-machine)），Container 更輕量且啟動速度快，可以提高硬體資源利用率。
   
3. **部署流程複雜性高**  
   容器自帶所有依賴並保持一致性，使得「一次打包，到處執行」成為可能，大幅簡化部署流程。

例如：傳統上，你可能需要手動配置伺服器上的 Java 環境，但使用 Docker 時，只需拉取含有 Java runtime 的映像檔即可完成配置。

---

## How？

### 🛠️ 建立階段

1. 編寫 Dockerfile，其中包含：
    - 基底映像檔，如 `FROM python:3.9`
    - 安裝依賴指令，如 `RUN pip install -r requirements.txt`
    - 定義啟動命令，如 `CMD ["python", "app.py"]`
    
2. 使用命令 `docker build` 建立映像檔，例如：  
   ```bash
   docker build -t my-app .
   ```

3. 執行映像檔以生成 Container，例如：  
   ```bash
   docker run -d --name my-container my-app
   ```

### 🔍 查詢階段

1. 查看目前正在執行中的 Containers： 
    ```bash
    docker ps
    ```

2. 查看特定 Container 的日誌：
    ```bash
    docker logs my-container
    ```

3. 停止或移除 Containers：
    ```bash
    docker stop my-container
    docker rm my-container
    ```

---

## 補充說明

### 🔧 關鍵技術工具

| 工具名稱      | 功能描述                          | 適合場景               |
|---------------|----------------------------------|------------------------|
| Docker        | 建立與管理 Containers           | 開發/生產環境          |
| Kubernetes    | 編排多個 Containers             | 分散式系統             |
| Podman        | 無需 root 權限運行 Containers     | 安全需求更高時          |

### 📌 範例比較

| 技術         | 啟動速度      | 資源消耗         | 跨平台能力        |
|--------------|--------------|-----------------|------------------|
| Virtual Machine | 慢           | 高              | 中               |
| Container       | 快           | 低              | 高               |

### 🧠 延伸／常見誤解

1. **誤解：Container 是虛擬機的一種替代方案。**
   澄清：虛擬機更適合完全隔離的大型系統，而 Container 則側重輕量級隔離與快速啟動，因此兩者針對不同需求設計，可以互補而非替代彼此。

2. **誤解：Docker 是唯一的選擇。**
   澄清：除了 Docker 外，還有 Podman 和 CRI-O 等其他工具，它們各自有特點，例如 Podman 支援無需 root 權限運作，更適合安全要求較高的場景。
