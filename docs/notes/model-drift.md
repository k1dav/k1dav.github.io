---
title: "Model Drift"
slug: "/notes/model-drift"
tags:
  - "AI"
  - "MachineLearning"
  - "Model"
  - "Performance"
---
## What？

**Model Drift** 是指機器學習模型在部署後，由於環境或資料分佈的變化，導致模型性能下降的現象。簡單來說，當模型訓練時所依據的資料分佈與部署後實際遇到的資料分佈有差異時，模型可能無法再準確預測。

舉個例子，假如我們建立了一個商品推薦系統，在訓練階段使用的是去年消費者購買行為的資料，但今年流行趨勢改變，消費者偏好完全不同，那麼推薦系統可能就會失效。這種情況就屬於 Model Drift。

---

## Who？

Model Drift 的影響範圍包括以下幾類技術工作者：

1. **Data Scientists**：需要密切關注模型性能是否因資料分佈變化而下降。
2. **Machine Learning Engineers**：負責監控、維護及更新模型以適應新環境。
3. **Business Analysts**：依賴模型產出的結果制定策略，因此受 Model Drift 影響可能導致決策錯誤。

例如，金融業的風險評估團隊若未注意到 Model Drift，可能會忽視新型詐欺手法，進而造成損失。

---

## When？

Model Drift 主要出現在以下時間點：

1. **部署後長期運行期間**：隨著時間推移，真實世界中的資料分佈逐漸與訓練時期不同。
2. **環境或市場劇烈變動時**：例如季節性需求、政策更動或突發事件（如 COVID-19）。
3. **新增或修改 [Data Pipeline](/docs/notes/data-pipeline) 時**：當新的資料來源加入或清理流程更改，有可能導致非預期的分佈差異。

以 e-commerce 平台為例，每逢大促銷活動（如黑色星期五），用戶行為模式會發生明顯改變，此時容易引發 Model Drift 問題。

---

## Where？

Model Drift 通常出現在整個機器學習架構中的以下部分：

1. **[Inference](/docs/notes/inference) Pipeline（推論管道）**：主要影響模型預測結果。
2. **Monitoring System（監控系統）**：用來追蹤模型性能指標，如 [Accuracy](/docs/notes/accuracy) 或 [F1 Score](/docs/notes/f1-score)。
3. **Data Pipeline（數據管道）**：輸入給模型的資料來源若有異動，也可能成因之一。

例如，在金融交易風險偵測系統中，如果輸入給模型的新交易資料中包含未曾見過的大量欺詐模式，就會引發 Model Drift 的問題。

---

## Why？

Model Drift 是一個需要被解決的重要問題，其原因包括：

1. **確保預測準確性**：
   模型若無法反映現實世界狀況，其結果將不具備參考價值。例如，醫療診斷系統若遇到疾病樣本特徵變化而不更新，就會錯失早期診斷機會。
   
2. **維護商業利益與信任度**：
   使用者期待穩定且可靠的服務，而 Model Drift 直接影響產品品質。例如，自駕車系統中物件辨識失準可能導致安全事故。
   
3. **降低成本與風險**：
   提前偵測並修復 Model Drift，可以避免因誤判引發後續高額修復成本或商業損失。

---

## How？

### 🛠️ 建立階段

建立階段主要是針對如何設計機制來提前減少或防範 Model Drift 的影響。以下是一些常見流程：

1. 設計一套基準評估標準，用於對比訓練集和實際輸入資料之間的分佈差異（如使用 KL Divergence 或 PSI 指標）。
2. 使用 Data Augmentation 技術擴充訓練集，以模擬潛在未來情境。
3. 部署多版本模型進行 A/B Testing，以便提前驗證新資料與舊模型之間是否匹配。

程式邏輯範例：
```python
from sklearn.metrics import accuracy_score

# 訓練初始基準
baseline_model = train_model(training_data)
baseline_accuracy = accuracy_score(validation_data, baseline_model.predict(validation_data))

# 模擬新場景
new_data_simulation = augment_data(training_data)
new_model = train_model(new_data_simulation)
simulation_accuracy = accuracy_score(validation_data, new_model.predict(validation_data))

# 對比基準
if simulation_accuracy < baseline_accuracy:
    print("Potential drift detected, consider retraining.")
```

### 🔍 查詢階段

查詢階段重點在於如何定期檢查並解決已經出現的 Model Drift。以下是常見步驟：

1. 定期收集最新輸入數據並比較其特徵分佈與原始訓練集之間是否有顯著差異。
2. 設置自動化監控系統，例如使用 [MLOps](/docs/notes/mlops) 工具追蹤重要指標如 RMSE 或 ROC-AUC。
3. 根據性能下降情形決定是微調原始權重還是重新訓練完整的新版本模型。

程式邏輯範例：
```python
import pandas as pd
from scipy.stats import ks_2samp

# 原始特徵分布
original_feature_distribution = training_data["feature_column"]

# 最新輸入數據特徵
current_feature_distribution = inference_pipeline.get_latest_features("feature_column")

# KS-Test 驗證分布差異
ks_statistic, p_value = ks_2samp(original_feature_distribution, current_feature_distribution)

if p_value < 0.05:  # 顯著差異存在
    print("Drift detected! Consider updating the model.")
```

---

## 補充說明

### 📌 範例比較

假設有兩個不同方法應對同樣的一組 drift 資料情境：

| 方法                | 性能表現（Accuracy）             | 處理速度                  |
|---------------------|----------------------------------|---------------------------|
| 微調原始權重         | 87%                             | 快速                      |
| 完全重新訓練         | 92%                             | 時間耗費                  |

微調權重適合小幅度 drift，而重新訓練則適合大規模 drift 情境，但需投入更多資源。

### 🧠 延伸／常見誤解

- 誤解：“只要定期清理數據，就不會有 drift 問題。”
   - 澄清：即使清理了舊數據，新環境中的未知因素仍能引發 drift，因此需結合監控和回溯策略來全面應對。
   
- 誤解：“只要提高 Accuracy 就能避免 drift。”
   - 澄清：Accuracy 無法反映所有問題，例如某些特徵重要性改變下即使 [Accuracy](/docs/notes/accuracy) 高也可能仍然產生錯誤結果。需搭配多種指標綜合分析，如 Precision、Recall 等等。
