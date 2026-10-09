---
title: "Authentik - 用 Authentik 登入 PVE"
slug: "/playbooks/authentik-用-authentik-登入-pve"
tags:
  - "HowTo"
  - "Authentik"
  - "PVE"
  - "SSO"
  - "OIDC"
---
本指南旨在說明如何設定 [Authentik](/docs/playbooks/authentik) 作為身份提供者 (IdP)，並透過 OpenID Connect (OIDC) 協定，來實現對 [PVE](/docs/playbooks/pve) (Proxmox VE) 的單一登入 (SSO)。

## 核心概念

Proxmox VE 支援透過 OIDC 進行外部認證。我們可以利用這個功能，將 PVE 的登入流程交由 Authentik 統一管理。這樣做的好處是，所有使用者都可以使用他們在 Authentik 中的帳號密碼（甚至可以啟用 MFA）來登入 PVE，而無需為每個人在 PVE 上單獨建立和管理帳號。

## 先決條件

在開始之前，請確保您已準備好以下環境：
- **Proxmox VE 實例**: 一個正常運行的 Proxmox VE 實例，並可透過 FQDN (例如 `pve.company.com`) 存取。
- **Authentik 實例**: 一個正常運行的 Authentik 實例，並可透過 FQDN (例如 `authentik.company.com`) 存取。
- **管理員權限**: 對 Proxmox VE 和 Authentik 皆具有管理員權限。

## 設定流程概覽

整個設定過程分為兩大部分：在 Authentik 中建立應用程式，以及在 PVE 中設定 OIDC 認證。

### 步驟一：在 Authentik 中設定

1.  **建立 Provider**:
    -   在 Authentik 中，建立一個新的 **OAuth2/OpenID Provider**。
    -   確保 `Client Type` 設定為 `Confidential`。
    -   記下產生的 `Client ID` 和 `Client Secret`，稍後會在 PVE 中用到。
    -   在 `Redirect URIs/Origins` 中，填入 PVE 的登入回調 URL，格式通常為 `https://<your-pve-domain>:8006`。
2.  **建立 Application**:
    -   建立一個新的 **Application**，並將其與上一步建立的 Provider 關聯起來。
    -   設定 `Launch URL` 為您的 PVE 網址。
3.  **授權使用者**:
    -   確保需要登入 PVE 的使用者或群組，已被授權可以存取這個新的 Application。

### 步驟二：在 Proxmox VE 中設定

1.  **新增 OIDC Realm**:
    -   登入 PVE 管理介面。
    -   前往 `Datacenter` -> `Permissions` -> `Realms`。
    -   點擊 `Add` 並選擇 `OpenID Connect`。
2.  **填寫 OIDC 參數**:
    -   **Issuer URL**: 填入您 Authentik Provider 設定中的 `Issuer URL`。
    -   **Realm**: 自訂一個名稱，例如 `authentik`。
    -   **Client ID**: 貼上從 Authentik 取得的 `Client ID`。
    -   **Client Key**: 貼上從 Authentik 取得的 `Client Secret`。
    -   **Username Claim**: 通常設定為 `preferred_username` 或 `email`。
    -   **Scopes**: 確保包含 `openid`, `profile`, `email`。
3.  **設定權限**:
    -   在 PVE 的 `Permissions` 頁面，將 PVE 的角色 (如 `Administrator`) 指派給來自 Authentik 的使用者 (格式通常為 `<username>@<realm>`)。

## 總結
透過 OIDC 將 Authentik 與 Proxmox VE 整合，可以極大地簡化權限管理，並提升安全性。它讓管理者可以透過 Authentik 的統一介面和靈活的認證流程（Flows）來控制誰可以存取 PVE，同時也為使用者提供了無縫的 SSO 登入體驗。

## 參考資料

- [Authentik 官方文件：Proxmox VE 整合](https://docs.goauthentik.io/integrations/services/proxmox-ve/)
