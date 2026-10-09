---
title: "FortiVPN"
slug: "/playbooks/fortivpn"
tags:
  - "Fortinet"
  - "FortiVPN"
  - "VPN"
  - "IPsec"
  - "SSL-VPN"
  - "Networking"
  - "Security"
---
## FortiVPN：企業級安全遠端存取

FortiVPN 是由 Fortinet 公司提供的 VPN (Virtual Private Network) 解決方案，通常與其下的 FortiGate 次世代防火牆 (NGFW) 整合使用。它提供了一種安全的方式，讓遠端使用者或分支機構能夠透過不安全的公共網路 (如網際網路)，安全地存取企業內部的私有網路資源。

## 主要 VPN 類型

FortiGate 主要支援兩種主流的 VPN 技術：IPsec 和 SSL VPN。

### 1. IPsec VPN
- **標準化協定**: IPsec (Internet Protocol Security) 是一套標準化的網路協定，用於在 IP 網路上提供加密、認證和完整性保護。
- **主要應用**: 常被用於建立**站對站 (Site-to-Site)** VPN，連接兩個或多個辦公室的區域網路 (LAN)，讓它們可以安全地互相通訊。

### 2. SSL VPN
- **基於 SSL/TLS**: 利用與 HTTPS 相同的 SSL/TLS 加密協定，因此可以輕鬆地穿透防火牆和 NAT 設備，部署彈性高。
- **主要應用**: 非常適合**遠端存取 (Remote Access)**，提供兩種不同的連線模式。

- **無客戶端模式 (Clientless Web Mode)**: 使用者只需透過網頁瀏覽器，就可以存取特定的內部 Web 應用程式或檔案共享，無需安裝任何客戶端軟體。
- **通道模式 (Tunnel Mode)**: 使用者需要安裝 **FortiClient** 軟體，建立一個加密的 SSL VPN 通道。一旦連線成功，遠端使用者就能夠存取內部網路的所有資源，如同身在辦公室一樣。

## IPsec VPN vs. SSL VPN

| 特性 | IPsec VPN | SSL VPN |
| :--- | :--- | :--- |
| **主要用途** | 站對站 (Site-to-Site) | 遠端存取 (Remote Access) |
| **網路層級** | 網路層 (Layer 3) | 應用層 (Layer 7) / 網路層 |
| **客戶端軟體** | 通常需要 | 通道模式需要，網頁模式不需要 |
| **穿透性** | 較差，可能被防火牆阻擋 | 極佳，使用標準 HTTPS (443) 埠 |
| **設定複雜度** | 較高 | 相對較低 |

## 安全特性

- **加密通道**: 所有通過 VPN 的資料都會被加密，防止在傳輸過程中被竊聽。
- **身份驗證**: 在建立連線前，會對使用者或設備進行嚴格的身份驗證，可以整合多因子認證 (MFA) 來增強安全性。
- **存取控制**: 管理員可以設定精細的防火牆策略，控制不同 VPN 使用者或群組可以存取的內部資源，實施最小權限原則。
- **日誌與監控**: FortiGate 提供詳細的日誌記錄和即時監控功能，讓管理者可以隨時掌握 VPN 的連線狀態和活動。

## 總結
FortiVPN 作為 FortiGate 防火牆的核心功能之一，為企業提供了一套完整且靈活的 VPN 解決方案。無論是透過穩定的 IPsec 建立多個辦公室之間的站對站通道，還是利用便利的 SSL VPN 滿足員工的遠端辦公需求，FortiVPN 都能提供強大的安全防護，是構建現代企業安全存取架構的關鍵元件。
