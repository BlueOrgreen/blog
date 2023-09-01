
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
        preview: 'https://yunfan-cra.oss-cn-shanghai.aliyuncs.com/fanyun-website/blog.png',
        source: "https://www.baidu.com",
        tags: ['opensource', 'design', 'favorite'],
        type: 'web',
        tech: ["react", "docusaurus", "hooks"]
    },
    {
        title: '小雯工作室官网',
        description: '🗼 来自法国设计工作室的官网',
        preview: 'https://yunfan-cra.oss-cn-shanghai.aliyuncs.com/fanyun-website/france.png',
        website: 'https://france.chenchar.cn/',
        tags: ['business', 'design', 'personal'],
        type: 'web',
        tech: ["react", "nextjs", "tailwindcss", "react spring"]
    }
]


