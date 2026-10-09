---
title: "NFS"
slug: "/notes/nfs"
tags:
  - "NFS"
  - "Networking"
  - "FileSystem"
  - "Storage"
  - "Linux"
  - "Unix"
  - "SMB"
---
## NFS (網路檔案系統)

NFS (Network File System)，即「網路檔案系統」，是一種分散式檔案系統協定，允許客戶端電腦透過網路存取伺服器上的檔案，就像存取本地儲存一樣。它最初由 Sun Microsystems 開發，是 Unix-like 系統 (如 Linux) 中進行網路檔案共享的事實標準。

## 工作原理

1.  **伺服器端 (Export)**: NFS 伺服器會將一個或多個本地目錄「匯出」，並在 `/etc/exports` 檔案中設定允許哪些客戶端以何種權限（如唯讀、可讀寫）來存取。
2.  **客戶端 (Mount)**: NFS 客戶端會將遠端伺服器匯出的目錄「掛載」到本地檔案系統的一個掛載點上。
3.  **檔案存取**: 一旦掛載成功，客戶端就可以像操作本地檔案一樣，對掛載點下的檔案進行讀取、寫入等操作。這些操作會透過 RPC (遠端程序呼叫) 傳輸到 NFS 伺服器，由伺服器實際執行。

## 主要版本

- **NFSv2**: 最早的版本，基於 UDP，功能較為基礎。
- **NFSv3**: 引入了對 64 位元檔案大小的支援，並在錯���處理和效能上有所提升。
- **NFSv4**: 最新的主要版本，引入了狀態 (stateful) 的概念，增強了安全性（如 Kerberos 整合）、效能，並簡化了防火牆的穿透。

## NFS vs. SMB/CIFS

NFS 和 SMB 是兩種最主流的網路檔案共享協定。

| 特性 | NFS (Network File System) | SMB/CIFS (Server Message Block) |
| :--- | :--- | :--- |
| **主要平台** | Unix / Linux | Windows |
| **權限模型** | 基於使用者 ID (UID) 和群組 ID (GID) | 基於使用者帳號和存取控制列表 (ACL) |
| **設定複雜度** | 相對簡單 | 在跨平台環境中可能較複雜 |
| **效能** | 在處理大量小檔案時通常表現更佳 | 在 Windows 環境中整合度最高 |
| **適用場景** | Linux/Unix 環境、虛擬化、容器儲存 | Windows 辦公環境、跨平台檔案共享 |

## 應用場景

- **企業內部檔案共享**: 為 Linux/Unix 工作站提供集中的檔案共享服務。
- **Web 伺服器內容共享**: 多個 Web 伺服器可以共享同一個 NFS 目錄來提供網站內容。
- **虛擬化環境**: [PVE](/docs/playbooks/pve) 等虛擬化平台可以使用 NFS 作為共享儲存，存放虛擬機映像檔和 ISO 檔案。
- **[Kubernetes](/docs/notes/kubernetes) 持久化儲存**: 在 Kubernetes 叢集中，NFS 可以作為 Persistent Volume (PV) 的後端儲存，為容器提供簡單、方便的持久化資料儲存。

## 總結
NFS 以其簡單、高效的特性，在 Unix 和 Linux 世界中扮演著不可或缺的角色。它提供了一種穩定可靠的方式來集中管理和共享檔案，特別是在伺服器、虛擬化和容器化等場景中，NFS 依然是當今最受歡迎的網路檔案系統之一。
