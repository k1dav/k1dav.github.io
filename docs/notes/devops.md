---
title: "DevOps"
slug: "/notes/devops"
tags:
  - "Automation"
  - "ContinuousDelivery"
  - "Development"
  - "IT"
  - "Integration"
  - "Operations"
  - "Software"
---
## What？

**DevOps** 是一種結合「開發（Development）」與「運維（Operations）」的文化、方法論及工具集，目的在於加速軟體交付流程、提升產品品質並確保系統穩定性。它不僅僅是技術上的實踐，更重視跨團隊間的合作與溝通。

舉例來說，傳統開發流程可能會遇到開發團隊完成程式碼後交給運維部署，但因為缺乏協同，導致部署環境與開發環境差異而出現問題。 **DevOps** 則透過自動化工具與共享責任解決這類溝通障礙。

---

## Who？

**DevOps** 主要影響兩大角色：  
1. **開發人員（Developers）**：負責撰寫程式碼並確保其功能性。  
2. **運維人員（Operations Engineers）**：負責系統部署、監控以及維護穩定性。

此外，還包括 **QA Engineers** 和 **Product Owners** 等相關角色，他們也能從 DevOps 的自動化和更短的交付周期中受益。例如，透過 [CI／CD](/docs/notes/ci-cd) Pipeline ，測試工程師可以更快地驗證功能，而產品經理則能更快速地獲得市場反饋。

---

## When？

在以下場景會使用到 **DevOps**：
- 當需要快速迭代產品，例如持續推出新功能或修復 Bug。
- 當企業希望降低交付風險，例如減少部署錯誤。
- 當管理複雜分散式系統架構，例如微服務（[Microservices](/docs/notes/microservices)）。
- 當需要提升團隊效率，例如減少手動操作、集中監控。

例如，在電商平台的促銷活動前夕，需要多次更新前端頁面與後端 API，而又不能影響既有交易流程，此時正是 DevOps 發揮作用的最佳時機。

---

## Where？

**DevOps** 通常出現在軟體開發生命周期（SDLC）的各個階段，包括：
1. **版本控制（Version Control）**
2. **CI/CD Pipeline**
3. **基礎架構即程式碼（Infrastructure as Code, [IaC](/docs/notes/iac)）**
4. **監控和回報（Monitoring and Feedback Loops）**

具體來說，它會在以下層面發揮作用：
- 應用層：自動化測試和部署
- 基礎架構層：透過工具如 [Terraform](/docs/playbooks/terraform) 管理資源
- 運行層：使用 Prometheus 或 ELK Stack 進行系統監控

---

## Why？

核心目的是解決以下問題：
1. 缺乏協作：傳統上，開發和運維是分離的，導致溝通不良。
2. 部署風險高：手動操作容易引入錯誤。
3. 延遲交付：產品更新速度跟不上市場需求。
4. 系統不可預測：缺少可靠的監控與回饋機制。

以某 SaaS 平台為例，如果無法快速修復客戶反映的問題，那麼用戶體驗就可能受損。而 DevOps 提供了一套敏捷、高效的方式來應對這些挑戰。

---

## How？

### 🛠️ 建立階段

建立 DevOps 流程通常包括以下步驟：

1. 設置[版本控制](/docs/notes/版本控制)系統，如 Git 。 
   - 確保所有程式碼都被追蹤並存儲在中央儲存庫。
2. 建立 CI/CD Pipeline ，例如使用 Jenkins 或 GitHub Actions ：
   - 定義測試、編譯及部署腳本。
3. 實施基礎架構即程式碼（IaC），例如利用 Terraform 或 Ansible ：
   - 編寫配置檔案管理雲端資源。
4. 整合容器技術，如 Docker 和 Kubernetes ：
   - 提供一致性執行環境。
5. 配置監控工具，如 Prometheus 和 Grafana ：
   - 定義警示規則並建立可視化儀表板。

### 🔍 查詢階段

查詢階段主要圍繞以下幾個流程進行：
1. 使用日誌分析工具，如 ELK Stack ，定位錯誤：
   - 搜尋特定關鍵字以識別異常情況。
2. 查閱 CI/CD Pipeline 執行紀錄：
   - 確認是否有失敗步驟或測試案例未通過。
3. 使用應用性能監控工具，如 New Relic 或 AppDynamics ：
   - 分析服務延遲或資源瓶頸原因。

---

## 補充說明

### 📌 範例比較

| 特徵               | 傳統方法              | DevOps 方法               |
|--------------------|---------------------|--------------------------|
| 部署頻率           | 每月一次             | 每天多次                  |
| 出錯率             | 高                  | 低                       |
| 團隊協作           | 分離                | 緊密整合                  |

### 🧠 延伸／常見誤解

1. 誤解：「DevOps 就等於 CI/CD。」  
    澄清：CI/CD 是 DevOps 的一部分，但還包括 IaC、自動化測試及監控等其他元素。

2. 誤解：「使用了 Docker 就算是 DevOps。」  
    澄清：Docker 是工具，而非方法論。真正的 DevOps 涉及文化改變和全流程整合。
