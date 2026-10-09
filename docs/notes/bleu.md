---
title: "BLEU"
slug: "/notes/bleu"
tags:
  - "AI"
  - "Machine"
  - "NLP"
  - "translation"
---
## What？

**BLEU** 是一種用來評估機器翻譯結果品質的指標。它的全名是 **Bilingual Evaluation Understudy**，主要透過比較生成翻譯與參考翻譯之間的相似性來判斷模型的表現。簡單來說，BLEU 可以幫助我們量化「這段機器生成的翻譯有多接近人類提供的正確答案」。

實務上，你可以把 BLEU 想像成評分機器翻譯的一個自動化系統，例如在開發 Google Translate 時，用 BLEU 來快速判斷模型版本更新後是否提升了翻譯品質。

---

## Who？

BLEU 的主要使用者包括：

1. **自然語言處理（[NLP](/docs/notes/nlp)）工程師**：需要設計與訓練機器翻譯模型。
2. **AI 研究人員**：進行語言生成相關研究，測試模型性能。
3. **產品經理／數據科學家**：負責監控 NLP 模型的表現，確保符合商業需求。

另外，BLEU 指標也會影響到使用機器翻譯服務的普通用戶，因為它最終關係到翻譯結果是否符合期待。

---

## When？

你會在以下時間點用到 BLEU：

1. **模型訓練後進行測試時**：確認新模型是否比舊版更有效。
2. **版本迭代時**：比較不同版本的生成結果。
3. **研究論文中進行基準測試時**：展示某 NLP 模型在標準資料集上的表現。

例如，在開發一個多語言聊天機器人時，你可能會使用 BLEU 來衡量文字回覆是否達到高品質標準。

---

## Where？

BLEU 通常出現在以下架構部分：

1. **評估模組（Evaluation Module）**：作為模型性能測試的一部分。
2. **NLP Pipeline 的最後階段**：通常是生成結果之後，用 BLEU 評分以取得最終數值指標。

具體情境可能是在雲端 AI 平台中執行自動化評估，例如 AWS SageMaker 或 Google AI 平台都可能利用 BLEU 來分析 NLP 模型輸出。

---

## Why？

BLEU 解決了以下問題：

1. 提供了一種客觀、量化的方法來檢視機器翻譯品質，而不是僅靠主觀判斷。
2. 幫助工程師快速比較不同模型或設定下的性能差異，例如選擇要部署哪一版模型。
3. 減少人工參與，大幅提高效率。手動逐句檢查翻譯品質不僅耗時，也容易受偏見影響，而 BLEU 則能避免這類問題。

舉例來說，如果你正在測試一款中文到英文的機器翻譯工具，使用 BLEU 就能快速得知哪些語句表現較差，需要進一步調整。

---

## How？

### 🛠️ 建立階段

1. 準備多組參考翻譯（Reference Translations）：由人類提供正確答案作為基準。
2. 將模型生成的輸出（Candidate Translation）與所有參考翻譯逐字比對：
   - 計算每 n-gram 的重疊比例。例如常用 1-gram 到 4-gram 作為分析範圍。
   - 運用加權平均計算出最終分數。
3. 引入「brevity penalty」（簡短懲罰）：避免生成過短但正確率高的不自然答案。
4. 輸出 BLEU 分數，可介於 $0$ 到 $100$，一般情況下分數越高代表品質越好。

公式如下：
$$
\text{BLEU} = BP \cdot \exp \left( \sum_{n=1}^{N} w_n \log p_n \right)
$$
其中：
- $BP$ 為簡短懲罰
- $p_n$ 為 n-gram 精準度

### 🔍 查詢階段

使用者通常只需要將候選文本和參考文本輸入工具或程式碼，即可得到 BLEU 分數。範例流程如下：

1. 將候選文本和多組參考文本匯入程式，例如利用 Python 的 `nltk` 套件：
   ```python
   from nltk.translate import bleu_score
   
   candidate = ["The cat is on the mat"]
   references = [["The cat is on the mat"], ["There is a cat on the mat"]]
   
   score = bleu_score.sentence_bleu(references, candidate)
   print(score)
   ```
2. 根據分數調整或優化你的 NLP 模型設定，例如修改超參數或資料集配置。

---

## 補充說明

### 📌 範例比較

以下是一個範例比較，同樣是候選語句和兩組參考語句：

| 候選語句                | 參考語句 (Ref 1)           | 參考語句 (Ref 2)           | BLEU 分數 |
|------------------------|----------------------------|----------------------------|-----------|
| The cat is on the mat | The cat is on the mat      | There is a cat on the mat  | 高         |
| Cat sits on a rug     | The cat is on the mat      | There is a cat on the mat  | 中         |

### 🧠 延伸／常見誤解

#### 誤解一：「BLEU 分數就是唯一指標」
事實上，BLEU 是有效但不完美。例如它無法檢查文法正確性，也難以捕捉上下文意義。如果某些特定情境下需要更精細評估，可以搭配其他指標如 ROUGE 或 METEOR 使用。

#### 誤解二：「分數越低代表完全無效」
低分並非總是不好的訊號，有時只是候選文本表達方式與參考文本差異較大，但仍然保留一致意義。這在創造性寫作中尤其常見，例如詩歌或小說片段生成。
