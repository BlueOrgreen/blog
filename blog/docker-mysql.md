---
slug: docker-mysql
title: 使用docker安装mysql
# date: 2023-04-01
authors: 帆云
tags: [docker, mysql]
keywords: [docker, mysql]
image: /img/blog/docker.png
description: 每次开发项目时对于不同机器环境会需要去下载mysql应用还需要配置环境变量, 不仅繁琐而且应用也很占地方, 而docker则完美解决这个问题
---

# Docker & Mysql

### 前言

每次开发项目时对于不同机器环境会需要去下载 `mysql` 应用还需要配置环境变量, 不仅繁琐而且应用也很占空间

`Docker` 能在本地开启多个数据库 并控制打开/关闭 很适合开发

### 基本使用

1. **查看镜像**

<!-- 查看 -->
```bash
docker images -a
docker ps -a
```


2. **启动mysql**

```bash
docker run -p 3306:3306 --name docker_mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql
```
- `-p` 端口映射 外部主机通过3306 访问到`mysql`服务器
- `--name` 给容器起名字
- `-e MYSQL_ROOT_PASSWORD=123456` 设置数据库密码
- `-d` 进程后台执行 (不执行stop命令, 容器会一直运行, 哪怕关闭了终端)

3. **启动多个mysql**
```bash
docker run -p 3307:3306 --name docker_mysql2 -e MYSQL_ROOT_PASSWORD=123456 -d mysql
```

### 延伸

使用`docker`能够启用大部分程序开发需要的服务, 如`redis`、`mongod`, 我们只需要下载它对应的镜像然后执行

[Docker Hub](https://hub.docker.com) 查看下载镜像资源

<!-- 安装镜像 -->
```bash
docker pull mysql
```