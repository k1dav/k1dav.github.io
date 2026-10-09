---
title: "Data Warehouse"
slug: "/notes/data-warehouse"
tags:
  - "BigData"
  - "DataEngineering"
  - "Database"
---
## What？

**Data Warehouse 是什麼？**

Data Warehouse 是一種專門設計用於資料整理、存儲和分析的系統。它通常用來集中管理來自不同來源的資料，並提供高效的查詢功能，幫助企業進行深入分析和決策。例如，當企業需要分析客戶購買行為，就可以透過 Data Warehouse 整合銷售數據、廣告點擊記錄以及其他相關資訊，以便進行交叉分析。

Data Warehouse 的核心目標是將大量結構化或半結構化資料轉換成方便存取且具備商業價值的形式，同時支持高性能的查詢操作。

---

## Who？

主要使用者包括：
- **數據分析師 (Data Analysts)**：利用 Data Warehouse 進行複雜查詢，例如：客戶分群、銷售預測等。
- **商業智慧 (BI) 工具使用者**：透過 Tableau、Looker 等 [BI 工具](/docs/notes/business-intelligence-tools) 從 Data Warehouse 中提取視覺化報表。
- **後端工程師 (Backend Engineers)**：負責設計 [ETL](/docs/notes/etl) 流程（Extract, Transform, Load）從原始資料源到 Data Warehouse 的轉換。
- **企業管理層**：透過 Data Warehouse 提供的報表進行商業決策。

影響範圍不僅限於技術人員，還包括需要以資料為基礎做出決策的各層級管理者。

---

## When？

通常在以下情境中會使用 Data Warehouse：
1. **資料來源多樣化**：例如，當企業需要整合 CRM 系統、ERP 系統及第三方 API 的多種來源時。
2. **長期歷史資料保存及查詢**：例如，要分析過去五年銷售趨勢，而非只看即時數據。
3. **跨部門協作需求**：例如，營運部門與財務部門共同檢視同一份資料，但原始格式不同。
4. **需要高速且複雜的 SQL 查詢能力**：像是加入 OLAP（Online Analytical Processing）功能進行大規模交叉比對。

---

## Where？

在典型的現代資料架構中，Data Warehouse 通常位於以下位置：
1. 資料流管道中介層（介於原始數據來源與應用層之間）：  
   - 原始數據經由 ETL 或 ELT 流程進入 Data Warehouse
   - 後續提供清理後的資料給 BI 工具或應用服務
2. 與 Data Lake 協作（避免混淆）：  
   - Data Lake 存放未處理的大量原始數據
   - 而 Data Warehouse 則存放已歸納並結構化的重點數據

下圖展示典型架構：
```
[Data Sources] -> [ETL Process] -> [Data Lake / Staging Area] -> [Data Warehouse] -> [BI Tools / Reporting Layer]
```

---

## Why？

主要解決三個痛點：
1. **整合多元來源資料**  
   許多組織面臨不同系統格式不一致、重複性高等問題。利用 Data Warehouse，可以標準化這些異質性來源並集中管理。
   
2. **提升查詢效能與可靠性**  
   相較直接從應用系統查詢，Data Warehouse 通常採用專門優化的大規模 SQL 引擎（如 Amazon Redshift 或 Snowflake），能有效處理 TB 級甚至 PB 級別的大量資料。

3. **支持歷史趨勢分析與報表生成需求**  
   原始系統可能只關注即時交易，而 Data Warehouse 可保存長期歷史記錄供後續深度分析，例如預測模型訓練等。

---

## How？

### 🛠️ 建立階段

建置一個完整且有效運作的 Data Warehouse 通常包含以下流程：

1. **需求定義**
   - 確定哪些商業問題需要解決，以及需要整合哪些數據源。
   
2. **選擇工具**
   - 決定使用哪種平台（例如 AWS Redshift、Google BigQuery）。
   
3. **設計 Schema**
   - 選擇適合業務用途的 Schema 模型，如 Star Schema 或 Snowflake Schema。  
     - Star Schema 以中心事實表為主，周圍有維度表；適合簡單又快速的查詢。  
     - Snowflake Schema 維度表更細分；則適合需要正規化存儲以減少重複性場景。

4. **建立 ETL 流程**
   - 撰寫管道程式將原始數據提取至 Staging Area，再轉換後載入至最終目標表。

5. 測試與部署
   - 確保所有邏輯正確且符合性能要求。

### 🔍 查詢階段

在查詢階段，技術人員通常會執行以下任務：

1. 編寫 SQL 進行複雜聚合操作，例如：
    ```sql
    SELECT 
        product_id, 
        SUM(sales_amount) AS total_sales 
    FROM 
        sales_fact_table 
    WHERE 
        sale_date BETWEEN '2023-01-01' AND '2023-12-31' 
    GROUP BY 
        product_id;
    ```
    
2. 使用 BI 工具產生視覺化報告，例如透過 Tableau 對結果進一步切片和篩選。

3. 執行性能優化，例如添加 Index 或調整 Partition，以提升大型查詢效率。

---

## 補充說明

### 📌 範例比較

以下是不同 Query 平台上執行相同操作結果所需時間比較：

| 平台               | TB 級別 Query 耗時          |
|--------------------|----------------------------|
| Amazon Redshift    | 約 15 秒                  |
| Google BigQuery    | 約 10 秒                  |
| 自建 MySQL Server  | 超過 120 秒               |

### 🧠 延伸／常見誤解

1. 誤解：「Data Lake 與 Data Warehouse 是相同概念」  
   澄清：兩者用途不同。Data Lake 重視儲存未處理的大量原始資訊，而 Data Warehouse 則強調結構化後可供快速查詢和分析之用途。  

2. 誤解：「所有公司都需要建置自己的 On-Premise 的 Data Warehouse」  
   澄清：現代雲端技術使得 SaaS 型倉庫如 Snowflake 更易部署，也更具成本效益，不一定要自行搭建硬體基礎架構。
