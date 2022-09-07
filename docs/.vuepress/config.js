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
            { text: 'Basic', link: '/basic/js/modularity.md' },
            // { text: 'UI', link: '/UI/elementui/main' },
            { text: 'Server', link: '/server/node/node_basic' },
            { text: 'Framework', link: '/framework/vue/ssr' },
            { text: 'Else', link: '/else/monorepo/main' }
        ],
        sidebar: {
            '/basic/': [
                // { 
                //     title: 'HTML', 
                //     collapsable: true, 
                //     children: [
                //         { 
                //             title: '常见问题', 
                //             path: '/basic/html/question' 
                //         },
                //     ]
                // },
                // { 
                //     title: 'CSS', 
                //     collapsable: true, 
                //     children: [
                //         { 
                //             title: '常见问题', 
                //             path: '/basic/css/question' 
                //         },
                //     ]
                // },
                { 
                    title: 'JS', 
                    collapsable: true, 
                    children: [
                        { 
                            title: 'JS 模块化', 
                            path: 'js/modularity.md' 
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
            '/server/': [
                { 
                    title: 'Node', 
                    collapsable: true, 
                    children: [
                        {
                            title: 'Node 问题汇总',
                            path: '/server/node/node_basic'
                        },
                        { 
                            title: 'Node Api', 
                            path: '/server/node/node_api' 
                        },
                        { 
                            title: 'Express', 
                            path: '/server/node/express' 
                        },
                        { 
                            title: 'Yarn', 
                            path: '/server/node/yarn' 
                        },
                    ]
                },
                { 
                    title: 'Linux', 
                    collapsable: true, 
                    children: [
                        { 
                            title: 'Linux 常用指令', 
                            path: '/server/linux/command' 
                        },
                    ]
                },
                { 
                    title: 'Pm2', 
                    collapsable: true, 
                    children: [
                        { 
                            title: 'pm2 快速开始', 
                            path: '/server/pm2/quickStart' 
                        },
                    ]
                },
                { 
                    title: 'Script', 
                    collapsable: true, 
                    children: [
                        { 
                            title: 'shell',
                            path: '/server/script/shell.md' 
                        },
                    ]
                },
                { 
                    title: 'Nginx', 
                    collapsable: true, 
                    children: [
                        { 
                            title: 'Nginx 常见问题',
                            path: '/server/nginx/question.md' 
                        },
                    ]
                },
            ],
            '/framework/': [
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
                { 
                    title: 'React', 
                    collapsable: true, 
                    children: [
                        { 
                            title: '基础教程', 
                            path: '/framework/react/basic' 
                        },
                        { 
                            title: 'JSX 基础知识拓展', 
                            path: '/framework/react/jsx' 
                        },
                        { 
                            title: '组件与模块知识拓展', 
                            path: '/framework/react/module' 
                        },
                        { 
                            title: '开发者工具的使用', 
                            path: '/framework/react/devtool' 
                        },
                        { 
                            title: 'React 函数式组件', 
                            path: '/framework/react/funccomponent' 
                        },
                        { 
                            title: '类组件及类的基本知识复习', 
                            path: '/framework/react/classcomponent' 
                        },
                        { 
                            title: 'React 状态 state', 
                            path: '/framework/react/state' 
                        },
                        { 
                            title: 'React props', 
                            path: '/framework/react/props' 
                        },
                        { 
                            title: 'React refs', 
                            path: '/framework/react/refs' 
                        },
                        { 
                            title: 'React 组件相关内容', 
                            path: '/framework/react/component' 
                        },
                        { 
                            title: '补充内容 - 高阶组件和函数柯里化', 
                            path: '/framework/react/complexfunc' 
                        },
                        { 
                            title: '组件的生命周期', 
                            path: '/framework/react/life' 
                        },
                        { 
                            title: 'React 的 Diff 算法', 
                            path: '/framework/react/diff' 
                        },
                        { 
                            title: 'React 脚手架', 
                            path: '/framework/react/脚手架' 
                        },
                        { 
                            title: 'React 组件传参', 
                            path: '/framework/react/组件传参' 
                        },
                    ]
                },
            ],
            '/else/': [
                { 
                    title: 'monorepo',
                    children: [
                        { 
                            title: '概念', 
                            path: 'monorepo/main' 
                        },
                    ]
                },
                { 
                    title: 'V8',
                    path: 'v8'
                },
            ],
        }
    }
}