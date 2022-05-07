module.exports = {
    themeConfig: {
        nav: [
            { text: '概述', link: '/' },
            { text: 'Basic', link: '/basic/html/question' },
            { text: 'UI', link: '/UI/elementui/main' },
            { text: 'Server', link: '/server/node/main' },
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
                            title: '常见问题', 
                            path: '/server/node/main' 
                        },
                    ]
                },
                { 
                    title: 'Webpack', 
                    collapsable: true, 
                    children: [
                        { 
                            title: '常见问题', 
                            path: '/server/webpack/main' 
                        },
                    ]
                },
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
                    ]
                },
                { 
                    title: 'React', 
                    collapsable: true, 
                    children: [
                        { 
                            title: '常见问题', 
                            path: '/framework/react/main' 
                        },
                    ]
                },
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