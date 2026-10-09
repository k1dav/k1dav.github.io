---
title: "RouterOS 設定 DNS Server"
slug: "/playbooks/routeros-設定-dns-server"
tags:
  - "RouterOS"
  - "DNS"
  - "Networking"
  - "Firewall"
  - "NAT"
  - "Homelab"
---
## RouterOS 設定 DNS Server 並強制轉向

這篇筆記記錄了如何在 [RouterOS](/docs/playbooks/routeros) 上設定 DNS 伺服器，並透過防火牆規則強制將區域網路 (LAN) 內所有設備的 DNS 請求導向指定的 DNS 伺服器，以實現集中管理和過濾。

## 為何要這樣設定？

- **集中管理與過濾**: 許多人會在家中或辦公室架設 AdGuard Home 或 Pi-hole 等 DNS 伺服器來過濾廣告和惡意網站。此設定可以確保網路內的所有設備（包括那些無法手動設定 DNS 的設備，如智慧電視、IoT 裝置）都受到保護。
- **防止繞過**: 即使用戶在自己的設備上手動設定了其他 DNS 伺服器（如 `8.8.8.8`），此規則依然會將其請求攔截並轉向到您指定的 DNS 伺服器，確保過濾策略無法被輕易繞過。
- **維護便利**: 當需要更換後端的 DNS 伺服器時，只需修改 RouterOS 上的一條規則，而無需逐一調整所有客戶端設備。

## 網路環境資訊

- **RouterOS 路由器 IP**: `192.168.0.1`
- **NAS 上的 DNS 伺服器 IP**: `192.168.0.88` (假設為 AdGuard Home 或其他 DNS 服務)

## RouterOS 設定步驟

### 1. 設定 DHCP Server 分配 RouterOS 作為 DNS

在 DHCP Server 的網路設定中，將 DNS 伺服器設定為 RouterOS 本身的 IP (`192.168.0.1`)。這樣，透過 DHCP 獲取 IP 的設備會自動使用 RouterOS 作為 DNS。

- **WinBox 路徑**: `IP` > `DHCP Server` > `Networks`
- **設定**: 找到對應的網路設定，將 `DNS Server` 欄位設定為 `192.168.0.1`。

### 2. 設定防火牆 NAT 規則強制轉向 DNS 請求

這些規則的目的是攔截所有從 LAN 發出的 DNS 請求 (TCP/UDP 53 port)，並將它們強制轉向 NAS 上的 DNS 伺服器 (`192.168.0.88`)。

- **WinBox 路徑**: `IP` > `Firewall` > `NAT`

```routeros
/ip firewall nat
# 規則 1: 攔截所有從 LAN (bridge) 發出、目的地不為 RouterOS 本身的 DNS (UDP) 請求，
#         並將其強制轉向到 NAS 上的 DNS 伺服器。
add action=dst-nat chain=dstnat dst-address-type=!local dst-port=53 in-interface-list=LAN protocol=udp to-addresses=192.168.0.88

# 規則 2: 同上，但針對 TCP 協定。
add action=dst-nat chain=dstnat dst-address-type=!local dst-port=53 in-interface-list=LAN protocol=tcp to-addresses=192.168.0.88
```
**注意**: `in-interface-list=LAN` 假設您的 LAN 接口都在一個名為 `LAN` 的接口列表中。如果沒有，您可以改用 `in-interface=bridge` 或您 LAN 的實際接口名稱。

### 3. 設定 RouterOS 本身的 DNS 伺服器

最後，設定 RouterOS 本身在處理 DNS 請求時，將其轉發到 NAS 上的 DNS 伺服器。

- **WinBox 路徑**: `IP` > `DNS`
- **設定**:
    -   `Servers`: 填入 `192.168.0.88` (NAS DNS Server IP)。
    -   `Allow Remote Requests`: 打勾此選項，這樣 RouterOS 就可以作為一個 DNS 轉發器，讓 LAN 內的客戶端查詢。

## 如何驗證

1.  **在客戶端設備上**: 手動設定一個公共 DNS (例如 `8.8.8.8`)。
2.  **使用 `nslookup` 或 `dig`**: 查詢一個網域，例如 `nslookup google.com`。
3.  **檢查 NAS 上的 DNS 伺服器日誌**: 您應該會看到來自 RouterOS (`192.168.0.1`) 的查詢紀錄，而不是來自客戶端設備的 IP。這證明了 DNS 請求被成功攔截並轉向。

## 總結
透過 RouterOS 的 DHCP、DNS 和防火牆 NAT 功能，我們可以建立一個強大且易於管理的家庭或辦公室網路環境。這種強制 DNS 轉向的設定，不僅能確保所有設備都使用我們指定的 DNS 服務（例如，用於廣告過濾或家長控制），也大大簡化了日後的維護工作。

## 參考文章

- [RouterOS DNS Server 設定](https://justfornothing77.blogspot.com/2020/04/routerosdns-server.html)
