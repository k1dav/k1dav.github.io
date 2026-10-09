---
title: "Stemming"
slug: "/notes/stemming"
tags:
  - "NLP"
  - "AI"
  - "TextProcessing"
  - "Preprocessing"
---
## What？

**Stemming** 是一種文字處理技術，用於將單字還原至其詞根（Stem），進而統一語義並減少資料中單字的變化。例如，像 "running" 和 "ran" 都可以透過 Stemming 還原成共同的詞根 "run"。這在自然語言處理 ([NLP](/docs/notes/nlp)) 中尤其重要，因為它能幫助我們簡化文本分析的複雜度。

在實務上，Stemming 通常用於[搜尋引擎](/docs/notes/search-engine)、情感分析以及文字分類等需要對大量文本進行處理的情境。例如，一個搜尋引擎可以透過 Stemming 將使用者輸入的查詢詞與文件中的各種形式單字匹配，提升查詢結果的準確性。

---

## Who？

**Stemming** 的主要使用者包括：

1. **資料科學家與自然語言處理工程師**  
   在開發 NLP 模型或進行文字相關分析時需要用到 Stemming。
   
2. **搜尋引擎開發者**  
   為了提升使用者體驗及搜尋結果準確性，常用 Stemming 來增加匹配率。

3. **研究人員與分析師**  
   在數據分析中，簡化文本特徵提取過程，使得多樣化形式單字能歸一化。

受影響的人可能包括終端使用者，例如在搜尋引擎查詢時，希望得到更精確結果的人群。

---

## When？

以下幾個時間點可能會用到 **Stemming**：

1. 當需要對大量文本進行[Data Preprocessing](/docs/notes/data-preprocessing)時，例如清洗或轉換資料。
2. 開發語意模糊度高的應用系統，例如法律文件搜尋工具。
3. 建立文字分類模型前，用來減少特徵維度。
4. 在內容推薦系統中，用於提高相似內容匹配精度。

舉例來說，在建立情感分析模型時，可先對評論中的各類動詞形式做 Stemming，以統一表達方式，讓模型更容易識別正面或負面情感。

---

## Where？

在系統架構中，**Stemming** 通常出現在以下部分：

1. **資料預處理階段**：作為 NLP 管道的一環，在 Tokenization 和 Stop Word Removal 之後執行。
2. **索引階段（Indexing）**：例如在搜尋引擎中建立倒排索引 (Inverted Index) 時應用。
3. **查詢解析階段（Query Parsing）**：當使用者輸入關鍵字進行查詢時，可執行 Stemming 簡化匹配流程。

---

## Why？

文字本身具有語法上的多樣性，例如動詞變化、名詞複數等。這些變化可能導致程式無法正確識別出相同意義的單字。使用 **Stemming** 可以解決以下問題：

1. 統一詞彙表達：例如將 "studies" 和 "studying" 都轉換成 "study"，減少冗餘特徵。
2. 降低資料維度：減少不必要的重複[特徵](/docs/notes/features)，使模型訓練更高效。
3. 提升查詢[精確度](/docs/notes/accuracy)：確保不同形式的關鍵字都能被正確匹配到相關內容。

舉例來說，如果沒有進行 Stemming，一個文件包含 "computers"，而使用者輸入了 "computer"，則系統可能無法識別出兩者之間的關聯。但有了 Stemming 後，就能將它們都還原為共同詞根 "computer"，解決這個問題。

---

## How？

### 🛠️ 建立階段

在建立階段，通常會先對文本進行 [Tokenization](/docs/notes/tokenization) 分割為單字，再執行 Stop Word Removal 移除不重要詞彙後，再套用 **Stemming Algorithm**。流程如下：

1. 載入文本資料集
2. 對文本執行 Tokenization
3. 去除[停用詞](/docs/notes/停用詞) (Stop Words)，例如 "the", "is", 等
4. 套用 Stemming 演算法：
   - 使用 Porter Stemmer 或 Snowball Stemmer 等工具
5. 將處理後的詞根儲存於索引或特徵集中

範例程式碼（以 Python 為例）：
```python
from nltk.stem import PorterStemmer

# 初始化 Stemmer
stemmer = PorterStemmer()

# 範例列表
words = ["running", "ran", "runner"]

# 執行 Stemming
stemmed_words = [stemmer.stem(word) for word in words]
print(stemmed_words)
```

### 🔍 查詢階段

在查詢階段，當使用者輸入關鍵字後，可以先針對該關鍵字執行 Stemming，再與索引中的儲存內容比對。流程如下：

1. 接收使用者查詢輸入
2. 對輸入文字執行 Tokenization 與 Stop Word Removal（如有需要）
3. 套用同樣演算法進行 Stemming（需與索引用演算法一致）
4. 比對已建立好的索引或文件內容
5. 回傳符合條件的結果

範例程式碼：
```python
query = "running"
stemmed_query = stemmer.stem(query)
print(f"Stemmed Query: {stemmed_query}")

# 模擬比對索引中的關聯文件（僅範例）
documents = ["run fast", "runner wins the race"]
matched_docs = [doc for doc in documents if stemmed_query in doc]
print(matched_docs)
```

---

## 補充說明

### 🔧 關鍵技術工具

下表整理常見工具及其特色：

| 工具名稱          | 特點                              | 適合場景                   |
|-------------------|-----------------------------------|---------------------------|
| Porter Stemmer    | 最早期且簡單易理解                 | 基礎 NLP 項目              |
| Snowball Stemmer  | 改良版 Porter Stemmer             | 支援多語言                 |
| Lancaster Stemmer | 更具侵略性但可能削弱準確性         | 測試快速壓縮場景           |
| SpaCy             | 提供完整 NLP 功能套件含 Lemmatization | 高效大型專案               |

### 📌 範例比較

下表展示不同演算法生成結果差異：

| 原始單字          | Porter Stemmer 結果 | Lancaster Stemmer 結果 |
|-------------------|---------------------|------------------------|
| running           | run                 | run                    |
| studies           | studi               | study                  |
| happiness         | happi               | happy                  |

### 🧠 延伸／常見誤解

- **Stemming 與 Lemmatization 的區別**
  - 雖然兩者都有「還原」功能，但 Lemmatization 使用的是完整辭典，比起簡單直接切割詞尾，更具語法及語意考量。例如，Lemmatization 能將 "better" 還原為其辭典形式 "good"，而一般 Steming 做不到這點。

- **誤以為所有場景都適合**
  - 有些應用場景，如法律或醫學文件分析，需要保留完整拼寫以保持精準性，此時應選擇 Lemmatization 而非 Steming。
