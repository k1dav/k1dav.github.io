import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './evenly.module.css';

const APP_STORE = 'https://apps.apple.com/us/app/evenly-balanced-books/id6790163143';
const SUPPORT = 'https://k1dav-c.github.io/ping-ping-accounting/';
const PRIVACY = 'https://k1dav-c.github.io/ping-ping-accounting/privacy.html';

const pillars = [
  {
    emoji: '⚖️',
    title: '帳永遠是平的',
    text: '底層是複式簿記，每筆交易同時記「錢從哪來、往哪去」，兩邊恆等。餘額、卡費、淨資產不會越記越歪。',
  },
  {
    emoji: '👆',
    title: '拖一下就記完',
    text: '把帳戶拖到分類上就是一筆：現金拖到餐飲＝買午餐，銀行拖到信用卡＝繳卡費。會計藏在背後，你只管拖。',
  },
  {
    emoji: '🔒',
    title: '資料只屬於你',
    text: '無帳號、無追蹤、無廣告。私人帳本只存在你的裝置上，隱私標籤是「不收集任何資料」。',
  },
];

const showcases = [
  {
    img: '/img/evenly/screen-1.webp',
    alt: '記帳頁：把帳戶拖到分類上',
    title: '拖曳記帳',
    text: '左邊是你的錢，右邊是分類。拖過去、輸入金額，一筆就記好了。常用的帳戶和分類可以釘選在最上面。',
    bullets: ['現金、銀行、信用卡、電子支付、外幣帳戶一目了然', '轉帳、繳卡費、拆帳都是原生流程，不用繞路'],
  },
  {
    img: '/img/evenly/screen-6.webp',
    alt: '記一筆：自製數字鍵盤支援四則運算',
    title: '為記帳設計的鍵盤',
    text: '千分位即打即顯、直接輸入算式、游標可以左右移動，還能在鍵盤上切換幣別。',
    bullets: ['「120 + 35×2」直接算好', '拆帳「各付多少」：輸入總額自動均分，改任一列其他自動重分'],
  },
  {
    img: '/img/evenly/screen-3.webp',
    alt: '分類分析：圓餅圖與支出排行',
    title: '錢花去哪，一眼看懂',
    text: '分類圓餅占比、每期支出折線與平均線，日 / 週 / 月自由切換，點分類就能看走勢與明細。',
    bullets: ['子分類（早餐、午餐、捷運…）', '收入、支出分開看'],
  },
  {
    img: '/img/evenly/screen-4.webp',
    alt: '資產頁：淨資產、資產與負債',
    title: '淨資產與信用卡，一次掌握',
    text: '資產、負債、淨資產即時加總。信用卡設定結帳日、繳款日與額度，直接顯示本期 / 下期應繳。',
    bullets: ['結帳日後的繳款自動沖抵本期，顯示的就是真正要繳的金額', '多幣別：外幣保留原幣、自動折算，一鍵更新匯率'],
  },
  {
    img: '/img/evenly/screen-5.webp',
    alt: '帳戶走勢：餘額折線與每日明細',
    title: '每個帳戶都對得起來',
    text: '每個帳戶都有自己的餘額走勢與每日明細，點開就能看當天的流入流出。',
    bullets: ['每月對帳：所有帳戶一頁列出，只改對不上的，一鍵套用', '刪除帳戶改為封存，交易全數保留'],
  },
  {
    img: '/img/evenly/screen-7.webp',
    alt: '共享資產：邀請家人共用支付工具',
    title: '和家人共享一張卡',
    text: '邀請另一位 iCloud 使用者共用一個支付工具（例如家庭卡）。對方記的每一筆會送到你的待確認清單，確認後才進你的帳本。',
    bullets: ['只分享你選的那個支付工具，不會分享其他帳戶', '全程走你自己的 iCloud，沒有第三方伺服器'],
  },
];

const moreFeatures = [
  {emoji: '🔁', title: '週期收支與分期', text: '訂閱、房租、分期設一次自動記，金額還能用外幣。'},
  {emoji: '⚡', title: '快速磁貼', text: '常記的項目做成磁貼，點一下只要輸入金額。'},
  {emoji: '🧾', title: '拆分去向', text: '幫朋友墊付？一筆同時記「吃飯 300＋應收帳款 500」。'},
  {emoji: '☁️', title: 'iCloud 備份', text: '一鍵或定時備份到 iCloud 雲碟，換機登入即可還原。'},
  {emoji: '📦', title: 'Money Manager 搬家', text: '一鍵匯入 .mmbak：帳戶、分類、多年交易分毫不差。'},
  {emoji: '💾', title: 'JSON 備份還原', text: '單檔備份，資料完全屬於你，隨時帶走。'},
  {emoji: '🌏', title: '繁中 / English / 日本語', text: '三種介面語言，支援深色模式。'},
  {emoji: '⏰', title: '每日記帳提醒', text: '用本地通知提醒你記帳，不經過任何伺服器。'},
];

