---
title: "Terraform"
slug: "/playbooks/terraform"
tags:
  - "Terraform"
  - "IaC"
  - "DevOps"
  - "CloudComputing"
  - "Automation"
  - "Infrastructure"
---
## Terraform：基礎設施即程式碼 (IaC) 的標準

Terraform 是一個由 HashiCorp 開發的開源 基礎設施即程式碼 (Infrastructure as Code, IaC) 工具。它允許開發者和維運人員使用宣告式配置語言來定義、佈建和管理雲端及本地的基礎設施資源。

## 核心概念

- **基礎設施即代碼 (IaC)**: 透過程式碼來定義和管理基礎設施，而非手動操作。這使得基礎設施的部署、更新和銷毀變得可重複、可版本控制且自動化。
- **宣告式配置**: 您只需描述您想要的最終狀態 (例如：我需要一個 EC2 實例、一個 VPC 和一個資料庫)，Terraform 會自動計算出如何達到這個狀態，並執行必要的步驟。

## 工作流程：Write -> Plan -> Apply

1.  **編寫 (Write)**: 在 `.tf` 檔案中，使用 HCL 語言定義您的基礎設施資源。
2.  **初始化 (Init)**: 執行 `terraform init`，初始化工作目錄，下載所需的提供者 (Provider) 外掛。
3.  **計劃 (Plan)**: 執行 `terraform plan`，Terraform 會分析組態檔和當前狀態，生成一個詳細的執行計畫，預覽將要進行的變更。
4.  **應用 (Apply)**: 執行 `terraform apply`，Terraform 會根據執行計畫，實際創建或修改基礎設施資源。

## 重要概念：狀態檔案 (State File)

Terraform 最核心的概念之一就是**狀態檔案 (`terraform.tfstate`)**。

- **作用**: 它是一個 JSON 檔案，記錄了由 Terraform 所管理的所有資源及其在真實世界中的對應關係和屬性。Terraform 依賴這個檔案來規劃和執行變更。
- **重要性**: 狀態檔案至關重要，**絕對不能手動修改**。
- **團隊協作**: 在團隊環境中，狀態檔案必須存放在一個共享的、可靠的遠端後端 (Remote Backend)，如 AWS S3、Azure Blob Storage 或 Terraform Cloud，以實現狀態鎖定 (State Locking) 和協同作業，避免多人同時修改造成衝突。

## 優勢

- **一致性和可重複性**: 透過程式碼化的方式，確保每次部署的基礎設施都是一致的，避免了手動操作可能導致的錯誤。
- **版本控制**: 基礎設施配置可以像應用程式程式碼一樣納入版本控制系統 (如 Git)，方便追蹤變更歷史、協作和回滾。
- **多雲支援**: 透過「提供者 (Providers)」機制，Terraform 支援幾乎所有主流的雲服務提供商和���地解決方案。
- **降低風險**: `terraform plan` 提供了變更預覽，有助於在實際部署前發現潛在問題。

## 總結
Terraform 透過將基礎設施程式碼化，徹底改變了現代 IT 架構的管理方式。它不僅實現了基礎設施的自動化、版本化和可重現性，還透過其強大的生態系統和多雲支援能力，成為了 DevOps 和雲原生時代不可或缺的基石。
