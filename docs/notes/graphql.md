---
title: "GraphQL"
slug: "/notes/graphql"
tags:
  - "API"
  - "WebDevelopment"
  - "Backend"
  - "DatabaseQuery"
  - "RestAlternative"
---
## What？
GraphQL 是一種 API 查詢語言和運行時環境，允許客戶端精確指定所需的資料結構。與 REST API 不同，GraphQL 使用單一端點並允許客戶端定義回應的形狀，避免「over-fetching」（獲取不需要的資料）和「under-fetching」（需要多次請求）的問題。

GraphQL 基於強類型系統，所有可用的欄位和操作都在 schema 中明確定義。客戶端傳送 query 或 mutation 請求，GraphQL 伺服器根據 schema 驗證並執行，返回 JSON 格式的結果。GraphQL 也支援 subscription 用於實時資料推送，可與 資料庫查詢 技術結合。

實際應用中，GraphQL 被 Facebook、GitHub、Shopify 等大型平台採用。例如，一個電商應用可以透過單個 GraphQL query 同時獲取使用者信息、訂單歷史和推薦商品，而 REST 可能需要 3 個不同的端點。

---

## Who？
- **前端工程師** - 使用 GraphQL query 獲取精確所需資料
- **後端開發者** - 設計和實現 GraphQL schema 及 resolver
- **API 設計者** - 決定 GraphQL 還是 REST 架構
- **移動應用開發者** - 通過 GraphQL 優化網路流量
- **全棧開發者** - 整合前後端的 GraphQL 數據流

---

## When？
1. **複雜資料需求** - 前端需要多個相關資料源的靈活組合
2. **移動應用開發** - 減少網路請求和資料傳輸量
3. **多客戶端應用** - Web、iOS、Android 需要不同資料結構
4. **實時應用** - 使用 subscription 實現即時資料更新

---

## Where？
1. **API 層** - GraphQL 伺服器處理所有查詢和變更操作
2. **Schema 定義** - 中心化的型別系統定義所有資料和操作
3. **resolver 函數** - 連結 schema 欄位與實際資料源（資料庫、微服務）
4. **客戶端層** - 使用 Apollo Client、Relay 等庫發送 query

---

## Why？
**效率提升** - 客戶端只請求需要的欄位，減少網路傳輸；一個 query 獲得多層級資料。

**開發體驗** - 強型別 schema 提供自動補全和文檔；前後端可並行開發。

---

## How？

### 🛠️ 建立階段
```javascript
// 定義 GraphQL Schema
const typeDefs = `
  type User {
    id: ID!
    name: String!
    posts: [Post!]!
  }
  type Query {
    user(id: ID!): User
  }
`;

// 定義 Resolver
const resolvers = {
  Query: { user: (_, { id }) => getUserById(id) },
  User: { posts: (user) => getPostsByUserId(user.id) }
};
```

### 🔍 查詢階段
```graphql
# 客戶端 GraphQL Query
query GetUserWithPosts($userId: ID!) {
  user(id: $userId) {
    name
    email
    posts {
      title
      content
    }
  }
}

# Mutation 修改資料
mutation CreatePost($title: String!, $content: String!) {
  createPost(title: $title, content: $content) {
    id
    title
    author {
      name
    }
  }
}
```

---

## 補充說明

### 📌 範例比較

| 面向 | GraphQL | REST API | gRPC |
|------|---------|----------|------|
| 資料格式 | JSON，精確 | JSON，固定結構 | Protocol Buffers |
| 學習曲線 | 中等 | 低 | 高 |
| 快取支援 | 需特殊處理 | HTTP 快取友善 | 無 HTTP 快取 |
| 即時更新 | Subscription | Polling | Streaming |

### 🧠 延伸／常見誤解
**誤解 1** - GraphQL 比 REST 一定更快。不當使用可能導致 N+1 查詢問題。需透過 batch loading 優化。

**誤解 2** - GraphQL 無法快取。需要應用層快取（Apollo Cache）支援。
