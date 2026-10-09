---
title: "Tailscale"
slug: "/playbooks/tailscale"
tags:
  - "Tailscale"
  - "WireGuard"
  - "VPN"
  - "ZeroTrust"
  - "Networking"
  - "Security"
  - "Homelab"
  - "Headscale"
---
## Tailscale：零設定的網狀 VPN

Tailscale 是一個基於 [WireGuard](/docs/playbooks/wireguard) 的零信任 (Zero Trust) VPN 服務。它能建立一個安全的「網狀網路」(Mesh Network)，將您的所有設備 (無論身在何處) 連接到同一個私有網路中，就像它們都在同一個房間的區域網路 (LAN) 中一樣簡單。

## 運作原理

- **控制平面 (Control Plane)**: 由 Tailscale 的協調伺服器 (Coordination Server) 負責。它處理設備的認證、公鑰交換、IP 分配等管理任務，但**不經手任何實際的網路流量**。
- **資料平面 (Data Plane)**: 這是實際的網路流量。Tailscale 會利用 NAT 穿透技術（如 STUN, ICE），盡可能地在您的設備之間建立直接的、點對點 (P2P) 的 WireGuard 加密通道。
- **DERP 備援**: 當 P2P 連線因複雜的網路環境（如對稱式 NAT）而無法建立時，流量會透過 Tailscale 的 DERP (Designated Encrypted Relays for Packets) 伺服器進行加密轉發，��保連線的可靠性。

## Tailscale vs. 傳統 VPN

| 特性 | 傳統 VPN (Hub-and-Spoke) | Tailscale (Mesh Network) |
| :--- | :--- | :--- |
| **架構** | 所有流量集中流向中央伺服器 | 盡可能在設備間建立點對點連線 |
| **設定** | 複雜，需設定防火牆、路由器 | 極其簡單，安裝軟體並登入即可 |
| **效能** | 延遲較高，受中央伺服器瓶頸影響 | 延遲低，效能好 |
| **金鑰管理**| 手動管理 | 自動化金鑰輪換 |
| **安全性** | 依賴邊界安全 | 零信任，每個連線都需驗證 |

## 主要功能

- **簡化 VPN 設定**: 無需複雜的防火牆規則或路由器設定，只需安裝客戶端軟體並透過 SSO (如 Google, Microsoft) 登入即可。
- **MagicDNS**: 自動為您的私有網路 (Tailnet) 中的設備提供 DNS 名稱，讓您可以透過好記的設備名稱（而不是難記的 IP 位址）來存取。
- **ACLs (Access Control Lists)**: 透過中央控制台，精細地控制哪些使用者或設備可以存取哪些服務或端口。
- **子網路由 (Subnet Routers)**: 允許您將整個辦公室或家中的子網添加到 Tailnet 中，讓遠端設備可以存取該子網中的非 Tailscale 設備 (如印表機)。
- **[Headscale](/docs/playbooks/headscale)**: 對於有完全控制權需求的用戶，可以選擇自架設開源的 Headscale 控制伺服���。

## 總結
Tailscale 徹底改變了傳統 VPN 的使用體驗。它將複雜的網路設定抽象化，讓建立安全、私密的點對點網路變得前所未有的簡單。無論是個人用戶希望安全地存取家中的 NAS，還是開發團隊需要一個便捷的內部開發網路，Tailscale 都以其卓越的易用性、高效能和安全性，成為了現代遠端連線的最佳解決方案之一。

## 參考資料

- [Tailscale 官方網站](https://tailscale.com/)
