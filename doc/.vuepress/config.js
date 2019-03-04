

module.exports = {
  home: true,
  title: 'Tenp Api',  // 设置网站标题
  description : '',
  base : '/dist/',
  head: [
    // ['link', { rel: 'icon', href: '/logo.png' }]
    ['link', { rel: 'shortcut icon', type: "image/x-icon", href: `/logo.ico` }],
    ['link', { rel: 'stylesheet', type: "text/css", href: '/common.css' }]
  ],
  markdown: {
    lineNumbers: true
  },
  themeConfig : {
    nav : [
        { text: 'github', link: 'https://github.com/maskletter/tenp' },
        { text: '演示项目源码', link: 'https://github.com/maskletter/tenp-demo' },
        // { text: '附录：错误码', link: '/error' }
    ],
    sidebar: [
      {
        title: '快速上手',
        collapsable: false,
        children: [
          ['/install','初始化安装'],
          ['/use', '使用'],
          ['/express', 'express项目引入'],
          ['/no-tenp','一个空得项目'],
          ['/old-project', '现有项目转tenp项目'],
          // ['/config', '环境配置']
        ]
      },
      ['/config', '服务配置', false],
      // { title: 'Guide', collapsable: false, url: '/config' },
      {
        title: '插件',
        collapsable: false,
        children: [
          ['/tenp-plugin', '内置插件'],
          ['/new-plugin', '编写插件']
        ]
      },
      {
        title: 'Api说明',
        collapsable: false,
        children: [ 
          ['/init', '方法说明'],
          ['/ts', 'ts类说明'],
          ['/cli', 'tenp cli使用']
        ]
      },
      ['/progress','关于tenp'],
      // {
      //   title: '使用',
      //   collapsable: false,
      //   children: [
      //     ['/use', '']
      //   ]
      // }
    ],
    sidebarDepth : 2
  }
}
