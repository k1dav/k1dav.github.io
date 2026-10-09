---
title: "Caddy"
slug: "/playbooks/caddy"
tags:
  - "Caddy"
  - "WebServer"
  - "ReverseProxy"
  - "HTTPS"
  - "LoadBalancing"
  - "Nginx"
---
## Caddy：現代化的自動 HTTPS Web 伺服器

Caddy 是一個現代、易用的開源 Web 伺服器，以其無與倫比的自動化 HTTPS 功能而聞名，旨在簡化網站部署和管理的複雜性。

## 核心特性

- **自動化 HTTPS**: Caddy 能自動向 Let's Encrypt 或 ZeroSSL 等公開 CA 申請與續簽 SSL/TLS 憑證，預設啟用 [HTTPS](/docs/notes/https)，讓網站安全設定變得極其簡單。
- **反向代理 與 負載平衡**: 可將傳入的請求轉發至一個或多個後端服務，並內建多種負載平衡策略及健康檢查機制。
- **[WebSocket](/docs/notes/websocket) 支援**: 原生支援代理 WebSocket 連線。
- **設定檔簡單**: 使用 `Caddyfile` 進行設定，語法直觀簡潔。

**Caddyfile 範例：**
```caddy
example.com {
    # 將所有請求反向代理到本地 9000 port 的服務
    reverse_proxy localhost:9000
}
```

## 關鍵使用場景

- **個人專案與內部服務**: 對於個人部落格、Side Project 或公司內部工具，Caddy 的自動 HTTPS 和簡單配置可以大幅降低部署和維護成本。
- **容器化環境 (Docker/Kubernetes)**: Caddy 非常適合作為容器化應用的 Ingress Controller 或 Sidecar Proxy，其輕量和易於自動化的特性與容器生態系統完美契合。
- **本地開發環境**: 開發者可以使用 Caddy 輕鬆地為本地開發網域啟用受信任的 HTTPS，解決在本地測試需要安全連線功能時的麻煩。

## Caddy vs. Nginx

| 特性 | Caddy | Nginx |
| :--- | :--- | :--- |
| **HTTPS** | **自動化** (預設啟用) | 手動設定 (需自行申請/管理憑證) |
| **設定檔** | Caddyfile (簡單、直觀) | .conf (功能強大，但語法較複雜) |
| **核心設計** | 現代化，為 HTTPS 和 HTTP/2 設計 | 經典、高效，久經考驗 |
| **效能** | 非常高 | 極高，通常被視為效能標竿 |
| **社群與生態** | 成長迅速 | 非常龐大，資源豐富 |
| **適用場景** | 中小型專案、微服務、快速部署 | 高流量、複雜路由、需要極致效能的場景 |

## 總結
Caddy 以其「預設安全」(Secure by Default) 和「簡單易用」的哲學，為現代 Web 服務的部署帶來了革命性的改變。特別是其全自動的 HTTPS 功能，讓開發者和維運人員從繁瑣的憑證管理中解放出來。對於追求快速、安全、現代化部署流程的專案來說，Caddy 是一個非常值得考慮的選擇。
