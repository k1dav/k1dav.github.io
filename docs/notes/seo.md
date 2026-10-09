---
title: "SEO"
slug: "/notes/seo"
tags:
  - "DigitalMarketing"
  - "OnlineVisibility"
  - "SearchEngines"
  - "WebOptimization"
---
## What？
SEO（Search Engine Optimization）是優化網站內容、技術和結構，以提高在搜尋引擎（Google、Bing 等）自然搜尋結果中排名的一組策略和實踐。與付費廣告（Paid Search）不同，SEO 專注於有機流量的長期增長，無需每次點擊付費。

SEO 的核心是讓搜尋引擎理解網站內容的相關性和價值，從而在用戶搜尋相關關鍵詞時將其排在前面。例如，一家賣鞋的電商網站可以通過優化關鍵詞「舒適的跑步鞋」，在用戶搜尋該詞時出現在前三位。

SEO 分為三個主要方面：On-Page SEO（頁面內容優化）、Off-Page SEO（外部連結）和 Technical SEO（網站技術優化）。這些方面共同作用才能建立強大的搜尋引擎可見性。

---

## Who？
- 內容創作者和博主尋求有機流量增長
- 電商網站所有者和行銷經理
- 數位行銷專家和 SEO 專家
- 產品經理和技術團隊優化網站結構

---

## When？
1. 建立新網站時制定 SEO 策略和架構規劃
2. 發布新內容或產品頁面時進行關鍵詞優化
3. 網站排名下降時進行審計和恢復
4. 定期監控和改進已排名頁面的效能

---

## Where？
1. 網站架構規劃和 URL 結構設計階段
2. 內容創建和發布流程中的元數據設定
3. 技術維護中的網站速度、行動友善性優化
4. 行銷和連結建立策略的外部推廣

---

## Why？
- **長期成本效益**：相比付費廣告，有機流量成本更低且可持續
- **品牌信任度**：自然搜尋結果排名高會增強用戶信任和品牌權威性
- **持續流量**：一旦內容排名穩定，可長期持續帶來流量而無需持續投入

---

## How？
### 🛠️ 建立階段
```html
<!-- On-Page SEO：優化 HTML 元標簽 -->
<head>
    <!-- 頁面標題（60-70 字符） -->
    <title>如何選擇舒適的跑步鞋 - 完整指南 2024</title>

    <!-- 元描述（155-160 字符） -->
    <meta name="description"
          content="發現適合你的跑步鞋。專家建議、品牌比較和購買指南。">

    <!-- 關鍵詞（過度使用會被懲罰） -->
    <meta name="keywords"
          content="跑步鞋,舒適跑鞋,跑步鞋推薦">

    <!-- 結構化數據（Schema Markup） -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "運動跑步鞋",
        "description": "高性能跑步鞋",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.5",
            "reviewCount": "200"
        }
    }
    </script>

    <!-- Canonical 標籤（指定標準 URL） -->
    <link rel="canonical" href="https://example.com/running-shoes">
</head>
```

### 🔍 查詢階段
```python
# 使用 SEO 分析工具進行監控
import requests
from bs4 import BeautifulSoup

# 檢查網頁基本 SEO 元素
def analyze_seo(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    # 檢查標題
    title = soup.find('title')
    print(f"標題: {title.text if title else '缺失'}")

    # 檢查元描述
    meta_desc = soup.find('meta', attrs={'name': 'description'})
    print(f"元描述: {meta_desc.get('content') if meta_desc else '缺失'}")

    # 檢查 H1 標題
    h1 = soup.find('h1')
    print(f"H1: {h1.text if h1 else '缺失'}")

    # 統計圖片 alt 屬性
    images = soup.find_all('img')
    alt_missing = sum(1 for img in images if not img.get('alt'))
    print(f"缺少 Alt 文字的圖片: {alt_missing}/{len(images)}")

# 分析示例
analyze_seo('https://example.com')
```

---

## 補充說明
### 📌 範例比較
| SEO 類型 | 重點 | 時間 | 成本 |
|---------|------|------|------|
| On-Page | 內容、標題、元數據 | 立即 | 低 |
| Technical | 速度、行動版、結構 | 立即 | 中等 |
| Off-Page | 反向連結、社群信號 | 3-6 個月 | 高 |
| Local SEO | Google My Business、評價 | 1-3 個月 | 低-中等 |

### 🧠 延伸／常見誤解
- **誤解**：填充大量關鍵詞會提高排名。實際上，現代搜尋引擎使用自然語言處理（NLP），過度優化反而會被懲罰。
- **延伸**：Core Web Vitals（網頁生命力指標）已成為谷歌排名因素，包括頁面加載速度、交互性和視覺穩定性等。
