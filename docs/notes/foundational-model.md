---
title: "Foundational Model"
slug: "/notes/foundational-model"
---
## What？

**Foundational Model** 是指在大量資料上預訓練的 AI 模型，可以廣泛應用於各種下游任務（如翻譯、問答、摘要、圖像辨識等）。
這些模型具有泛化能力與可遷移性，成為許多 AI 應用的基礎。

## Who？

主要由大型科技公司與研究機構開發，例如：
- **OpenAI**：GPT 系列（GPT-3, GPT-4）
- **Google DeepMind**：Gemini, Flamingo
- **Meta**：LLaMA, DINOv2
- **Stanford CRFM**：提出「Foundational Model」這一術語與架構性研究
- **其他**：Microsoft, Anthropic, Cohere, Mistral 等

## When？

- **概念正式提出**：2021 年，Stanford HAI 發表報告系統性定義「Foundational Model」
- **實際技術發展**：從 2018 年 BERT、GPT 開始進入主流
- **快速普及階段**：2020–2023 年，ChatGPT 問世後成為關鍵技術趨勢

## Where？

- **企業**：客服自動化、數據分析、文件生成、自動翻譯
- **學術研究**：多模態理解、語義搜索、生物醫學文本分析
- **消費者應用**：ChatGPT、Copilot、Notion AI、圖像生成（如 Midjourney）
- **政府與政策制定**：數據治理、自動化輔助審查

## Why？

- 一個模型可解決多個任務（提高效率）
- 可大幅降低下游任務所需資料量與成本
- 成為 AI 系統的「共用骨架」
- 推動 AI 模型即服務（Model-as-a-Service）

## How？

1. **[Continual Pre-training](/docs/notes/continual-pre-training)（Pretraining）**：在大規模資料上訓練，例如網頁、書籍、代碼、圖像等
2. **[Fine Tune](/docs/notes/fine-tune)（Fine-tuning）或[Prompt Engineering](/docs/notes/prompt-engineering)（Prompting）**：針對特定任務進行適配
3. **應用部署（Deployment）**：用於 API、內部工具、RAG 系統等

## 補充說明
https://en.wikipedia.org/wiki/Foundation_model
