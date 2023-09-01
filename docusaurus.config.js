const path = require('path')


const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '帆云小站',
  tagline: '种一棵树最好的时间是十年前, 其次是现在',
  favicon: 'img/favicon.ico',
  url: 'https://chenchar.cn',
  baseUrl: '/',
  organizationName: 'fanyun',
  projectName: 'fanyun_blog',
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'description',
        content: '云帆个人博客',
      },
    },
  ],
  themeConfig: {
    // Replace with your project's social card
    image: 'img/logo.jpg',
    metadata: [
      {
        name: 'keywords',
        content: '云帆, 帆云',
      },
      {
        name: 'keywords',
        content: 'blog, javascript, typescript, node, react, web',
      },
      {
        name: 'keywords',
        content: '想多点些技能点',
      },
    ],
    navbar: {
      title: '帆云小站',
      logo: {
        alt: 'Fanyun Logo',
        src: 'img/logo.webp',
      },
      items: [
        {
          label: '博客',
          position: 'right',
          to: 'blog',
        },
        // {
        //   label: '项目',
        //   position: 'right',
        //   to: 'project',
        // },
        // {
        //   label: '关于我',
        //   position: 'right',
        //   to: 'about',
        // },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/BlueOrgreen',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '文档',
          items: [
            {
              label: '博客',
              to: '/blog',
            },
          ],
        },
        {
          title: '更多',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/BlueOrgreen/blog',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'docs',
          sidebarPath: 'sidebars.js',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  plugins: [
    'docusaurus-plugin-sass',
    [
      path.resolve(__dirname, './src/plugin/plugin-content-blog'),
      {
        path: 'blog',
        editUrl: ({ locale, blogDirPath, blogPath, permalink }) =>
          `https://github.com/BlueOrgreen/blog/edit/main/${blogDirPath}/${blogPath}`,
        editLocalizedFiles: false,
        blogDescription: '帆云的个人博客',
        blogSidebarCount: 10,
        blogSidebarTitle: 'Blogs',
        postsPerPage: 10,
        showReadingTime: true,
        readingTime: ({ content, frontMatter, defaultReadingTime }) =>
          defaultReadingTime({ content, options: { wordsPerMinute: 300 } }),
        // feedOptions: {
        //   type: 'all',
        //   title: '愧怍',
        //   copyright: `Copyright © ${new Date().getFullYear()} 愧怍 Built with Docusaurus.<p><a href="http://beian.miit.gov.cn/" class="footer_lin">${beian}</a></p>`,
        // },
      },
    ],
  ],
  i18n: {
    defaultLocale: 'zh-CN',
    // defaultLocale: 'en',
    locales: ['en', 'zh-CN'],
    localeConfigs: {
      en: {
        htmlLang: 'en-GB',
      },
    },
  },
};

module.exports = config;
