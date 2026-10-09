---
title: "Authentik - 設定 LDAP Provider"
slug: "/playbooks/authentik-設定-ldap-provider"
tags:
  - "Authentik"
  - "LDAP"
  - "Traefik"
  - "Kubernetes"
  - "IAM"
  - "SSO"
---
這篇筆記記錄了如何為 [Authentik](/docs/playbooks/authentik) 設定並開放 LDAP Provider，以便其他需要 LDAP 認證的舊版服務 (Legacy Application) 可以整合 Authentik，實現統一的使用者認證。

## 核心用途

在現代化的 IT 環境中，我們希望盡可能使用 OIDC 或 SAML 等較新的協定進行單一登入 (SSO)。然而，許多舊版或特定的應用程式（例如：Jenkins, SonarQube, OpenVPN）仍然依賴 LDAP 作為其主要的外部使用者認證方式。

透過將 Authentik 設定為 LDAP Provider，我們可以：
- **橋接新舊系統**: 讓舊版應用程式也能納入 Authentik 的統一身份管理體系。
- **集中化控管**: 在 Authentik 中統一管理使用者和群組，變動會自動同步到所有整合的服務。
- **增強安全性**: 讓 LDAP 登入也能強制執行多因子認證 (MFA) 或其他複雜的存取策略 (Policy)。

## 設定步驟概覽

1.  **在 Authentik 中建立 LDAP Provider**: 登入 Authentik 管理介面，在 `Providers` 中建立一個新的 LDAP Provider。
2.  **建立 Application**: 建立一個新的 Application，並將上一步建立的 Provider 指派給它。
3.  **取得 Service Account 憑證**: 在 Provider 的設定中，為其綁定一個 Service Account (或建立一個新的)，並記下其密碼，這將作為 LDAP 的 Bind Password。
4.  **設定 Ingress**: 設定您的 Ingress Controller (如 Traefik)，將 Authentik Outpost 的 `389` (LDAP) 或 `636` (LDAPS) 連接埠暴露出來。

## 1. 設定 Ingress 開放 389 Port

為了讓外部服務可以存取 Authentik 的 LDAP，需要透過 Ingress Controller (此處以 Traefik 為例) 將 389 port (LDAP) 開放出來。

以下是 Traefik 的 `HelmChartConfig` 設定範例：

```yaml
apiVersion: helm.cattle.io/v1
kind: HelmChartConfig
metadata:
  name: traefik
  namespace: kube-system
spec:
  valuesContent: |-
    ports:
      ldap:
        port: 389
        expose:
          default: true
        exposedPort: 389
```

## 2. 測試 LDAP 連線

設定完成後，可以使用 `ldapsearch` 指令來測試 LDAP 連線是否正常。

```bash
# -x: 使用簡單認證
# -H: 指定 LDAP 伺服器的主機和 port
# -D: 指定用來綁定的 DN (Distinguished Name)，即服務帳號
# -w: 指定服務帳號的密碼
# -b: 指定搜尋的基礎 DN (Base DN)
# '(objectClass=user)': 搜尋過濾器，這裡用來尋找所有使用者物件
# -d 1: 開啟除錯模式，顯示詳細的連線過程
ldapsearch -x \
  -H ldap://company.example:389 \
  -D 'cn=ldapservice,ou=users,DC=ldap,DC=goauthentik,DC=io' \
  -w 'YOUR_BIND_PASSWORD' \
  -b 'DC=ldap,DC=goauthentik,DC=io' \
  '(objectClass=user)' -d 1
```
> **注意：** 請務必將上述指令中的主機名稱、Bind DN (`cn=ldapservice...`) 和密碼 (`-w` 後的內容) 替換成您自己的 Authentik 設定。

## 總結
透過將 Authentik 設定為 LDAP Provider，我們可以為那些僅支援 LDAP 認證的舊版應用程式提供一個現代化的身份驗證橋樑。這不僅能將這些應用程式納入統一的身份管理體系，還能讓它們間接地享受到 Authentik 帶來的多因子認證 (MFA) 等強大的安全策略，實現了安全性和便利性的雙重提升。

## 參考資料

- [Authentik Documentation - LDAP Provider Generic Setup](https://docs.goauthentik.io/docs/add-secure-apps/providers/ldap/generic_setup)
