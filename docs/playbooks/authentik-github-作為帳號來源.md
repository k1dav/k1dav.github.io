---
title: "Authentik - Github 作為帳號來源"
slug: "/playbooks/authentik-github-作為帳號來源"
---
## Preparation[​](https://docs.goauthentik.io/integrations/services/github-organization/#preparation "Direct link to Preparation")

The following placeholders will be used:

- [`github.com/orgs/foo`](https://github.com/orgs/foo) is your GitHub organization, where `foo` is the name of your org
- [`authentik.company`](https://authentik.company) is the FQDN of the authentik Install

---
## Create a SAML provider with the following parameters:

- ACS URL: [`https://github.com/orgs/foo/saml/consume`](https://github.com/orgs/foo/saml/consume)
- Audience: [`https://github.com/orgs/foo`](https://github.com/orgs/foo)
- Issuer: [`https://github.com/orgs/foo`](https://github.com/orgs/foo)
- Binding: `Post`

## 參考資料

<https://docs.goauthentik.io/integrations/services/github-organization/>
