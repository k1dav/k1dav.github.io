---
title: "_MOC - DevOps & 基礎設施"
slug: "/playbooks/_moc-devops-基礎設施"
tags:
  - "MOC"
  - "DevOps"
  - "Infrastructure"
---
## DevOps & 基礎設施

> 串連 `10 - Playbooks/` 操作指南、`05 - Notes/` 概念卡、`40 - Internal Ops/` 內部維運文件的入口頁。

## 操作指南（`10 - Playbooks`）

### 🐳 容器與編排（K8s 系列）
- [Authentik - 登入 Harbor](/docs/playbooks/authentik-登入-harbor)
- [Authentik - 設定 LDAP Provider](/docs/playbooks/authentik-設定-ldap-provider)
- [Azure ACR Task Run 建立失敗](/docs/playbooks/azure-acr-task-run-建立失敗)
- [DeepSpeed 多節點訓練設置教學（JupyterLab 版本）](/docs/playbooks/deepspeed-多節點訓練設置教學-jupyterlab-版本)
- [Gitlab](/docs/playbooks/gitlab)
- Harbor
- [Helm](/docs/playbooks/helm)
- [Helm Chart Of NIM](/docs/playbooks/helm-chart-of-nim)
- [K3s](/docs/playbooks/k3s)
- [K3s - 整合外部 NFS 儲存](/docs/playbooks/k3s-整合外部-nfs-儲存)
- [PVE](/docs/playbooks/pve)
- [Portainer](/docs/playbooks/portainer)
- [Terraform](/docs/playbooks/terraform)
- [持續交付與部署](/docs/playbooks/持續交付與部署)
- 確認 Azure Registry Tag

### 🔐 身分驗證與安全
- [Authentik](/docs/playbooks/authentik)
- [Authentik - Github 作為帳號來源](/docs/playbooks/authentik-github-作為帳號來源)
- [Authentik - Google 作為帳號來源](/docs/playbooks/authentik-google-作為帳號來源)
- [Authentik - 用 Authentik 登入 PVE](/docs/playbooks/authentik-用-authentik-登入-pve)
- [Authentik - 設定 Authentik 與 Google Workspace SSO 同步](/docs/playbooks/authentik-設定-authentik-與-google-workspace-sso-同步)
- [YubiKey FIDO2 Key 進行 SSH 連線](/docs/playbooks/yubikey-fido2-key-進行-ssh-連線)
- 地端部署 - OIDC 加入

### 🌐 網路、VPN、Proxy
- [Caddy](/docs/playbooks/caddy)
- [FortiVPN](/docs/playbooks/fortivpn)
- [Headscale](/docs/playbooks/headscale)
- [RouterOS](/docs/playbooks/routeros)
- [RouterOS 設定 DNS Server](/docs/playbooks/routeros-設定-dns-server)
- [Tailscale](/docs/playbooks/tailscale)
- [Ubuntu 上的 iperf3 網路效能測試教學](/docs/playbooks/ubuntu-上的-iperf3-網路效能測試教學)
- [WireGuard](/docs/playbooks/wireguard)
- 連線 GPU 主機 via Tailscale

### 🛠️ 開發環境與工具
- [Coder](/docs/playbooks/coder)
- [LM Studio](/docs/playbooks/lm-studio)
- [PVE Resize Disk](/docs/playbooks/pve-resize-disk)
- [Technitium](/docs/playbooks/technitium)

## 概念卡（`05 - Notes`）

### 💻 容器與虛擬化
- [Container](/docs/notes/container)
- [Docker](/docs/notes/docker)
- [GPU Operator](/docs/notes/gpu-operator)
- [Kubernetes](/docs/notes/kubernetes)
- [Microservices](/docs/notes/microservices)
- [MinIO](/docs/notes/minio)
- [Velero](/docs/notes/velero)
- [Virtual Machine](/docs/notes/virtual-machine)

### 🔧 IaC / 自動化
- [IaC](/docs/notes/iac)

### 🌐 網路與基礎協定
- [DNS Server](/docs/notes/dns-server)
- [GraphQL](/docs/notes/graphql)
- [HTTPS](/docs/notes/https)
- [LAN](/docs/notes/lan)
- [NAS](/docs/notes/nas)
- [NFS](/docs/notes/nfs)
- [RAID](/docs/notes/raid)
- [RESTful](/docs/notes/restful)
- [WebSocket](/docs/notes/websocket)

### 📡 通訊協定 / API
- [API](/docs/notes/api)
- [Benchmark](/docs/notes/benchmark)
- [Four-Step Test](/docs/notes/four-step-test)
- [Message Queue](/docs/notes/message-queue)
- [NoSQL](/docs/notes/nosql)

### 🚀 CI/CD 與版本控制
- [CI／CD](/docs/notes/ci-cd)
- [版本控制](/docs/notes/版本控制)

### 🔒 安全
- [FIDO2](/docs/notes/fido2)
- [Hash](/docs/notes/hash)

### 📐 DevOps 文化
- [DevOps](/docs/notes/devops)

## 內部維運與開發環境（`40 - Internal Ops`）

### 📐 開發環境
- Mac 必裝軟體
- 開發環境 - 服務架構
- 開發環境 - 網路架構
- 開發環境清單

### 📋 範本與政策
- Template - GROW 潛能激發教練
- Template - 報價單
- 供應鏈
- 行政院及所屬機關（構）使用生成式 AI 參考指引
