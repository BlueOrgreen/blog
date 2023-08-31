---
slug: code-specification
title: 前端代码规范
# date: 2023-04-01
authors: 帆云
tags: [eslint, prettier, husky, 代码规范]
keywords: [eslint, prettier, husky, 代码规范]
image: /img/blog/specification.png
description: 我相信开发者一定对上面的红线密布不陌生, 对于有代码洁癖的人来说上面的情况是不能容忍的, 那么如何去搭建前端代码规范呢?
---

# 前端代码规范

### 前言

当项目小且开发人员很少时, 前端代码规范或许可有可无, 但是随着项目的增大、成员的进入，代码体积变得臃肿, 如果前期的代码规范没做好, 那么给后续的人留下将会是屎山级的代码, 题主本人维护所在的公司的几个老项目时就备受煎熬, 让人头皮发麻, 深感代码规范的重要性...

一个好的代码规范不仅能统一代码规范, 也能有利于团队成员间代码的维护和审核

### 所需工具

| 工具库                          |  描述         |
| ------------------------                    | -----------   | 
| [eslint](https://eslint.org/)      |  静态分析你的代码从而能迅速的发现问题      | 
| [prettier](https://prettier.io/)    | 一个自以为是的代码格式化程序     | 
| [commitlint](https://commitlint.js.org/#/)    | 帮助团队遵守提交的约定     | 
| [lint-staged](https://github.com/okonet/lint-staged)    |  让 **lint** 更有意义 <br/> 能够只针对你修改的文件进行lint 而不是所有的文件    | 
| [husky](https://typicode.github.io/husky/#/?id=features)    | 当你**commit**或**push**的时候, 你可以用它来规范你的提交信息, 跑单元测试, 规范代码    | 

### 从零搭建项目到制定开发规范

#### 1. 使用 `pnpm` `vite` 创建项目 


```bash
pnpm create vite my-simple-app --template react-ts
```

#### 2. 安装工具库


```bash
# 这里采用 `airbnb` 的代码风格
# eslint-plugin-unused-imports 用于删除未使用的导入
pnpm add eslint \ 
prettier \
@typescript-eslint/parser \
@typescript-eslint/eslint-plugin \
eslint-config-airbnb-base \
eslint-config-airbnb-typescript \
eslint-config-prettier \
eslint-plugin-import \
eslint-plugin-prettier \
eslint-plugin-unused-imports \
eslint-plugin-jest \
jest -D
```

#### 3. 配置 tsconfig.json 文件

```json
{
  "compilerOptions": {
      "strict": true,
      "target": "esnext",
      "jsx": "preserve",
      "module": "CommonJS",
      "moduleResolution": "Node",
      "declaration": true,
      "removeComments": true,
      "emitDecoratorMetadata": true,
      "experimentalDecorators": true,
      "alwaysStrict": true,
      "sourceMap": true,
      "incremental": true,
      "forceConsistentCasingInFileNames": true,
      "isolatedModules": true,
      "esModuleInterop": true,
      "noUnusedLocals": true,
      "noImplicitReturns": true,
      "strictNullChecks": false,
      "strictBindCallApply": false,
      "noFallthroughCasesInSwitch": true,
      "allowSyntheticDefaultImports": true,
      "pretty": true,
      "resolveJsonModule": true,
      "skipLibCheck": true,
      "noImplicitAny": true,
      "allowJs": true,
      "importsNotUsedAsValues": "remove",
      "noEmit": false,
      "lib": ["esnext", "DOM", "ScriptHost", "WebWorker"],
      "baseUrl": ".",
      "outDir": "./dist",
      "paths": {
          "@/*": ["./src/*"]
      }
  },
  "include": ["src", "test", "typings/**/*.d.ts", "**.js"]
}
```

#### 4. 配置 .eslintrc 文件

```js
module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    root: true,
    env: {
        node: true,
        jest: true,
    },
    plugins: ['@typescript-eslint', 'jest', 'prettier', 'import', 'unused-imports'],
    extends: [
        'airbnb-base',
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:jest/recommended',
        'prettier',
        'plugin:prettier/recommended',
    ],
    rules: {
        'no-console': 0,
        'no-var-requires': 0,
        'no-restricted-syntax': 0,
        'no-continue': 0,
        'no-await-in-loop': 0,
        'no-return-await': 0,
        'no-unused-vars': 0,
        'no-multi-assign': 0,
        'no-param-reassign': [2, { props: false }],
        'import/prefer-default-export': 0,
        'import/no-cycle': 0,
        'import/no-dynamic-require': 0,
        'max-classes-per-file': 0,
        'class-methods-use-this': 0,
        'guard-for-in': 0,
        'no-underscore-dangle': 0,
        'no-plusplus': 0,
        'no-lonely-if': 0,
        'no-bitwise': ['error', { allow: ['~'] }],
        'import/no-absolute-path': 0,
        'import/extensions': 0,
        'import/no-named-default': 0,
        'no-restricted-exports': 0,
        'import/no-extraneous-dependencies': [
            1,
            {
                devDependencies: [
                    '**/*.test.{ts,js}',
                    '**/*.spec.{ts,js}',
                    './test/**.{ts,js}',
                    './scripts/**/*.{ts,js}',
                ],
            },
        ],
        'import/order': [
            1,
            {
                pathGroups: [
                    {
                        pattern: '@/**',
                        group: 'external',
                        position: 'after',
                    },
                ],
                alphabetize: { order: 'asc', caseInsensitive: false },
                'newlines-between': 'always-and-inside-groups',
                warnOnUnassignedImports: true,
            },
        ],

        'unused-imports/no-unused-imports': 1,
        'unused-imports/no-unused-vars': [
            'error',
            {
                vars: 'all',
                args: 'none',
                ignoreRestSiblings: true,
            },
        ],
        '@typescript-eslint/no-unused-vars': 0,
        '@typescript-eslint/no-empty-interface': 0,
        '@typescript-eslint/no-this-alias': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-use-before-define': 0,
        '@typescript-eslint/explicit-member-accessibility': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/no-unnecessary-type-assertion': 0,
        '@typescript-eslint/require-await': 0,
        '@typescript-eslint/no-for-in-array': 0,
        '@typescript-eslint/interface-name-prefix': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-floating-promises': 0,
        '@typescript-eslint/restrict-template-expressions': 0,
        '@typescript-eslint/no-unsafe-assignment': 0,
        '@typescript-eslint/no-unsafe-return': 0,
        '@typescript-eslint/no-unused-expressions': 0,
        '@typescript-eslint/no-misused-promises': 0,
        '@typescript-eslint/no-unsafe-member-access': 0,
        '@typescript-eslint/no-unsafe-call': 0,
        '@typescript-eslint/no-unsafe-argument': 0,
        '@typescript-eslint/ban-ts-comment': 0,
    },

    settings: {
        extensions: ['.ts', '.d.ts', '.cts', '.mts', '.js', '.cjs', 'mjs', '.json'],
    },
};
```

#### 5. 配置 .eslintignore 文件

忽略不需要eslint的文件

```.eslintignore
dist
back
node_modules
pnpm-lock.yaml
docker
Dockerfile*
LICENSE
yarn-error.log
.history
.vscode
.docusaurus
.dockerignore
.DS_Store
.eslintignore
.editorconfig
.gitignore
.prettierignore
.eslintcache
vite.config.ts
*.lock
**/*.css
**/*.less
**/*.svg
**/*.md
**/*.svg
**/*.ejs
**/*.html
**/*.png
**/*.toml
```

#### 6. 配置 .editorconfig文件

```.editorconfig
# http://editorconfig.org
root = true

[*]
indent_style = space
indent_size = 4
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false

[Makefile]
indent_style = tab

```

#### 7. 配置 .prettierrc 文件
```.prettierrc
{
    "singleQuote": true,
    "trailingComma": "all",
    "printWidth": 100,
    "proseWrap": "never",
    "endOfLine": "auto",
    "semi": true,
    "tabWidth": 4,
    "overrides": [
        {
            "files": ".prettierrc",
            "options": {
                "parser": "json"
            }
        }
    ]
}
```


#### 8. 配置 .prettierignore 文件

```.prettierignore
dist
node_modules
pnpm-lock.yaml
docker
Dockerfile*
LICENSE
yarn-error.log
.history
.docusaurus
.dockerignore
.DS_Store
.eslintignore
.editorconfig
.gitignore
.prettierignore
.eslintcache
*.lock
**/*.svg
**/*.md
**/*.svg
**/*.ejs
**/*.html
**/*.png
**/*.toml
```

#### 9. 配置 commitlint、husky、lint-staged

安装依赖

```bash
pnpm add @commitlint/config-conventional \
@commitlint/cli \
husky \
lint-staged  -D
```

使用 **commitlint**  初始化 commitlint.config.js 文件

```bash
echo "module.exports = {extends: ['@commitlint/config-conventional']};" > commitlint.config.js
```

使用 **husky** 

写入 husky script 并执行脚本初始化 husky 文件
```bash
pnpm pkg set scripts.prepare="husky install"
git init
pnpm run prepare
```

添加钩子 **pre-commit** **commit-msg**

```bash
npx husky add .husky/commit-msg "npx --no-install commitlint --edit"
npx husky add .husky/pre-commit "npx lint-staged"
```

在 **package.json** 中添加需要 **lint-staged** 

同时需要把`type: module` 去掉

```json
"lint-staged": {
    "*.{js,css,md,ts,tsx}": [
      "prettier --write",
      "eslint"
    ]
  }
```

### 提交测试

提交文件 可以看到已经触发prettier格式化代码和eslint校验

<img src="/img/blog/specification1.png" />

使用不规范的提交 可以看到触发 commitlint 校验

<img src="/img/blog/specification2.png" />


### 仓库地址

github: [ simple-react](https://github.com/BlueOrgreen/simple-react)


gitee: [gitee simple-react](https://gitee.com/BlueOrgreen/simple-react)