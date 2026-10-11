import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {english} from './english';
import {
  Accessibility,
  Ban,
  Cloud,
  Compass,
  EyeOff,
  FlaskConical,
  Hand,
  Languages,
  LayoutGrid,
  PackageOpen,
  Scale,
  ShieldCheck,
  Split,
  UserX,
} from 'lucide-react';

import styles from './styles.module.css';

const APP_STORE = 'https://apps.apple.com/us/app/evenly-balanced-books/id6790163143';
const SUPPORT = 'https://k1dav-c.github.io/ping-ping-accounting/';
const PRIVACY = 'https://k1dav-c.github.io/ping-ping-accounting/privacy.html';

const pillars = [
  {
    Icon: Scale,
    title: '帳永遠是平的',
    text: '底層是複式簿記，每筆交易同時記「錢從哪來、往哪去」，兩邊恆等。餘額、卡費、淨資產不會越記越歪。',
  },
  {
    Icon: Hand,
    title: '拖一下就記完',
    text: '把帳戶拖到分類上就是一筆：現金拖到餐飲＝買午餐，銀行拖到信用卡＝繳卡費。會計藏在背後，你只管拖。',
  },
  {
    Icon: ShieldCheck,
    title: '資料只屬於你',
    text: '無帳號、無追蹤、無廣告。私人帳本只存在你的裝置上，隱私標籤是「不收集任何資料」。',
  },
];

const showcases = [
  {
    img: '/img/evenly/ai.webp',
    alt: 'AI 記帳：貼上文字、選照片，AI 幫你整理',
    tag: 'AI 記帳',
    title: '拍照、貼文字，AI 幫你記帳',
    text: '通知截圖、收據照片或一段文字，例如「今天午餐 150 現金；捷運 32 悠遊卡」，AI 會整理成一筆筆交易。你確認後才會記入，記錯也能一鍵復原。',
    bullets: [
      '在帳戶填上卡號末四碼或銀行、電子支付名稱，通知上的付款方式會自動對上',
      '跟 Siri 說「平平幫我記帳」，或從相簿、任何 App 分享到平平',
      '使用你自己申請的 AI 金鑰，App 不內建、不經過我們的伺服器',
    ],
  },
  {
    img: '/img/evenly/ledger.webp',
    alt: '記帳頁：把付款方式拖到分類上',
    tag: '拖曳記帳',
    title: '拖一拖，記帳就完成',
    text: '左邊是你的錢，右邊是分類。把付款方式拖到分類上、輸入金額，一筆就記好了；背後的借貸自動平衡。',
    bullets: ['頂端一眼看到今天記了幾筆、這個月還能花多少、連續記帳天數', '轉帳、繳卡費、拆帳都是原生流程，不用繞路'],
  },
  {
    img: '/img/evenly/quick.webp',
    alt: '快速頁：快速項目與週期性收支',
    tag: '快速',
    title: '常記的，點一下就好',
    text: '早餐、捷運這類固定的項目做成磁貼，點一下只要輸入金額。房租、訂閱等週期性收支設一次就自動記。',
    bullets: ['主畫面「快速記帳」小工具，不打開 App 也能記', '每月固定扣款會被偵測出來，一鍵設成週期自動記'],
  },
  {
    img: '/img/evenly/keypad.webp',
    alt: '記一筆：自製數字鍵盤支援四則運算',
    tag: '鍵盤',
    title: '為記帳設計的鍵盤',
    text: '千分位即打即顯、直接輸入算式、游標可以左右移動，還能在鍵盤上切換幣別。',
    bullets: ['「120 + 35×2」直接算好', '拆帳「各付多少」：輸入總額自動均分，改任一列其他自動重分'],
  },
  {
    img: '/img/evenly/transactions.webp',
    alt: '明細頁：依日期分組的收支明細',
    tag: '明細',
    title: '每一筆都找得到',
    text: '依日期分組的明細，每天幾筆、哪類花最多一眼看到。點日期就能補記那一天，搜尋也找得到過去的每一筆。',
    bullets: ['一鍵隱藏金額，旁人瞄不到你的開銷', '每月對帳：所有帳戶一頁列出，只改對不上的，一鍵套用'],
  },
  {
    img: '/img/evenly/categories.webp',
    alt: '分類頁：每月預算與支出占比',
    tag: '預算與分析',
    title: '錢花去哪，一看就懂',
    text: '設定每月總預算或分類預算，隨時看到「這個月還能花多少、接下來每天約可花多少」。分類圓餅、每期走勢與平均線，日 / 週 / 月自由切換。',
    bullets: ['用到 80%、100% 會提醒你', '每月初自動整理上個月的月報回顧，可分享（預設隱藏金額）'],
  },
  {
    img: '/img/evenly/assets.webp',
    alt: '資產頁：淨資產、資產與負債',
    tag: '資產',
    title: '淨資產與信用卡，一次掌握',
    text: '資產、負債、淨資產即時加總。信用卡設定結帳日、繳款日與額度，直接顯示本期 / 下期應繳。',
    bullets: ['結帳日後的繳款自動沖抵本期，顯示的就是真正要繳的金額', '多幣別：外幣保留原幣、自動折算，一鍵更新匯率'],
  },
  {
    img: '/img/evenly/shared.webp',
    alt: '共享資產：邀請家人共用支付工具',
    tag: '共享資產',
    title: '和家人共享一張卡',
    text: '邀請另一位 iCloud 使用者共用一個支付工具（例如家庭卡）。對方記的每一筆會送到你的待確認清單，確認後才進你的帳本。',
    bullets: ['只分享你選的那個支付工具，不會分享其他帳戶', '全程走你自己的 iCloud，沒有第三方伺服器'],
  },
];

