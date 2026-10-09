---
title: "Euclidean Distance"
slug: "/notes/euclidean-distance"
tags:
  - "AI"
  - "Geometry"
  - "MachineLearning"
  - "Mathematics"
---
## What？

**Euclidean Distance** 是一種用來衡量兩個點之間距離的數學方法。在二維平面或多維空間中，這個概念可以幫助我們計算點與點之間的最短直線距離。

舉例來說，如果你有兩個點 (x1, y1) 和 (x2, y2)，那麼 Euclidean Distance 就是從第一個點到第二個點的直線距離。它是一種「最直接」的距離測量方式，非常適合用於空間計算或座標標示相關的技術應用。

公式為：
$$
d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}
$$

當然，這不僅限於二維，也可以擴展到三維或更高維度。

---

## Who？

**誰會使用？**

- **資料科學家**：在進行資料分析時，常使用 Euclidean Distance 來評估資料點之間的相似性，例如在聚類演算法（如 K-Means）中。
- **機器學習工程師**：用於分類問題（如 [KNN](/docs/notes/knn) 演算法）和推薦系統。
- **地理信息系統（GIS）專家**：測量地理座標之間的實際距離。
- **遊戲開發者**：計算虛擬角色或物件之間的位置關係。

---

## When？

**什麼時候會使用？**

- 當需要比較多個資料點之間的相似性時，例如聚類分析。
- 在需要快速判斷某一物件與其他物件是否接近時，例如遊戲中的碰撞檢測。
- 進行座標轉換或空間距離計算時，例如導航和路徑規劃。
- 機器學習模型需要基於距離進行分類或回歸分析時。

---

## Where？

**出現在架構哪個部分？**

通常 Euclidean Distance 會出現在以下架構或流程中：

1. **機器學習演算法內部邏輯**
   - 在 K-Means 聚類中，計算每個資料點到中心點（Centroid）的距離，用來更新群組。
   - 在 KNN 中，用來判斷鄰近程度並投票決定結果。

2. **數據前處理**
   - 用作衡量標準之一，進行特徵篩選或相似度排序。

3. **應用層邏輯**
   - 地圖應用像 Google Maps，透過座標計算實際位置的直線距離。

---

## Why？

**解決什麼問題？**

Euclidean Distance 的主要功能在於提供一種簡單且有效的方法來衡量「兩者之間有多接近」。在技術應用上，它能幫助我們：

1. 快速判斷資料相似性。例如，在聚類任務中，可以根據 Euclidean Distance 將類似資料分組，提高模型準確性。
2. 簡化空間中的關係建模。例如，在地理系統中，用 Euclidean Distance 測量城市之間直線距離，可作為路徑規劃的一部分。
3. 增強互動式體驗。例如，在遊戲開發中，用 Euclidean Distance 判斷玩家角色與場景物件是否靠近觸發互動事件。

---

## How？

### 🛠️ 建立階段

建立 Euclidean Distance 計算邏輯非常簡單，可以按照以下步驟執行：

1. 定義兩個座標（例如 $$(x_1, y_1)$$ 和 $$(x_2, y_2)$$）。
2. 使用公式：
   $$d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$
3. 如果是多維空間（例如三維 $$(x, y, z)$$），則擴展公式為：
   $$d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}$$
4. 撰寫程式碼以自動化此流程，常見語言如 Python 或 R 都有內建工具可以完成此計算。

### 🔍 查詢階段

在查詢階段，我們通常會需要比較多筆資料，因此流程如下：

1. 獲取查詢點 $$Q(x_q, y_q)$$ 和目標列表 $$P(x_p, y_p)$$。
   
   範例：如果你要找出哪些商店最近，你可能有客戶的位置為查詢點，以及商店列表作為目標列表。

2. 遍歷目標列表內所有項目，依次計算每個項目的 Euclidean Distance：
   $$d_i = \sqrt{(x_p^i - x_q)^2 + (y_p^i - y_q)^2}$$
3. 將結果排序，以獲得最近的項目。例如最近商店 TOP 5 名單。

程式範例（Python）：
```python
import math

def euclidean_distance(point_a, point_b):
    return math.sqrt(sum([(a-b)**2 for a, b in zip(point_a, point_b)]))

query_point = [3, 4]
target_points = [[7, 8], [5, 6], [9, 10]]

distances = [euclidean_distance(query_point, target_point) for target_point in target_points]
sorted_distances = sorted(enumerate(distances), key=lambda x: x[1])

print(sorted_distances)
```

---

## 補充說明
### 📌 範例比較

以下是不同方法對同一組位置進行查詢結果比較：

| 方法                     | 計算方式       | 結果         |
| ---------------------- | ---------- | ---------- |
| Euclidean Distance     | 計算直線距離     | 精確但無法考慮障礙物 |
| Manhattan Distance | 僅允許水平及垂直移動 | 更貼近日常交通模式  |
| [Cosine Similarity](/docs/notes/cosine-similarity)  | 比較向量方向而非長度 | 適合高維度向量比較  |

### 🧠 延伸／常見誤解

#### 誤解：Euclidean Distance 是唯一衡量相似性的方式？
事實上，不同場景下可能需要不同的方法。像 Manhattan Distance 更適合網格狀環境，而 Cosine Similarity 則更重視方向而非絕對值大小。選擇正確的方法才能解決特定問題！

#### 延伸概念：如何處理尺度差異？
當不同特徵值範圍差異很大時，例如一欄位範圍是 [0–1000] 而另一欄位是 [0–10]，直接使用 Euclidean Distance 可能導致偏差。通常我們會先對數據做 Normalization 或 Standardization 後再進行運算，以確保不同特徵對結果的影響均衡。
