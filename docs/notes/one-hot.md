---
title: "One-Hot"
slug: "/notes/one-hot"
tags:
  - "DataPreprocessing"
  - "DeepLearning"
  - "FeatureEngineering"
  - "MachineLearning"
  - "NLP"
---
## What？

One-Hot Encoding（獨熱編碼）是一種將分類變數轉換為數值向量的技術。對於有 N 個不同類別的特徵，One-Hot 編碼會創建 N 個二進位列，每個類別對應一列，該類別的列值為 1，其他列值為 0。

例如：顏色特徵有三個類別「紅、綠、藍」，One-Hot 編碼後：
- 紅色 → [1, 0, 0]
- 綠色 → [0, 1, 0]
- 藍色 → [0, 0, 1]

這種編碼方式看似簡單，但對機器學習模型至關重要。神經網路無法直接處理字串或文字標籤，必須將其轉換為數值。One-Hot 編碼保證了每個類別之間距離相等，避免了序號編碼（0, 1, 2）暗示的大小關係。

One-Hot 編碼在 [深度學習](/docs/notes/deep-learning) 和 [自然語言處理](/docs/notes/nlp) 中使用廣泛，特別是在 [Embedding](/docs/notes/embedding) 層之前的輸入轉換。現代框架（如 PyTorch）通常在損失函數層面支持整數標籤直接轉換為 One-Hot。

---

## Who？

- **機器學習工程師**：資料前處理中必須應用 One-Hot 編碼
- **資料科學家**：特徵工程環節進行分類特徵轉換
- **深度學習研究員**：準備神經網路的輸入資料
- **NLP 工程師**：轉換文本標籤和詞彙
- **資料分析師**：清理和轉換原始資料

---

## When？

1. **分類變數轉換**：性別、顏色、地區等非數值特徵需要轉換為數值
2. **神經網路輸入**：將分類標籤轉換為向量形式作為網路輸入
3. **文本処理**：自然語言中的詞彙索引轉換為 One-Hot 向量
4. **決策樹前處理**：儘管樹模型可直接處理分類特徵，One-Hot 有時仍用於特定場景

---

## Where？

1. **資料進入機器學習管道前**：原始資料中的分類欄位轉換
2. **神經網路的輸入層**：One-Hot 向量作為網路的實際輸入
3. **損失函數層**：交叉熵損失通常期望 One-Hot 編碼的標籤
4. **文本 [Embedding](/docs/notes/embedding) 前**：從詞索引轉換為 One-Hot 向量再到 Embedding

---

## Why？

One-Hot 編碼解決的核心問題是**分類資料的數值表示**。機器學習模型的數學基礎要求輸入是數值向量，無法直接處理文字。如果用序號編碼（0, 1, 2），模型會錯誤地認為類別間存在大小關係，導致學習偏差。

其次，保證了**特徵獨立性**。One-Hot 編碼將一個特徵分解為多個二進位特徵，每個特徵相互正交獨立，避免了序號編碼中不同類別的距離不相等的問題。第三是**神經網路相容性**，One-Hot 格式與反向傳播和梯度下降演算法完美相容。

---

## How？

### 🛠️ 建立階段

**Python 使用 pandas：**
```python
import pandas as pd

df = pd.DataFrame({
    'color': ['red', 'green', 'blue', 'red'],
    'size': ['S', 'M', 'L', 'M']
})

# One-Hot 編碼
one_hot_color = pd.get_dummies(df['color'], prefix='color')
one_hot_size = pd.get_dummies(df['size'], prefix='size')
result = pd.concat([df, one_hot_color, one_hot_size], axis=1)
```

**PyTorch 中的應用：**
```python
import torch
import torch.nn as nn

# 假設類別有 10 個
num_classes = 10
label = torch.tensor([3])

# 轉換為 One-Hot
one_hot = torch.zeros(1, num_classes)
one_hot.scatter_(1, label, 1)
# 輸出: [[0, 0, 0, 1, 0, 0, 0, 0, 0, 0]]

# 或使用 torch.nn.functional
one_hot = torch.nn.functional.one_hot(label, num_classes)
```

### 🔍 查詢階段

**Scikit-learn 處理：**
```python
from sklearn.preprocessing import OneHotEncoder

encoder = OneHotEncoder(sparse_output=False)
categorical_data = [['red'], ['green'], ['blue']]
one_hot_encoded = encoder.fit_transform(categorical_data)

# 反向轉換
original = encoder.inverse_transform(one_hot_encoded)
```

---

## 補充說明

### 📌 範例比較

| 編碼方式 | 優點 | 缺點 | 適用場景 |
|--------|------|------|--------|
| One-Hot | 無序列關係、完全獨立 | 維度高、稀疏 | 神經網路、少量類別 |
| 序號編碼 | 空間效率高 | 暗示序列關係 | 樹模型、有序類別 |
| Label 編碼 | 簡單快速 | 類別間有假想距離 | 臨時處理 |
| 二進位編碼 | 維度低 | 複雜難懂 | 類別極多場景 |

### 🧠 延伸／常見誤解

**誤解 1**：One-Hot 編碼總是最好的選擇。實際上對於決策樹、隨機森林等模型，序號編碼或 Label 編碼有時足夠。One-Hot 對神經網路特別重要。

**誤解 2**：One-Hot 編碼維度爆炸無解。當類別數大於 100 時，可考慮二進位編碼、Target 編碼或 Hash 編碼替代。

**延伸**：現代深度學習中，One-Hot 常與 [Embedding](/docs/notes/embedding) 層結合，Embedding 層實質上將 One-Hot 向量投影到低維稠密空間。