const moreFeatures = [
  {Icon: FlaskConical, title: '先用範例試試', text: '載入一本範例帳隨便點、隨便改，看完一鍵清空再記自己的。'},
  {Icon: Compass, title: '操作導覽', text: '一步步帶你看每個頁面，右上角「?」隨時重看。'},
  {Icon: LayoutGrid, title: '小工具與控制中心', text: '主畫面、鎖定畫面、控制中心、動作按鈕都能直接記帳。'},
  {Icon: Split, title: '拆分去向', text: '幫朋友墊付？一筆同時記「吃飯 300＋應收帳款 500」。'},
  {Icon: Cloud, title: 'iCloud 備份', text: '一鍵或定時備份到 iCloud 雲碟，換機登入即可還原。'},
  {Icon: PackageOpen, title: 'Money Manager 搬家', text: '一鍵匯入 .mmbak：帳戶、分類、多年交易分毫不差。'},
  {Icon: Languages, title: '繁中 / English / 日本語', text: '三種介面語言，支援深色模式。'},
  {Icon: Accessibility, title: '無障礙', text: '完整支援 VoiceOver、超大字級、減少動態效果。'},
];

const chinese = {
  title: '平平記帳 Evenly — 每一筆，都平衡',
  description: '平平記帳 Evenly：把複式簿記藏進拖曳手感的 iOS 記帳 App。信用卡帳期、多幣別、拆帳、iCloud 共享資產，無帳號、無追蹤、無廣告。',
  iconAlt: '平平記帳 App 圖示',
  ledgerAlt: '平平記帳記帳頁畫面',
  download: '在 App Store 免費下載',
  slogan: '每一筆，都平衡。',
  lead: '把會計師等級的複式簿記，藏進拖曳的手感裡。',
  details: '拍照、貼文字就能 AI 記帳；預算、信用卡帳期、多幣別、共享資產——錢的每一個去向都對得起來。',
  meta: '免費 · iPhone（iOS 26 以上）· 無內購、無廣告',
  more: '還有這些',
  privacyTitle: '你的帳，只在你手上',
  privacyLead: '不需要註冊帳號，沒有追蹤、分析或廣告 SDK。私人帳本只存在你的裝置上。',
  privacyDetails: 'AI 記帳會用你自己的金鑰直接向 AI 服務傳送你選擇的文字或照片；金鑰只存在裝置的鑰匙圈裡。匯率更新、iCloud 備份與共享資產也會使用網路。',
  ctaTitle: '開始記一本平衡的帳',
  ctaText: '從 Money Manager 搬家也只要一鍵。',
  support: '支援與常見問題',
  privacyLink: '隱私權政策',
  noAccount: '無帳號',
  noTracking: '無追蹤',
  noAds: '無廣告',
  noData: '不收集任何資料',
  pillars,
  showcases,
  moreFeatures,
};

function AppStoreButton({className, copy}: {className?: string; copy: typeof chinese}) {
  return (
    <Link className={clsx('button button--lg', styles.storeButton, className)} href={APP_STORE}>
      {copy.download}
    </Link>
  );
}

function Hero({copy, isEnglish}: {copy: typeof chinese; isEnglish: boolean}) {
  return (
    <header className={styles.hero}>
      <div className={clsx('container', styles.heroInner)}>
        <div className={styles.heroText}>
          <img className={styles.icon} src="/img/evenly/icon.png" alt={copy.iconAlt} width={96} height={96} />
          <Heading as="h1" className={styles.heroTitle}>
            {isEnglish ? 'Evenly' : <>平平記帳 <span className={styles.heroTitleEn}>Evenly</span></>}
          </Heading>
          <p className={styles.slogan}>{copy.slogan}</p>
          <p className={styles.heroLead}>
            {copy.lead}
            <br />
            {copy.details}
          </p>
          <div className={styles.heroActions}>
            <AppStoreButton copy={copy} />
          </div>
          <p className={styles.meta}>{copy.meta}</p>
        </div>
        <div className={styles.heroPhone}>
          <img src="/img/evenly/ledger.webp" alt={copy.ledgerAlt} loading="eager" />
        </div>
      </div>
    </header>
  );
}

