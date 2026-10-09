---
title: "Four-Step Test"
slug: "/notes/four-step-test"
tags:
  - "技術分析"
  - "測試方法"
  - "問題解決"
---
## What？

**Four-Step Test** 是一個用於測試系統或功能的流程，它將整個測試過程分為四個清晰的步驟，幫助技術工作者有效地定位問題、驗證假設並確保系統正常運作。

簡單來說，這就像拆解問題的「分段檢查表」，能確保每一步驟都被完整覆蓋。舉例來說，如果您在開發 API 時遇到功能異常，可以透過 Four-Step Test 系統性地檢查問題來源並快速找到解決方案。

---

## Who？

這套流程主要針對技術工作者，例如：
- **Backend Engineer**：用於檢查後端邏輯錯誤
- **QA Engineer**：確認系統是否符合預期規格
- **DevOps Engineer**：排除部署或架設中的問題

此外，它對任何需要進行系統測試或功能驗證的人都非常有幫助，例如資料分析師在處理 ETL 流程中遇到資料轉換錯誤時，也可以參考此方法。

---

## When？

通常會在以下時機使用：
1. 功能開發完成後，需要進行 **Unit Test**
2. 系統整合時，進行 **Integration Test**
3. 部署前的最終確認（例如 **Pre-production Test**）
4. 運維期間發現異常時，進行故障診斷

舉例來說，若您剛完成某一段新功能開發，但發現回傳結果不一致，就可以立即啟動此流程來快速定位問題。

---

## Where？

Four-Step Test 的流程通常出現在以下架構部分：
1. **Application Layer**：測試應用邏輯，例如 API 呼叫是否正確
2. **Data Layer**：檢查資料庫相關操作是否符合預期（如 SQL 查詢）
3. **Infrastructure Layer**：確認伺服器配置是否正常（如 Load Balancer 行為）

舉例來看，在 Microservices 架構中，各服務之間的互動通常需要逐層檢查，而 Four-Step Test 可精準鎖定是哪一層出了問題。

---

## Why？

它主要解決了以下問題：
1. 減少模糊不清的故障診斷時間
2. 幫助技術工作者排除多餘假設，專注於真正關鍵點
3. 提供系統化的步驟避免遺漏

例如，在多層架構中，一個前端顯示錯誤可能牽涉到後端 API、資料庫或伺服器設定等多種可能性。透過 Four-Step Test，可以逐步縮小範圍，減少不必要的反覆測試。

---

## How？

### 🛠️ 建立階段

建立 Four-Step Test 的核心流程如下：
1. 定義明確目標（例如：「API 回傳應該包含 status code 200」）
2. 設定測試環境並準備好相關工具（如 Postman 或 curl 測試 API）
3. 撰寫測試腳本，確保可以重現相同情境
4. 設定監控機制記錄每一步結果（如 Log 或 Console Output）

程式邏輯範例如下：

```python
def four_step_test(api_url):
    # Step 1: Check Connection
    response = requests.get(api_url)
    if response.status_code != 200:
        return "Connection Error"
    
    # Step 2: Validate Response Format
    try:
        data = response.json()
    except ValueError:
        return "Invalid JSON Format"
    
    # Step 3: Check Data Integrity
    if 'key_field' not in data:
        return "Missing key_field in Response"
    
    # Step 4: Ensure Business Logic Meets Expectation
    if data['key_field'] != expected_value:
        return "Unexpected Value in key_field"
    
    return "Test Passed!"
```

### 🔍 查詢階段

當執行具體查詢時，可以按照以下條列流程：
1. 問題描述清楚：「API 的 status code 不為 200」
2. 第一步檢查網路連線是否正常（Ping 或 curl 測試）
3. 第二步確認返回格式是否符合 JSON 格式要求（使用 `response.json()` 嘗試解析）
4. 第三步驗證回傳內容是否包含必要欄位（如 `key_field`）
5. 最終比對業務邏輯需求與實際內容是否一致

透過以上查詢階段，就能一步步縮小範圍並找出最終原因。

---

## 補充說明

### 🔧 關鍵技術工具

| 工具名稱      | 用途                     | 支援平台           |
|---------------|--------------------------|--------------------|
| Postman       | API 測試                 | Windows/Mac/Linux |
| curl          | 網路請求工具             | Unix-based        |
| Pytest        | 單元測試框架             | Python             |
| Elasticsearch | 日誌集中管理與分析       | Cloud/On-premise  |

### 📌 範例比較

以下是不同類型測試方法與 Four-Step Test 的比較：

| 類型                | 定位速度   | 精準度   | 操作難易度   |
|---------------------|-----------|---------|-------------|
| Unit Testing        | 高         | 高       | 中           |
| Integration Testing | 中         | 中       | 高           |
| Four-Step Test      | 高         | 高       | 中           |

### 🧠 延伸 / 常見誤解

- 誤解：Four-Step Test 僅適合大型系統  
  澄清：它其實適用於所有需要結構化排錯的小型應用程式或腳本。

