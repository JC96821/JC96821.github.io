(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{361:function(e,n,t){"use strict";t.r(n);var a=t(2),s=Object(a.a)({},(function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("p",[e._v("本篇博客主要是介绍本博客主题如何使用。\n")]),e._v(" "),t("h2",{attrs:{id:"速览"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#速览"}},[e._v("#")]),e._v(" 速览")]),e._v(" "),t("ul",[t("li",[e._v("这是一款 Vuepress 主题，集成了博客所需的分类、TAG墙、分页、评论等功能。")]),e._v(" "),t("li",[e._v("主题追求极简，配置上手简单，适配移动端。")]),e._v(" "),t("li",[t("a",{attrs:{href:"www.ydlcq.cn"}},[e._v("预览地址")])]),e._v(" "),t("li",[t("a",{attrs:{href:"https://github.com/youdeliang/vuepress-theme-melodydl",target:"_blank",rel:"noopener noreferrer"}},[e._v("GitHub地址"),t("OutboundLink")],1)]),e._v(" "),t("li",[e._v("博客效果展示：")])]),e._v(" "),t("p",[t("img",{attrs:{src:"https://user-gold-cdn.xitu.io/2020/5/2/171d4a46cd1c4caf?w=599&h=287&f=gif&s=1994152",alt:""}})]),e._v(" "),t("h2",{attrs:{id:"主题使用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#主题使用"}},[e._v("#")]),e._v(" 主题使用")]),e._v(" "),t("h3",{attrs:{id:"安装主题"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#安装主题"}},[e._v("#")]),e._v(" 安装主题")]),e._v(" "),t("p",[e._v("创建一个新的项目 my-blog：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("mkdir my-blog\ncd my-blog\n")])])]),t("p",[e._v("初始化 yarn 或 npm ：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("yarn init  或 npm init -y\n")])])]),t("p",[e._v("安装 vuepress 和 vuepress-theme-melodydl：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("yarn add vuepress vuepress-theme-melodydl\n或\nnpm install vuepress vuepress-theme-melodydl\n")])])]),t("p",[e._v("创建 src/_posts 文件夹和 Vuepress 配置文件，项目结构大致为：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("my-blog\n├── src # Blog 源文件目录\n│   ├── .vuepress # Vuepress 目录\n│   │   └── public # Vuepress 静态资源文件\n│   │   └── config.js # Vuepress 配置文件\n│   └── about # About 页面 文件夹\n│   │   ├── index.md  # about 页面内容文件\n│   └── _posts # 博客文件夹\n│       ├── xxx.md\n│       ...\n└── package.json\n")])])]),t("p",[e._v("在 package.json 加入 script 字段：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('{\n  "scripts": {\n    "dev": "vuepress dev src",\n    "build": "vuepress build src"\n  }\n}\n')])])]),t("h3",{attrs:{id:"配置主题"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#配置主题"}},[e._v("#")]),e._v(" 配置主题")]),e._v(" "),t("p",[e._v("在 src/.vuepress/config.js 中配置 Vuepress 和主题：")]),e._v(" "),t("details",[t("summary",[e._v("点击展示配置示例")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("module.exports = {\n    // 网站 Title\n      title: 'Top 的博客 ｜ Top Blog',\n      \n      // 网站描述\n      description: '个人博客',\n      \n      // 网站 favicon 图标设置等\n      head: [\n        ['link', { rel: 'icon', href: '/favicon.ico' }],\n        ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]\n      ],\n      \n      // 使用的主题\n      theme: 'melodydl',\n      \n      // 主题配置\n      themeConfig: {\n        title: 'Top Blog',\n\n    // 个人信息（没有或不想设置的，删掉对应字段即可）\n    personalInfo: {\n    \n    // 名称\n      name: 'melodydl',\n      \n      // 头像 public文件夹下\n      avatar: '/avatar-top.jpeg',\n      \n      // 头部背景图\n      headerBackgroundImg: '/avatar-bg.jpeg',\n      \n      // 个人简介 (支持 HTML)\n      description: 'In me the tiger sniffs the rose<br/>心有猛虎，细嗅蔷薇',\n      \n       // 电子邮箱\n      email: 'facecode@foxmail.com',\n      \n      // 所在地\n      location: 'Shanghai, China'\n    },\n    // 顶部导航栏内容\n    nav: [ \n      {text: 'HOME', link: '/' },\n      {text: 'ABOUT', link: '/about/'},\n      {text: 'TAGS', link: '/tags/'}      \n    ],\n    \n    // 首页头部标题背景图设置，图片直接放在 public 文件夹下\n    header: {\n      home: {\n        title: 'Top Blog', \n        subtitle: '好好生活，慢慢相遇', \n        headerImage: '/home-bg.jpeg'\n      },\n      \n      // tag页面头部标题背景图设置，图片直接放在 public 文件夹下\n      tags: {\n        title: 'Tags', \n        subtitle: '遇见你花光了我所有的运气', \n        headerImage: '/tags-bg.jpg'\n      },\n      \n      // 文章详情头部背景图\n      postHeaderImg: '/post-bg.jpeg',\n    },\n    \n    // 社交平台帐号信息 \n    sns: {\n      // 简书账号和链接\n      \"jianshu\": { \n        account: \"jianshu\", \n        link: \"https://www.jianshu.com/u/5dddaee8f351\", \n      },\n      \n      // 新浪 账号和链接\n      \"weibo\": { \n        account: \"\",\n        link: \"\"\n      },\n      \n      // 知乎 帐号和链接\n      \"zhihu\": { \n        account: \"zhihu\",\n        link: \"https://www.zhihu.com/people/sheng-tang-de-xing-kong\"\n      },\n      \n      // Github 帐号和链接\n      \"github\": { \n        account: \"github\",\n        link: \"https://github.com/youdeliang\"\n      }\n    },\n    // 底部 footer 的相关设置 \n    footer: {\n      // gitbutton  配置\n      gitbtn: {\n        // 仓库地址\n        repository: \"https://ghbtns.com/github-btn.html?user=youdeliang&repo=vuepress-theme-top&type=star&count=true\",\n        frameborder: 0,\n        scrolling: 0,\n        width: \"80px\",\n        height: \"20px\"\n      },\n      \n      // 添加自定义 footer\n      custom: `Copyright &copy; Top Blog 2020 <br /> \n        Theme By <a href=\"https://www.vuepress.cn/\" target=\"_blank\">VuePress</a>\n        | <a href=\"https://www.github.com/youdeliang/\" target=\"_blank\">youdeliang</a>`\n    },\n    \n    // 分页配置\n    pagination: {\n      // 每页文章数量\n      perPage: 5,\n    },\n    \n    // vssue 评论配置, 如果不需要，可以设置 comments: false\n    comments: {    \n      owner: 'youdeliang',\n      repo: 'vuepress-theme-melodydl',\n      clientId: 'dfba8ecad544784fec1f',\n      clientSecret: '1358ac11bc8face24f598601991083e27372988d',\n      autoCreateIssue: false,\n    },\n  }\n}\n")])])])]),e._v(" "),t("h3",{attrs:{id:"vssue-评论插件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#vssue-评论插件"}},[e._v("#")]),e._v(" Vssue 评论插件")]),e._v(" "),t("p",[e._v("如果你知道 Gitment 和 Gitalk，那么 Vssue 其实和它们实现的功能没什么区别 —— 在 Github 的 Issue 系统中存储评论，在你的页面上发表和展示评论，还可以编辑和删除评论，提供了 Vuepress 的插件（最初的动力就是给自己的 Vuepress 博客开启评论）。")]),e._v(" "),t("p",[e._v("Vssue 评论插件使用可以查看文档手册。"),t("a",{attrs:{href:"https://vssue.js.org/guide/",target:"_blank",rel:"noopener noreferrer"}},[e._v("传送门"),t("OutboundLink")],1),e._v("。")]),e._v(" "),t("h3",{attrs:{id:"about页面配置"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#about页面配置"}},[e._v("#")]),e._v(" about页面配置")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("---\nlayout: about \ntitle: About\nsubtitle: 你可以很好，但你无需完美\nheaderImage: /about-bg.jpg # public 文件夹下的图片\n---\n\n下面为个人信息等内容...\n")])])]),t("h3",{attrs:{id:"创建博文"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#创建博文"}},[e._v("#")]),e._v(" 创建博文")]),e._v(" "),t("p",[e._v("在 src/_posts 下创建 md 文件")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('\x3c!-- _posts/2019-04-01-JS异步编程方案总结.md --\x3e\n---\ntitle: "JS异步编程方案总结"\ndate: 2019-04-01\ntags:\n  - Promise\n  - JavaScript\n---\n\n本篇博客主要是对 Javcscript 异步编程方案总结\n\nmore 上面的内容是摘要，将显示在目录中。\n\n\x3c!-- more --\x3e\n\nmore 下面的内容只有浏览这篇文章时才会完全展示，不会显示在目录中。\n\n')])])]),t("p",[e._v("运行相应 script 生成你的博客网站")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("# 开发\nnpm run dev\n# 构建\nnpm run build\n")])])]),t("h3",{attrs:{id:"使用-github-pages-部署"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#使用-github-pages-部署"}},[e._v("#")]),e._v(" 使用 GitHub pages 部署")]),e._v(" "),t("p",[e._v("部署具体步骤可以参考 Vuepress 官方文档。 "),t("a",{attrs:{href:"https://vuepress.vuejs.org/zh/guide/deploy.html#github-pages",target:"_blank",rel:"noopener noreferrer"}},[e._v("传送门"),t("OutboundLink")],1)]),e._v(" "),t("h2",{attrs:{id:"最后"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#最后"}},[e._v("#")]),e._v(" 最后")]),e._v(" "),t("p",[e._v("如果觉得主题好用的话，欢迎点赞和 "),t("a",{attrs:{href:"https://github.com/youdeliang/vuepress-theme-melodydl",target:"_blank",rel:"noopener noreferrer"}},[e._v("Star"),t("OutboundLink")],1),e._v("，你的鼓励是对我莫大的支持，谢谢🙏。")])])}),[],!1,null,null,null);n.default=s.exports}}]);