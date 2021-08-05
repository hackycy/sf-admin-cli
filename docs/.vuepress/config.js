'use strict'

module.exports = {
  base: '/sf-admin-cli/',
  title: 'SF-ADMIN',
  description: '快速、准确、方便的创建 sf-admin 项目',
  themeConfig: {
    nav: [
      {
        text: 'CLI指南', link: '/cli/'
      },
      {
        text: 'Nest指南', link: '/nest/',
      },
      {
        text: 'Midway指南', link: '/midway/',
      },
      {
        text: '开源地址',
        items: [
          { text: 'CLI', link: 'https://github.com/hackycy/sf-admin-cli', target: '_blank' },
          { text: '前端', link: 'https://github.com/hackycy/sf-vue-admin', target: '_blank' },
          { text: 'Nest后端', link: 'https://github.com/hackycy/sf-nest-admin', target: '_blank' },
          { text: 'Midway后端', link: 'https://github.com/hackycy/sf-midway-admin', target: '_blank' },
          { text: 'Egg后端', link: 'https://github.com/hackycy/sf-egg-admin', target: '_blank' }
        ]
      }
    ],
    sidebar: {
      '/cli/': [
        '/cli/',
        '/cli/installation',
        {
          title: '命令',
          collapsable: false,
          children: [
            '/cli/create'
          ]
        }
      ]
    }
  }
}