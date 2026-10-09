---
title: "NoSQL"
slug: "/notes/nosql"
tags:
  - "Backend"
  - "BigData"
  - "DataStorage"
  - "Database"
  - "DistributedSystems"
---
## What？

NoSQL（非 SQL 資料庫）是對應於傳統關聯式資料庫的一類資料庫，不使用 SQL 語言查詢，而是採用多種不同的資料模型和查詢方式。NoSQL 包括四大主要類型：Document Store（文檔型）、Key-Value Store（鍵值型）、Graph Database（圖型）、Column-Family Store（列族型）。

文檔型資料庫（如 MongoDB）將資料存儲為半結構化 JSON 文檔，適合靈活的資料結構。鍵值型資料庫（如 Redis）提供極快的讀寫性能，常用於快取。圖型資料庫（如 Neo4j）優化社交網路、知識圖譜等關係密集的資料。列族型資料庫（如 HBase）針對超大規模資料進行優化。

與傳統 SQL 資料庫不同，NoSQL 放棄了嚴格的 ACID 事務和預定義的 Schema，換來了水平擴展能力和更高的性能。這種權衡特別適合網際網路應用，其中資料量大、並發高、對即時一致性要求不如傳統金融系統嚴格。

NoSQL 的「No SQL」實際上是「Not Only SQL」的縮寫，表示不限於 SQL，而是多種資料庫技術的統稱。

---

## Who？

- **後端工程師**：選擇合適的 NoSQL 資料庫構建應用
- **資料工程師**：設計大規模資料儲存和處理管道
- **系統架構師**：設計可擴展的分散式系統架構
- **DevOps 工程師**：部署和維護 NoSQL 叢集
- **資料科學家**：處理非結構化資料和圖形資料

---

## When？

1. **大規模資料儲存**：社交媒體平台儲存數百億用戶貼文，傳統資料庫難以擴展
2. **實時快取層**：購物網站用 Redis 快取熱門商品資訊，毫秒級回應
3. **圖形資料分析**：推薦系統中用圖型資料庫儲存用戶-商品-標籤關係
4. **時間序列資料**：IoT 感測器數據、股票行情等需要高效儲存和查詢

---

## Where？

1. **應用層資料存儲**：應用直接讀寫業務資料到 NoSQL
2. **快取層**：Redis、Memcached 用於加速熱資料訪問
3. **資料倉儲層**：HBase、Cassandra 儲存海量原始資料
4. **實時計算管道**：Kafka 結合 MongoDB 進行流資料處理

---

## Why？

NoSQL 解決的核心問題是**傳統資料庫的擴展性瓶頸**。關聯式資料庫通過垂直擴展（更強的硬體），但成本指數增長且存在上限。NoSQL 支持水平擴展（增加伺服器），能應對互聯網級別的資料量。

其次，提供**靈活的資料模型**。不同應用有不同資料特點，預定義 Schema 的 SQL 資料庫容易成為瓶頸。NoSQL 允許動態修改資料結構，適應快速變化的業務需求。第三是**高效能**，不同 NoSQL 資料庫針對特定查詢模式優化，性能遠超通用 SQL 資料庫。

---

## How？

### 🛠️ 建立階段

**MongoDB 文檔型資料庫：**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**Python 連線和插入：**
```python
from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client['social_network']
users = db['users']

# 插入靈活的文檔資料
users.insert_one({
    'name': 'Alice',
    'age': 25,
    'hobbies': ['reading', 'gaming'],
    'profile': {'city': 'Taipei', 'verified': True}
})
```

**Redis 鍵值型資料庫：**
```python
import redis

r = redis.Redis(host='localhost', port=6379)
r.set('user:1:name', 'Bob', ex=3600)  # 設定過期時間
value = r.get('user:1:name')
```

### 🔍 查詢階段

**MongoDB 查詢：**
```python
# 複雜查詢支持
results = users.find({
    'age': {'$gt': 20},
    'hobbies': {'$in': ['reading']}
})
```

**Redis 列表和集合：**
```python
r.lpush('recommendations:1', 'product_101', 'product_102')
recommendations = r.lrange('recommendations:1', 0, -1)
```

---

## 補充說明

### 📌 範例比較

| 資料庫 | 類型 | 一致性 | 擴展性 | 查詢能力 |
|------|-----|------|------|--------|
| MongoDB | Document | 強 | 高 | 豐富 |
| Redis | Key-Value | 弱 | 高 | 簡單 |
| Neo4j | Graph | 強 | 中 | 圖形遍歷 |
| HBase | Column-Family | 最終 | 極高 | 掃描 |

### 🧠 延伸／常見誤解

**誤解 1**：NoSQL 比 SQL 資料庫更快。實際上 NoSQL 針對特定工作負載優化，對非預期查詢性能可能更差。Redis 快於 MongoDB，MongoDB 快於 HBase。

**誤解 2**：NoSQL 不需要 Schema。實際上應用層仍需定義隱含 Schema，NoSQL 只是將約束從資料庫層轉移到應用層。

**延伸**：結合 [Kubernetes](/docs/notes/kubernetes) 可實現 NoSQL 資料庫的自動擴展和高可用部署。
