---
title: "Technitium"
slug: "/playbooks/technitium"
tags:
  - "DNS-Server"
  - "Technitium"
  - "NetworkSecurity"
  - "Privacy"
  - "Homelab"
  - "AdGuard-Home"
  - "Pi-hole"
---
## Technitium DNS Server：功能強大的自架設 DNS 解決方案

Technitium DNS Server 是一個開源的、功能豐富的本機 DNS 伺服器，讓使用者可以在自己的網路中架設私有的 DNS 服務，從而完全掌控自己的網路解析、提升安全性與隱私。

## 核心概念

- **開源軟體**: Technitium DNS Server 是一個開源專案，支援 Windows、Linux (包含 Raspberry Pi) 和 macOS 等多種作業系統。
- **易於使用**: 提供直觀的 Web 控制台，方便使用者進行管理和配置。

## 關鍵使用場景

- **進階廣告過濾**: 除了基本的黑名單過濾，Technitium 還支援 CNAME-cloaking 防禦，可以更有效地阻擋某些頑固的追蹤器。
- **權威 DNS 伺服器**: 您可以為自己的網域名稱建立和管理 DNS 紀錄，將其作為一個權威 DNS 伺服器使用。
- **條件式轉發**: 在複雜的網路環境中（例如，同時需要存取公司內部網路和公共網路），可以設���規則，將對內部網域的查詢轉發到公司 DNS，而將其他查詢轉發到公共 DNS。
- **增強隱私與安全**: 透過支援 DNS-over-TLS (DoT) 和 DNS-over-HTTPS (DoH)，可以加密您的 DNS 查詢，防止被 ISP 或中間人竊聽。

## Technitium vs. AdGuard Home / Pi-hole

| 特性 | Technitium DNS Server | AdGuard Home | Pi-hole |
| :--- | :--- | :--- | :--- |
| **核心定位** | 功能完整的權威/遞迴 DNS 伺服器 | 專注於廣告過濾與隱私保護 | 專注於廣告過濾 (最初為樹莓派設計) |
| **進階功能** | 非常豐富 (DoH/DoT/DNSSEC) | 豐富 (DoH/DoT) | 較基本 |
| **易用性** | 功能強大，設定稍複雜 | 非常易用，介面直觀 | 易用，社群龐大 |
| **資源消耗** | 較高 | 中等 | 非常低 |
| **適用對象** | 需要高度客製化和進階功能的技術愛好者 | 大多數家庭用戶、注重隱私者 | Raspberry Pi 使用者、輕量級需求者 |

## 總結
Technitium DNS Server 是一個功能極其強大的自架設 DNS 解決方案。相較於 AdGuard Home 或 Pi-hole，它提供了更多專業級的 DNS 功能，例如作為權威伺服器或進行複雜的條件式轉發。對於希望深度客製化網路環境、或是在 Homelab 中模擬企業級 DNS 功能的技術愛好者來說，Technitium 無疑是最佳選擇之一。
