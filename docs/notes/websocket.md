---
title: "WebSocket"
slug: "/notes/websocket"
tags:
  - "WebSocket"
  - "Networking"
  - "Realtime"
  - "WebDevelopment"
  - "Protocol"
---
## WebSocket：實現即時雙向通訊

WebSocket 是一種在單一 TCP 連線中，提供全雙工通訊通道的網路通訊協定。它允許伺服器和客戶端之間進行雙向、即時的資料傳輸，是現代 Web 即時應用的基石。

## WebSocket vs. HTTP Polling

| 特性 | HTTP Polling (輪詢) | WebSocket |
| :--- | :--- | :--- |
| **通訊模式** | 半雙工 (請求-回應) | 全雙工 (雙向即時) |
| **連線方式** | 短連線 (每次請求建立新連線) | 長連線 (一次握手後保持連線) |
| **延遲** | 高，取決於輪詢間隔 | 非常低 |
| **開銷** | 每次請求都包含完整的 HTTP Header，開銷大 | 握手後資料幀開銷極小 |
| **適用場景** | 靜態內容、非即時互動 | 即時通訊、遊戲、股票報價、聊天室 |

## 工作原理

1.  **握手 (Handshake)**:
    -   客戶端發送一個特殊的 HTTP 請求 (帶有 `Upgrade: websocket` Header) 到伺服器，請求將連線升級。
    -   如果伺服器支援，它會回��一個特殊的 HTTP 回應，同意升級。
    -   一旦握手成功，這個 TCP 連線就從 HTTP 協定轉換為 WebSocket 協定。

2.  **資料傳輸 (Data Transfer)**:
    -   握手成功後，客戶端和伺服器之間就可以透過這個持久的連線，隨時互相發送資料。
    -   資料以「幀」(Frame) 的形式傳輸，不再需要每次都帶上笨重的 HTTP Header，因此非常高效。

## 關鍵使用場景

- **線上聊天室 (Chat Applications)**: 允許多個使用者之間即時發送和接收訊息。
- **即時多人遊戲 (Online Gaming)**: 快速同步玩家的操作和遊戲狀態。
- **協同編輯工具 (Collaborative Editing)**: 如 Google Docs，可以即時看到其他使用者的編輯內容。
- **金融股票報價 (Live Financial Tickers)**: 即時推送最新的股票價格和市場數據。
- **即時通知 (Real-time Notifications)**: 向使用者推送即時的通知或更新。

## 簡易程式碼範例 (JavaScript)

```javascript
// 建立 WebSocket 連線
const socket = new WebSocket('wss://your-websocket-server.com');

// 監聽連線成功事件
socket.onopen = function(event) {
  console.log('WebSocket 連線已建立！');
  // 發送訊息到伺服器
  socket.send('Hello Server!');
};

// 監聽從伺服器接收到的訊息
socket.onmessage = function(event) {
  console.log('從伺服器收到訊息: ' + event.data);
};

// 監聽連線關閉事件
socket.onclose = function(event) {
  if (event.wasClean) {
    console.log(`連線正常關閉, code=${event.code}, reason=${event.reason}`);
  } else {
    console.error('連線意外中斷');
  }
};

// 監聽錯誤事件
socket.onerror = function(error) {
  console.error(`WebSocket 錯誤: ${error.message}`);
};
```

## 總結
WebSocket 徹底改變了 Web 應用的互動模式。它透過建立一個持久的雙向通訊通道，解決了傳統 HTTP 輪詢帶來的延遲和資源浪費問題，使得開發高效能的即時應用（如線上聊天、協同編輯、即時遊戲等）變得簡單而高效。
