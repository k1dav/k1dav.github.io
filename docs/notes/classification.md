---
title: "Classification"
slug: "/notes/classification"
tags:
  - "AI"
  - "MachineLearning"
  - "DataScience"
---
## What？

**Classification** 是一種常見的[機器學習](/docs/notes/machine-learning)技術，用於將資料分配到特定的類別中。簡單來說，目標是透過模型預測輸入資料屬於哪一個預定的類別，例如判斷電子郵件是否為垃圾信（Spam 或 Not Spam），或是辨識圖片中的物件類型。

在實務上， **Classification** 通常應用於需要進行決策或篩選的場景，例如醫療診斷（判斷疾病種類）、客戶分群（區分高價值客戶與普通客戶）等。它能幫助我們快速且準確地處理大量資料，節省人力並提升效率。

---

## Who？

這項技術主要由以下族群使用或受影響：

- **資料科學家（Data Scientists）：** 他們利用 Classification 模型來分析資料並建立預測系統。
- **軟體工程師（Software Engineers）：** 在應用程式中整合 Classification 模型以完成特定功能。
- **企業分析師（Business Analysts）：** 從模型結果中獲取洞察，支援商業決策。
- **最終使用者：** 比如使用垃圾信過濾器、推薦系統等工具的人。

例如，電商平台上的推薦系統會根據商品分類和用戶喜好提供建議，影響最終消費者的購物選擇。

---

## When？

以下是一些常見的使用時機：

- 當需要對大量未標記資料進行篩選，例如垃圾信檢測。
- 在即時性要求高的場景，如利用即時影像進行交通號誌辨識。
- 針對已知類別進行分類任務，例如醫療領域中的病理切片分類，用以輔助診斷。

舉例來說：在金融服務中，當用戶申請貸款時，可透過模型預測該用戶是否屬於高風險群，以便調整授信策略。

---

## Where？

在系統架構中， **Classification** 通常出現在以下部分：

1. **[資料前處理](/docs/notes/data-preprocessing)階段：** 清理、標準化輸入資料，以方便後續模型訓練。
2. **機器學習模型層：** 使用演算法，如 [Logistic Regression](/docs/notes/logistic-regression)、[Random Forest](/docs/notes/random-forest) 或 [Artificial Neural Network](/docs/notes/artificial-neural-network) 建立分類模型。
3. **應用層：** 部署模型以供前端或其他服務調用，例如 [RESTful API](/docs/notes/restful) 提供分類結果。

例如，在電子商務網站上，商品分類功能可能涉及後端服務中的 Classification 模型，而前端則展示經過分類整理後的商品頁面。

---

## Why？

Classification 的主要目的是解決「如何有效地將輸入資料分配到正確類別」這個問題。對比其他方法（例如 Clustering），它適合處理已知類別且有清楚標籤的情境。 

具體來說，它能幫助我們：
1. 節省人工篩選成本。例如，自動化垃圾郵件過濾減少人工審核工作量。
2. 增強決策精準度。例如，在醫療影像中自動區分腫瘤良性與惡性，提高診斷效率和準確度。
3. 提升產品或服務質量。例如，透過訊息內容分類提供更精準的推薦通知。

---

## How？

### 🛠️ 建立階段

建立 Classification 模型通常包含以下步驟：

1. **收集並標籤訓練資料：**
   - 確保數據有足夠多樣性與代表性，例如收集各種格式和語言的電子郵件樣本來訓練垃圾信檢測模型。

2. **資料前處理：**
   - 清洗缺失值、去除異常值以及特徵工程。例如文字轉換為數值向量，可採用 [TF-IDF](/docs/notes/tf-idf) 或 [Word2Vec](/docs/notes/word2vec) 技術。

3. **選擇演算法並訓練模型：**
   - 如 Logistic Regression 適合線性可分問題，而 Neural Networks 則適合複雜非線性問題。

4. **評估及調參：**
   - 利用指標如 [Accuracy](/docs/notes/accuracy)、[Precision](/docs/notes/precision)、[Recall](/docs/notes/recall) 和 [F1 Score](/docs/notes/f1-score) 評估模型效能，再根據結果微調參數提高表現。

5. **部署模型至伺服器或雲端環境：**
   - 使用工具如 Docker 容器化模型，使其可被其他應用程式存取和調用。

### 🔍 查詢階段

查詢階段則是將新輸入送入已訓練好的模式以獲得分類結果：

1. 接收新輸入資料，比如一封未讀電子郵件。
2. 對輸入進行同樣的前處理，比如文字轉換為[向量](/docs/notes/embedding)表示形式。
3. 調用已部署好的 Classification 模型進行[推論](/docs/notes/inference)（Inference）。
4. 返回預測結果，例如 "Spam" 或 "Not Spam" 並觸發相應操作，比如移動至垃圾郵件夾。

---

## 補充說明

### 📌 範例比較

以下是不同演算法在某文本分類任務上的比較示例：

| 演算法                     | Accuracy | Precision | Recall |
| ----------------------- | -------- | --------- | ------ |
| Logistic Regression     | 85%      | 82%       | 87%    |
| Random Forest           | 88%      | 85%       | 89%    |
| [Deep Neural Network](/docs/notes/deep-neural-network) | 92%      | 90%       | 93%    |

由表格可見，深度學習方法通常表現最佳，但也需要更多運算資源支持。

### 🧠 延伸／常見誤解

#### 誤解一：「所有問題都適合使用 Classification」
澄清：只有當你的問題可以清楚劃分成有限且固定的類別時才適合使用 Classification。如果目標是不固定、有無限可能，比如生成新文本內容，那就需要考慮 Generative Models 而非 Classification 方法。

#### 誤解二：「Accuracy 高代表模型好」
澄清： Accuracy 雖然重要，但不總是反映真實效能。在某些平衡程度低的場景下，需要結合 Precision 和 Recall 等指標全面評估性能。例如在醫療診斷中，即使 Accuracy 高，但 Recall 太低可能導致漏診情況發生，因此須特別注意指標選擇方式。
