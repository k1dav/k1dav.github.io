---
title: "Docker"
slug: "/notes/docker"
tags:
  - "DevOps"
  - "容器化"
  - "軟體開發"
---
## What？

**Docker 是什麼？**

Docker 是一個開源的容器化平台，用來簡化應用程式的部署與管理。它能將應用程式及其依賴項打包進容器（[Container](/docs/notes/container)），使得在不同環境中執行都能保持一致性。

想像一下，傳統上我們可能會遇到「我的程式碼在本地端可以執行，卻無法在測試伺服器跑」的情況。Docker 就像是一個「通用盒子」，把應用程式和所有需要的設定、依賴都封裝起來，不管在哪裡運作，都能保持原樣。

---

## Who？

主要使用者包括：
1. **開發者**：需要快速建立和測試應用環境。
2. **DevOps 工程師**：管理多個伺服器上的應用部署。
3. **測試工程師**：用一致的環境進行測試，避免「環境不符」問題。
4. **系統管理員**：簡化軟體安裝與升級流程。

舉例來說，如果你是 DevOps 工程師，每次要更新伺服器上的後端服務，都得花好幾天處理版本衝突或套件相容性問題；使用 Docker 後，你只需要更新容器鏡像（Image），便能快速完成部署。

---

## When？

以下幾種情境常見：
1. **開發階段**：建立一致性的本地開發環境，減少「Works on my machine, but not on yours」問題。
2. **測試階段**：執行自動化測試時，需要快速建立隔離的測試環境。
3. **部署階段**：將應用程式以容器形式分發至多個伺服器上。
4. **擴展階段（Scaling）**：當流量上升時，可以輕易地複製並啟動更多容器處理需求。

例如，在一個 CI/CD Pipeline 中，我們可以利用 Docker 自動構建、測試並部署最新版本的應用程式。

---

## Where？

Docker 通常出現在以下幾個層面：
- 應用層：將 Web Server、Database Server 打包成獨立容器
- 基礎架構層（Infrastructure）：結合 Kubernetes 等編排工具，用於管理多台伺服器上的容器
- 開發工具層：整合 IDE 和 CI/CD 平台，加速開發流程

舉例來說，在微服務架構中，每個服務通常被打包成獨立的 Docker 容器，以簡化相依性管理和網路通訊。

---

## Why？

1. **跨平台一致性**：避免因操作系統或硬體差異造成的執行問題。
2. **快速部署與復原**：透過 Image 快速啟動 Container；若有故障，只需重啟或重新拉取 Image 即可復原。
3. **資源隔離（Isolation）與安全性提升**：每個 Container 都是一個獨立單元，不會干擾其他 Container 或主機操作系統。
4. **高效利用資源**：比虛擬機（VM）占用更少資源，且啟動速度更快。

一種常見情況是，如果團隊正在開發一套新功能，但每次改動都可能影響現有功能。透過 Docker，可以輕鬆建立獨立隔離的環境進行測試，而不影響正式運作中的系統。

---

## How？

### 🛠️ 建立階段

以下是建立 Docker 容器的一般流程：
1. 安裝 Docker 環境（確保已安裝 `docker` CLI）。
2. 編寫 `Dockerfile` 定義你的 Image，例如指定基礎 Image 和安裝依賴項：
    ```dockerfile
    FROM python:3.9-slim
    COPY app.py /app/app.py
    WORKDIR /app
    RUN pip install flask
    CMD ["python", "app.py"]
    ```
3. 使用指令構建 Image：
    ```bash
    docker build -t my-python-app .
    ```
4. 啟動 Container：
    ```bash
    docker run -d -p 5000:5000 my-python-app
    ```

### 🔍 查詢階段

當你需要查看目前運作中的 Container 或調查某些問題，可使用以下指令：
1. 查看所有正在運作中的 Container：
   ```bash
   docker ps
   ```
2. 檢視某個 Container 的日誌資訊：
   ```bash
   docker logs <container_id>
   ```
3. 停止或移除某個 Container：
   ```bash
   docker stop <container_id>
   docker rm <container_id>
   ```

如果想確認目前有哪些本地儲存的 Images，也可以使用以下指令查詢：
```bash
docker images
```

---

## 補充說明

### 🔧 關鍵技術工具

| 工具名稱         | 功能概述                              |
|------------------|-----------------------------------|
| Docker CLI       | 操作 Docker 的命令列介面               |
| Kubernetes       | 容器編排工具，用於管理大量容器            |
| Docker Compose   | 定義多容器應用架構配置檔案               |
| Portainer        | 提供圖形化介面來管理 Docker           |

### 📌 範例比較

| 特性             | 虛擬機 (VM)       | Docker 容器       |
|------------------|------------------|------------------|
| 啟動速度         | 慢               | 快               |
| 資源占用         | 高               | 低               |
| 環境隔離         | 完全             | 輕量級           |
| 建立流程         | 較複雜           | 簡單             |

### 🧠 延伸／常見誤解

#### 容易混淆概念澄清  
1. **Docker vs 虛擬機（VM）**
   - 虛擬機完整模擬一整台電腦，包括操作系統，而 Docker 是基於宿主機內核之上的輕量型隔離技術。
   
2. **Container vs Image**
   - Image 是靜態模板，定義了如何建造你的 Container；Container 則是基於此模板運行起來的一種實際實體。

#### 延伸應用  
如果你的專案需要處理大量資料流量，可以考慮結合 [Kubernetes](/docs/notes/kubernetes) 進一步提升可擴展性。此外，也可以搭配 CI/CD 平台如 Jenkins，自動化整合與部署流程。
