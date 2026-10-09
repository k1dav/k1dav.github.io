---
title: "PVE"
slug: "/playbooks/pve"
tags:
  - "Proxmox"
  - "PVE"
  - "Virtualization"
  - "KVM"
  - "LXC"
  - "Linux"
  - "Homelab"
  - "ESXi"
---
## Proxmox VE (Virtual Environment)

Proxmox VE (Virtual Environment) 是一個基於 Debian 的開源虛擬化管理平台。它在單一平台中緊密整合了 KVM (Kernel-based Virtual Machine) 虛擬機、LXC (Linux Containers) 容器、軟體定義儲存和網路功能，並提供了一個統一的 Web 管理介面。

## 核心技術

- **KVM (Kernel-based Virtual Machine)**:
    -   一種硬體輔助的全虛擬化技術，允許在 Linux 核心上運行幾乎所有作業系統（包括 Windows）的獨立虛擬機 (VM)，提供高度的隔離性。
- **LXC (Linux Containers)**:
    -   一種作業系統層級的容器技術。LXC 容器共享主機的 Linux 核心，但擁有獨立的檔案系統和網路空間，提供比 VM 更低的資源開銷和更快的啟動速度。

## 關鍵使用場景

- **家庭實驗室 (Homelab)**: 對於技術愛好者來說，Proxmox VE 是建立家庭實驗室的理想平台，可以用來學習網路、測試軟體、架設個人雲等，且無需支付昂貴的授權費用。
- **中小型企業 (SMBs)**: 提供了一個功能完整且成本效益極高的伺服器虛擬化解決方案，可以整合公司內部的各種服務，並透過叢集功能實現高可用性。
- **開發與測試環境**: 開發團隊可以快速地建立和銷毀虛擬機或容器，用於應用程式的開發、測試和 CI/CD 流程。
- **網路功能虛擬化 (NFV)**: 可以用來運行虛擬化的路由器 (如 pfSense) 或防火牆，以更靈活的方式管理網路。

## Proxmox VE vs. VMware ESXi

| 特性 | Proxmox VE | VMware ESXi |
| :--- | :--- | :--- |
| **授權模式** | 開源 (AGPLv3)，免費使用 | 專有軟體，有免費版但功能受限 |
| **核心技術** | KVM (虛擬機) & LXC (容器) | 自家虛擬化技術 |
| **儲存** | 非常靈活，內建支援 ZFS, Ceph | 主要使用 VMFS，功能依賴授權 |
| **叢集管理** | 內建，無額外費用 | 需要 vCenter Server (付費) |
| **管理介面** | Web-based (HTML5) | Web-based (HTML5) |
| **適用對象** | Homelab、中小型企業、成本敏感型用戶 | 大型企業、對商業支援有強烈需求的組織 |

## 主要功能

- **統一管理**: 透過 Web 介面，可以輕鬆地建立、啟動、停止、遷移和刪除虛擬機和容器。
- **靈活儲存**: 支援多種儲存類型，包括本地儲存 (LVM, ZFS)、網路儲存 (NFS, iSCSI, Ceph) 等。
- **叢集與高可用��� (HA)**: 內建叢集功能，當一個節點發生故障時，可以自動將虛擬機遷移到其他健康的節點上。
- **備份與還原**: 內建強大的備份伺服器 (Proxmox Backup Server)，支援增量、加密和壓縮備份。
- **即時遷移 (Live Migration)**: 可以在不中斷服務的情況下，將運行中的虛擬機從一個節點遷移到另一個節點。

## 總結
Proxmox VE 以其開源、免費且功能強大的特性，成為了 VMware ESXi 一個極具競爭力的替代方案。它不僅提供了企業級的虛擬化功能（如叢集、高可用性、即時遷移），還整合了 LXC 容器和先進的 ZFS 儲存，為從家庭實驗室 (Homelab) 愛好者到中小型企業的各類使用者，提供了一個極具彈性和成本效益的伺服器虛擬化平台。
