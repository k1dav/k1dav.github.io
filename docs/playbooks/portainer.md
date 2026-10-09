---
title: "Portainer"
slug: "/playbooks/portainer"
tags:
  - "Portainer"
  - "Docker"
  - "Kubernetes"
  - "ContainerManagement"
  - "GUI"
  - "DevOps"
  - "Containerization"
---
## Portainer：輕量級的容器管理 UI

Portainer 是一個輕量級的開源管理 UI，用於管理 [Docker](/docs/notes/docker) 引擎、[Kubernetes](/docs/notes/kubernetes) 叢集和 Azure ACI (Azure Container Instances)。它提供了一個直觀的圖形使用者介面 (GUI)，讓使用者可以輕鬆地部署、管理和監控容器化應用程式。

## 核心概念

- **圖形化管理工具**: Portainer 提供一個易於使用的 Web 介面，簡化了 [Docker](/docs/notes/docker) 和 [Kubernetes](/docs/notes/kubernetes) 的操作。
- **多環境支援**: 支援管理單一 Docker 主機、Docker Swarm 叢集、以及 Kubernetes 叢集。

## 主要功能

- **容器生命週期管理**: 查看、啟動、停止、重啟、刪除容器，並能編輯容器設定。
- **映像檔管理**: 瀏覽、拉取、推送、建構和刪除 Docker 映像檔。
- **Volume 與網路管理**: 管理 Docker Volume 和網路，包括建立自定義網路和掛載 Volume。
- **系統監控**: 提供 CPU、記憶體和網路使用情況的即時監控。
- **使用者與權限管理**: 支援多使用者登入和基於角色的存取控制 (RBAC)，方便團隊協作。
- **應用程式範本**: 提供預設的應用程式範本，可以快速部署常見的應用程式。

## 快速部署 (Docker)

部署 Portainer 非常簡單，只需兩條 Docker 指令即可完成：

```bash
# 1. 建立 Portainer 用於存放資料的 Volume
docker volume create portainer_data

# 2. 運行 Portainer 容器
docker run -d -p 8000:8000 -p 9443:9443 --name portainer \
    --restart=always \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v portainer_data:/data \
    portainer/portainer-ce:latest
```
部署完成後，即可透過 `https://<your-docker-host-ip>:9443` 存取 Portainer 的 Web 介面。

## Portainer CE vs. Business Edition

| 特性 | Community Edition (CE) | Business Edition (BE) |
| :--- | :--- | :--- |
| **價格** | 免費 | 付費 (提供免費試用) |
| **核心功能** | 包含所有核心管理功能 | 包含 CE 所有功能 |
| **進階功能** | 有限 | 外部認證 (LDAP/OAuth)、更細緻的 RBAC、註冊表管理、備份/還原等 |
| **支援** | 社群支援 | 官方商業支援 |
| **目標用戶** | 個人開發者、小型團隊、Homelab | 中大型企業、對安全與支援有較高要求的組織 |

## 總結
Portainer 以其直觀的圖形化介面，成功地降低了容器技術的使用門檻。對於剛接觸 Docker 或 Kubernetes 的使用者來說，它是一個絕佳的入門工具；對於需要快速管理和監控容器環境的團隊來說，它也是一個高效率的運維利器。無論是免費的社群版還是功能更強大的商業版，Portainer 都為容器化應用的管理提供了極大的便利。
