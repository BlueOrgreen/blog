
export type ProjectType = 'personal' | 'web' | 'app' | 'toy' | 'other'

export type Project = {
    title: string
    description: string
    preview: string
    website: string
    source?: string
    tags: TagType[]
    type: ProjectType
    tech: string[]
}

export type TagType =
  | 'favorite'
  | 'opensource'
  | 'product'
  | 'design'
  | 'large'
  | 'personal'
  | 'business'

export const projects: Project[] = [
    {
        title: '帆云小站',
        description: '🦖 基于 Docusaurus 静态网站生成器实现个人博客',
        website: "https://www.chenchar.cn/",
        preview: 'http://s0amp2hkw.hn-bkt.clouddn.com/project.png?e=1693562188&token=pMdVBb-vwl8GbyBzH24u-teppeKCddbSTSKkoE6d:cyTuGAfguzvOdywGW9d9BREDVlw=',
        source: "https://www.baidu.com",
        tags: ['opensource', 'design', 'favorite'],
        type: 'web',
        tech: ["react", "docusaurus", "hooks"]
    },
    {
        title: '小雯工作室官网',
        description: '🗼 来自法国设计工作室的官网',
        preview: 'http://s0amp2hkw.hn-bkt.clouddn.com/project1.png?e=1693562417&token=pMdVBb-vwl8GbyBzH24u-teppeKCddbSTSKkoE6d:1doMFrbgLHmuX7YjDnztkfYondY=',
        website: 'https://france.chenchar.cn/',
        tags: ['business', 'design', 'personal'],
        type: 'web',
        tech: ["react", "nextjs", "tailwindcss", "react spring"]
    }
]


