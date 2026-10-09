---
title: "PVE Resize Disk"
slug: "/playbooks/pve-resize-disk"
tags:
  - "PVE"
  - "Proxmox"
  - "Virtualization"
  - "Linux"
  - "LVM"
  - "DiskManagement"
---
## 在 Proxmox VE 中擴展虛擬機磁碟 (LVM)

這篇筆記記錄了在 [PVE](/docs/playbooks/pve) 環境中，如何擴展虛擬機 (VM) 的磁碟空間，特別是針對使用 LVM (Logical Volume Manager) 的 Linux 虛擬機。

> **警告**: 磁碟操作具有風險，強烈建議在執行以下任何步驟之前，先對虛擬機進行備份或建立快照。

## 先備知識：LVM 結構

理解 LVM 的層級結構是成功擴容的關鍵。它由三個主要部分組成：
1.  **物理卷 (Physical Volume, PV)**: 對應底層的物理磁碟或分區 (如 `/dev/sda3`)。
2.  **卷組 (Volume Group, VG)**: 一個或多個 PV 組成的儲存池。
3.  **邏輯卷 (Logical Volume, LV)**: 從 VG 中劃分出來的邏輯分區，檔案系統建立在 LV 之上。

擴容的過程就是從底層（PVE 虛擬磁碟）到頂層（檔案系統）逐層擴展。

## 步驟一：在 PVE 中擴展虛擬磁碟

在對虛擬機內部進行操作之前，必須先在 Proxmox VE 的管理介面中增加虛擬磁碟的容量。

1.  登入 PVE 的 Web UI。
2.  在左側列表中選中目標虛擬機。
3.  切換到「硬體」(Hardware) 標籤頁。
4.  找到您要擴展的硬碟 (例如 `Hard Disk (scsi0)`) 並選中它。
5.  點擊上方的「調整磁碟大小」(Resize disk) 按鈕。
6.  在彈出的視窗中，輸入您希望增加的容量 (例如 `+10G`)，然後點擊「確定」。

## 步驟二：在虛擬機內擴展分區

完成上述步驟後，登入到您的 Linux 虛擬機內部，開始擴展分區。

```bash
# 使用 parted 工具來查看和修改分區表
# 將 /dev/sda 替換成您實際的磁碟設備名稱
sudo parted /dev/sda

# 在 parted 提示符下，輸入 print 查看當前的分區表，確認要擴展的分區編號
(parted) print

# 假設要擴展的是第 3 個分區，使用 resizepart 指令
# 這會將第 3 個分區擴展到磁碟的 100% (即使用所有新增加的空間)
(parted) resizepart 3 100%

# 再次輸入 print 確認分區大小已成功更新
(parted) print

# 退出 parted
(parted) quit
```

## 步驟三：擴展 LVM 邏輯卷

分區擴展後，還需要讓 LVM 系統知道這個變化，並擴展邏輯卷 (LV) 和其上的檔案系統。

```bash
# 1. 擴展物理卷 (Physical Volume)
# 讓 LVM 掃描到 /dev/sda3 分區的新增空間
sudo pvresize /dev/sda3

# 2. 擴展邏輯卷 (Logical Volume) 並同時調整檔案系統大小
# --resizefs 選��會自動執行 xfs_growfs 或 resize2fs，非常方便
# --extents +100%FREE 表示使用所有可用的空閒空間
# 將 /dev/ubuntu-vg/ubuntu-lv 替換成您實際的邏輯卷路徑
sudo lvresize --extents +100%FREE --resizefs /dev/ubuntu-vg/ubuntu-lv
```
> **提示**: 您可以使用 `lsblk`、`vgdisplay` 和 `lvdisplay` 命令來查看您的磁碟、卷組和邏輯卷的名稱與配置。

## 步驟四：驗證結果

最後，使用 `df -h` 指令來檢查檔案系統的大小是否已成功擴展。

```bash
df -h
```

## 總結
在 PVE 中擴展 LVM 磁碟是一個分為兩大部分的過程：首先在 PVE 管理介面擴展虛擬硬碟，然後在虛擬機內部依序使用 `parted`、`pvresize` 和 `lvresize` 工具來擴展分區、物理卷和邏輯卷。只要謹慎操作並在事前備份，就能安全地完成磁碟擴容。

## 參考資料

- [Proxmox VE Wiki - Resize disks](https://pve.proxmox.com/wiki/Resize_disks)
