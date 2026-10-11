import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {projectGroups, type Project} from '@site/src/data/projects';

import styles from './projects.module.css';

function ProjectCard({project}: {project: Project}) {
  return (
    <div className="col col--4 margin-bottom--lg">
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <Heading as="h3" className={styles.cardTitle}>
            {project.name}
          </Heading>
          {project.archived && <span className={styles.archived}>已封存</span>}
        </div>
        <p className={styles.description}>{project.description}</p>
        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className={styles.links}>
          {project.appStore && (
            <Link className="button button--sm button--primary" href={project.appStore}>
              App Store
            </Link>
          )}
          {project.website && (
            <Link className="button button--sm button--secondary" href={project.website}>
              介紹
            </Link>
          )}
          {project.repo && (
            <Link className="button button--sm button--secondary" href={project.repo}>
              GitHub
            </Link>
          )}
          {project.demo && (
            <Link className="button button--sm button--primary" href={project.demo}>
              Demo
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects(): ReactNode {
  return (
    <Layout title="Projects" description="S.Feng 的開源專案與作品">
      <main className="container margin-vert--xl">
        <Heading as="h1">Projects</Heading>
        <p>
          我的開源專案與作品，主要放在 <Link href="https://github.com/k1dav">@k1dav</Link> 與{' '}
          <Link href="https://github.com/k1dav-c">k1dav-c</Link>。
        </p>
        {projectGroups.map((group) => (
          <section key={group.title} className="margin-top--xl">
            <Heading as="h2">{group.title}</Heading>
            <p className={styles.groupDescription}>{group.description}</p>
            <div className="row">
              {group.projects.map((project) => (
                <ProjectCard key={project.name} project={project} />
              ))}
            </div>
          </section>
        ))}
      </main>
    </Layout>
  );
}
