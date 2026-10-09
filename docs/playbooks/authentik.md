---
title: "Authentik"
slug: "/playbooks/authentik"
tags:
  - "Authentik"
  - "IAM"
  - "SSO"
  - "MFA"
  - "LDAP"
  - "OIDC"
  - "Traefik"
  - "Kubernetes"
---
Authentik 是一個功能強大的開源身分認證和授權解決方案，它將 SSO、MFA、LDAP 等多種功能整合在一個平台中，讓您可以集中管理所有應用程式的使用者認證。

## 核心概念

- **Provider (提供者)**:
  定義了 Authentik 如何為應用程式提供身份驗證。每個 Provider 對應一種協定，例如 OpenID Connect (OIDC), SAML, 或 LDAP。
- **Flow (流程)**:
  這是 Authentik 最強大的功能之一。Flow 允許您以視覺化的方式客製化使用者的認證旅程。您可以決定使用者需要輸入密碼、進行 MFA、檢查 IP 位址、或是從特定的來源登入。
- **Outpost (前哨)**:
  Authentik 的代理元件。它可以部署在您的應用程式前面，為那些本身不支援 OIDC 或 SAML 等現代認證協定的舊版應用程式提供 SSO 保護。
- **Source (來源)**:
  定義了使用者從何而來。您可以設定多個來���，例如本地資料庫、LDAP 伺服器、或是社交登入（如 Google, GitHub）。

## 核心功能

- **多種認證協議**: 支援 OAuth 2.0/OpenID Connect (OIDC)、SAML 和 LDAP 等多種主流的認證協議。
- **單一登入 (SSO)**: 讓使用者只需登入一次，即可存取所有已整合的應用程式。
- **多因子認證 (MFA)**: 提供 TOTP、WebAuthn (FIDO2) 等多種 MFA 方式，增強帳號安全性。
- **靈活的認證流程 (Flows)**: 可以客製化使用者的登入、註冊和授權流程，實現複雜的存取控制策略。
- **應用程式代理 (Proxy Outpost)**: 可以為那些本身不支援 SSO 的舊版應用程式提供安全的外部存取。

## 教學與整合範例

- [Authentik - Google 作為帳號來源](/docs/playbooks/authentik-google-作為帳號來源)
- [Authentik - 登入 Harbor](/docs/playbooks/authentik-登入-harbor)
- [Authentik - 用 Authentik 登入 PVE](/docs/playbooks/authentik-用-authentik-登入-pve)
- [Authentik - 設定 LDAP Provider](/docs/playbooks/authentik-設定-ldap-provider)
- **Synology DSM**: [官方文件](https://docs.goauthentik.io/integrations/services/synology-dsm/) (注意：根據筆記，此整合在 2024 年 12 月 16 日時可能存在問題)

## 初始設定與問題排解

### 初始設定
當您第一次部署 Authentik 時，需要透過以下連結進行初始設定：
`https://<your-authentik-domain>/if/flow/initial-setup/`

### CSRF Failed: Origin checking failed
如果您在 Traefik 後面部署 Authentik，可���會遇到 `CSRF Failed: Origin checking failed` 的錯誤。這是因為 Traefik 沒有正確地將 `X-Forwarded-Proto` header 傳遞給 Authentik。您可以透過修改 Traefik 的 `HelmChartConfig` 來解決這個問題：

```yaml
apiVersion: helm.cattle.io/v1
kind: HelmChartConfig
metadata:
  name: traefik
  namespace: kube-system
spec:
  valuesContent: |-
    additionalArguments:
      - "--entryPoints.web.proxyProtocol.insecure"
      - "--entryPoints.web.forwardedHeaders.insecure"
```

## 總結
Authentik 以其高度的靈活性和強大的功能集，成為了自架設 (Self-hosted) IAM 領域的佼佼者。它不僅能整合現代應用，還能透過其強大的代理和協議轉換能力，將舊版應用程式無縫納入現代化的 SSO 體系，是打造統一、安全認證平台的絕佳選擇。
