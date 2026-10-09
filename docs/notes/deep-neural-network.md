---
title: "Deep Neural Network"
slug: "/notes/deep-neural-network"
tags:
  - "AI"
  - "機器學習"
  - "深度學習"
---
## What？

深層神經網路（Deep Neural Network, DNN）是一種基於[人工神經網路](/docs/notes/artificial-neural-network)（Artificial Neural Network, ANN）的進階模型，透過多層結構模擬人類大腦的運算方式，用來解決複雜的非線性問題。簡單來說，它是一種能從大量數據中自動學習特徵並進行推論的技術。

在實務上，若你正在處理像是影像分類、語音辨識或自然語言處理（Natural Language Processing, [NLP](/docs/notes/nlp)）等高維度且需要高度精確性的任務，DNN 是你的好幫手。例如，用它可以將一堆混亂的手寫數字圖片整理成清楚的數字辨識結果。

---

## Who？

DNN 的主要使用者包括資料科學家、AI 工程師以及任何需要開發智能系統的人。對於企業來說，它也影響到了產品經理、業務分析師，甚至是終端用戶。

舉個例子：資料科學家可能會用 DNN 來建構一個推薦系統；而業務分析師則透過該模型輸出的結果，為市場策略提供支持；最終用戶則享受更精準的推薦服務。

---

## When？

以下幾種情況特別適合使用 DNN：
1. 當資料量龐大且結構複雜，例如影像或語音。
2. 當問題涉及高維度特徵，例如自然語言中的 [Word2Vec](/docs/notes/word2vec)。
3. 當需要非常高準確率，例如醫療診斷中的癌症檢測。
4. 當傳統方法無法有效解決非線性問題。

例如，你有數百萬筆顧客購買行為記錄，希望預測未來購買傾向，那就適合使用 DNN 進行建模。

---

## Where？

在技術架構中，DNN 通常出現在以下部分：
1. **數據處理流程**：作為最核心的模型訓練部分。
2. **前端應用**：如手機上的即時語音轉文字功能。
3. **後端服務**：例如影片推薦系統中的推理引擎。
4. **邊緣設備**：如 IoT 裝置內建的物件辨識功能。

總結來說，它既能部署在雲端，也能嵌入到邊緣計算設備中進行運算。

---

## Why？

深層神經網路主要解決的是「如何從龐大且複雜的數據中提取有意義資訊」這個問題。相比傳統機器學習演算法，它具有以下優勢：
1. **自動化[特徵](/docs/notes/features)提取**：不需要人工定義特徵。
2. **處理非線性問題能力強**：例如多重交互效應或隱藏模式。
3. **高度可擴展性**：可以利用更多計算資源提升性能。

例如，在影像辨識任務中，人眼看到的是像素點，而 DNN 則能從這些點中抽象出「形狀」、「紋理」等高階特徵。

---

## How？

### 🛠️ 建立階段

建立 DNN 的流程通常分成以下步驟：

1. **收集與準備資料集**：
   - 確保資料量充足且標籤完整，例如 MNIST 手寫數字資料集。
   
2. **設計模型架構**：
   - 決定層數與每層神經元數目（Hidden Layers），並選擇[Activation Function](/docs/notes/activation-function)。
   - 常見架構包含 Fully Connected Layer 或 Convolutional Layer 等。

1. **選擇損失函數與優化器（[Loss Function](/docs/notes/loss-function) & [Optimizer](/docs/notes/optimizer)）**：
   - Loss Function如 Cross-Entropy Loss；優化器如 Adam 或 SGD（Stochastic Gradient Descent）。

4. **訓練模型**：
   - 使用 [Back Propagation](/docs/notes/back-propagation) 演算法更新權重值。
   - 設定訓練參數，如 Epochs 和 Batch Size，透過 GPU 加速運算提升效率。

1. **驗證與調整[超參數](/docs/notes/hyperparameters)（Hyperparameter Tuning）**：
   - 調整 Learning Rate 或 [Dropout](/docs/notes/dropout) Rate 等參數以獲得最佳效果。

### 🔍 查詢階段

查詢流程則偏重於模型推論部分：

1. 接收輸入資料，例如一張圖片或一句話。
2. 經過已訓練好的 DNN 模型逐層運算，提取特徵並生成結果。
3. 根據指定用途返回結果，例如分類標籤、預測值或生成內容。

舉例：「輸入一張貓咪照片」，模型會通過多層網路運算後輸出「Cat」這個標籤。同時可提供信心分值，如 95%。

---

## 補充說明

### 📌 範例比較

| 技術                 | 優勢                          | 劣勢                      |
|----------------------|-------------------------------|---------------------------|
| 傳統機器學習         | 計算資源需求低                | 難以捕捉非線性關係        |
| 深層神經網路         | 高精度、自動化特徵提取        | 訓練時間長、需大量資料    |

### 🧠 延伸／常見誤解

- 誤解：「更多層一定更好」
  澄清：太多層可能導致過擬合或梯度消失，需要根據具體需求調整架構深度。（可以考慮加入 Batch Normalization 或 Residual Connection）

- 誤解：「只有大公司才能用」
  澄清：現在許多開源框架使得小型團隊也能輕鬆使用 DNN，只需一台 GPU 就足夠完成基本任務。此外，也可以使用雲端平台進行訓練和部署，如 Google Colab 或 AWS SageMaker。
