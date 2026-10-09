---
title: "Inference"
slug: "/notes/inference"
tags:
  - "AI"
  - "MachineLearning"
  - "NLP"
---
## What？

**Inference 模型推論** 是指在已經訓練好的 [Machine Learning](/docs/notes/machine-learning) 或 [Deep Learning](/docs/notes/deep-learning) 模型上，輸入特定的資料，並透過模型的計算過程獲得預測結果或分析結果。簡單來說，這個過程是把模型「用起來」，而不是「訓練它」。 

例如，我們常見的影像辨識應用中，使用者拍一張照片後系統判斷照片裡的人物是不是某位名人，這背後就是 Inference 的過程。

---

## Who？

**Inference** 的使用對象包含以下幾類：

1. **資料科學家 (Data Scientists)**：設計模型並進行推論以驗證模型效能。
2. **工程師 (Software Engineers)**：將推論整合到產品或系統中，例如建立 API 服務供客戶端查詢。
3. **終端使用者 (End Users)**：不直接接觸技術細節，但透過應用程式獲得推論結果。例如影像分類、語音辨識等功能。

舉例來說，在電子商務平台中，工程師會負責部署商品推薦系統，而普通消費者看到推薦商品時，其實就是在背後執行了 Inference。

---

## When？

模型推論通常會出現在以下時間點：

1. **線上即時應用 (Online/Real-time)**：需要快速回應使用者輸入。例如聊天機器人、即時翻譯。
2. **離線批量處理 (Offline Batch Processing)**：一次處理大批資料，不要求即時性。例如分析大量文字檔案中的情緒傾向。
3. **部署階段 (Deployment Phase)**：當模型完成訓練並準備投入實際使用。

舉例來說，如果你在手機上使用語音助手，它的回答速度必須足夠快，因此是線上即時推論；但如果公司要分析一整年銷售報告中的趨勢，那麼可能採取離線批量處理。

---

## Where？

Inference 主要出現在以下架構部分：

1. **伺服器端 (Server-side)**：
   - 在雲端進行高效能計算，適合處理大型、複雜的模型。
   - 例如 AWS、Azure 的 AI 推論服務。

2. **客戶端 (Client-side)**：
   - 在本地設備執行推論，例如手機或嵌入式設備上的輕量化模型。
   - 如 TensorFlow Lite 和 ONNX Runtime Mobile。

3. **邊緣運算環境 (Edge Computing)**：
   - 設置於靠近資料生成地點的硬體設備，用以減少延遲。
   - 適合工廠自動化或 IoT 裝置。

---

## Why？

Inference 的核心目的是讓訓練好的 AI 模型能解決實際問題。以下幾個場景展示它的重要性：

1. **提供決策支援**：例如醫療診斷工具，可以透過預測病患情況協助醫生判斷治療方案。
2. **提升產品體驗**：如語音助手理解指令並執行相關操作，提高便利性與互動性。
3. **自動化流程**：例如電商網站根據顧客瀏覽紀錄自動推薦商品。

如果沒有 Inference，我們只能停留在研究階段，而無法真正落地解決問題。

---

## How？

### 🛠️ 建立階段

建立 Inference 流程需要先準備好訓練完成的模型和必要的環境設定。以下是常見步驟：

1. 匯入已訓練好的 Model：
    ```python
    from tensorflow.keras.models import load_model
    model = load_model('path_to_your_trained_model.h5')
    ```
2. 準備輸入資料（必須符合模型要求格式）。
    ```python
    input_data = preprocess(your_raw_data)
    ```
3. 優化性能（可選）：壓縮模型或調整精度，例如利用 NVIDIA TensorRT 加速框架進行優化。
4. 部署到伺服器或邊緣裝置：
   - 雲端服務（如 AWS SageMaker）。
   - 本地裝置（如 Raspberry Pi）。

### 🔍 查詢階段

查詢階段是指當有新的輸入資料時，執行推論來獲得結果。以下列出典型流程：

1. 接收輸入資料：
    ```python
    new_input = fetch_user_query()
    ```
2. 預處理資料：
    ```python
    processed_input = preprocess(new_input)
    ```
3. 執行推論：
    ```python
    prediction = model.predict(processed_input)
    ```
4. 後處理結果（例如轉換成可讀格式）。
5. 回傳給使用者或其他系統模組。

---

## 補充說明

### 🔧 關鍵技術工具

| 工具名稱            | 功能描述                          | 適用場景                    |
|---------------------|-----------------------------------|-----------------------------|
| TensorFlow Serving  | 用於部署機器學習模型             | 雲端伺服器、大型應用         |
| ONNX Runtime        | 支援多框架的輕量級推論           | 客戶端、小型嵌入式裝置       |
| NVIDIA TensorRT     | GPU 加速框架                     | 高性能需求                   |
| OpenVINO            | Intel 邊緣運算優化工具           | IoT 裝置                    |

### 🧠 延伸／常見誤解

- 誤解：「Inference 就是 Training 的一部分。」
  - 澄清：Inference 是獨立於 Training 階段的，它只利用已訓練好的模型進行預測，而不會改變模型參數。
  
- 誤解：「越大的模型越適合做 Inference。」
  - 澄清：較大的模型雖然可能有更高準確度，但也可能導致速度較慢，因此需要權衡效能與精度。例如移動設備通常偏好輕量化版本，如 MobileNet V2。
