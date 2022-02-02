const path = require("path");

module.exports = {
  title: 'JC 的博客 ｜ JC Blog',
  description: 'JC的个人博客',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  
  evergreen: true,

  plugins: [
    ['@vuepress/google-analytics', {
      ga: 'UA-165839722-1',
    }],
  ],

  theme: 'melodydl',
  themeConfig: {
    title: 'JC Blog',

    // aside personInfo
    personalInfo: {
      name: 'jc',
      avatar: '/avatar-top.jpeg',
      headerBackgroundImg: '/avatar-bg.jpeg',
      description: 'In me the tiger sniffs the rose<br/>心有猛虎，细嗅蔷薇',
      email: '13478707150@163.com',
      location: 'Beijing, China',
    //   organization: '',
    },
    // Nav link
    nav: [ 
      {text: 'HOME', link: '/' },
      {text: 'ABOUT', link: '/about/'},
      {text: 'TAGS', link: '/tags/'}      
    ],
    header: {
      home: {
        title: 'JC Blog', 
        subtitle: '好好生活，慢慢相遇', 
        headerImage: '/home-bg.jpeg'
      },
      tags: {
        title: 'Tags', 
        subtitle: '遇见你花光了我所有的运气', 
        headerImage: '/tags-bg.jpg'
      },
      postHeaderImg: '/post-bg.jpeg',
    },
    // footer sns
    sns: {
      juejin: { 
        account: 'juejin',
        link: 'https://juejin.cn/user/1151943917967704'
      },
      github: { 
        account: 'github',
        link: 'https://gitee.com/jin-ec'
      }
    },

    // footer github button
    footer: {
      gitbtn: {
        repository: "https://ghbtns.com/github-btn.html?user=youdeliang&repo=vuepress-theme-melodydl&type=star&count=true",
        frameborder: 0,
        scrolling: 0,
        width: "80px",
        height: "20px"
      },
      custom: `Copyright &copy; Top Blog 2022 <br /> 
        Theme By <a href="https://www.vuepress.cn/" target="_blank">VuePress</a>
        | <a href="https://www.github.com/youdeliang/" target="_blank">youdeliang</a>`
    },
    pagination: {
      perPage: 5,
    },

    // comments: {
    //   owner: 'jc',
    //   repo: 'JC96821.github.io',
    //   clientId: 'dac18d0c331003b1aecc7c6d15fc1fba',
    //   clientSecret: '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',
    //   autoCreateIssue: true,
    // }
    comments: false
  }
}