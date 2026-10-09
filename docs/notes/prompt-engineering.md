---
title: "Prompt Engineering"
slug: "/notes/prompt-engineering"
---
## What？

**Prompt Engineering** 是一種使用自然語言提示（prompt）來引導大型語言模型（如 GPT）執行特定任務的方法，**不需或只需極少的微調**。
換句話說，它是讓模型「用你提供的輸入方式學會解題」，而不是重訓模型本身。

```
輸入：請將以下英文翻成中文：I love AI. 輸出：我愛人工智慧
```

## Who？

- **開發者與資料科學家**：設計提示用於分類、生成、問答等任務
- **非工程背景用戶**：透過提示介面（如 ChatGPT）操作模型
- **企業/組織**：用 Prompt Engineering 設計工作流程，如客服、摘要、自動回信

## When？

- **概念萌芽**：早在 GPT-2（2019）時期就有簡單使用
- **真正普及**：從 GPT-3 發表（2020）後，由於其強大「少樣本學習」能力而廣為人知
- **成熟應用期**：2022–2025 年，Prompt Engineering 成為熱門工作技能

## Where？

- **文字生成工具**：如 Notion AI、ChatGPT、Jasper
- **[Retrieval-Augmented Generation](/docs/notes/retrieval-augmented-generation) 系統**：提示用於引導語言模型讀取外部知識
- **自動標註**：用 prompt 產生資料以節省人工成本
- **內部流程自動化**：如填表、轉換格式、資料彙整

## Why？

- **快速實驗**：無須微調模型，馬上能嘗試想法
- **降低技術門檻**：非專業程式人員也能與模型互動
- **擴展能力**：一個模型能藉由不同提示執行成千上萬種任務
- **節省資源**：避免高成本微調與部署多個模型

## How？

1. **撰寫提示**：例如「請將以下資料轉成 JSON 格式」
2. **送入模型**：通常是大型語言模型，如 GPT、Claude、Gemini
3. **模型推理與生成**：模型根據提示與上下文產生對應輸出
4. **迭代調整**：根據回應修改提示以獲得更精準結果

## 補充說明

| 類型                   | 說明     | 範例                   |
| -------------------- | ------ | -------------------- |
| [Zero-shot](/docs/notes/zero-shot)        | 無提供範例  | 「請翻譯成英文」             |
| [Few-shot](/docs/notes/few-shot)         | 提供少量範例 | 「A 是什麼？B 是什麼？→ C 是？」 |
| [Chain-of-thought](/docs/notes/chain-of-thought) | 加上推理步驟 | 「讓我們一步步思考這個問題…」      |
