---
title: "Authentik - 登入 Harbor"
slug: "/playbooks/authentik-登入-harbor"
tags:
  - "Authentik"
  - "Harbor"
  - "HowTo"
  - "SSO"
---
本指南說明如何將 [Authentik](https://goauthentik.io/) 設定為 OpenID Connect (OIDC) 提供者，以實現對 [Harbor](https://goharbor.io/) 的單一登入 (SSO) 功能。透過此設定，使用者可以利用他們在 Authentik 中的現有帳號安全地登入 Harbor。

## 先決條件

在開始之前，請確保您已準備好以下環境：
- **Harbor 實例**: 一個正常運行的 Harbor 實例，並可透過 FQDN (例如 `harbor.company`) 存取。
- **Authentik 實例**: 一個正常運行的 Authentik 實例，並可透過 FQDN (例如 `authentik.company`) 存取。
- **管理員權限**: 對 Harbor 和 Authentik 皆具有管理員權限。

## 設定步驟
## 1. 在 Authentik 中建立 OIDC Provider

首先，登入您的 Authentik 管理介面，並建立一個新的 OAuth2/OpenID Provider。
- **導覽至 Applications -> Providers**，點擊 **Create**。
- 選擇 **OAuth2/OpenID Provider**。

### Provider 設定
- **Name**: 為此 Provider 命名，例如 `Harbor`。
- **Client Type**: 選擇 `Confidential`。
- **Redirect URIs**: 輸入 Harbor 的 OIDC 回調 URL。將 `harbor.company` 替換為您 Harbor 實例的實際 FQDN：
  ```
  https://harbor.company/c/oidc/callback
  ```
- **Scopes**: 至少需要勾選 `openid`, `email`, 和 `profile`。這些範圍 (Scopes) 將允許 Harbor 從 Authentik 獲取使用者的基本資訊。
- **Signing Key**: 選擇一個可用的簽署金鑰。

## 2. 在 Authentik 中建立 Application

建立 Provider 後，您需要建立一個 Application 並將其與 Provider 關聯。
- **導覽至 Applications -> Applications**，點擊 **Create**。
- **Name**: 為應用程式命名，例如 `Harbor`。
- **Slug**: 輸入一個簡短的識別符，例如 `harbor`。
- **Provider**: 選擇您剛剛建立的 `Harbor` Provider。

## 3. 在 Harbor 中設定 OIDC 認證

接下來，登入您的 Harbor 管理介面，設定 OIDC 認證。
- **導覽至 Administration -> Configuration -> Authentication**。
- **Auth Mode**: 從下拉選單中選擇 `OIDC`。
### OIDC Provider 設定
- **OIDC Provider Name**: 輸入一個顯示名稱，例如 `Authentik`。
- **OIDC Endpoint**: 輸入您 Authentik 的 OIDC 端點 URL，通常是 `https://authentik.company/application/o/`。
- **Client ID**: 從您在 Authentik 中建立的 Provider 頁面複製 **Client ID**。
- **Client Secret**: ��您在 Authentik 中建立的 Provider 頁面複製 **Client Secret**。
- **Scope**: 輸入 `openid email profile`。
- **Verify Certificate**: 如果您的 Authentik 使用受信任的 SSL 憑證，請勾選此項。

儲存設定後，Harbor 的登入頁面將會顯示一個使用 Authentik 登入的按鈕。

## 總結

透過以上步驟，您已成功將 Harbor 與 Authentik 整合，實現了安全的 OIDC 單一登入。這不僅簡化了使用者管理，還透過集中式的身份驗證提升了系統的安全性。使用者現在可以使用他們的 Authentik 憑證無縫登入 Harbor，無需記住額外的帳號密碼。

## 參考資料

- [Authentik Documentation: Harbor Integration](https://docs.goauthentik.io/integrations/services/harbor/)
