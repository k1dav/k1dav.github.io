---
title: "Generation"
slug: "/notes/generation"
tags:
  - "NLP"
  - "DeepLearning"
  - "Transformer"
  - "LanguageModel"
  - "Autoregressive"
---
## What？
Generation 是指透過機器學習模型根據輸入條件自動產生新內容的過程。在自然語言處理中，generation 通常指的是文本生成，模型透過學習統計規律來預測並逐字序列地輸出文本。生成式模型如 [Transformer](/docs/notes/transformer) 架構的 LLM（Large Language Model）能夠理解上文並生成連貫的後續內容。

Generation 的核心機制是 autoregressive decoding：模型一次生成一個 token，每次都以前面生成的 token 作為輸入條件，逐步構建完整的句子或段落。這與 discriminative 模型（只進行分類判別）相對，generation 需要創造新的序列數據。

實際應用中，Generation 涵蓋文章寫作、代碼生成、機器翻譯、對話系統等場景。例如 ChatGPT 就是透過預訓練的 [Transformer](/docs/notes/transformer) 模型進行 generation，當用戶提供 prompt 時，模型逐步生成回答。

---

## Who？
- **NLP 工程師** - 開發和微調生成模型
- **LLM 應用開發者** - 整合生成能力到應用中
- **內容創作者** - 使用生成工具輔助寫作
- **研究人員** - 研究生成機制和改進方法
- **終端用戶** - 通過 ChatGPT、Claude 等使用生成功能

---

## When？
1. **自動文本生成** - 根據 prompt 生成創意內容、文章摘要或程式碼
2. **實時對話系統** - 聊天機器人需要即時生成回應
3. **機器翻譯** - 將源語言序列翻譯為目標語言序列
4. **代碼補全和生成** - IDE 中自動補全代碼或生成函數

---

## Where？
1. **模型架構層** - [Transformer](/docs/notes/transformer) 的 decoder 部分負責生成邏輯
2. **訓練階段** - 使用 teacher forcing 或強化學習進行訓練
3. **推理階段** - 在線上生成推理中執行 autoregressive decoding
4. **後處理層** - 應用 beam search、temperature sampling 等策略優化輸出

---

## Why？
**核心價值** - Generation 使模型能夠創造新內容而非只進行判別，大幅擴展 AI 應用範圍。相比傳統模板或規則系統，生成式模型能產生更自然、更符合上文的內容。

**技術優勢** - Autoregressive 機制透過條件概率的乘積實現序列建模，[Transformer](/docs/notes/transformer) 的自注意力機制（self-attention）有效捕捉長範圍依賴關係。

---

## How？

### 🛠️ 建立階段
```python
# 基於 Hugging Face 的簡單 Generation 設置
from transformers import AutoModelForCausalLM, AutoTokenizer

model_name = "gpt2"
model = AutoModelForCausalLM.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)
```

### 🔍 查詢階段
```python
# 執行文本生成
prompt = "The future of AI is"
inputs = tokenizer.encode(prompt, return_tensors="pt")

# 使用 beam search 生成
outputs = model.generate(inputs,
                         max_length=50,
                         num_beams=5,
                         temperature=0.7)

generated_text = tokenizer.decode(outputs[0])
print(generated_text)
```

---

## 補充說明

### 📌 範例比較

| 面向 | Autoregressive | Non-autoregressive | 混合式 |
|------|---|---|---|
| 生成速度 | 慢（逐字生成） | 快（並行生成） | 中等 |
| 輸出品質 | 高（考慮上文） | 較低（無依賴） | 高 |
| 應用 | [Transformer](/docs/notes/transformer) LLM | BERT masked LM | 迭代細化 |

### 🧠 延伸／常見誤解
**誤解 1** - Generation 就是簡單的詞語統計組合。實際上，[Transformer](/docs/notes/transformer) 中的 [Embedding](/docs/notes/embedding) 和 attention 機制能捕捉複雜的語義依賴和長程連接。

**誤解 2** - 生成速度可以任意加快。實際上 autoregressive 模型的並行度受限，因為每個 token 生成都依賴前面的結果。Non-autoregressive 或 speculative decoding 是優化方向。
