---
title: "WireGuard"
slug: "/playbooks/wireguard"
tags:
  - "WireGuard"
  - "VPN"
  - "Networking"
  - "Security"
  - "Protocol"
  - "Encryption"
---
## WireGuard：現代、高效能的安全 VPN

WireGuard 是一種現代化、高效能且安全的虛擬私人網路 (VPN) 協議，由 Jason A. Donenfeld 開發。它旨在提供比傳統 VPN 協議 (如 OpenVPN, IPsec) 更簡單的配置、更快的速度和更強的安全性。

## 核心概念

- **簡潔高效**: WireGuard 的程式碼量非常小 (約 4000 行)，這使得它更容易被審查和維護，也降低了潛在的安全漏洞。
- **基於 UDP**: 主要使用 UDP 協議進行通訊，這有助於減少延遲並提高傳輸效率。
- **現代密碼學**: 採用最新的密碼學原語，如 ChaCha20 (用於加密)、Poly1305 (用於認證)、Curve25519 (用於金鑰交換) 等，確保了強大的安全性。

## 工作原理：密碼金鑰路由

WireGuard 的運作基於公私鑰對。每個設備 (Peer) 都會生成一對公私鑰。私鑰保存在本地，公鑰則與其他 Peer 交換。當一個 WireGuard 介面要發送封包時，它會根據目標 IP 位址，查找對應的 Peer 公鑰，然後用該公鑰加密封包並發送。這種將公鑰與允許的 IP 位址直接綁定的方式，就是所謂的「密碼金鑰路由」(Cryptokey Routing)。

## 設定範例

WireGuard 的設定檔以其簡潔而聞名。以下是一個典型的伺服器與客戶端設定範例：

**伺服器設定 (`/etc/wireguard/wg0.conf`)**
```ini
[Interface]
Address = 10.0.0.1/24
PrivateKey = <伺服器的私鑰>
ListenPort = 51820

[Peer]
# 這是客戶端的設定
PublicKey = <客戶端的公鑰>
AllowedIPs = 10.0.0.2/32
```

**客戶端設定 (`/etc/wireguard/wg0.conf`)**
```ini
[Interface]
Address = 10.0.0.2/24
PrivateKey = <客戶端的私鑰>

[Peer]
# 這是伺服器的設定
PublicKey = <伺服器的公鑰>
Endpoint = <伺服器的公開IP>:51820
AllowedIPs = 0.0.0.0/0, ::/0 # 將所有流量都透過 VPN
```

## WireGuard vs. OpenVPN

| 特性 | WireGuard | OpenVPN |
| :--- | :--- | :--- |
| **程式碼行數** | ~4,000 | ~600,000 |
| **預設協議** | UDP | TCP / UDP |
| **加密技術** | ChaCha20, Poly1305 | AES, Blowfish, Camellia |
| **效能** | 極高，接近原生速度 | 較低，有明顯效能損耗 |
| **設定複雜度** | 非常簡單 | 相對複雜 |
| **跨平台支援** | 廣泛 (Linux, Windows, macOS, iOS, Android) | 廣泛 |

## 應用場景

- **個人 VPN**: 為個人使用者提供安全��快速的網路連線，保護上網隱私。
- **遠端辦公**: 企業可以部署 WireGuard 伺服器，讓員工安全地從遠端存取公司內部網路資源。
- **站對站 VPN**: 連接不同地理位置的辦公室或資料中心，建立安全的內部網路。
- **Homelab 與物聯網 (IoT)**: 由於其輕量級和高效能，非常適合在資源受限的設備上建立安全連線。

## 總結
WireGuard 以其顛覆性的簡潔設計、卓越的效能和頂尖的安全性，正在迅速成為新一代 VPN 協議的標準。它不僅大幅降低了 VPN 的設定和管理複雜度，更提供了以往協議難以企及的速度和可靠性。對於追求高效、安全連線的使用者和企業來說，WireGuard 無疑是當下最值得考慮的選擇。
