---
title: "LangChain"
slug: "/notes/langchain"
tags:
  - "AI"
  - "Embedding"
  - "NLP"
---
## What？

**LangChain 是什麼？**

LangChain 是一個專為構建基於[大型語言模型](/docs/notes/foundational-model)（LLMs, Large Language Models）的應用程式而設計的開源框架。它讓開發者能以模組化的方式整合 LLMs 與其他技術工具（例如資料庫、API 等），並提供多樣化功能，包括記憶管理、[RAG](/docs/notes/retrieval-augmented-generation) 和鏈式推理等。

舉例來說，如果你想建立一個能回答複雜問題且能持續追蹤使用者上下文的聊天機器人，LangChain 就是你需要的工具。它能幫助你快速構建流程，並確保系統運行流暢。

---

## Who？

**誰會使用 LangChain？誰會受影響？**

主要使用者是具備基本程式開發知識的技術工作者，例如：
- **AI 開發者**：想要快速將 LLMs 整合到產品或服務中。
- **資料工程師**：需要串接外部資料來源，並進行處理或分析。
- **研究人員**：探索如何利用 LLMs 進行自然語言處理任務。
- **後端工程師**：負責服務端整合以及架構設計的人員。

受影響的對象通常是最終用戶，例如：
- 使用 AI 驅動應用程式（如智能客服系統）的客戶
- 依賴準確查詢結果來做決策的業務人員

---

## When？

以下情境最常見：
1. **需要整合多種資源時**：例如，你希望結合外部 API 的數據與 LLM 的能力來回答問題。
2. **實現多步驟任務時**：例如，從接收問題 → 檢索相關資訊 → 整合回答，這些步驟可以透過 LangChain 架構化完成。
3. **具備記憶功能的應用程式需求**：例如聊天機器人要記住使用者之前提過的信息，以便提供更相關的回答。
4. **處理大量非結構化資料時**：例如分析文件、電子郵件內容等非結構化文字。

---

## Where？

LangChain 通常出現在以下系統架構部分：
1. **後端服務層（Backend Service Layer）**
   - 負責調用 LLMs 及整合外部工具，如資料庫、API 或自定義模組。
2. **中間層（Middleware）**
   - 作為溝通橋樑，將查詢結果整理成可供前端顯示的格式。
3. **記憶管理層（Memory Management Layer）**
   - 負責存儲和追蹤使用者上下文，以便在對話中回溯早期信息。

---

## Why？

在開發基於 LLM 的應用程序時，常見挑戰包括：
1. 缺乏模組化設計：難以靈活地整合不同功能，例如檢索資訊與生成文本結果。
2. 記憶上下文困難：LLMs 本身不具備「長期記憶」，需額外系統支持。
3. 多元資源整合繁瑣：手動串接 API 或其他工具不僅耗時，而且容易出錯。

LangChain 提供了一個框架，讓開發者能更有效率地完成上述任務。它不僅簡化了 LLM 與其他工具的整合，也讓流程更具可擴展性。

---

## How？

### 🛠️ 建立階段

在建立基於 LangChain 的應用程式時，可以分以下步驟：

1. 安裝 LangChain 套件
   ```bash
   pip install langchain
   ```

2. 選擇所需模組，例如：
   - Memory 模組（管理上下文）
   - Chains 模組（執行多步驟邏輯）
   - Agents 模組（決策引擎）

3. 整合大型語言模型，例如 OpenAI 的 `GPT` 系列或 Hugging Face 提供的模型。

4. 配置所需工具，如向量資料庫 Vector Database （例：Pinecone、Weaviate）或外部 API 接口。

5. 編寫核心邏輯，例如：
    ```python
    from langchain.chains import SimpleSequentialChain
    
    # 定義第一步 (生成關鍵字)
    keyword_chain = KeywordGenerationChain(llm=llm_instance)

    # 定義第二步 (檢索文件內容)
    document_chain = DocumentSearchChain(vector_db=vector_db_instance)

    # 組成 Sequential Chain
    final_chain = SimpleSequentialChain(chains=[keyword_chain, document_chain])
    ```

### 🔍 查詢階段

當應用程式運行後，用戶查詢可以經由以下流程：

1. 收到查詢輸入 → 使用 Chains 模組解析查詢並觸發多步驟邏輯。
2. 若涉及上下文記憶 → 調用 Memory 模組檢索先前訊息。
3. 若需外部支援 → 調度 Agents 模組執行 API 調用或數據檢索動作。
4. 最終生成答案 → 返回給前端顯示結果。

範例代碼如下：
```python
from langchain.memory import ConversationBufferMemory

# 初始化 Memory
memory = ConversationBufferMemory()

# 將記憶與 Chain 結合
conversation_chain = ConversationWithMemory(llm=llm_instance, memory=memory)

# 用戶查詢示例
response = conversation_chain.run(input="請幫我找最近一次會議紀錄")
print(response)
```

---

## 補充說明

### 📌 範例比較

| 功能需求             | 傳統方法                     | 使用 LangChain            |
|----------------------|------------------------------|---------------------------|
| 上下文記憶           | 手動儲存並調取對話紀錄       | ConversationBufferMemory  |
| 多步驟邏輯           | 自行編寫複雜流程             | Chains 模組自動管理       |
| 資料檢索             | 自建向量比對算法             | 集成 Pinecone 等工具      |

### 🧠 延伸／常見誤解

1. **誤解：「LangChain 是一個大型語言模型」**
   實際上，它僅是一個框架，用來輔助整合大型語言模型及其他技術資源，而不是模型本身。

2. **誤解：「只能搭配 OpenAI GPT」**
   雖然 LangChain 支援 OpenAI GPT，但也可以與其他 LLM 一起使用，如 Hugging Face 提供的模型或 Google 的 PaLM 系列。
