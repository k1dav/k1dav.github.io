---
title: "RESTful"
slug: "/notes/restful"
tags:
  - "Web"
  - "Development"
  - "API"
  - "Design"
  - "Software"
  - "Architecture"
---
## What？

**RESTful** 是一種基於 **REST (Representational State Transfer)** 架構風格的 API 設計方式，主要用於建立可擴展且易於維護的 Web 服務。它以 HTTP 為基礎，透過特定的 URL 和方法（如 **GET**、**POST**、**PUT**、**DELETE**），讓客戶端與伺服器之間進行互動。簡單來說，RESTful 就是規範如何設計 API，使其具備一致性、可讀性與標準化。

舉個例子，如果你在開發一個電商網站，使用 RESTful API 設計可以幫助你清楚地定義如何查詢商品列表（使用 **GET /products**）、新增商品（使用 **POST /products**）、更新商品資訊（使用 **PUT /products/{id}**）或刪除商品（使用 **DELETE /products/{id}**)。

---

## Who？

任何需要設計或使用 Web API 的技術工作者都會接觸到 RESTful。以下是一些主要受影響的角色：

- **後端工程師：** 負責設計及實現 RESTful API。
- **前端工程師：** 利用 RESTful API 從伺服器獲取資料或提交資料。
- **[DevOps](/docs/notes/devops) 團隊：** 管理部署與監控 RESTful 相關服務。
- **產品經理：** 理解 RESTful 的概念有助於更清楚地溝通需求。

例如，一名前端工程師可能需要透過 RESTful API 從後端獲取用戶資料並顯示在頁面上，而後端工程師則會負責設計提供該資料的接口。

---

## When？

RESTful API 通常在以下情境中被選擇使用：

1. **開發 Web 應用程式時：**
   - 例如，社交平台需要提供一系列接口來查詢貼文、送出留言等功能。
2. **整合第三方服務時：**
   - 如支付系統整合 Stripe 的 RESTful API。
3. **多設備支援時：**
   - 手機 App 和桌面版應用程式需要共用同一套數據接口。

總之，只要涉及到系統間溝通且需要高效傳輸資料，就可能會考慮採用 RESTful。

---

## Where？

RESTful 通常存在於 Web 應用架構中的「伺服器層」，負責提供操作資源的接口。大致分為以下部分：

1. **API Gateway 或 Web Server:**
   - 接收外部請求並將其轉發給內部服務，例如 Nginx 或 AWS API Gateway。
2. **應用邏輯層:**
   - 實際處理請求並操作資源，例如 Django 或 Express.js 所撰寫的業務邏輯。
1. **[Database](/docs/notes/database)層:**
   - 儲存和管理資源，例如 MySQL 或 MongoDB。

這些部分共同合作，實現完整的 RESTful 操作流程。

---

## Why？

採用 RESTful 解決了許多傳統 Web API 設計中的問題，包括：

1. **標準化規範：**
   - 每個操作對應特定 HTTP 方法，減少溝通成本。例如，用戶知道 DELETE 一定是刪除資源。
2. **簡潔易懂：**
   - URL 結構清晰，例如 `/users/123/posts` 很容易理解是查詢某位用戶的貼文。
3. **可擴展性強：**
   - 資源導向設計讓系統能輕鬆新增模組而不影響既有功能。
4. **跨平台支持：**
   - 因為基於 HTTP 協議，無論是手機 App 還是瀏覽器都能輕鬆整合。

例如，你可以輕鬆拓展現有電商系統，加入新功能如「分類搜尋」，而不影響既有商品查看功能。

---

## How？

### 🛠️ 建立階段

建立 RESTful 系統時通常遵循以下流程：

1. 定義資源：
   - 確認系統中的主要資源，如 `users` 或 `products`。
2. 規劃 URL 結構：
   - 使用直觀命名，如 `/users/{id}` 表示某位用戶資訊。
3. 指定 HTTP 方法：
   - 為每種操作選擇適當的方法，如 GET 查詢、POST 新增等。
4. 實現業務邏輯：
   - 在後端撰寫針對每個操作的處理邏輯，例如 Django 中建立 view function 處理請求。
5. 撰寫文件：
   - 提供詳細的 [API](/docs/notes/api) 文件以便其他人理解和使用，例如 Swagger 文檔。

### 🔍 查詢階段

當客戶端與伺服器互動時，一般會經歷以下步驟：

1. 客戶端發送請求：
    ```bash
    curl --request GET 'https://api.example.com/users/123'
    ```
    使用工具如 Postman 測試上述指令也很方便！
2. 伺服器解析請求：
    根據 URL 和方法確定要執行哪段邏輯，比如 Django 的路由匹配 `GET /users/<id>` 到特定函式處理程序。
3. 操作資料庫並回傳結果：
    根據需求從資料庫查詢或更新資料，再將結果封裝成 JSON 格式回傳給客戶端。範例如下：
    ```json
    {
      "id": "123",
      "name": "Alice",
      "email": "alice@example.com"
    }
    ```

---

## 補充說明

### 📌 範例比較

以下是不同風格設計的一些差異比較：

| 特性            | 傳統 RPC 風格                    | RESTful 風格                |
|-----------------|---------------------------------|---------------------------|
| URL 表達方式     | `/getUserData?id=123`          | `/users/123`             |
| 操作方法         | 自訂方法名，如 `getUserData()`  | 標準 HTTP 方法，如 `GET` |
| 易讀性           | 比較低                         | 高                        |

### 🧠 延伸／常見誤解

#### 誤解一：「所有 HTTP 接口都是 REST」
事實上只有符合特定規範（如遵循資源導向）的接口才算真正意義上的 REST。如直接將所有 CRUD 操作放入 POST 方法，不符合原則，因此不能稱為完全的 REST 。

#### 誤解二：「JSON 格式必然代表 REST」
雖然 JSON 是常見格式，但 XML 或其他格式也可以被採用于真正的 REST 系統，只要符合它的方法和架構原則即可！

#### 延伸應用：「GraphQL 與 Rest 的差異」
如果你的情境更注重靈活查詢單一入口，可以考慮 GraphQL，但它仍然與 Rest 不相同！
