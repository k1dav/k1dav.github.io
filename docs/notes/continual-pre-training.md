---
title: "Continual Pre-training"
slug: "/notes/continual-pre-training"
tags:
  - "AI"
  - "NLP"
  - "機器學習"
---
## What？

持續預訓練（Continual Pretraining）是一種在 **NLP**（自然語言處理）模型訓練流程中使用的技術。它指的是在原模型已經完成初始預訓練後，為了針對特定任務或領域進行適應性增強，而額外進行的第二階段或多階段的預訓練。這能幫助模型更高效地理解特定領域資料，並提升下游任務的表現。

舉個例子，如果你有一個基於 **Transformer** 的語言模型，它最初是在通用語料庫（如 **Wikipedia** 或 **Common Crawl**）上進行預訓練。但當你想針對醫療文本進行應用時，可以透過持續預訓練讓模型專注於該領域內容，提升其專業性。

---

## Who？

持續預訓練主要由以下族群使用：

1. **研究人員**：需要探索如何讓模型在特定場景中表現更佳，或是開發新技術。
2. **工程師／開發者**：在應用層面希望提升既有模型的效能。
3. **企業數據科學家**：利用此技術打造符合企業需求的客製化解決方案，例如金融、醫療等專業領域。

受影響的通常是使用者端，因為更精準的語言處理結果可直接改善產品體驗。例如，醫療診斷系統中的文字輸入欄位會因為持續預訓練而提供更準確建議。

---

## When？

持續預訓練通常會在以下情境中被使用：

- 當原始模型無法有效理解特定領域資料。
- 在需要進一步縮短下游任務微調時間時。
- 當目標任務所需資料量較少，但目標領域資料可以用來輔助強化。
- 在希望避免重新從零開始建模（從頭開始）的情況下。

例如，你可能已經有一個通用 GPT 模型，但需要在法律文書解析上達到高準確度，可以先對法律相關文本執行持續預訓練，再進行微調。

---

## Where？

這項技術通常出現在以下架構部分：

1. **Pretraining Pipeline**：原始大規模語言模型完成第一階段後接入此流程。
2. **Fine-tuning Workflow 前置步驟**：作為下游微調前的一次額外強化。
3. 部署於自訂平台或客製化應用之前，用來優化基礎性能。

例如，在 Hugging Face 中，你可以透過 `transformers` 庫將通用 BERT 模型進一步以特定語料庫做持續預訓練。

---

## Why？

持續預訓練解決了以下問題：

1. 提升模型對特定領域的理解能力。例如原始模型可能無法抓住法律、醫療等專業術語及上下文邏輯，但經過持續預訓練後能顯著改善。
2. 降低微調所需時間與資源。若直接對下游任務做微調，可能需要更多 epoch 和大量專家標記資料；但透過持續預訓練，可以減輕這些負擔。
3. 增加小樣本場景中的表現穩定性。在某些資料稀缺情境中，這是一種有效提升性能的方法。

簡單比喻，它就像給一位通才型員工做「短期密集專業培訓」，以便他快速適應新工作環境。

---

## How？

### 🛠️ 建立階段

建立階段主要包括以下步驟：

1. 準備目標領域資料集：
   - 確保資料品質高且具有代表性，例如選擇醫學期刊文章作為醫療領域文本來源。
   - 清理與格式化資料，使其符合原始模型要求（如 tokenization）。

2. 設置初始模型：
   - 載入已完成通用語料庫初步預訓練的大型語言模型，例如 BERT 或 GPT 系列。
   - 使用工具如 Hugging Face 的 `AutoModel` 來快速載入基礎架構。

1. 執行額外預訓練：
   - 使用多層 [Transformer](/docs/notes/transformer) 架構，同時注意控制 Learning Rate 與 [Dropout](/docs/notes/dropout) 參數以避免 [Overfitting](/docs/notes/overfitting)。
   - 程式碼：
     ```python
     from transformers import AutoModelForMaskedLM, AutoTokenizer, Trainer, TrainingArguments

     model = AutoModelForMaskedLM.from_pretrained("bert-base-uncased")
     tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")

     train_dataset = ... # 領域文本數據處理
     training_args = TrainingArguments(
         output_dir="./results",
         learning_rate=5e-5,
         num_train_epochs=3,
         per_device_train_batch_size=16,
         save_steps=10_000,
     )

     trainer = Trainer(
         model=model,
         args=training_args,
         train_dataset=train_dataset
     )

     trainer.train()
     ```

4. 保存更新後的權重

### 🔍 查詢階段

查詢階段主要是應用經過持續預訓練改良後的模型來執行具體任務：

1. 載入強化版權重：
   - 使用 `.from_pretrained()` 方法載入最新版本權重，例如：
     ```python
     model = AutoModelForSequenceClassification.from_pretrained("./domain-specific-model")
     ```

2. 執行推論／查詢流程：
   - 將目標文本轉換為 tokens 後送入改良版模型進行解析。例如，在法律文件中標記關鍵條款位置或判斷文件類型。

3. 優化結果呈現：
   - 結合目標場景需求生成最終輸出，例如分類結果或摘要內容展示給使用者端介面。

---

## 補充說明

### 📌 範例比較

以下範例展示了未經 vs 經過 持續預訓練後，在醫藥領域分類任務上的表示差異：

| 模型版本       | 準確率 | F1 分數 |
| ---------- | --- | ----- |
| 通用 BERT    | 84% | 0.78  |
| 持續預訓練 BERT | 92% | 0.87  |

結論：經過持續預訓練後，對醫藥領域分類任務準確度上升，同時減少錯誤分類率。

### 🧠 延伸／常見誤解

#### 誤解：是不是只要加更多資料就一定更好？
不完全正確。追加的大量非相關性資訊反而可能干擾核心邏輯，因此需謹慎選擇高品質且具代表性的資料集。
