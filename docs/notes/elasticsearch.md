---
title: "Elasticsearch"
slug: "/notes/elasticsearch"
tags:
  - "Analytics"
  - "BigData"
  - "Engine"
  - "Indexing"
  - "Search"
---
## What？

**Elasticsearch** 是一個分散式的全文檢索與分析引擎，主要用於快速且高效地搜尋、分析大量的資料。它基於 **Apache Lucene** 架構，具備水平擴展能力（Horizontal Scalability），並且支援近即時（Near Real-Time, NRT）檢索。簡單來說，就是幫你在海量資料中快速找到需要的資訊，同時能進行各種統計與分析。

例如，你有大量的使用者行為紀錄，想要根據時間篩選出某個特定事件的頻率分佈，或是搜索某位使用者的操作記錄，這時就可以使用 Elasticsearch。

---

## Who？

- **後端工程師**：用來建構搜尋系統，例如電商網站商品搜索。
- **資料工程師**：處理大規模資料分析（例如日誌分析）。
- **DevOps 團隊**：透過日誌檢索快速定位問題。
- **資料科學家**：基於資料進行探索性分析。

舉例來說，如果你是開發一個線上購物平台，需要提供精準且快速的商品搜尋功能，那麼 Elasticsearch 是你的首選工具之一。

---

## When？

**什麼時間點會用到？**

- 當你的應用程式需要支援高效能的 [Full Text Search](/docs/notes/full-text-search)。
- 需要對非結構化或半結構化資料進行查詢，例如日誌文件。
- 當你需要對大量資料進行即時統計、聚合分析（Aggregation）。
  
比如說，在監控系統中，你可能需要即時追蹤伺服器錯誤數量並生成圖表，以了解系統健康狀況。

---

## Where？

**出現在架構哪個部分？**

Elasticsearch 通常作為應用系統中的 **搜尋層級（Search Layer）** 或 **分析層級（Analytics Layer）**。它可以被嵌入到以下場景：

- 與 MongoDB 或 MySQL 配合，用於補充強大的檢索功能。
- 作為 ELK Stack 的核心組件之一，負責處理由 Logstash 輸入及 Kibana 視覺化展示的資料。

例如，一個典型的架構可能包含：
1. Web 應用程式 → [Elasticsearch](/docs/notes/elasticsearch) 搜尋 API → 返回結果
2. ELK Stack → 分析伺服器日誌

---

## Why？

**解決什麼問題？**

Elasticsearch 的目的是解決以下幾類挑戰：
1. 快速搜尋大量非結構化資料：像是全文檢索或多字段匹配。
2. 支援複雜查詢語法：如布林邏輯、範圍查詢。
3. 集群伸縮性好：可以輕鬆新增節點來擴展容量。
4. 近即時更新功能：例如新增或修改文件後幾秒內即可完成索引更新。

舉例來說，如果你有10TB 的日誌文件要查找「特定錯誤碼」，傳統資料庫可能耗費數小時，但 Elasticsearch 能在幾秒內完成搜索並返回結果。

---

## How？

### 🛠️ 建立階段

1. 安裝與啟動：
   - 安裝 Elasticsearch，可以透過 Docker 或直接下載安裝包。
   - 啟動服務後，確認 API 狀態 `curl -X GET "localhost:9200"`

2. 資料準備：
   - 將原始文件轉成 JSON 格式。
   - 用 RESTful API 將 JSON 文件送至指定 Index 中，例如：
     ```bash
     curl -X POST "localhost:9200/my_index/_doc/1" -H 'Content-Type: application/json' -d'
     {
       "title": "學習 Elasticsearch",
       "content": "這是一篇技術教學文章。",
       "tags": ["技術", "搜尋"]
     }'
     ```

3. 索引設計：
   - 設定 Mapping，用以定義字段類型及分詞器。例如：
     ```bash
     curl -X PUT "localhost:9200/my_index" -H 'Content-Type: application/json' -d'
     {
       "mappings": {
         "properties": {
           "title": { "type": "text" },
           "content": { "type": "text" },
           "tags": { "type": "keyword" }
         }
       }
     }'
     ```

### 🔍 查詢階段

1. 簡單查詢範例：
   使用 Match Query 搜尋含有特定關鍵字的文件：
   ```bash
   curl -X GET "localhost:9200/my_index/_search" -H 'Content-Type: application/json' -d'
   {
     "_source": ["title", "tags"],
     "query": {
       "match": {
         "content": "技術"
       }
     }
   }'
   ```

2. 聚合查詢範例：
   使用 Aggregation 計算不同 tags 的分佈情況：
   ```bash
   curl -X GET 'localhost:9200/my_index/_search' -H 'Content-Type: application/json' -d'
   {
      "_source": false,
      "aggs" : {
          "tag_counts" : {
              "terms" : { 
                  "field" :  tags.keyword 
              }
          }
      }
    }'
    ```

3. 範圍查詢範例:
    查找某時間區間內產生的記錄:
    ```bash
    curl --request GET localhost:9200/my_index/_search \
    --header 'content-type: application/json' \
    --data '
	{
	    query:{
	    range:{
	       timestamp:{gte:"2023...",lte:"...."}
	    }}
	}'
	```
---

## 補充說明

### 🔧 關鍵技術工具

| 工具名稱        | 功能描述                      | 適合場景                    |
|-----------------|-----------------------------|---------------------------|
| Kibana          | 視覺化工具                   | 數據儀表板展示             |
| Logstash        | 日誌收集與解析工具            | 資料前處理                 |
| Beats           | 輕量型 Agent 模組            | 收集各種來源數據            |

### 📌 範例比較

以下是 Elasticsearch 與其他常見搜尋技術工具比較：

| 技術             | 特性                   | 適合場景                     |
|------------------|------------------------|-----------------------------|
| Elasticsearch    | 分散式、高效能          | 全文檢索、大規模數據分析      |
| Solr             | 高度可配置              | 結構化文檔管理               |
| Algolia          | 即時搜索、高速          | 小型應用快速部署             |

### 🧠 延伸／常見誤解

#### 誤解一：Elasticsearch 是傳統關聯式資料庫？
澄清：Elasticsearch 是專門設計用於全文檢索和大規模數據分析，不適合作為主存儲解決方案。它不支援 SQL-style JOIN 和事務控制，因此一般會搭配其他主存儲系統使用。

#### 誤解二：所有文字都能直接被搜索？
澄清：Elasticsearch 使用「分詞器」處理文字，因此如果你的文字包含特殊字符或語言屬性，需要正確配置分詞器才能達到預期效果。例如中文需要額外設定 `ik` 分詞插件。

#### 延伸應用:
除了基本搜索功能，還可以利用 Elastic Stack 實現實時監控、告警通知以及機器學習模型支持，例如異常偵測等場景。
