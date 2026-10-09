---
title: "Authentik - 設定 Authentik 與 Google Workspace SSO 同步"
slug: "/playbooks/authentik-設定-authentik-與-google-workspace-sso-同步"
tags:
  - "HowTo"
  - "Authentik"
  - "GoogleWorkspace"
  - "SSO"
  - "SAML"
---
本筆記旨在說明如何設定 [Authentik](/docs/playbooks/authentik) 作為身份提供者 (IdP)，並透過 SAML 協定，來實現對 Google Workspace 的單一登入 (SSO)。

## 核心概念

透過將 Google Workspace 與 Authentik 整合，您可以讓使用者透過 Authentik 進行身份驗證（可強制執行 MFA），然後無縫登入 Google Workspace (Gmail, Google Drive, etc.)，而無需在 Google 端單獨管理密碼。這有助於統一登入體驗，並將存取控制策略集中在 Authentik 進行管理。

## 先決條件

- **Google Workspace**: 您需要一個 Google Workspace 帳戶，並具有管理員權限。
- **Authentik**: 一個正常運行的 Authentik 實例。
- **網域名稱**: 您必須擁有一個已在 Google Workspace 中驗證的網域名稱。

## 設定流程概覽

整個設定過程分為兩大部分：在 Authentik 中建立 SAML Provider，以及在 Google Workspace 中設定第三方 IdP。

### 步驟一：在 Authentik 中設定

1.  **建立 SAML Provider**:
    -   在 Authentik 中，建立一個新的 **SAML Provider**。
    -   **ACS URL**: `https://www.google.com/a/YOUR_DOMAIN.COM/acs`
    -   **Issuer**: `google.com/a/YOUR_DOMAIN.COM`
    -   **Audience**: `google.com/a/YOUR_DOMAIN.COM`
    -   **Binding**: `Post`

2.  **下載中繼資料/憑證**:
    -   建立 Provider 後，下載其 SAML Metadata 或簽章憑證 (Signing Certificate)。稍後會在 Google Workspace 中用到。

3.  **建立 Application**:
    -   建立一個新的 **Application**，並將其與上一步建立的 SAML Provider 關聯起來。

### 步驟二：在 Google Workspace 中設定

1.  **前往 SSO 設定**:
    -   登入 Google Workspace Admin Console。
    -   前往 `Security` > `Authentication` > `SSO with third-party IdP`。

2.  **設定第三方 IdP**:
    -   勾選 `Set up SSO with a third-party identity provider`。
    -   **Sign-in page URL**: 填入您 Authentik Provider 的 `SSO Post URL`。
    -   **Sign-out page URL**: 填入您 Authentik 的登出頁面 URL。
    -   **Verification certificate**: 上傳您從 Authentik 下載的簽章憑證。
    -   **Change password URL**: 填入您 Authentik 的密碼修改頁面 URL。

3.  **啟用 SSO**:
    -   儲存設定。您可以先為特定組織單位 (OU) 的使用者啟用，以進行測試，確認無誤後再為所有使用者啟用。

## 總結
透過 SAML 協定將 Authentik 與 Google Workspace 整合，可以實現一個強大且集中的身份驗證系統。這不僅簡化了使用者的登入流程，更重要的是，它讓管理者能夠利用 Authentik 靈活的 Flow 和 Policy 引擎，為登入 Google Workspace 的行為強制加上更嚴格的安全策略，例如多因子認證 (MFA)，從而大幅提升企業的整體安全性。

## 參考資料

- [Authentik 官方文件：Google Workspace 整合](https://docs.goauthentik.io/integrations/services/google/)
