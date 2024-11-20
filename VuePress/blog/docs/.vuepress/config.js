module.exports = {
    title: '娃哈哈喜欢喝爽歪歪',
    description: '日复一日的坚持下去',
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
    ],

    base: '/xiaoben/', // 这是部署到github相关的配置 下面会讲
    markdown: {
        lineNumbers: true // 代码块显示行号
    },
    themeConfig: {
        // 导航栏logo
        // logo:'',
        search: true,
        displayAllHeaders: false,
        // activeHeaderLinks: false,
        // searchMaxSuggestions: 10,
        smoothScroll: true,
        sidebarDepth: 2, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
        lastUpdated: 'Last Updated', // 文档更新时间：每个文件git最后提交的时间
        nav: [
            // 内部链接 以docs为根目录
            {
                text: '前端',
                // link: '/algorithm/',
                // ariaLabel: '前端111',
                items: [
                    {
                        text: 'HTML',
                        link: "/algorithm/html/html"
                    },
                    {
                        text: 'CSS',
                        link: "/algorithm/css/css-base"
                    },
                    {
                        text: 'JavaScript',
                        link: "/algorithm/js/js"
                    }
                ]
            },
            {
                text: "后端",
                link: '/rear',
            },
            {
                text: "算法",
                link: "/arithmetic"
            },
            {
                text: "计算机基础",
                link: "/computerbase",
                items: [
                    {
                        text: "计算机网络",
                        link: "/computernetwork"
                    },
                    {
                        text: "操作系统",
                        link: "/os"
                    }
                ]
            },
            {
                text: "日常",
                items: [
                    {
                        text: "做菜笔记",
                        link: "/recipe"
                    },
                    {
                        text: "足迹",
                        link: "/footprint"
                    }
                ]
            },
            {
                text: "工具",
                items: [
                    {
                        text: "Jenkins",
                        link: "/algorithm/utils/jenkins"
                    },
                ]
            },
            // { text: '博客', link: 'http://obkoro1.com/' }, // 外部链接
            // { text: 'GitHub开源', link: 'http://obkoro1.com/' }, // 外部链接
            // { text: '前端算法', link: 'http://obkoro1.com/' }, // 外部链接
            // { text: '博客', link: 'http://obkoro1.com/' }, // 外部链接
            // { text: '博客', link: 'http://obkoro1.com/' }, // 外部链接
            // 下拉列表
            {
                text: 'GitHub',
                items: [
                    { text: 'GitHub地址', link: 'https://github.com/OBKoro1' },
                    {
                        text: '算法仓库',
                        link: 'https://github.com/OBKoro1/Brush_algorithm'
                    }
                ]
            }
        ],
        // sidebar: {
        //     '/css/': [
        //         '',
        //         'css-base',
        //         'css-box-model'
        //     ]
        // }
        // sidebar: [
        //     {
        //         title: 'HTML',
        //         // path: "/html",
        //         children: [
        //             '/html/html/html'
        //         ]
        //     },
        //     {
        //         title: 'CSS',
        //         children: [
        //             {
        //                 title: "CSS基础选择器",
        //                 path: "/algorithm/css/css-base"
        //             },
        //             {
        //                 title: "CSS复合选择器",
        //                 path: "/algorithm/css/css-compound-selector"
        //             },
        //             {
        //                 title: "盒子模型",
        //                 path: "/algorithm/css/css-box-model"
        //             },
        //             {
        //                 title: "浮动",
        //                 path: "/algorithm/css/css-float"
        //             },
        //             // ['/algorithm/css/css-base', 'CSS基础选择器'],
        //             // ['/algorithm/css/css-compound-selector', 'CSS复合选择器'],
        //             // ['/algorithm/css/css-box-model', '盒子模型'],
        //             // ['/algorithm/css/css-float', '浮动'],
        //         ]
        //     },
        //     {
        //         title: 'JavaScript',
        //         children: [
        //             '/algorithm/js/js'
        //         ]
        //     },
        //     {
        //         title: 'Vue',
        //         children: [
        //             '/algorithm/vue/vue'
        //         ]
        //     },
        //     {
        //         title: '工具',
        //         children: [
        //             {
        //                 title: "Jenkins",
        //                 children: [
        //                     '/algorithm/utils/jenkins'
        //                 ]
        //             }
        //         ]
        //     }
        // ],
    },
    // 搜索引擎 https://cloud.tencent.com/developer/article/2018247
    plugins: [
        ['flexsearch']
    ],
}