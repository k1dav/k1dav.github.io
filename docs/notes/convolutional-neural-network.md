---
title: "Convolutional Neural Network"
slug: "/notes/convolutional-neural-network"
tags:
  - "AI"
  - "深度學習"
  - "神經網路"
---
## What？

**CNN（Convolutional Neural Network）是什麼？**  
CNN，全名 Convolutional Neural Network，是一種基於 [Deep Learning](/docs/notes/deep-learning)（Deep Learning）的神經網路架構，主要用於處理結構化的資料，例如圖像或語音信號。它透過「卷積層」（Convolution Layer）提取特徵，再配合其他層如池化層（Pooling Layer）和全連接層（Fully Connected Layer），進行分類或回歸等操作。可以把它想像成一個非常聰明的濾鏡，能夠自動找出資料中的重要模式。

舉例來說，你要讓電腦識別一張貓的照片，CNN 的卷積層會自動尋找照片中的耳朵、眼睛等局部特徵，並結合形成對整隻貓的理解。

---

## Who？

CNN 主要由以下族群使用：  
1. **資料科學家**：用於建構影像辨識模型，例如診斷醫療影像中的腫瘤。  
2. **人工智慧工程師**：應用在自駕車中，用以辨識道路標誌或行人。
3. **研究人員**：探索新的架構來提升模型效能，例如減少計算資源需求。
4. **企業應用者**：在產品中實現功能，如電子商務網站上的商品圖片分類。

此外，終端消費者雖不直接使用 CNN，但會受其影響。例如，透過臉部辨識解鎖手機、使用 Google Photos 搜索「海灘」時看到相關照片。

---

## When？

當需要處理有空間結構特性的資料時，就適合採用 CNN。例如：  
- **影像處理任務**：物件偵測、影像分類、人臉辨識。  
- **語音信號分析**：語音情緒分析或語音指令辨識。  
- **醫療領域應用**：判斷 X 光片中的病變區域。  

總之，只要資料具有「位置相關性」，例如圖片中某些元素的位置重要，就非常適合使用 CNN。

---

## Where？

CNN 通常部署在以下幾個地方：  

1. **前端設備／終端裝置（Edge Devices）**
   - 像是手機晶片上的 AI 加速器，用來執行即時人臉解鎖功能。
   
2. **伺服器／雲端計算環境**
   - 例如在 AWS 或 Google Cloud 上訓練大型模型，用於圖像分析。

3. **嵌入式系統**
   - 比如自駕車內部嵌入系統，即時執行物件偵測以避免碰撞。

4. **混合架構**
   - 部分計算在雲端進行，比如模型訓練；而推論階段則移至前端硬體上完成。

---

## Why？

傳統方法如手工設計特徵提取器（Feature Extractor），通常效率低且難以泛化到不同場景。而 CNN 的出現改變了這點，它能夠：

1. 自動提取高效特徵：
   - 適應各種圖像和信號，不需人工干預。
   
2. 支援大規模數據：
   - 和深度學習其他網路一樣，CNN 擅長處理大量資料，並能從中學習複雜模式。
   
3. 提升效能：
   - 無論是準確度還是速度，都比傳統方法更具優勢。

簡而言之，如果你的業務涉及「空間資訊」並且需要高效分析，那麼 CNN 是不可缺少的一部分技術工具。

---

## How？

### 🛠️ 建立階段  

建立 CNN 模型的流程如下：

1. 定義網路架構：
   - 決定卷積層、池化層及全連接層的數量與順序。
   
2. 準備輸入資料：
   - 圖片通常會被轉換為固定大小的矩陣格式，例如 `224x224` 的 RGB 三通道陣列。
   
3. 設定超參數：
   - 如 filter size（濾波器大小）、stride（步幅）、padding（邊界填充）。
   
4. 訓練模型：
   - 使用 [Back Propagation](/docs/notes/back-propagation) 法和[梯度下降](/docs/notes/gradient-descent)法對權重進行更新。
   
5. 評估性能：
   - 使用測試集監控[Accuracy](/docs/notes/accuracy)與 [Loss Function](/docs/notes/loss-function) 表現；可考慮引入 Cross-validation 確保穩健性。

範例程式碼 (以 Python 和 TensorFlow 為例)：  
```python
import tensorflow as tf

model = tf.keras.Sequential([
    tf.keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=(224, 224, 3)),
    tf.keras.layers.MaxPooling2D(pool_size=(2, 2)),
    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dense(10, activation='softmax')
])
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
```

### 🔍 查詢階段  

查詢階段主要針對已訓練好的模型進行推論，包括以下步驟：

1. 輸入新資料：
   - 將待測圖片預處理成與訓練集一致的格式。
   
2. 模型推論：
   - 將圖片輸入到已訓練好的模型中獲得結果，例如分類標籤或物件座標。
   
範例程式碼：  
```python
from PIL import Image
import numpy as np

# 加載已保存的模型
saved_model = tf.keras.models.load_model('my_cnn_model.h5')

# 處理輸入圖片
image = Image.open('test_image.jpg').resize((224, 224))
image_array = np.array(image).reshape(1, 224, 224, 3)

# 推論結果
predictions = saved_model.predict(image_array)
print("Predicted class:", np.argmax(predictions))
```

---

## 補充說明

### 📌 範例比較  

| 技術/方法           | 優勢                              | 劣勢                             |
|---------------------|----------------------------------|----------------------------------|
| 傳統模板匹配算法     | 易於理解                          | 隨著數據量增大效能快速下降        |
| 手工 Feature Extractor | 可控性高                          | 難以泛化到新場景                 |
| 使用 CNN            | 特徵提取效率高、自動化程度高         | 訓練時間長且需大量計算資源         |

### 🧠 延伸／常見誤解  

1. 誤解：「CNN 僅適合二元分類」  
	事實上，CNN 可以
