---
title: "YubiKey FIDO2 Key 進行 SSH 連線"
slug: "/playbooks/yubikey-fido2-key-進行-ssh-連線"
tags:
  - "SSH"
  - "YubiKey"
  - "FIDO2"
  - "Security"
  - "Authentication"
  - "Linux"
  - "macOS"
---
## 使用 YubiKey (FIDO2) 進行 SSH 無密碼連線

這篇筆記介紹如何使用支援 [FIDO2](/docs/notes/fido2) 的安全金鑰 (如 YubiKey) 來進行 SSH 連線，實現比傳統密碼或 SSH 金鑰更高安全性的「無密碼」認證。

## 運作原理

傳統的 SSH 金鑰將私鑰儲存在您電腦的檔案系統中，這意味著如果您的電腦被入侵，私鑰就有可能被竊取。而使用硬體安全金鑰，**私鑰永遠不會離開硬體裝置**。

認證流程如下：
1.  **挑戰 (Challenge)**: 當您嘗試 SSH 連線時，遠端伺服器會向您的電腦發送一個「挑戰」。
2.  **簽章 (Signing)**: 您的電腦將這個挑戰轉發給 YubiKey。
3.  **使用者驗證 (User Verification)**: 您必須觸碰 YubiKey（或輸入 PIN），物理上確認此操作。
4.  **回應 (Response)**: YubiKey 使用其內部儲存的私鑰對「挑戰」進行數位簽章，並將簽章後的結果傳回。
5.  **驗證 (Verification)**: 遠端伺服器使用��先儲存的公鑰來驗證簽章。如果驗證成功，連線即被允許。

這個過程確保了即使您的電腦被完全攻陷，攻擊者也無法在沒有您的 YubiKey 和物理觸碰的情況下登入您的伺服器。

## 先決條件

- **OpenSSH 版本**: 客戶端和伺服器都需要 OpenSSH 8.2 或更高版本。
- **硬體金鑰**: 一個支援 FIDO2/U2F 標準的安全金鑰，例如 YubiKey 5 系列。
- **金鑰類型**: 建議使用 `ed25519-sk` 或 `ecdsa-sk` 類型。

## Resident vs. Non-resident 金鑰

| 類型 | Resident (可發現金鑰) | Non-resident (不可發現金鑰) |
| :--- | :--- | :--- |
| **私鑰儲存** | 安全地儲存在硬體金鑰內部 | 私鑰不儲存，每次認證時由硬體金鑰產生 |
| **本地檔案** | `id_*.pub` (公鑰) 和一個指向硬體金鑰的「指標檔」 | `id_*.pub` (公鑰) 和一個指向硬體金鑰的「指標檔」 |
| **可攜性** | **高**，可在任何電腦上透過 `-K` 選項重新生成指標檔 | **低**，指標檔與特定電腦綁定 |
| **使用場景** | 需要在多台電腦上使用同一個 SSH 金鑰 | 只在固定的一台電腦上使用 |

## 1. 產生 Resident (可發現) FIDO2 SSH 金鑰

```bash
# -t ed25519-sk: 指定金鑰類型為基於 FIDO 的 ed25519
# -O resident: 將私鑰儲存在安全金鑰內部，使其成為可發現金鑰
# -O application=ssh:mykey1: 為金鑰指定一個應用程式名稱，方便管理
# -O verify-required: 每次使用時都需要進行使用者驗證 (如觸碰 YubiKey)
ssh-keygen -t ed25519-sk -O resident -O application=ssh:mykey1 -O verify-required
```
執行此命令後，您會被提示觸碰您的 YubiKey 來完成金鑰生成。生成的公鑰會儲存在您的 `~/.ssh/` 目錄下 (例如 `id_ed25519_sk.pub`)。

## 2. 在其他電腦上載入已存在的 Resident 金鑰

如果您已經在 YubiKey 中儲存了一個 `resident` 金鑰，您可以在其他電腦上「載入」它，而無需再次生成新的金鑰對。

```bash
# 使用 -K 選項來從安全金鑰中讀取 resident 金鑰
# 這會在本地產生對應的公鑰和私鑰指標檔
ssh-keygen -K
```
執行此命令後，觸碰您的 YubiKey，系統會從中讀取公鑰並在本地生成對應的檔案，之後就可以用它來進行 SSH 連線了。

## 3. 將公鑰添加到遠端伺服器

將您生成的公鑰 (例如 `~/.ssh/id_ed25519_sk.pub` 的內容) 添加到您要連線的遠端伺服器的 `~/.ssh/authorized_keys` 檔案中。

## 總結
使用 YubiKey 等硬體安全金鑰進行 SSH 認證，是目前最安全的遠端連線方式之一。它將私鑰牢牢鎖在硬體中，無法被竊取或複製，同時要求使用者進行物理觸碰��確認操作，從根本上杜絕了遠端攻擊和金鑰洩漏的風險。特別是 `resident` 金鑰的引入，更是在安全性和便利性之間取得了絕佳的平衡。

## 參考資料

- [使用 SSH Security Key (NFC/Yubico FIDO2) 進行 SSH 連線](https://www.alextwl.idv.tw/memo/2023/08/ssh-security-key-nfc-yubico-fido2/)
