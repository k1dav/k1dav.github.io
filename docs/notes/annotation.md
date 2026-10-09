---
title: "Annotation"
slug: "/notes/annotation"
tags:
  - "NLP"
  - "Data"
  - "Processing"
---
## What？

**Annotation** 是什麼？  
Annotation 指的是在資料中添加額外的標記或註解，以便於後續的分析、分類或模型訓練。這些標記通常是根據特定的需求，像是識別物件、標示情感傾向、斷句等，透過人工或自動方式完成。舉例來說，在影像辨識中，我們可能會用 Annotation 標記出影像中的主要物件（例如：車子、人臉），而在自然語言處理 ([NLP](/docs/notes/nlp)) 中，則可能對文字加上語意標籤。

---

## Who？

**誰使用、誰受影響？**  
Annotation 的使用者通常是需要建構資料集的技術工作者，如資料科學家 (Data Scientists)、機器學習工程師 (Machine Learning Engineers)、以及研究人員。此外，標註平台上的操作人員（如 Data Annotators）也扮演重要角色。受影響的部分則包括模型效能與準確性——因為 Annotation 的品質直接影響訓練模型的結果。

---

## When？

**什麼時間點會用到？**  
通常在以下情境中需要 Annotation：  
1. **模型開發初期**：當需要建立高品質的訓練資料集時，會先進行大規模的資料標注。
2. **模型微調階段**：針對特定應用場景進行精細化標注，以提升模型表現。
3. **評估階段**：透過已標記好的測試資料來驗證模型效能。

例如，在開發一個垃圾郵件過濾器之前，需要先對大量郵件進行 "垃圾" 或 "非垃圾" 的 Annotation。

---

## Where？

**出現在架構哪個部分？**  
Annotation 通常屬於數據處理流程中的一部分，它可以被視為數據預處理 (Data Preprocessing) 的一環。在整體架構中，它一般出現在以下位置：
1. **原始數據收集後**：將未處理數據轉化為含有附加資訊的可用數據。
2. **輸入至機器學習模型前**：提供清晰且有結構化的特徵給模型進行訓練或推論。

以 NLP 為例，文本經過 Tokenization 和 Normalization 後，就可以進行 Annotation 加入 POS tags 或 Named Entity Recognition 標籤。

---

## Why？

**解決什麼問題？**
Annotation 是提升機器學習系統效能的一個重要步驟。它解決了以下問題：
1. **結構化未整理數據資料：許多原始數據是混亂且無法直接使用的，而 Annotation 可以將它轉換成有意義且可操作的信息。
2. **支援監督式學習 (Supervised Learning)**：[Supervised Fine-Tuning](/docs/notes/supervised-fine-tuning)需要已知答案（Label）的資料作為基礎，這些答案就是透過 Annotation 來提供的。
3. **提高分析與分類準確性**：良好的標注可以幫助系統更精確地理解並分類不同類型的信息。

舉例來說，如果想要讓 AI 辨識照片中的貓，那就需要先用 Annotation 標記大量「包含貓」和「不包含貓」的圖片給系統學習。

---

## How？

### 🛠️ 建立階段  
建立 Annotation 的流程通常如下：
1. **收集原始數據**：例如圖片、文字或音訊檔案。
2. **定義標注規範與範疇 (Annotation Guidelines)**：明確要標記哪些資訊，例如情感分類（正面/負面）或物件邊界框 (Bounding Box)。
3. **選擇工具平台進行操作**：使用專業工具（如 LabelImg 或 Prodigy）。
4. **人工/半自動執行標注任務**：
   - 人工模式下，由 Data Annotators 單獨完成每項任務。
   - 半自動模式下，可利用預測算法生成初步結果，再由人工校正。
1. **品質檢查與迭代修正 (Quality Check)**：多次驗證以保證正確性和一致性。

### 🔍 查詢階段  
當資料被註解完成後，可通過以下方式查詢資訊：
1. 使用 SQL 或 NoSQL 系統檢索已經被儲存好的結構化檔案。例如查詢某類型情感分析結果：「SELECT * FROM annotated_data WHERE label = 'positive'。」
2. 利用程式語言（如 Python）載入並解析已存儲好的 JSON 格式文件，例如：
   ```python
   import json
   with open("annotated_data.json", "r") as file:
       data = json.load(file)
       positive_samples = [d for d in data if d['label'] == 'positive']
   ```

---

## 補充說明  

### 📌 範例比較  

以下展示不同種類技術下經典範例：

| 技術領域            | 範例                                  |
| --------------- | ----------------------------------- |
| NLP             | 對新聞文章添加情感傾向 ("Positive"/"Negative") |
| Computer Vision | 在街景圖像上增加車輛 Bounding Box             |

### 🧠 延伸／常見誤解  

#### 誤解 1: 「所有資料都需要人工完全手動 Annotate」
事實上，有些簡單任務可以由預先訓練好的模型生成初步結果，再由人工校正，大幅降低工作量。例如使用 YOLO 模型生成物件邊界框，再進一步微調。

#### 誤解 2: 「只需一次 Annotate 就足夠」
其實很多應用場景需要反覆迭代，例如新增更多樣本或修正錯誤。定期更新和重新檢查是提高質量的重要方法。
