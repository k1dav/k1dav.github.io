---
title: "Data Pipeline"
slug: "/notes/data-pipeline"
tags:
  - "AI"
  - "BigData"
  - "DataEngineering"
  - "MachineLearning"
---
## What？

**Data Pipeline** 是一種資料處理架構，用於從多個來源收集資料，經過清洗、轉換後，將整理好的資料送至儲存或分析的目的地。它就像是一條自動化的流水線，負責將原始資料（Raw Data）轉變成有價值的資訊。

舉個例子，如果您在開發一個電商平台，可能需要從使用者行為記錄、商品庫存系統等不同來源取得資料，再透過 Data Pipeline 進行整合與清理，以供後續分析，例如推薦系統或銷售報表。

---

## Who？

Data Pipeline 的主要使用者包括：

- **資料工程師 (Data Engineers)**：負責設計與維護 Data Pipeline。
- **資料科學家 (Data Scientists)**：透過 Data Pipeline 獲得乾淨且結構化的資料，用於模型訓練或分析。
- **商業分析師 (Business Analysts)**：利用處理過的結果進行業務報表或決策支持。
- **後端工程師 (Backend Engineers)**：在某些情境下，可能需要整合 Pipeline 的結果至應用程式中。

例如，一位資料科學家希望分析客戶購買行為，但若沒有可靠的 Data Pipeline 提供乾淨且一致的交易記錄，他們可能需要花大量時間手動清理雜亂的原始資料。

---

## When？

Data Pipeline 通常會在以下情境中使用：

1. **定期批次處理 (Batch Processing)**：每天或每週執行一次，例如每日更新銷售報表。
2. **即時流處理 (Real-Time Streaming)**：即時監控事件，例如用戶點擊操作追蹤。
3. **大規模數據遷移 (Data Migration)**：將大量歷史數據從舊系統遷移到新系統。
4. **機器學習訓練階段**：提供乾淨且結構化的訓練數據。

例如，當某公司想要在 Black Friday 當天即時追蹤商品銷量趨勢，就需要使用 Real-Time Streaming 的 Data Pipeline。

---

## Where？

Data Pipeline 通常出現在以下架構部分：

1. **來源端 (Source Layer)**：
   - 包含各種原始資料來源，例如 SQL Database、NoSQL Database、API 或 IoT 裝置。
  
2. **處理層 (Processing Layer)**：
   - 負責清洗、轉換及整合。例如 [ETL](/docs/notes/etl)（Extract, Transform, Load）工具通常位於這一層。
   
3. **目的地端 (Destination Layer)**：
   - 包括儲存和分析工具，如 [Data Warehouse](/docs/notes/data-warehouse)（例如 Snowflake）或 [Business Intelligence Tools](/docs/notes/business-intelligence-tools)（如 Tableau）。

以電商平台為例，來源端可能是用戶點擊紀錄和商品庫存 API；處理層會執行去重複及欄位映射；最後目的地端則是企業內部的 PostgreSQL 資料庫。

---

## Why？

Data Pipeline 的主要目的是解決以下問題：

1. **繁瑣手動流程**：減少人工處理原始數據所需時間與成本。
2. **提升數據品質**：確保輸出的資料是一致且可用的，例如去除重複值並修正錯誤格式。
3. **自動化流程**：支援定期更新或即時流式輸入，避免因人力不足導致延遲交付。

舉例來說，在金融業，每日交易紀錄量非常龐大，如果沒有自動化管道來清洗和分類交易紀錄，那麼風險監控系統可能無法正常運作。

---

## How？

### 🛠️ 建立階段

建構 Data Pipeline 的流程通常如下：

1. 定義需求與目標：
   - 確認要處理哪些來源，如 SQL Database 或 API 資料出口，以及最終目的地的位置。
   
2. 選擇工具：
   - 適合批次處理可以選擇 [Apache Airflow](/docs/notes/apache-airflow)，即時流式則可選擇 Apache Kafka 或 Spark Streaming。

3. 設計 ETL 流程：
   - Extract: 從多個來源擷取原始數據
   - Transform: 清洗並轉換成所需格式
   - Load: 將整理好的結果載入儲存目的地

4. 部署與測試：
   - 確保所有步驟都正常運作並符合需求，例如檢查是否有漏掉欄位或格式錯誤。

### 🔍 查詢階段

查詢階段通常分為以下步驟：

1. 使用 SQL 或其他查詢語言檢索儲存於 Destination Layer 的結果。例如，在 Snowflake 中撰寫查詢以取得銷售報表：
   ```sql
   SELECT customer_id, SUM(order_amount) as total_spent 
   FROM sales_data 
   WHERE purchase_date BETWEEN '2023-10-01' AND '2023-10-31' 
   GROUP BY customer_id;
   ```

2. 根據需求進一步篩選或聚合。例如篩選出消費金額超過 $1000 的 VIP 客戶列表，再交給 BI 工具進一步製作視覺化圖表。

---

## 補充說明

### 🔧 關鍵技術工具

| 工具名稱         | 功能描述                     | 適用情境                 |
|------------------|-----------------------------|--------------------------|
| Apache Airflow  | 工作流程編排                | 批次 ETL 處理            |
| Apache Kafka    | 分散式訊息佇列              | 即時流式處理             |
| Google BigQuery | 雲端大型分散式查詢工具      | 分析大型結構化/非結構化資料 |
| Snowflake       | 雲端型 Data Warehouse       | 儲存與高效查詢           |

### 📌 範例比較

以下比較兩種常見管道模型：

| 模型類型           | 特點                      | 使用場景                 |
|--------------------|--------------------------|--------------------------|
| 批次管道 Batch     | 每次集中運算大量數據      | 日報表生成               |
| 流式管道 Streaming  | 即時逐筆接收並快速轉換    | 即時事件監控             |

### 🧠 延伸／常見誤解  

1. 誤解：「ETL 和 Data Pipline 是同義詞。」
   
澄清：ETL 是實現 Data Pipline 中的一種技術方法，但不代表所有管道都必須採用 ETL。某些情況下 ELT（Extract, Load, Transform）也能達到相同效果。

2. 誤解：「Pipeline 僅適用於大規模數據。」

澄清：雖然大規模應用非常常見，但小型專案中也可以利用簡單的管道技術提高效率。例如，每日同步 CRM 系統中的客戶名單至內部報表系統，即使規模不大，也能受益於自動化流程設計。
