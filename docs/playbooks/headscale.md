---
title: "Headscale"
slug: "/playbooks/headscale"
tags:
  - "Headscale"
  - "Tailscale"
  - "WireGuard"
  - "VPN"
  - "ZeroTrust"
  - "SDN"
  - "Networking"
---
## Headscale：自架設的 Tailscale 控制伺服器

Headscale 是一個開源、可自行架設 (Self-hosted) 的 [Tailscale](/docs/playbooks/tailscale) 控制伺服器 (Control Server)。它實現了 Tailscale 控制伺服器的大部分功能，讓使用者可以建立自己的 Tailscale 網路，而無需依賴 Tailscale 官方的 SaaS 服務。

## 核心架構

- **Headscale Server (控制平面)**: 您自行部署的伺服器，負責管理和協調網路中的所有節點。它的主要職責包括：
  - **節點註冊與認證**: 處理新設備的加入請求。
  - **公鑰交換**: 安全地分發各個節點的 WireGuard 公鑰。
  - **IP 分配**: 在 `100.64.0.0/10` 的 CGNAT 位址空間內為每個節點分配一個固定的私有 IP。
  - **ACLs (存取控制列表)**: 根據您定義的規則，決定哪些節點之間可以互相通訊。
- **Tailscale Clients (資料平面)**: 運行在您各個設備（如筆電、伺服器、手機）上的標準 Tailscale 客戶端。它們只負責建立加密的 WireGuard 通道，並根據從 Headscale 伺服器獲取的「網���地圖」(Network Map) 來轉發數據。

## Headscale vs. Tailscale

| 特性 | Headscale | Tailscale (官方服務) |
| :--- | :--- | :--- |
| **控制伺服器** | 自行架設與管理 | 由 Tailscale Inc. 託管 |
| **成本** | 開源免費 (需自行負擔主機成本) | 提供免費和付費方案 |
| **裝置數量** | 無限制 | 免費方案有數量限制 |
| **設定複雜度** | 需要自行部署和維護 | 註冊即用，非常簡單 |
| **功能** | 實現了大部分核心功能，但可能缺少一些最新的或進階的功能 | 功能最完整、最新 |

## 關鍵考量

選擇 Headscale 而非 Tailscale 官方服務，通常基於以下考量：

- **資料主權 (Data Sovereignty)**: 您希望將所有控制平面的元數據（如節點公鑰、IP 位址）都保留在自己的基礎設施內，不希望任何資訊流出到第三方伺服器。
- **無限制的節點數量**: 您的網路中有大量的設備，超出了 Tailscale 免費方案的限制，但又不想支付商業方案的費用。
- **離線或隔離環境**: 您需要在一個無法存取公網的私有網路環境中部署一個點對點的 VPN 網路。
- **高度客製化**: 您希望將控制伺服器與您現有的自動化腳本或身份驗證系統（如 LDAP, OIDC）進行深度整合。

## 安裝與設定概覽

安裝 Headscale 通常涉及以下步驟：
1.  **部署 Headscale**: 可以透過 Docker、Docker Compose 或直接執行二進位檔的方式來部署 Headscale 服務。
2.  **編輯設定檔**: 修改 `config.yaml` 檔案，設定伺服器 URL、監聽的 IP 和埠、資料庫路徑等。
3.  **設定反向代理**: 建議在 Headscale 前面架設一個反向代理 (如 Nginx, Caddy)，並為其設定 HTTPS。
4.  **建立使用者/命名空間**: 透過 Headscale 的 CLI 指令來建立使用者或命名空間，用於管理節點。
5.  **客戶端連線**: 在 Tailscale 客戶端上，使用 `tailscale up --login-server <您的 Headscale URL>` 指令來連線到您的自架設控制伺服器。

## 總結
Headscale 為那些希望利用 Tailscale 的便利性，但又對資料主權和網路控制有更高要求的個人和企業，提供了一個完美的解決方案。它將 Tailscale 的「魔法」與自架設的自由度相結合，雖然需要一些額外的設定和維護工作，但換來的是一個完全由自己掌控、不受限制的安全私人網路。
