---
title: "Authentik - Google 作為帳號來源"
slug: "/playbooks/authentik-google-作為帳號來源"
---
## Preparation[​](https://docs.goauthentik.io/docs/users-sources/sources/social-logins/google/#preparation "Direct link to Preparation")

- [`authentik.company`](https://authentik.company) is the FQDN of the authentik install.

---
## Google Auth Platform[​](https://docs.goauthentik.io/integrations/services/google/#google-workspace-configuration "Direct link to Google Workspace Configuration")

## 1. Create OAuth Client ID

*  **Application Type:** Web Application
*  **Name:** Choose a name
*  **Authorized redirect URIs:** [`https://authentik.company/source/oauth/callback/google/`](https://authentik.company/source/oauth/callback/google/)

## 2. Authentik

Under *Directory -> Federation & Social login* Click **Create Google OAuth Source**

- **Name**: Choose a name (For the example I use Google)
- **Slug**: google (If you choose a different slug the URLs will need to be updated to reflect the change)
- **Consumer Key:** Your Client ID from OAuth Client ID
- **Consumer Secret:** Your Client Secret from OAuth Client ID

## 3. Username mapping

Since google does not have the concept of a username, authentik will by default prompt the user for a username when they first enroll through a google source. To change this behaviour and automatically use the email address as username, create an expression policy to set the username to the email, and bind it to the enrollment flow.

Create an expression policy with this expression:

Flow → default-source-enrollment → Policy Binding

```bash
email = request.context["prompt_data"]["email"]
# Direct set username to email
request.context["prompt_data"]["username"] = email
# Set username to email without domain
# request.context["prompt_data"]["username"] = email.split("@")[0]
return False
```

## 3-1. Optional. Add Sources to Default Login Page[​](https://docs.goauthentik.io/docs/users-sources/sources/#add-sources-to-default-login-page "Direct link to Add Sources to Default Login Page")

To have sources show on the default login screen you will need to add them to the flow. The process below assumes that you have not created or renamed the default stages and flows.

1. In the Admin interface, navigate to the **Flows** section.
2. Click on **default-authentication-flow**.
3. Click the **Stage Bindings** tab.
4. Chose **Edit Stage** for the *default-authentication-identification* stage.
5. Under **Sources** you should see the additional sources that you have configured. Click all applicable sources to have them displayed on the Login page.

## 4. Adjust user_write

如果無法登入的話，調整 Stage `default-source-enrollment-write` 的 User 為 Internal

## 參考資料

- https://docs.goauthentik.io/docs/users-sources/sources/social-logins/google/
- https://docs.goauthentik.io/docs/users-sources/sources/#add-sources-to-default-login-page