export default function EvenlyPage({language = 'zh-Hant'}: {language?: 'zh-Hant' | 'en'}): ReactNode {
  const isEnglish = language === 'en';
  const copy: typeof chinese = isEnglish ? english : chinese;
  const {siteConfig} = useDocusaurusContext();
  const productUrl = `${siteConfig.url}${siteConfig.baseUrl}evenly`;
  return (
    <Layout
      title={copy.title}
      description={copy.description}
      noFooter
      wrapperClassName={styles.productPage}>
      <Head>
        <html lang={language} />
        <link rel="alternate" hrefLang="zh-Hant" href={productUrl} />
        <link rel="alternate" hrefLang="en" href={`${productUrl}/en`} />
        <link rel="alternate" hrefLang="x-default" href={productUrl} />
        <meta property="og:locale" content={isEnglish ? 'en_US' : 'zh_TW'} />
        <meta property="og:image" content={`${siteConfig.url}${siteConfig.baseUrl}img/evenly/icon.png`} />
      </Head>
      <nav className={clsx('container', styles.productNav)} aria-label={isEnglish ? 'Product navigation' : '產品導覽'}>
        <Link to={isEnglish ? '/evenly/en' : '/evenly'} className={styles.brand}>Evenly</Link>
        <div className={styles.languageLinks}>
          <Link to="/evenly" lang="zh-Hant" hrefLang="zh-Hant" aria-current={!isEnglish ? 'page' : undefined}>繁體中文</Link>
          <Link to="/evenly/en" lang="en" hrefLang="en" aria-current={isEnglish ? 'page' : undefined}>English</Link>
        </div>
      </nav>
      <Hero copy={copy} isEnglish={isEnglish} />
      <main>
        <section className={clsx('container', styles.section)}>
          <div className="row">
            {copy.pillars.map((p) => (
              <div key={p.title} className="col col--4 margin-bottom--lg">
                <div className={styles.pillar}>
                  <div className={styles.pillarIcon}>
                    <p.Icon size={28} strokeWidth={1.75} aria-hidden />
                  </div>
                  <Heading as="h3">{p.title}</Heading>
                  <p>{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {copy.showcases.map((s, i) => (
          <section key={s.title} className={clsx(styles.showcase, i % 2 === 1 && styles.showcaseAlt)}>
            <div className={clsx('container', styles.showcaseInner, i % 2 === 1 && styles.reverse)}>
              <div className={styles.showcasePhone}>
                <img src={s.img} alt={s.alt} loading="lazy" width={320} height={692} />
              </div>
              <div className={styles.showcaseText}>
                <span className={styles.tag}>{s.tag}</span>
                <Heading as="h2">{s.title}</Heading>
                <p>{s.text}</p>
                <ul>
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}

        <section className={clsx('container', styles.section)}>
          <Heading as="h2" className="text--center">
            {copy.more}
          </Heading>
          <div className={clsx('row', styles.featureGrid)}>
            {copy.moreFeatures.map((f) => (
              <div key={f.title} className="col col--3 margin-bottom--lg">
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>
                    <f.Icon size={22} strokeWidth={1.75} aria-hidden />
                  </span>
                  <strong>{f.title}</strong>
                  <p>{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.privacy}>
          <div className="container text--center">
            <Heading as="h2">{copy.privacyTitle}</Heading>
            <p>
              {copy.privacyLead}
              <br />
              {copy.privacyDetails}
            </p>
            <div className={styles.badges}>
              <span>
                <UserX size={18} aria-hidden /> {copy.noAccount}
              </span>
              <span>
                <EyeOff size={18} aria-hidden /> {copy.noTracking}
              </span>
              <span>
                <Ban size={18} aria-hidden /> {copy.noAds}
              </span>
              <span>
                <ShieldCheck size={18} aria-hidden /> {copy.noData}
              </span>
            </div>
          </div>
        </section>

        <section className={clsx('container text--center', styles.cta)}>
          <img src="/img/evenly/icon.png" alt="" width={72} height={72} className={styles.ctaIcon} />
          <Heading as="h2">{copy.ctaTitle}</Heading>
          <p>{copy.ctaText}</p>
          <AppStoreButton copy={copy} />
          <p className={styles.links}>
            <Link href={SUPPORT}>{copy.support}</Link> · <Link href={PRIVACY}>{copy.privacyLink}</Link>
          </p>
        </section>
      </main>
    </Layout>
  );
}
