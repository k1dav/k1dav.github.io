---
title: "Apache Airflow"
slug: "/notes/apache-airflow"
tags:
  - "Data"
  - "ETL"
  - "Engineering"
  - "Workflow"
  - "orchestration"
---
## What？

**Apache Airflow 是什麼？**

Apache Airflow 是一個開源的 Workflow Orchestration 平台，專門用來設計、排程以及監控複雜的資料處理 Pipeline。簡單來說，它就像一個「指揮家」，負責協調各種任務（Tasks）依照指定的順序執行，並且可以靈活地管理依賴關係。

假如你的工作需要每天處理大量 [ETL](/docs/notes/etl) （Extract, Transform, Load）的資料流程，例如：先從資料庫抽取資料，再進行清洗，最後存入 Data Warehouse。這些步驟可能會互相依賴，並且需要定期執行。使用 Apache Airflow，你可以輕鬆定義這些流程，並確保每個步驟都按照規劃執行。

---

## Who？

**誰會使用 Apache Airflow？**

主要使用者包括：

1. **資料工程師（Data Engineers）：** 他們經常要設計和管理大型的資料 Pipeline。
2. **機器學習工程師（ML Engineers）：** 用於自動化模型訓練、測試和部署流程。
3. **運維工程師（Ops Engineers）：** 負責監控系統流程是否正常運作。
4. **技術架構師（Technical Architects）：** 用來設計跨系統的工作流。

舉例來說，一位資料工程師可能需要設定每天凌晨執行 ETL 流程，而機器學習工程師則可以利用 Airflow 排程模型訓練工作，每週生成最新預測結果。

---

## When？

**什麼時間點會用到 Apache Airflow？**

你通常會在以下情境中使用 Apache Airflow：
1. **定期任務：** 例如每日更新 BI 報表所需的資料。
2. **事件觸發型任務：** 當某個檔案上傳到 S3 時，自動啟動後續處理流程。
3. **依賴型任務：** 例如完成第一階段數據清洗後才能啟動第二階段分析。
4. **多系統整合：** 在多個工具之間建立流暢的工作流，例如 Spark 和 PostgreSQL 配合使用。

---

## Where？

**Apache Airflow 出現在架構哪個部分？**

Airflow 通常位於系統架構中的「中間層」，負責協調各種外部服務或內部模組。例如：

- 在 Data Pipeline 中，它與資料來源（如 MySQL、S3）及目標儲存區（如 BigQuery、Redshift）互動。
- 在 ML Pipeline 中，它串接模型訓練模組與部署模組。

以下是一個典型架構示意：
```
[S3 資料來源] -> [Apache Airflow] -> [Spark 處理] -> [Redshift 儲存]
```

---

## Why？

**為什麼需要 Apache Airflow？它解決了什麼問題？**

主要解決三大問題：
1. **可視化監控：** 提供 Web UI，可即時查看每個任務的狀態，例如成功、失敗或正在執行中。
2. **管理依賴性：** 輕鬆定義多步驟流程，以及每個步驟之間如何相互連結。
3. **彈性排程：** 支援基於時間或事件觸發的排程邏輯，滿足不同業務需求。

舉例來說，如果你需要每天早上 6 點更新報表，但某些前置作業可能延遲完成，你可以利用依賴性設定讓報表更新程序自動等候前置作業完成後再開始。

---

## How？

### 🛠️ 建立階段

建立 Workflow 的基本流程如下：
1. 安裝 Apache Airflow 並初始化 Metadata Database：
   ```bash
   pip install apache-airflow
   airflow db init
   ```
2. 定義 DAG （Directed Acyclic Graph），描述工作的結構與邏輯：
   ```python
   from airflow import DAG
   from airflow.operators.dummy import DummyOperator

   with DAG("my_first_dag", schedule_interval="0 6 * * *") as dag:
       start_task = DummyOperator(task_id="start")
       end_task = DummyOperator(task_id="end")

       start_task >> end_task
   ```
3. 設定排程與依賴性：
    - 使用 `schedule_interval` 設定時間頻率，如每日凌晨六點 `0 6 * * *`。
    - 使用 `>>` 或 `<<` 定義任務之間的順序關係。

4. 啟動 Scheduler 和 Web Server 進行監控：
   ```bash
   airflow scheduler &
   airflow webserver &
   ```

### 🔍 查詢階段

查詢 Workflow 的狀態及結果通常透過 Web UI 或 CLI 完成：
1. Web UI 操作：
    - 登入後可視化查看 DAG 的運行情況，包括每個 Task 是否成功或失敗。
2. CLI 操作範例：
    - 列出目前所有 DAGs:
      ```bash
      airflow dags list
      ```
    - 手動觸發某個 DAG:
      ```bash
      airflow dags trigger my_first_dag
      ```

---

## 補充說明

### 📌 範例比較

以下是不同 Workflow Orchestration 工具比較：

| 功能               | Apache Airflow | Luigi           | Prefect         |
|-------------------|---------------|-----------------|----------------|
| 可視化界面         | ✅            | ❌              | ✅             |
| 彈性排程           | ✅            | ✅              | ✅             |
| 分散式支持         | ✅            | 部分支持        | ✅             |

### 🧠 延伸／常見誤解

#### 常見誤解 1: 「Airflow 適合即時處理」
實際上，Airflow 更適合批次處理而非即時處理。如果你的需求是低延遲、高即時性的工作流，可以考慮 Kafka 或 Spark Streaming。

#### 常見誤解 2: 「DAG 可以改變形狀」
DAG 是靜態定義的，不支援在執行期間根據條件改變結構。如果需要更高靈活度，可以在 Python 程式碼中加入條件判斷，但要遵守 DAG 架構不變原則。
