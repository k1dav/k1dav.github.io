import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'S.Feng 技術手扎',
  tagline: 'DevOps・MLOps・LLM 的挖坑與填坑紀錄',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://www.k1dav.fun',
  baseUrl: '/',

  organizationName: 'k1dav',
  projectName: 'k1dav.github.io',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'zh-Hant',
    locales: ['zh-Hant'],
  },

  markdown: {
    // .md 用 CommonMark 解析（Obsidian 匯入的筆記），.mdx 才用 MDX
    format: 'detect',
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  themes: [
    '@docusaurus/theme-live-codeblock',
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en', 'zh'],
        indexBlog: true,
        highlightSearchTermsOnTargetPage: true,
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/k1dav/k1dav.github.io/tree/main/',
          onInlineTags: 'ignore',
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: true,
          onInlineTags: 'ignore',
          onInlineAuthors: 'ignore',
          onUntruncatedBlogPosts: 'ignore',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-93B6F2CSRB',
          anonymizeIP: true,
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'S.Feng 技術手扎',
      logo: {
        alt: 'S.Feng 技術手扎',
        src: 'img/logo.png',
      },
      items: [
        {type: 'doc', docId: 'intro', position: 'left', label: 'Wiki'},
        {to: '/docs/playbooks', label: 'Playbooks', position: 'left'},
        {to: '/docs/notes', label: '技術名詞', position: 'left'},
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/k1dav',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '內容',
          items: [
            {label: 'Wiki', to: '/docs/intro'},
            {label: 'Playbooks', to: '/docs/playbooks'},
            {label: '技術名詞', to: '/docs/notes'},
          ],
        },
        {
          title: 'Blog',
          items: [
            {label: '文章', to: '/blog'},
            {label: '標籤', to: '/blog/tags'},
            {label: 'RSS', href: 'https://www.k1dav.fun/blog/rss.xml'},
          ],
        },
        {
          title: 'About Me',
          items: [
            {label: 'GitHub', href: 'https://github.com/k1dav'},
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/fengjie-sung-243984179/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} S.Feng. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'yaml', 'json', 'docker', 'hcl', 'python', 'csharp', 'nginx', 'ini'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
