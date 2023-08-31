---
slug: server
title: 搭建服务器及个人网站
authors: 帆云
# date: 2023-04-01
tags: [服务器, 运维]
keywords: [服务器, 服务器]
image: https://yunfan-cra.oss-cn-shanghai.aliyuncs.com/fanyun-website/server.png
description: 作为一名开发人员, 在公司中虽然一直在跟代码打交道, 但是跟服务器搭建打交道的次数却是屈指可数, 所以打算写一篇文章用来梳理如何搭建服务器环境及代码部署
---


![server-banner](https://yunfan-cra.oss-cn-shanghai.aliyuncs.com/fanyun-website/server.png)


作为一名开发人员, 虽然写代码是日常工作, 但是**搭建服务器环境及代码部署**这部分知识也是需要掌握的。

本文将梳理自己搭建服务器环境的历程

## 服务器搭建及连接

市面上流行的服务器就是阿里云、腾讯云服务器

站在我个人角度，用途主要搭建个人网站类的， 首要考量的是便宜些，因此选择了 [腾讯云](https://cloud.tencent.com/) 轻量服务器


购买完服务器可以先 [连接远程服务器](https://cloud.tencent.com/document/product/1207/44578#.E4.BD.BF.E7.94.A8.E5.AF.86.E9.92.A5.E7.99.BB.E5.BD.95) ，一般连接远程服务器有几种方式

- 使用远程登录软件登陆 XShell、PyTTy
- 使用 SSH 登录（推荐）
- VNC方式登陆（基本没用到）


<details>

<summary>SSH 登陆远程服务器</summary>

```bash
ssh <username>@<IP / domain>

# 如果需要免密登陆，则需要将本地生成的公钥添加到服务器的SSH密钥里去
ssh-keygen -t rsa -C "xxx@xxx.com"
```
</details>

登陆服务器可以到👇的欢迎信息

<img src="https://yunfan-cra.oss-cn-shanghai.aliyuncs.com/fanyun-website/server2.png" />

**可以在root用户根目录下输入命令，隐藏上面的信息**

```bash
touch .hushlogin
```

:::info
Tips: 这里有个便捷的方式来登录远程服务器 使用 `ssh cloud`

配置方式是添加 `~/.ssh/config` 文件
:::

```bash
# ~/.ssh/config
Host cloud
    HostName [主机IP]
    User [用户名]
    Port  22
    IdentityFile ~/.ssh/id_rsa
```

之后便可直接在 `vscode` 中连接远程服务器并进行开发

<img src="
https://yunfan-cra.oss-cn-shanghai.aliyuncs.com/fanyun-website/server3.png" />

**使用 `vscode` 连接到远程服务器进行开发时要注意把需要插件也装上 但是会比较消耗内存**

**启动远程服务器的后端应用时 访问 127.0.0.1:3000访问不了的话, 需要进行端口映射**

### 配置环境

有了服务器，后续需要打造一个命令行环境，方便我们后续输入命令

**包安装工具**

| 工具        |  系统        |
| ---------- | -----------  | 
|  apt-get    |   **debian**     | 
|  [yum](https://www.yum.com/wps/portal/yumbrands/Yumbrands)    |   **centos**     | 

升级 `apt-get`

```bash
apt-get update
apt-get upgrade
apt-get -y install aptitude
aptitude update
aptitude full-upgrade
```

**zsh**

```bash
# 安装 zsh 
apt-get install -y zsh
yum install -y zsh

# 启用 zsh
chsh -s /bin/zsh
# 查看 zsh
echo $SHELL
```

**使用[oh-my-zsh](https://ohmyz.sh/)**

因为服务器在国内缘故，没办法魔法，这里可以在 `gitee` 找到对应的地址进行下载 [ohmyzsh](https://gitee.com/pocmon/ohmyzsh?_from=gitee_search)

之后可以根据需要安装对应插件

我这里使用另外的主题 [power10k](https://github.com/romkatv/powerlevel10k)


```bash
# 查看 插件
cat ~/.zshrc

# 替换为 powerlevel10k主题
vim ~/.zshrc
ZSH_THEME="powerlevel10k/powerlevel10k"
```

**这里所需要的插件**

```bash
# 下载对应的插件 并且修改 .zshrc 的plugins
plugins=(git autojump extract zsh-autosuggestions zsh-syntax-highlighting)
```

### 挂载云硬盘

备份网站代码和数据在数据盘中

...等有钱了 买个云硬盘， 再把这部分补上


### 创建用户

一般在服务器远程开发不会用 `root` 用户 而是使用自己创建的用户目录

```bash
# 添加
useradd [用户名]

# 修改用户为 zsh
vim /etc/passwd
[用户名]:x:1000:1000::/ho me/[用户名]:/bin/zsh

# 添加用户 跟 root 一样
vim /etc/sudoers

# 设置用户密码
passwd [用户名]

# 切换到 所创建用户的目录
su - [用户名]

#在 root 下创建用户目录
mkdir /home/[用户名]

# 给用户赋予权限
chown -Rf [用户名]:[用户名] /home/[用户名]
```

使新创建的用户也能通过 `ssh` 免登录 **在用户目录下将公钥也复制给 ~/.ssh/authorized_keys**

如果**添加公钥的时候，wq!保存，报错：E212:Can’t open file for writing** 则需要修改一下权限

```bash
sudo touch authorized_keys
sudo chown root:root authorized_keys
sudo chmod 775 authorized_keys
```


### 安装 [bpytop](https://github.com/aristocratos/bpytop) 

Linux/OSX/FreeBSD 资源管理器

监控服务器
```bash
bpytop
```

### Linux安装 [nodejs](https://nodejs.org/en) 环境

> 在服务器安装 **node** 环境不要直接放在 **root** 目录下, 建议放到新创建的用户目录下

下载并解压`node`

```bash
sudo - [用户]
sudo wget https://nodejs.org/dist/v18.16.0/node-v18.16.0-linux-x64.tar.xz -O /usr/local/src/node18.tar.xz
sudo tar -xf /usr/local/src/node18.tar.xz -C /usr/local/
sudo mv /usr/local/node-v18.16.0-linux-x64 /usr/local/node
```

添加到环境变量

```bash
echo "export PATH=/usr/local/node/bin:\$PATH" >> ~/.zshrc && source ~/.zshrc
```

设置全局库的存放目录, 以及防止权限问题, 避免每次安装全局库放在 `/usr/local` 时都需要 `sudo`


```bash
npm config set prefix $HOME/.node_modules
echo "export PATH=$HOME/.node_modules/bin:\$PATH" >> ~/.zshrc && source ~/.zshrc
```

设置 `node源` 为淘宝镜像

```bash
npm config set registry https://registry.npmmirror.com/
```

安装 `pnpm` 及初始化

```bash
npm install -g pnpm
pnpm setup 
source ~/.zshrc
``` 

之后就可以使用 `pnpm` 安装一些库啦👀, 譬如可以装 `@nestjs/cli` 

```bash
pnpm add @nestjs/cli -g
```

一些常用的包管理工具 `nnrm`

```bash
pnpm add nnrm -g
 
nnrm ls   # 显示源列表

nnrm use taobao   # 使用 taobao 镜像
```

## 搭建个人网站

### 安装包

**使用 [OneinStack](https://oneinstack.com/install/) 来搭建网站**

本地下载源码包(我一般下载到 `用户/home/code` 目录下)

```bash
wget http://mirrors.linuxeye.com/oneinstack-full.tar.gz
```

### 修改 `oneinstack` 配置文件
     

将 `www` 修改为 `[用户名]` 包括文件有


| 修改文件                      |  描述         |
| ------------------------    | -----------   | 
|  **options.conf**      |   www -> [用户名]   | 
|  **nginx_apache.conf** |  www -> [用户名]    | 
|  **nginx_tomcat.conf** |  www -> [用户名]    | 
|  **nginx.sh**          |  www -> [用户名]    | 
|  **openresty.sh**      |  www -> [用户名]    | 
|  **tengine.sh**        |  www -> [用户名]    | 


**修改 `options.conf` 文件配置**

修改网站代码存放地址

```bash
wwwroot_dir=/home/[用户名]/htdocs
```

修改日志存放地址

```bash
wwwlogs_dir=/home/[用户名]/wwwlogs
```

### 全局搜索 匹配修改


**全局匹配** 将 `data/wwwroot` 修改为 `home/[用户名]/htdocs ` 


**全局匹配** 将 `data/wwwlogs` 修改为 `home/[用户名]/wwwlogs ` 


**全局匹配** 将 `/dev/shm/php-cgi.sock` 修改为 `/var/run/php-cgi.sock` 

### 打包  `oneinstack` 程序 并将其上传到服务器上

:::info
介绍两个比较好用的工具:

Mac包压缩工具 **keka**: [keka](https://www.keka.io/en/)

ftp工具 **filezilla**: [filezilla](https://filezilla-project.org/) 使用 `SFTP` 协议将压缩包上传到服务器
:::

剪切到 `root` 目录下

```bash
sudo mv oneinstack.zip /root/
```

安装 `zip`

```bash
apt install -y zip
```

解压 `oneinstack`

```bash
unzip oneinstack.zip
```

安装执行 `screen` 

```bash
apt-get -y install wget screen

screen -S oneinstack 
```

**在服务器 `/home/[用户名]/` 目录下 创建文件夹 `htdocs` `wwwlogs`**

进去 `oneinstack` 文件目录下 执行 `./install.sh` 开始安装

- SSH port: 22(默认)
- firewall: n
- web server: y
- nginx server: 1(默认)
- apache: n
- tomcat server: 5(默认)
- Database: y
- php: y
- opcode: y(选默认1)
- phh extensions: 4 6 7 8 11 12 14
- nodejs: n
- pure-ftpd: y
- phpmyadmin: y
- redis-server: y
- mecached-server: y

**之后就可以通过 [公网IP]/phpMyAdmin 访问是否安装成功**

### 配置域名

域名购买

设置域名

概念:
- 主机记录: 
    - **泛域名:** `*` 任何的二级域名/三级域名都指向这个ip记录值(2级: www.chenchar.cn  3级: sdas.asas.chenchar.cn)
    - **顶级域名:** `@`  fanyun.cn 所指向的服务器记录, 如何没有设置 二级域名的指向(www.chenchar.cn) 那么也会指向这个记录值
- 记录纸: 填写服务器的IP地址
