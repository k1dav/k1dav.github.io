---
title: "MLOps"
slug: "/notes/mlops"
tags:
  - "MachineLearning"
  - "Operations"
  - "DevOps"
  - "CI/CD"
  - "DataEngineering"
---
## What？
MLOps（Machine Learning Operations）是一套方法論和工具，用於在生產環境中高效管理[機器學習](/docs/notes/machine-learning)模型的生命週期。MLOps 結合了軟體工程、資料工程和 DevOps 的最佳實踐，涵蓋模型開發、訓練、評估、部署、監測和維護等階段。

MLOps 的核心目標是實現機器學習工作流的自動化和標準化。與傳統軟體開發不同，機器學習模型需要處理資料漂移、模型漂移和重新訓練的複雜性。MLOps 透過版本控制（模型和資料）、自動化測試、持續集成/持續部署（CI/CD）、和監測系統來解決這些挑戰。

實務中，MLOps 涉及構建 ML pipeline、[生成](/docs/notes/generation) feature store、設置模型管理系統、和建立監測告警。例如，推薦系統需要定期重新訓練模型以適應使用者行為變化，MLOps 框架自動化這個過程並確保線上服務穩定。

---

## Who？
- **ML 工程師** - 開發和優化機器學習模型
- **資料工程師** - 構建 ETL pipeline 和 feature engineering
- **DevOps 工程師** - 管理模型部署和基礎設施
- **資料科學家** - 進行實驗和模型研究
- **產品經理** - 定義模型性能指標和業務目標

---

## When？
1. **模型開發到生產** - 建立從實驗到線上服務的自動化流程
2. **模型監測** - 追蹤線上模型的精度、公平性和資源使用
3. **定期重新訓練** - 處理資料漂移和[模型漂移](/docs/notes/machine-learning)
4. **A/B 測試** - 比較新舊模型的實際效果

---

## Where？
1. **資料層** - 資料收集、[索引](/docs/notes/index-database)、特徵工程、資料驗證
2. **模型層** - 模型訓練、超參數調優、模型版本控制（MLflow、Weights & Biases）
3. **部署層** - 容器化（Docker）、Kubernetes 編排、模型服務（TensorFlow Serving、Seldon）
4. **監測層** - 效能監測、資料漂移檢測、告警系統

---

## Why？
**規模化挑戰** - 手動管理模型版本、資料版本、訓練任務不可擴展。MLOps 自動化解決重複性工作。

**生產可靠性** - 模型在生產環境會遭遇資料分佈變化，MLOps 監測系統及時發現問題。

**協作效率** - 資料科學家、工程師、運維人員需要統一的流程和工具整合。

---

## How？

### 🛠️ 建立階段
```python
# MLflow：模型實驗追蹤和版本管理
import mlflow
from sklearn.ensemble import RandomForestClassifier

mlflow.start_run()

# 記錄參數
mlflow.log_param("n_estimators", 100)
mlflow.log_param("max_depth", 10)

# 訓練模型
model = RandomForestClassifier(n_estimators=100, max_depth=10)
model.fit(X_train, y_train)

# 記錄指標
accuracy = model.score(X_test, y_test)
mlflow.log_metric("accuracy", accuracy)

# 記錄模型
mlflow.sklearn.log_model(model, "random_forest_model")

mlflow.end_run()
```

### 🔍 查詢階段
```python
# 載入已儲存的模型版本
import mlflow.sklearn

# 查詢特定實驗的最佳模型
best_run = mlflow.search_runs(
    filter_string="metrics.accuracy > 0.95"
).sort_values("metrics.accuracy", ascending=False).iloc[0]

# 載入並使用模型
model = mlflow.sklearn.load_model(f"runs:/{best_run.run_id}/model")
predictions = model.predict(X_new)
```

---

## 補充說明

### 📌 範例比較

| 階段 | 工具/框架 | 職責 | 關鍵指標 |
|------|----------|------|--------|
| 開發 | Jupyter、Scikit-learn | 實驗和原型化 | 準確度、F1 分數 |
| 版本控制 | MLflow、DVC | 模型和資料版本 | 可重現性 |
| 部署 | Docker、K8s | 模型服務化 | 延遲、吞吐量 |
| 監測 | Prometheus、Grafana | 線上性能追蹤 | 資料漂移、模型漂移 |

### 🧠 延伸／常見誤解
**誤解 1** - MLOps 就是模型部署。實際上，MLOps 涵蓋整個生命週期，部署只是其中一步。監測和重新訓練同樣重要。

**誤解 2** - 模型訓練完後工作就完成了。實際上，線上模型會遭遇資料分佈變化（資料漂移），需要定期重新訓練和評估。MLOps 的核心是自動化和監測這個持續迴圈。
