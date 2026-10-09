---
title: "RAGAS - Automated Evaluation of Retrieval Augmented Generation"
slug: "/notes/ragas-automated-evaluation-of-retrieval-augmented-generation"
tags:
  - "AI"
  - "NLP"
  - "Retrieval-Augmented"
  - "Generation"
  - "Evaluation"
  - "Metrics"
---
## What？

**RAGAs（Retrieval Augmented Generation Assessment）** 是一個專門用來評估 [RAG](/docs/notes/retrieval-augmented-generation) 系統效能的框架。RAG 系統結合了檢索與生成技術，透過檢索相關資料來增強生成式 [AI](/docs/notes/artificial-intelligence) 的回答品質，而 RAGAs 則提供了一套可量化的標準，用以衡量這類系統在多個面向上的表現。

簡單來說，當我們有一個問題時，RAG 系統會利用檢索技術找到相關資料，接著讓大型語言模型（LLM）根據這些資料產生回答。RAGAs 透過精心設計的評估指標（如忠誠度、答案相關性等），幫助我們更清楚了解這些生成的回覆是否可靠以及是否符合需求。

---

## Who？

### 誰會使用？

- **AI 工程師**：需要衡量自己設計的 [RAG](/docs/notes/retrieval-augmented-generation) 系統效果。
- **產品經理**：希望確保基於 RAG 技術的應用產品能夠提供高品質回答。
- **研究人員**：進行 [NLP](/docs/notes/nlp) 領域內新技術開發或改進時需要客觀數據支持。

### 誰會受影響？

- **終端使用者**：RAG 系統是否被妥善調校直接影響使用者體驗，例如 Chatbot 是否能提供正確且相關的答案。
- **企業決策層**：依賴 AI 技術改善效率或降低成本時，需要信賴該技術的表現。

---

## When？

### 什麼情況下會用到？

1. **設計初期**：在規劃或測試新的 RAG 架構時，需要快速了解不同元件（如 [Vector DB](/docs/notes/vector-db) 或 [LLM](/docs/notes/foundational-model)）的效能表現。
2. **優化迭代中**：當你嘗試調整模型參數、替換 LLM 或改變檢索策略後，需要重新評估系統效果。
3. **產品部署後**：長期監控 RAG 系統性能，確保回答品質維持在一定標準。

---

## Where？

### 出現在架構哪個部分？

RAGAs 的評估框架主要針對兩大模組進行分析：
1. **檢索階段（[Vector Retrieval](/docs/notes/vector-search) Phase）**
   - 包括 Embedding Model 和 Vector DB 部分，用於衡量上下文資料與問題之間的匹配程度。
1. **生成階段（[Generation](/docs/notes/generation) Phase）**
   - 聚焦於 LLM 的回覆內容，確保其基於先前檢索出的資料生成可信且相關的答案。

整體而言，RAGAs 是一種「外部監控工具」，不直接參與系統內部運作，但負責從輸入到輸出的所有關鍵點進行評估。

---

## Why？

### 解決什麼問題？

1. **減少人工成本**  
   傳統上，我們可能需要大量人工逐條比對生成結果是否正確。而 RAGAs 利用 LLM 自動完成這些繁瑣工作，大幅降低時間與人力成本。

2. **提升評估精度**  
   BLEU、ROUGE 等傳統指標難以捕捉自然語言生成中的細微差異，而 RAGAs 提供了更針對性、多面向的指標，如忠誠度與上下文相關性，更貼近實際應用需求。

3. **應對幻覺問題（[LLM Hallucinations](/docs/notes/llm-hallucinations)）**
   大型語言模型容易產生幻覺——即無中生有的不實內容。RAGAs 有專門針對「忠誠度」設計的測量方式，可以幫助發現並改善此類缺陷。

4. **跨系統比較能力**
   當你想要比較不同 RAG 架構或模型性能時，RAGAs 提供了一套標準化流程，可以更公平地進行性能比較。

---

## How？

### 🛠️ 建立階段

1. 安裝必要工具：
    ```bash
    pip install ragas
    ```

2. 準備資料集：  
    - 資料集中包含：
      - 問題（Query）
      - 檢索到的上下文資料（Retrieved Contexts）
      - LLM 產生的回答（Answer）

    範例載入程式碼：
    ```python
    from datasets import load_dataset
    fiqa_eval = load_dataset("explodinggradients/fiqa", "ragas_eval")
    ```

3. 設定 OpenAI API 金鑰：
    ```python
    import os
    os.environ["OPENAI_API_KEY"] = "your-openai-key"
    ```

4. 定義所需評估指標：
    ```python
    from ragas.metrics import (
        answer_relevancy,
        faithfulness,
        context_recall,
        context_precision,
    )
    
    metrics = [
        context_precision,
        faithfulness,
        answer_relevancy,
        context_recall,
    ]
    ```

5. 執行分析並取得結果：
   ```python
   from ragas import evaluate

   result = evaluate(
       fiqa_eval["baseline"].select(range(3)), # 範例選取前3筆樣本測試
       metrics=metrics,
   )

   df = result.to_pandas()
   print(df.head())
   ```

---

### 🔍 查詢階段

當我們獲得結果後，可以依據以下步驟做具體分析：

1. 忠誠度計算公式：
   $$ \text{Faithfulness score} = \frac{\text{Number of claims in the generated answer that can be inferred from given context}}{\text{Total number of claims in the generated answer}} $$

2. 答案相關性，以問題相似度為基礎進行計算：
   $$ AR = \frac{1}{n} \sum_{i=1}^{n} sim(q, q_i) $$

3. 檢查上下文相關性和精確率/召回率：
   上下文相關性公式：
   $$
   CR = \frac{\text{number of extracted sentences}}{\text{total number of sentences in } c(q)}
   $$
   
   上下文精確率公式：
   $$ \text{Context Precision@k} = \frac{\sum \text{precision@k}}{\text{total number of relevant items in the top K results}} $$
   
   上下文召回率公式：
   $$ \text{Context Recall} = \frac{|GT sentences that can be attributed to context|}{|\text{Number of sentences in GT}|} $$

---

## 補充說明

### 📌 範例比較

以下是一個範例比較，用於展示同一問題在不同系統上的表現差異：

| 問題         | 回答                           | 忠誠分數     | 答案相關性分數 |
|--------------|---------------------------------|--------------|---------------|
| Q: A + B=?  | A=1, B=2, A+B=？=> 答案是3       | 1.0          | 0.95          |
| Q: A + C=?  | A=1, B=2 => 無法推導 C 值         | 0            | 0             |

---

### 🧠 延伸／常見誤解

#### 常見誤解一：  
「所有大型語言模型都可以直接拿來做 RAG 評估。」  
> 錯！用於生成回答和用於評估模型是兩回事。大多數情況下，我們選擇 GPT-4 或 gpt-3-turbo 作為評估 LLM，而非任意 LLM 都適合此任務。

#### 常見誤解二：  
「[BLEU](/docs/notes/bleu) 和 [ROUGE](/docs/notes/rouge) 足夠應付所有 NLP 任務。」  
> 傳統方法無法捕捉高層次語義一致性。例如 BLEU 更適合機器翻譯，但不適合複雜問答情境中的忠誠度測試。
