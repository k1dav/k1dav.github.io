---
title: "RouterOS"
slug: "/playbooks/routeros"
tags:
  - "RouterOS"
  - "MikroTik"
  - "Networking"
  - "Router"
  - "Firewall"
  - "VPN"
  - "Homelab"
---
## RouterOS：功能強大的網路作業系統

RouterOS 是 MikroTik 公司開發的一款基於 Linux 核心的作業系統，專為其 RouterBOARD 硬體路由器設計，但也可以安裝在標準 PC 上。它將路由器、防火牆、頻寬管理器、無線基地台等功能整合在一個軟體中，提供了強大且靈活的網路管理能力。

## 主要功能

- **路由 (Routing)**: 支援靜態路由、動態路由協定 (OSPF, BGP, RIP) 等，可以處理複雜的網路拓撲。
- **防火牆 (Firewall)**: 提供強大的防火牆功能，包括狀態檢測、NAT (網路位址轉換)、Mangle (標記封包) 等，實現精細的流量控制和安全防護。
- **頻寬管理 (Bandwidth Management)**: 透過 Queue Tree 和 Simple Queues，可以對網路流量進行限速、優先級設定，確保關鍵應用程式的頻寬。
- **VPN (Virtual Private Network)**: 支援多種 VPN 協定，如 IPsec, OpenVPN, L2TP, PPTP, SSTP, WireGuard 等，用於建立安全的遠端連線。
- **無線網路 (Wireless)**: 支援多種無線模式 (AP, Station, Bridge)，並提供 WDS, Nstreme, NV2 等 MikroTik 特有技術，用於建立高效能的無線網路。
- **熱點 (Hotspot)**: 提供基於 Web 的認證系統，常用於公共場所的 Wi-Fi 服務。
- **其他服務**: DHCP Server/Client, DNS Cache, Web Proxy, QoS, VLAN, Bonding 等。

## 管理介面

RouterOS 提供多種管理方式：

1.  **WinBox**: 一個輕量級的 Windows 應用程式，提供直觀的圖形化介面，是管理 RouterOS 最常用的工具。
2.  **WebFig**: 基於 Web 的圖形化介面，可以直接透過瀏覽器管理 RouterOS。
3.  **CLI (Command Line Interface)**: 透過 SSH 或 Telnet 連線，或在 WinBox/WebFig 中開啟終端機，使用命令列進行管理。CLI 提供了最完整的功能和最高的靈活性。

## 學習曲線

RouterOS 以其強大的功能和高度的靈活性而聞名，但這也意味著它比一般的家用路由器有更陡峭的學習曲線。初學者可能會對其繁多的選項和專業術語感到不知所措。然而，一旦掌握了其基本邏輯（如 `IP > Firewall > Filter/NAT/Mangle` 的結構），就能發揮出其無窮的潛力。

## 優勢

- **功能強大**: 幾乎涵蓋了所有企業級網路設備的功能，且不斷更新。
- **靈活性高**: 可以根��需求進行高度客製化配置，滿足各種複雜的網路場景。
- **性價比高**: 相較於其他品牌的功能類似的網路設備，MikroTik 產品通常具有更高的性價比。
- **社群活躍**: 擁有龐大的使用者社群和豐富的線上資源。

## 應用場景

- **家庭網路**: 作為主路由器，提供進階的網路管理功能。
- **小型辦公室/企業網路**: 部署為邊界路由器、防火牆、VPN 伺服器等。
- **ISP (網際網路服務供應商)**: 用於提供客戶端網路服務。
- **實驗室與學習**: 由於其功能豐富且價格相對親民，非常適合網路工程師學習和實驗。

## 總結
RouterOS 以其強大的功能、高度的靈活性和優異的性價比，成為了從家庭使用者到企業級用戶的熱門選擇。無論是作為核心路由器、防火牆，還是 VPN 伺服器，RouterOS 都能提供穩定可靠的服務。對於網路愛好者和專業人士來說，它也是一個絕佳的學習和實驗平台。
