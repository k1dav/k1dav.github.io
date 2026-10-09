---
title: "Message Queue"
slug: "/notes/message-queue"
tags:
  - "AsynchronousProcessing"
  - "Backend"
  - "DistributedSystems"
  - "Infrastructure"
  - "messaging"
---
## What？

Message Queue（訊息佇列）是一種異步通訊機制，允許應用程式之間通過傳遞訊息進行解耦通訊。系統不需要直接呼叫，而是將訊息發送到佇列中，由接收方按自己的速度取出處理。

典型例子：電商平台中，用戶提交訂單時，訂單服務將訂單事件發送到 Message Queue，庫存服務、支付服務、通知服務等可以獨立地消費這條訊息。這樣即使某個服務暫時故障，也不會影響訂單服務的運行。

Message Queue 的核心優勢在於實現了 Producer 和 Consumer 的時間解耦和空間解耦。生產者不需要等待消費者處理完成，消費者也不需要即時線上。系統的各個模組可以獨立擴展，提高了整體的可靠性和效能。

RabbitMQ 基於 AMQP 協議，提供可靠的訊息傳遞；Apache Kafka 則是高吞吐量的事件流平台，適合處理大規模資料流。選擇哪個平台取決於場景需求：低延遲選 RabbitMQ，大規模流處理選 Kafka。

---

## Who？

- **後端開發者**：實現非同步任務和事件驅動架構
- **DevOps 工程師**：部署和維護訊息佇列基礎設施
- **資料工程師**：使用 Kafka 進行資料流管道建設
- **系統架構師**：設計分散式系統的通訊層
- **QA 工程師**：測試非同步系統的正確性

---

## When？

1. **高併發場景**：秒殺活動中，將大量訂單請求放入佇列，後端逐一處理
2. **非同步任務**：使用者上傳檔案後，圖像縮圖、病毒掃描等耗時操作在背景進行
3. **跨服務通訊**：訂單服務、支付服務、物流服務需要協調時，通過訊息佇列解耦
4. **資料同步**：主資料庫變更事件通過 Kafka 流向搜尋引擎、快取、資料倉儲等

---

## Where？

1. **應用層和應用層之間**：服務之間的非同步通訊
2. **資料管道中**：從資料源到資料處理層再到儲存層
3. **事件驅動系統的核心**：事件產生者發送，事件消費者接收
4. **監控告警系統**：應用程式日誌、指標數據通過訊息佇列流向分析系統

---

## Why？

解決的核心問題是**系統耦合性**和**效能瓶頸**。在同步直呼架構中，一個服務故障會導致整個鏈條中斷。通過訊息佇列，實現了服務解耦——即使一個服務離線，其他服務仍能繼續工作。

其次，提高**系統吞吐量**。Message Queue 可以快速接收訊息並立即返回，不需等待後端處理完成，大幅提升使用者體驗。第三點是實現**最終一致性**，分散式系統中難以保證強一致性，Message Queue 幫助實現非同步的業務流程協調。

---

## How？

### 🛠️ 建立階段

**安裝 RabbitMQ：**
```bash
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 \
  -e RABBITMQ_DEFAULT_USER=guest \
  -e RABBITMQ_DEFAULT_PASS=guest \
  rabbitmq:3-management
```

**Python 生產者代碼：**
```python
import pika

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()
channel.queue_declare(queue='order_queue', durable=True)
channel.basic_publish(exchange='', routing_key='order_queue', body='Order #12345')
```

### 🔍 查詢階段

**消費者接收訊息：**
```python
def callback(ch, method, properties, body):
    print(f"收到訊息: {body.decode()}")
    ch.basic_ack(delivery_tag=method.delivery_tag)

channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue='order_queue', on_message_callback=callback)
channel.start_consuming()
```

---

## 補充說明

### 📌 範例比較

| 特性 | RabbitMQ | Apache Kafka | AWS SQS |
|-----|----------|-------------|---------|
| 協議 | AMQP | Binary | HTTP |
| 吞吐量 | 中等 | 極高 | 中等 |
| 延遲 | 毫秒級 | 秒級 | 毫秒級 |
| 持久化 | 支援 | 支援 | 完全托管 |

### 🧠 延伸／常見誤解

**誤解 1**：Message Queue 會使系統變快。實際上，它增加了延遲，但提升了吞吐量。適合高併發、對單次響應時間要求不高的場景。

**誤解 2**：所有服務間通訊都應該用訊息佇列。某些需要即時回應的操作（如 API 直呼）更適合同步通訊。Message Queue 是選擇性工具。
