---
title: "ETL"
slug: "/notes/etl"
tags:
  - "DataEngineering"
  - "Database"
  - "Processing"
---
## What？

**ETL** 是指 Extract（擷取）、Transform（轉換）、Load（載入）三個步驟，主要用來處理資料從來源到目標系統的流動過程。它是一種資料整合流程，常見於資料倉庫的建立，也可以應用在多系統間的資料同步。

這就像將不同城市的水透過管道抽取（Extract），進行過濾與消毒（Transform），最後送到家庭水塔儲存（Load）。同樣地， **ETL** 可以讓分散在不同來源系統中的資料被清理、整理並集中到一個可供分析的地方。

---

## Who？

技術工作者中，以下角色會直接或間接使用 **ETL**：

- **資料工程師**：負責設計、實作及維護 ETL 流程。
- **資料科學家**：依賴已清理好的資料進行分析與建模。
- **BI 分析師（Business Intelligence Analyst）**：需要使用整合後的資料來製作報表或可視化。
- **系統管理員**：可能需協助維護 ETL 工具或解決效能問題。

例如，在一個跨國公司的情境下，資料工程師會設計 ETL 流程來整合各地分公司的銷售數據，以供 BI 分析師生成全球市場報表。

---

## When？

您可能會在以下情境中需要使用 **ETL 流程**：

1. 建立企業內部的 **[Data Warehouse](/docs/notes/data-warehouse)**（資料倉庫）。
2. 將不同系統中的異構數據整合成一致格式。
3. 定期將營運數據更新至分析平台。
4. 進行大規模數據遷移，例如從本地伺服器搬遷至雲端。

舉例來說，如果公司正在導入新的 CRM 系統，而舊版系統中的客戶紀錄需要轉移，就可以運用 ETL 來完成這項任務。

---

## Where？

ETL 通常出現在以下架構部分：

- 資料來源層：可能包括 SQL databases、API endpoints、flat files 等。
- 中間處理層：執行 Transform 的地方，例如 Spark 或 Python 腳本。
- 資料目標層：例如 Data Warehouse 或 Data Lake，用於存儲最終結果。

以 AWS 為例，您可能會使用 Amazon S3 作為原始數據來源，AWS Glue 來執行轉換邏輯，最後將結果存入 Amazon Redshift 作為分析平台。

---

## Why？

簡單說， **ETL 是為了解決「資料分散且格式不一致」的問題。**

當公司內部有多套系統時，每個系統產生的資料格式可能不盡相同，例如某些系統使用 JSON，而其他則是 CSV。此外，有些記錄可能有缺失值，需要補全或修正。透過 ETL，可以把這些混亂且分散的原始數據整理成一致且乾淨的格式，有助於後續分析和決策制定。

例如，在電商平台中，不同業務部門產生了各式各樣交易記錄和客戶資訊。若要追蹤全站銷售趨勢，就必須先透過 ETL 整合所有數據才有辦法進一步分析。

---

## How？

### 🛠️ 建立階段

建立階段通常包含下列流程：

1. **Extract**
   - 使用工具連接至來源端，例如 SQL 查詢、API 抓取或讀取檔案。
   - 範例：
     ```python
     import pandas as pd
     data = pd.read_csv('source-data.csv')
     ```

2. **Transform**
   - 清理與轉換原始數據，如去除重複值、填補空白欄位、進行欄位映射等。
   - 範例：
     ```python
     transformed_data = data.drop_duplicates().fillna(value="unknown")
     ```

3. **Load**
   - 將整理好的結果載入目標系統，例如寫入 Data Warehouse 或儲存到雲端服務中。
   - 範例：
     ```python
     transformed_data.to_sql('target_table', connection)
     ```

### 🔍 查詢階段

查詢階段則是針對已經完成 ETL 的目標層進行讀取和分析：

1. 使用 SQL 語句查詢已載入的資料：
   ```sql
   SELECT product_id, SUM(sales) FROM target_table GROUP BY product_id;
   ```
2. 搭配 BI 工具如 Tableau 或 Power BI 進行可視化操作，比如生成銷售趨勢圖表。

---

## 補充說明

### 🔧 關鍵技術工具

| 工具名稱       | 功能                     | 適用場景                       |
|----------------|--------------------------|--------------------------------|
| Apache Airflow | 管理與排程 ETL 工作流    | 大型專案需高度自動化時使用      |
| AWS Glue       | 雲端上的 ETL 平台        | 整合 AWS 生態系服務            |
| Talend         | 視覺化界面設計 ETL 流程  | 無需寫程式碼的小型專案          |
| Python + Pandas| 客製化腳本執行 ETL       | 小型且彈性需求高                |

---

### 🧠 延伸／常見誤解

#### 誤解：「ETL 和 ELT 是同義詞」
澄清：兩者流程順序不同。ELT 是先 Load，再 Transform。例如，大量原始數據直接載入 [Data Lake](/docs/notes/data-lake)，再透過 SQL 處理轉換邏輯。而 ETL 則是在 Load 前完成轉換工作，更適合需要即時清理的小型專案。

#### 延伸：「是否總要用商業工具？」
澄清：小型需求可以完全依靠開源方案如 Python，但若涉及大量排程及監控功能，大型商業工具確實更有效率。不一定每次都需要購買昂貴軟體！
