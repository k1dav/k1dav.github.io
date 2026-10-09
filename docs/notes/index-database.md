---
title: "Index Database"
slug: "/notes/index-database"
tags:
  - "Database"
  - "QueryOptimization"
  - "DataStructure"
  - "PerformanceTuning"
  - "SQL"
---
## What？
Index Database（資料庫索引）是為了加速資料查詢而建立的特殊資料結構。類似於書籍的目錄，索引讓資料庫能夠不掃描所有行就快速定位資料。常見索引類型包括 B-tree（平衡樹，最通用）、Hash Index（哈希表，精確匹配快）、和 Inverted Index（倒排索引，全文搜尋）。

B-tree 索引是關係型資料庫的標準，它自動保持平衡並支援範圍查詢。Hash Index 更快用於等值比較但不支援範圍查詢。Inverted Index 在搜尋引擎和全文搜尋中廣泛應用，在 [LanceDB](/docs/notes/lancedb) 等向量資料庫和倒排索引系統中關鍵。

實務中，建立合適的索引是資料庫調優的關鍵。例如，在電商平台上，user_id 和 created_date 的索引能顯著加速訂單查詢，但過多索引會拖累寫入性能。

---

## Who？
- **資料庫管理員** - 設計和維護索引策略
- **後端工程師** - 識別慢查詢並建立適當索引
- **SQL 優化師** - 通過 EXPLAIN 分析和優化查詢計劃
- **搜尋工程師** - 設計倒排索引用於全文搜尋
- **DevOps 工程師** - 監測索引效能和儲存空間

---

## When？
1. **SELECT 查詢優化** - WHERE、JOIN、ORDER BY 條件上建立索引
2. **全文搜尋** - 使用倒排索引加速文本搜尋
3. **範圍查詢** - B-tree 索引支援 BETWEEN 和 < > 操作
4. **排序操作** - 索引欄位的 ORDER BY 可避免文件排序

---

## Where？
1. **儲存層** - 索引實際儲存在磁碟上，佔用額外空間
2. **查詢優化器** - 決定是否使用索引及選擇哪個索引
3. **寫入路徑** - INSERT、UPDATE、DELETE 時需同時更新索引
4. **快取層** - 頻繁存取的索引節點會被快取在內存中

---

## Why？
**查詢效能** - 不使用索引需要全表掃描 O(n)，使用 B-tree 索引可達 O(log n)。對百萬級數據，差異可達千倍。

**成本權衡** - 索引加速查詢但減速寫入，增加儲存空間。需根據應用的讀寫比例決策。

---

## How？

### 🛠️ 建立階段
```sql
-- B-tree 索引
CREATE INDEX idx_user_email ON users(email);

-- 複合索引（多欄位）
CREATE INDEX idx_order_date_user ON orders(user_id, created_date);

-- Hash 索引（InnoDB 自動使用）
CREATE INDEX idx_user_id USING HASH ON orders(user_id);

-- 唯一索引
CREATE UNIQUE INDEX idx_email_unique ON users(email);
```

### 🔍 查詢階段
```sql
-- 查詢使用索引的執行計畫
EXPLAIN SELECT * FROM users WHERE email = 'user@example.com';

-- 檢視所有索引
SHOW INDEXES FROM users;

-- 刪除索引
DROP INDEX idx_user_email ON users;
```

---

## 補充說明

### 📌 範例比較

| 索引類型 | 結構 | 查詢複雜度 | 範圍查詢 | 空間成本 |
|---------|------|---------|--------|--------|
| B-tree | 平衡樹 | O(log n) | 支持 | 中 |
| Hash | 哈希表 | O(1) | 不支持 | 低 |
| Inverted | 倒排表 | O(k) | 支持 | 高 |
| Bitmap | 位圖 | O(n/8) | 支持 | 極低 |

### 🧠 延伸／常見誤解
**誤解 1** - 建立越多索引越好。實際上，每個索引都增加寫入成本和儲存空間。應只建立頻繁查詢條件的索引。

**誤解 2** - 有索引就一定會被使用。資料庫優化器會根據統計資訊判斷，有時全表掃描反而更快。使用 EXPLAIN 驗證實際執行計畫。
