---
title: "ROUGE"
slug: "/notes/rouge"
tags:
  - "EvaluationMetrics"
  - "MachineTranslation"
  - "NLP"
  - "TextGeneration"
  - "summarization"
---
## What？

ROUGE（Recall-Oriented Understudy for Gisting Evaluation）是評估文本摘要和機器翻譯質量的指標集合，通過比較生成文本與參考文本之間的 n-gram 重疊程度來評估相似性。ROUGE 家族包括多個變體：ROUGE-N（n-gram 重疊）、ROUGE-L（最長公共子序列）、ROUGE-W（加權最長公共子序列）等。

以文本摘要為例：如果參考摘要是「貓咪在陽台上睡覺」，模型生成的摘要是「貓在陽台上睡覺」，ROUGE-1 會計算兩者中單詞重疊的比例。ROUGE 通常計算 Precision、Recall 和 F1-Score 三個值。

ROUGE 與 [精確度](/docs/notes/precision) 和召回率的概念密切相關，但專門為文本任務設計。它是評估自然語言生成（NLG）任務的事實標準，被廣泛用於評估機器翻譯、文本摘要、對話系統等 [自然語言處理](/docs/notes/nlp) 應用。

---

## Who？

- **NLP 工程師**：評估文本生成模型的關鍵指標
- **機器翻譯研究員**：評估翻譯質量和模型改進
- **文本摘要系統開發者**：衡量摘要質量
- **對話 AI 工程師**：評估生成回應的質量
- **研究人員**：論文實驗中的標準評估指標

---

## When？

1. **文本摘要評估**：評估自動摘要系統生成的摘要是否保留了原文關鍵資訊
2. **機器翻譯質量**：評估翻譯機的翻譯質量，與人工翻譯參考進行比較
3. **對話系統評估**：評估生成的回應與參考回應的相似度
4. **標題生成評估**：評估模型生成的新聞標題或文章標題的合適性

---

## Where？

1. **模型評估管道**：訓練完成後在測試集計算 ROUGE 分數
2. **論文實驗報告**：發表 NLP 模型時報告 ROUGE 分數作為標準指標
3. **線上服務監控**：持續監控生成系統的 ROUGE 分數變化
4. **A/B 測試對比**：不同模型版本之間的效果對比

---

## Why？

ROUGE 解決的核心問題是**自動評估文本生成質量**。傳統的人工評估耗時耗力，無法在快速迭代開發中使用。ROUGE 提供了自動化評估方式，雖然不如人工評估準確，但速度快且可重複。

其次，ROUGE 基於 n-gram 匹配，能捕捉文本的詞彙層面相似性。不同於只看單個詞彙的指標，ROUGE-N 考慮連續 n 個詞彙的組合，更好地反映了文本的流暢性。第三，ROUGE 家族提供多個指標供組合使用，能適應不同任務和評估需求。

---

## How？

### 🛠️ 建立階段

**安裝 ROUGE 計算工具：**
```bash
# 安裝 rouge_score 工具
pip install rouge-score

# 或安裝 py-rouge
pip install py-rouge
```

**Python 計算 ROUGE 分數：**
```python
from rouge_score import rouge_scorer

# 定義參考和生成文本
reference = "貓咪在陽台上曬太陽"
generated = "貓在陽台上睡覺"

# 初始化 ROUGE 計算器
scorer = rouge_scorer.RougeScorer(
    ['rouge1', 'rouge2', 'rougeL'],
    use_stemmer=True
)

# 計算分數
scores = scorer.score(reference, generated)
print(f"ROUGE-1: {scores['rouge1']}")
print(f"ROUGE-2: {scores['rouge2']}")
print(f"ROUGE-L: {scores['rougeL']}")
```

### 🔍 查詢階段

**批量評估多個樣本：**
```python
references = [
    "機器學習是人工智慧的子領域",
    "深度學習使用神經網路進行學習"
]
generated_summaries = [
    "機器學習屬於 AI",
    "神經網路在深度學習中應用"
]

all_scores = {}
for ref, gen in zip(references, generated_summaries):
    scores = scorer.score(ref, gen)
    all_scores[ref] = scores

# 計算平均分數
avg_rouge1 = sum(
    s['rouge1'].fmeasure for s in all_scores.values()
) / len(all_scores)
print(f"Average ROUGE-1: {avg_rouge1:.4f}")
```

---

## 補充說明

### 📌 範例比較

| ROUGE 類型 | 計算方式 | 優缺點 | 適用場景 |
|----------|--------|------|--------|
| ROUGE-1 | 單詞重疊 | 簡單，對詞彙多樣性敏感 | 快速評估 |
| ROUGE-2 | 詞對重疊 | 考慮詞序，更精細 | 標準評估 |
| ROUGE-L | 最長子序列 | 重視順序，計算複雜 | 精確評估 |
| ROUGE-W | 加權子序列 | 加重連續匹配 | 高精度需求 |

### 🧠 延伸／常見誤解

**誤解 1**：ROUGE 分數高表示摘要質量好。ROUGE 只衡量與參考的 n-gram 重疊，參考本身可能不是最優摘要。多個好摘要的 ROUGE 分數可能都低。

**誤解 2**：單一 ROUGE 分數足以評估模型。應報告 ROUGE-1、ROUGE-2、ROUGE-L 等多個分數。F1-Score 比 Precision 或 Recall 單獨使用更可信。

**延伸**：[Transformer](/docs/notes/transformer) 模型（如 BERT 摘要器）的評估離不開 ROUGE。新的評估指標（如 BERTScore、METEOR）是 ROUGE 的補充，可結合使用。
