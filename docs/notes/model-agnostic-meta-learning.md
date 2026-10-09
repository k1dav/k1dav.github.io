---
title: "Model-Agnostic Meta-Learning"
slug: "/notes/model-agnostic-meta-learning"
tags:
  - "DeepLearning"
  - "FewShot"
  - "MachineLearning"
  - "MetaLearning"
  - "Optimization"
---
## What？

Model-Agnostic Meta-Learning（MAML，模型無關元學習）是一種元學習演算法，讓模型能從少量樣本快速學習新任務。MAML 的核心想法是找到一個好的初始參數，使得模型只需少量梯度更新就能適應新任務。

元學習的目標是「學會學習」。傳統機器學習在給定充足資料時表現好，但當資料稀少時失效。MAML 通過在多個相關任務上訓練，學習一個對新任務高度敏感的參數初始化。當遇到新任務時，只需要少量資料和少量梯度步驟，就能快速調整參數。

例如：訓練手寫數字辨識的 MAML 模型，在看到少量新使用者的筆跡樣本後，能快速學會辨識其風格。這與傳統方法對比鮮明，傳統方法需要大量新使用者樣本才能學習。

MAML 與 [Deep Learning](/docs/notes/deep-learning) 和 [Transformer](/docs/notes/transformer) 等框架完全相容。它不依賴於特定的網路結構，只是提供一個不同的訓練策略，使得學到的參數更容易適應新任務。

---

## Who？

- **機器學習研究員**：從事元學習和少樣本學習研究
- **計算機視覺工程師**：開發少樣本圖像分類系統
- **自然語言處理工程師**：構建快速適應新語言的 NLP 模型
- **機器人研究者**：機器人快速學習新任務的應用
- **資料科學家**：處理資料稀少的應用場景

---

## When？

1. **少樣本學習**：只有 5 張新貓咪品種的圖片，需要快速訓練分類器
2. **個性化推薦**：新用戶只有幾次點擊行為，系統需快速學習其偏好
3. **多任務快速適應**：自動駕駛模型需在新城市快速適應道路規則
4. **醫療影像診斷**：罕見病症樣本極少，需要模型從少量例子快速學習

---

## Where？

1. **訓練流程的梯度計算**：MAML 涉及二階導數，在反向傳播中實現
2. **參數更新策略**：代替傳統的單次參數更新，採用兩層優化
3. **任務採樣機制**：訓練時需要批量採樣相關任務，進行多任務學習
4. **評估階段**：新任務測試時執行內層優化（Inner Loop）

---

## Why？

MAML 解決的核心問題是**少樣本學習的效率**。傳統監督學習需要海量資料，但現實中很多場景資料稀缺。MAML 通過元學習思想，讓模型從眾多相關任務的經驗中學習，獲得快速適應新任務的能力。

其次，實現**泛化性強的初始化**。不同於隨機初始化，MAML 學到的初始參數對各種新任務都敏感，只需一個或兩個梯度步驟就能顯著改進。第三，支持**多任務遷移學習**，比傳統遷移學習更靈活。

---

## How？

### 🛠️ 建立階段

**MAML 訓練框架：**
```python
import torch
import torch.nn as nn

# 定義任務採樣和內層優化
def inner_loop(model, task_data, inner_lr, inner_steps):
    for _ in range(inner_steps):
        loss = compute_loss(model, task_data)
        grads = torch.autograd.grad(loss, model.parameters())
        for param, grad in zip(model.parameters(), grads):
            param.data -= inner_lr * grad

# 外層優化：在多個任務上優化元參數
meta_optimizer = torch.optim.Adam(model.parameters(), lr=meta_lr)
for batch_tasks in task_batches:
    meta_loss = 0
    for task in batch_tasks:
        inner_loop(model, task, inner_lr=0.01, inner_steps=5)
        meta_loss += compute_loss(model, task)
    meta_optimizer.zero_grad()
    meta_loss.backward()
    meta_optimizer.step()
```

### 🔍 查詢階段

**新任務的快速適應：**
```python
# 使用訓練好的元模型快速學習新任務
new_task_model = copy.deepcopy(meta_model)
new_task_data = few_shot_samples  # 少量新任務樣本

# 執行內層優化適應新任務
for _ in range(5):  # 少量梯度步驟
    loss = compute_loss(new_task_model, new_task_data)
    grads = torch.autograd.grad(loss, new_task_model.parameters())
    for param, grad in zip(new_task_model.parameters(), grads):
        param.data -= 0.01 * grad

# 測試新任務
predictions = new_task_model(test_data)
```

---

## 補充說明

### 📌 範例比較

| 方法 | 資料需求 | 適應速度 | 計算成本 | 適用場景 |
|-----|--------|--------|--------|--------|
| MAML | 少量 | 極快 | 高 | 少樣本學習 |
| 微調 | 中等 | 中等 | 中等 | 遷移學習 |
| 零樣本 | 無 | 即時 | 低 | 極限場景 |
| 傳統訓練 | 大量 | 正常 | 中等 | 常規場景 |

### 🧠 延伸／常見誤解

**誤解 1**：MAML 能用極少樣本（1-2 個）學習新任務。實際上通常需要 5-10 個樣本才能有效。太少樣本即使是 MAML 也難以有效工作。

**誤解 2**：MAML 的計算成本與普通訓練相同。實際上 MAML 需要計算二階導數，計算量是普通訓練的 5-10 倍。

**延伸**：[機器學習](/docs/notes/machine-learning) 中的 [Embedding](/docs/notes/embedding) 技術與 MAML 結合，能進一步提升少樣本學習效果。
