---
title: "Tokenization"
slug: "/notes/tokenization"
tags:
  - "NLP"
  - "AI"
  - "TextProcessing"
---
## What？

Tokenization 是將一段文字或資料拆分成較小的單位，這些單位通常稱為 tokens。這些 tokens 可以是單字、子字串、字元，甚至是語意上的片段。舉例來說，一句英文句子 "I love programming." 經過 Tokenization 後可能會被拆分成 ["I", "love", "programming", "."]. Tokenization 是自然語言處理 (NLP) 的基礎步驟之一，幫助我們將非結構化的文字資料轉換為可分析的形式。

## Who？

- **使用者：** 技術工作者，例如 NLP 工程師、資料科學家，以及需要處理文字資料的開發人員。
- **受影響：** 主要是需要進行語言分析的應用，例如機器翻譯、情感分析和搜尋引擎中的索引與查詢。

舉例來說，當工程師在建立聊天機器人時，他們必須先對輸入的訊息進行 Tokenization，好讓模型能夠理解使用者的意圖。

## When？

Tokenization 通常在以下情境中出現：
1. **資料前處理階段：** 在訓練 [NLP](/docs/notes/nlp) 模型之前，需要先將文本拆分成 tokens。
2. **查詢階段：** 當用戶進行搜尋時，搜尋引擎需要對查詢內容進行 Tokenization，以便比對索引中的相關內容。
3. **即時處理：** 在即時應用中，例如智慧客服系統或即時翻譯工具。

例如，當一個搜尋系統收到用戶輸入「如何改善睡眠品質」後，它會先把這句話拆解為 ["如何", "改善", "睡眠", "品質"] 再進一步分析。

## Where？

Tokenization 通常出現在以下架構部分：
1. **資料前處理模組：** 負責清洗並準備原始文字資料。
2. **索引建立模組：** 搜尋引擎建立索引時，用於拆分文本以提高檢索效率。
3. **推論層（[Inference](/docs/notes/inference) Layer）：** 在模型接收輸入並產生結果之前，需將原始輸入 Tokenize 成適合模型解析的形式。

舉例來說，在 NLP 管道中，一般流程可能是：
原始文字 → Tokenization → 特徵提取 → 模型訓練或推論

## Why？

**解決什麼問題？**

Tokenization 解決了以下幾個問題：
1. **非結構化文字難以處理：** 原始文本通常沒有明確的邊界或規則，難以直接被程序理解或分析。
2. **提高計算效率與準確性：** 將大段文字拆分為小單位後，更容易針對每個 token 進行特徵提取或比對。
3. **語言多樣性挑戰：** 不同語言有不同的斷詞邏輯（例如中文沒有空格作為斷詞標記），透過 Tokenization 可以標準化這些差異。

例如，在中文語料中，「我喜歡看電影」如果不經過適合的方法斷詞可能會被當成整體，而適合的方法可能將其切分為 ["我", "喜歡", "看", "電影"]。

## How？

### 🛠️ 建立階段

建立 Tokenization 通常包含以下步驟：

1. 清洗原始文本（移除多餘空格、符號等）。
2. 根據選定方法（如基於空格切割或正規表達式）拆分文本為 tokens。
3. 如果是中文，可以使用斷詞工具（如 Jieba 或 CKIP）。
4. 儲存 tokens 作後續處理。

#### Python 範例
```python
import nltk
from nltk.tokenize import word_tokenize

text = "I love programming."
tokens = word_tokenize(text)  # Output: ['I', 'love', 'programming', '.']
print(tokens)
```

### 🔍 查詢階段

查詢階段通常包括：
1. 將用戶查詢內容進行 Tokenization。
2. 比對 tokens 與已建立的索引集合，以找到相關結果。
3. 返回符合條件的結果給用戶。

#### 搜尋系統範例
假設有以下索引 ["如何", "改善", "睡眠"]，若查詢內容是「改善睡眠品質」，則經過 Tokenization 後可能匹配到 ["改善", "睡眠"] 並返回最相關結果。

## 補充說明

### 📌 範例比較

以下示範不同 Tokenizer 的效果：

| 方法          | 輸入                 | 輸出                           |
|---------------|----------------------|--------------------------------|
| 基於空格切割   | I love programming   | ['I', 'love', 'programming']   |
| NLTK          | I love programming   | ['I', 'love', 'programming', '.'] |
| Jieba         | 我喜歡看電影         | ['我', '喜歡', '看', '電影']    |

### 🧠 延伸／常見誤解

- **誤解一：「所有 Tokenizer 都一樣」**
  不同工具有不同演算法和應用場景。例如 NLTK 更適合英文，而 Jieba 則專注於中文斷詞。如果在錯誤場景下選擇了不適合的工具，可能導致結果不精準。

- **誤解二：「Token 就一定代表單字」**
  在某些應用中，例如 Subword-based Models（如 BPE 或 WordPiece），token 不一定是一個完整單字，而可能是一部分，如 `play` 和 `ing` 被拆成兩個 tokens `pl` 和 `aying`。這種方法有助於減少未見詞（Out-of-Vocabulary, OOV）問題。
