import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  emoji: string;
  to: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Playbooks',
    emoji: '🛠️',
    to: '/docs/playbooks',
    description: (
      <>
        自架服務與基礎設施的實作手冊：Authentik SSO、K3s、Helm、Headscale、
        WireGuard、RouterOS、PVE。
      </>
    ),
  },
  {
    title: '技術名詞筆記',
    emoji: '🧠',
    to: '/docs/notes',
    description: (
      <>
        AI / MLOps / LLM 相關名詞整理：RAG、Embedding、Fine Tune、Transformer、
        DeepSpeed 等。
      </>
    ),
  },
  {
    title: '教學系列',
    emoji: '📚',
    to: '/docs/tutorials',
    description: (
      <>
        Docusaurus 架站、GitLab Mirror、Unity AR 與 GraphQL 串接的系列教學。
      </>
    ),
  },
];

function Feature({title, emoji, to, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <Link to={to} className={styles.card}>
        <div className={styles.emoji} aria-hidden>
          {emoji}
        </div>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </Link>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props) => (
            <Feature key={props.title} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
