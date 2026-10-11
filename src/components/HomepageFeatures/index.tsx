import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import {BookOpen, Brain, Wrench, type LucideIcon} from 'lucide-react';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Icon: LucideIcon;
  to: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Playbooks',
    Icon: Wrench,
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
    Icon: Brain,
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
    Icon: BookOpen,
    to: '/docs/tutorials',
    description: (
      <>
        Docusaurus 架站、GitLab Mirror、Unity AR 與 GraphQL 串接的系列教學。
      </>
    ),
  },
];

function Feature({title, Icon, to, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <Link to={to} className={styles.card}>
        <div className={styles.icon}>
          <Icon size={30} strokeWidth={1.75} aria-hidden />
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