function AppStoreButton({className}: {className?: string}) {
  return (
    <Link className={clsx('button button--lg', styles.storeButton, className)} href={APP_STORE}>
      在 App Store 免費下載
    </Link>
  );
}

function Hero() {
  return (
    <header className={styles.hero}>
      <div className={clsx('container', styles.heroInner)}>
        <div className={styles.heroText}>
          <img className={styles.icon} src="/img/evenly/icon.png" alt="平平記帳 App 圖示" width={96} height={96} />
          <Heading as="h1" className={styles.heroTitle}>
            平平記帳 <span className={styles.heroTitleEn}>Evenly</span>
          </Heading>
          <p className={styles.slogan}>每一筆，都平衡。</p>
          <p className={styles.heroLead}>
            把會計師等級的複式簿記，藏進拖曳的手感裡。
            <br />
            信用卡帳期、多幣別、拆帳、共享資產——錢的每一個去向都對得起來。
          </p>
          <div className={styles.heroActions}>
            <AppStoreButton />
          </div>
          <p className={styles.meta}>免費 · iPhone（iOS 26 以上）· 無內購、無廣告</p>
        </div>
        <div className={styles.heroPhone}>
          <img src="/img/evenly/screen-1.webp" alt="平平記帳記帳頁畫面" loading="eager" />
        </div>
      </div>
    </header>
  );
}

export default function Evenly(): ReactNode {
  return (
    <Layout
      title="平平記帳 Evenly — 每一筆，都平衡"
      description="平平記帳 Evenly：把複式簿記藏進拖曳手感的 iOS 記帳 App。信用卡帳期、多幣別、拆帳、iCloud 共享資產，無帳號、無追蹤、無廣告。">
      <Hero />
      <main>
        <section className={clsx('container', styles.section)}>
          <div className="row">
            {pillars.map((p) => (
              <div key={p.title} className="col col--4 margin-bottom--lg">
                <div className={styles.pillar}>
                  <div className={styles.pillarEmoji} aria-hidden>
                    {p.emoji}
                  </div>
                  <Heading as="h3">{p.title}</Heading>
                  <p>{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {showcases.map((s, i) => (
          <section key={s.title} className={clsx(styles.showcase, i % 2 === 1 && styles.showcaseAlt)}>
            <div className={clsx('container', styles.showcaseInner, i % 2 === 1 && styles.reverse)}>
              <div className={styles.showcasePhone}>
                <img src={s.img} alt={s.alt} loading="lazy" width={320} height={692} />
              </div>
              <div className={styles.showcaseText}>
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
            還有這些
          </Heading>
          <div className={clsx('row', styles.featureGrid)}>
            {moreFeatures.map((f) => (
              <div key={f.title} className="col col--3 margin-bottom--lg">
                <div className={styles.feature}>
                  <span className={styles.featureEmoji} aria-hidden>
                    {f.emoji}
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
            <Heading as="h2">你的帳，只在你手上</Heading>
            <p>
              不需要註冊帳號，沒有追蹤、分析或廣告 SDK。私人帳本只存在你的裝置上；
              <br />
              只有在你按「更新匯率」時才會連網取得公開匯率，不帶任何個人資料。
            </p>
            <div className={styles.badges}>
              <span>🚫 無帳號</span>
              <span>🙈 無追蹤</span>
              <span>📵 無廣告</span>
              <span>🛡 不收集任何資料</span>
            </div>
          </div>
        </section>

        <section className={clsx('container text--center', styles.cta)}>
          <img src="/img/evenly/icon.png" alt="" width={72} height={72} className={styles.ctaIcon} />
          <Heading as="h2">開始記一本平衡的帳</Heading>
          <p>從 Money Manager 搬家也只要一鍵。</p>
          <AppStoreButton />
          <p className={styles.links}>
            <Link href={SUPPORT}>支援與常見問題</Link> · <Link href={PRIVACY}>隱私權政策</Link>
          </p>
        </section>
      </main>
    </Layout>
  );
}
