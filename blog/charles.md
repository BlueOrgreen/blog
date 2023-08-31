---
slug: charles
title: 抓包工具charles
authors: 帆云
# date: 2023-04-01
tags: [抓包, 工具]
keywords: [抓包, 工具]
image: /img/blog/charles.awebp
description: charles不仅帮能助我们抓取到报文进行分析，也能对报文进行拦截后重新处理包括修改网络请求参数、动态修改网络请求、模拟慢速环境...
---

# charles

### 前言

因为在PC端中，我们一般可以通过F12打开控制台来分析网络请求状况，所以很少会有需要用charles的场景。而在移动端中虽然可以通过植入第三方插件，诸如vconsole、eruda来打开移动端的控制台信息页面，但是这些也仅适用于测试环境，上了生产环境以后，我们如果需要分析网络情况就需要抓包工具，而charles是比较简单易用的，因此本文也仅以charles并针对移动端来进行总结。

抓包原理: 手机通过把网络委托给charles进行代理与服务端对话

### 1. 环境准备

- 开启ssl代理: Proxy -> SSL Proxy Setting -> enable SSL Proxy
- 新增location 为 * 的记录
- 在手机安装charles证书 可以在菜单 Help -> SSL Proxy -> Install Charles Root Certificate on a Mobile device or Remote browser
 之后会出现提示 `Configure your device to use charles as its Http Proxy on xxx1 then browser to chls.pro/ssl to download and install the certificate`
- 设置手机代理保持手机和PC在同一个IP和端口
- 重新发起网络请求后 点击allow即可完成设置 开始抓取网络请求

### 2.模拟弱网环境

1. 开启Throttling:  Proxy -> Start Throttling
2. 在Throttling Setting中 add 需要 Throttling 的 Location，可以针对该Location 设置其RTT（往返时延）、kbps(网络带宽，每秒传输数据量)
3. 重新针对发起该 Location 的网络请求

### 3.断点设置（BreakPoint Settings）

- 开启断点设置 `able breakingpoints` -> `breakpoint setting`
- `add` 添加 需要断点的 Host
- 可以针对 `request` 或者 `response` 来拦截并修改请求头或篡改响应体