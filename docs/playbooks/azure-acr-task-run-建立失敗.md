---
title: "Azure ACR Task Run 建立失敗"
slug: "/playbooks/azure-acr-task-run-建立失敗"
---
## 問題排解：Azure ACR Task Run 建立失敗

這份筆記記錄了在使用 Azure Container Registry (ACR) Task 時，遇到建立失敗問題的解決方法。

---

## 問題描述

在短時間內，連續、頻繁地觸發 (Trigger) 同一個 ACR Task，可能會導致 Task Run 建立失敗。

## 可能原因

根據經驗，這種情況可能是因為 ACR Task 的後端狀態管理出現了暫時性的不一致或鎖定，導致在舊的 Task Run 尚未完全結束或狀態更新完成時，新的 Task Run 無法正確初始化，抓取不到正確的狀態 (State)。

## 解決方案

當遇到此問題時，可以嘗試以下步驟來解決：

1.  **暫停觸發**：首先，停止所有會自動或手動觸發該 ACR Task 的行為。
2.  **等待一段時間**：給予系統一些時間（例如 5-10 分鐘），讓後端的狀態同步完成。
3.  **重新導入或更新任務**：
    -   可以嘗試對該 ACR Task 進行一次無實質內容變更的更新（例如，重新 `az acr task update`）。
    -   在某些情況下，可能需要重新導入 (Import) 該 Task 的設定。
4.  **手動觸發一次**：在確認系統已穩定後，手動觸發一次 Task Run，觀察其是否能成功執行。

## 總結
為避免 Azure ACR Task 因頻繁觸發而建立失敗，建議在設計 CI/CD 流程時，加入適當的延遲或佇列機制，避免在短時間內對同一個 Task 進行轟炸式的請求。當問題發生時，透過暫停、等待並重新同步任務狀態，通常可以解決問題。

---
tags: #Troubleshooting #Azure #ACR #DevOps
