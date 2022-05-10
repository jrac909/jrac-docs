module.exports = {
    base: '/blog/',
    head: [
        [
            'link',
            { rel: 'icon', href: 'imgs/home_home.png' }
        ]
    ],
    title: 'Jrac\'s 前端技术文档',
    themeConfig: {
        nav: [
            // { text: '概述', link: '/' },
            // { text: 'Basic', link: '/basic/html/question' },
            // { text: 'UI', link: '/UI/elementui/main' },
            { text: 'Server', link: '/server/node/node_api' },
            { text: 'Framework', link: '/framework/vue/ssr' },
            { text: 'Else', link: '/else/monorepo/main' }
        ],
        sidebar: {
            '/basic/html/': [
                { 
                    title: 'HTML', 
                    collapsable: true, 
                    children: [
                        { 
                            title: '常见问题', 
                            path: '/basic/html/question' 
                        },
                    ]
                },
                { 
                    title: 'CSS', 
                    collapsable: true, 
                    children: [
                        { 
                            title: '常见问题', 
                            path: '/basic/css/question' 
                        },
                    ]
                },
                { 
                    title: 'JS', 
                    collapsable: true, 
                    children: [
                        { 
                            title: '常见问题', 
                            path: '/basic/css/question' 
                        },
                    ]
                }
            ],
            '/UI/elementui/': [
                { 
                    title: 'Element-UI', 
                    collapsable: true, 
                    children: [
                        { 
                            title: '常见问题', 
                            path: '/UI/elementui/main' 
                        },
                    ]
                },
                { 
                    title: 'Ant Design', 
                    collapsable: true, 
                    children: [
                        { 
                            title: '常见问题', 
                            path: '/UI/antdesign/main' 
                        },
                    ]
                },
            ],
            '/server/node/': [
                { 
                    title: 'Node', 
                    collapsable: true, 
                    children: [
                        { 
                            title: 'Node Api', 
                            path: '/server/node/node_api' 
                        },
                        { 
                            title: 'Express', 
                            path: '/server/node/express' 
                        },
                    ]
                },
                // { 
                //     title: 'Webpack', 
                //     collapsable: true, 
                //     children: [
                //         { 
                //             title: '常见问题', 
                //             path: '/server/webpack/main' 
                //         },
                //     ]
                // },
            ],
            '/framework/vue/': [
                { 
                    title: 'Vue', 
                    collapsable: true, 
                    children: [
                        { 
                            title: 'SSR 服务端渲染', 
                            path: '/framework/vue/ssr' 
                        },
                        { 
                            title: 'VuePress 使用教程', 
                            path: '/framework/vue/vuepress' 
                        },
                    ]
                },
                // { 
                //     title: 'React', 
                //     collapsable: true, 
                //     children: [
                //         { 
                //             title: '常见问题', 
                //             path: '/framework/react/main' 
                //         },
                //     ]
                // },
            ],
            '/else/monorepo/': [
                { 
                    title: 'monorepo',
                    children: [
                        { 
                            title: '概念', 
                            path: 'main' 
                        },
                    ]
                },
            ]
        }
    }
}