- 誤解：四個步驟必須全部執行  
  澄清：根據情境有些步驟可以跳過，例如如果已知網路連線正常就可直接從第二步開始。

### 🧠 參考資料
[https://www.facebook.com/share/1CjQpnXd92/](https://www.facebook.com/share/1CjQpnXd92/ "https://www.facebook.com/share/1CjQpnXd92/")
#### 第一步：是否為五角大廈的「最高優先事項」？

這一步的重點在於，產品所要解決的問題，必須是美國國防部（五角大廈）認定最迫切、最關鍵的挑戰之一。這不僅僅是「軍方某個單位有這個需求」，而是必須上升到戰略層級的高度。

📌 **背後原因**  
拉奇解釋，只有被列為最高優先級的專案，才能獲得足夠的政治動能去突破官僚體制的層層阻礙。這意味著能快速取得認證、快速部署到部隊。如果選擇一個低優先級的專案，即使技術再好，也可能在繁瑣的行政流程中耗費數年，最終錯失時機。這是確保產品能產生即時影響力的務實考量。

---

#### 第二步：美國國會是否在乎？（Does the U.S. Congress care about it?）

這一步雖然聽起來很「政治」，但卻是殘酷的現實。產品的目標領域，必須是美國國會議員們關心且願意投入預算的範疇。

📌 **背後原因**  
在美國，國會掌握著「錢包的權力」（Power of the Purse）。如果國會議員們不認為某個威脅重要，他們就不會撥款採購對應的解決方案。拉奇坦言，他曾因此親手終結一些自己非常喜歡、且技術上很出色的專案，只因他判斷這些專案在政治上不會獲得支持。從商業道德上來看，花費投資人的錢去打造一個註定不會被採購的產品，只是在滿足自己的虛榮心，並不負責。

---

#### 第三步：其他公司是否做得「很差」？（Are other companies doing it poorly?）

Anduril 不會輕易進入一個已經有優秀公司提供良好解決方案的領域。他們專門尋找那些由現有國防承包商主導，但產品性能低下、成本高昂或效率不彰的市場。

📌 **背後原因**  
拉奇指出，他希望透過改善整體國家安全來創造價值，而不是僅僅追求商業利益。如果市場上已有卓越解決方案，即便 Anduril 能提供稍微更佳版本，也無法顯著提升整體效益。因此，他更傾向於鎖定那些效率低落且被市場長期忽視或容忍的不良產品與公司。他形容自己擁有一種「殺手本能」，目標是在找到那些「理應被淘汰」但仍存活於行業中的公司後，「將他們踹到坑裡並取而代之」。此策略也激勵內部團隊，使其感受到自己正在對抗損害公共利益、只求獲利的不良體制，而非只是與另一家優秀公司競爭。

---

#### 第四步：這是 Anduril 能「做得好」的事嗎？（Is it something Anduril can do well?）

在決定投入前，公司必須誠實評估自己是否具備成功執行該專案所需的一切，包括技術實力、人才資源與基礎設施。

📌 **背後原因**  
拉奇強調，此項檢視關乎時機與公司能力邊界。他指出，公司能力隨著組織演化而提升。例如三年前無法完成某些任務，但現在可能已具備相應條件。在啟動新專案之前，需要問：「我們現在是否擁有適合的人才與資源？」如果答案是否定，那麼當務之急就是先建立適合該任務需求的人才團隊，而非立刻投入研發。此策略性自我認知確保了每個新項目的準備充分性與執行成功率。

---

🧠 **延伸說明：如何應用四步測試進行篩選？**

四步測試是一種嚴格且多維度評估框架，它結合以下核心考量：
1. **市場需求**：聚焦於五角大廈戰略層級挑戰。
2. **資金可行性**：確保美國國會支持並提供預算。
3. **競爭劣勢分析**：確認現存解決方案存在重大缺陷。
4. **自身能力匹配度**：評估內部技術及人才能否支撐成功執行。

通過此框架篩選後，即使產品具備高度潛力，也可能因外部因素或執行困難導致失敗。在此情況下，公司需果斷終止項目並重新分配資源至更具價值領域，以最大化對整體目標達成之影響力。

🤝 此外，由於上述方法涉及政治影響、競爭格局及內部能力構建等多方因素，因此需要密切監控外部環境變化，例如政策走向、新興技術突破，以及組織自身演化速度，以便調整策略方向。

[](https://www.facebook.com/photo/?fbid=10162074140038318&set=a.177939948317&__cft__[0]=AZXS-eOsR7DzBFqEQzwG0wdKCK9oxSoaVRz4LmFBvjA7lj17nbWaRJtqbU-UkxToPXy8ZhBXUmNbecAN7VmEdS80k_U9bUx5NjwbjdBPaPWR5MyXRz8XnKReFkkZTnt6z-aLdZF6WFrODTZzxGXOKSo5-bGgmHpjKk4PiAqnTwsgbA&__tn__=EH-R)
