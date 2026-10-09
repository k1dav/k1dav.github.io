---
title: "Few-shot"
slug: "/notes/few-shot"
tags:
  - "AI"
  - "NLP"
  - "MachineLearning"
  - "DeepLearning"
---
## What？

Few-shot 是一種機器學習技術，旨在讓模型在僅有少量訓練資料（通常是少於 10 筆）時，依然能夠有效地進行預測或分類。與傳統需要大量資料來訓練的方式不同，Few-shot 更注重模型的泛化能力和對新類別的快速適應。

舉例來說，假設你要建立一個圖像分類模型，但某些類別的照片因為稀有性而難以搜集足夠多的資料。在這種情況下，透過 Few-shot，你可以用極少數幾張照片（如 5 張）訓練模型，使其能準確辨識該類別。

---

## Who？

Few-shot 的主要使用者包括：

- **研究人員**：當研究新興領域（例如罕見疾病、特殊物種等），可用於處理有限樣本。
- **企業工程師**：特定商業場景中，例如客製化產品推薦系統或小型專案中的快速分類需求。
- **資料科學家**：用於解決資料不平衡問題，尤其是長尾分布的情境。

同時，它也會影響以下群體：

- **終端使用者**：提升基於 AI 模型的應用準確度，例如智慧客服能更好理解稀有問題。
- **產品開發者**：減少模型開發時間和成本。

---

## When？

Few-shot 通常會在以下時機被採用：

1. **資料不足時**：當目標類別只有少量訓練資料，例如新產品推出時缺乏歷史數據。
2. **快速部署需求時**：需要在短時間內建立可運作的模型，例如緊急事件中的識別系統。
3. **動態更新場景中**：例如持續新增新類別的應用（如多語言意圖檢測），不可能每次都重新收集大量樣本。

---

## Where？

Few-shot 通常出現在以下架構或技術流程中：

1. **Meta-learning 系統**：利用元學習方法，使模型能從少量樣本提取高效知識。
2. **Pre-trained models + [Fine-Tuning](/docs/notes/fine-tune) 流程**：基於預訓練的大型模型（如 GPT 或 BERT），針對小樣本進行微調。
3. **Embedding-based 方法**：透過生成[Embedding](/docs/notes/embedding)，用相似度比較完成分類或查詢，如 Siamese networks 或 Prototypical networks。

---

## Why？

Few-shot learning 的主要目的是解決「資料稀缺」和「高成本」問題。傳統機器學習需要大量標註資料，而這些[標記](/docs/notes/annotation)可能耗費時間、人力甚至金錢。此外，在一些特殊場景中，大量收集目標類別的資料可能根本不可行，例如研究罕見疾病或分析太空影像。

具體來說，它帶來了以下好處：
1. 減少對大規模標記資料的依賴，因此節省成本。
2. 快速適應新環境或新類別，提高系統靈活性。
3. 提供長尾分布場景中的可靠解決方案，避免忽略低頻訊息。

---

## How？

### 🛠️ 建立階段

實現 Few-shot learning 的建立流程通常如下：

1. 準備一個大型預訓練模型，例如 [ResNet](/docs/notes/resnet)、GPT 等，用於初步特徵提取。
2. 設計 Meta-learning 框架，如 [Model-Agnostic Meta-Learning](/docs/notes/model-agnostic-meta-learning) (MAML)，使得模型能從有限樣本中進行泛化學習。
3. 定義支持集 (Support set) 和查詢集 (Query set)。支持集包含已知樣本與標籤，用來幫助模型學習；查詢集則包含未標籤的新數據，用以評估效果。
4. 使用基於嵌入的方法，比如 Prototypical Networks 或 Matching Networks，將支持集中每個類別映射到嵌入空間後進行比較。

程式邏輯範例：
```python
def few_shot_learning_process(support_set, query_set):
    # Step 1: 特徵提取
    support_embeddings = extract_features(support_set)
    query_embeddings = extract_features(query_set)
    
    # Step 2: 計算相似度
    distances = compute_distances(support_embeddings, query_embeddings)
    
    # Step 3: 分配類別
    predictions = assign_labels(distances)
    return predictions
```

### 🔍 查詢階段

查詢流程主要包括以下步驟：

1. 將待測數據映射到嵌入空間，以獲得其特徵向量表示。
2. 根據支持集中已知類型計算相似度距離（如歐氏距離或餘弦相似度）。
3. 根據最接近的支持點所屬類型進行分類決策。

範例邏輯：
```python
def query_phase(new_data, support_set):
    new_embedding = extract_features(new_data)
    distances = compute_distances(new_embedding, support_set)
    predicted_label = nearest_label(distances)
    return predicted_label
```

---

## 補充說明

### 📌 範例比較

| 技術名稱             | 資料需求      | 適合場景                     |
|----------------------|-------------|----------------------------|
| Traditional ML       | 大量資料     | 標準分類任務                 |
| Transfer Learning     | 中等資料     | 已有相關領域的大量預訓練      |
| Few-shot Learning     | 少量資料     | 長尾分布、稀有數據、新增類型 |

### 🧠 延伸／常見誤解

#### 誤解一：「Few-shot learning 是無監督學習」
澄清：Few-shot learning 是有監督學習的一部分，只是在監督過程中使用非常有限的標籤數據。它仍然依賴支持集中提供的標籤資訊，而不是完全沒有監督訊號。

#### 誤解二：「多語言轉換就是 Few-shot」
澄清：雖然許多語言處理問題可以利用 Few-shot 方法，但這並不代表所有跨語言技術都是 Few-shot。例如直接翻譯屬於完全不同領域，不一定涉及 Limited-data 的概念。

#### 延伸應用：
除了圖像和文字處理外，Few-shot 還被廣泛應用在音頻分析、生物醫療診斷以及異常檢測等領域。例如，在疾病診斷中，可以透過極少病患樣本達成高效判斷。
