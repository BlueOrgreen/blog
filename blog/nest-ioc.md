---
slug: nest-ioc
title: nest实现ioc
authors: 帆云
# date: 2023-04-01
tags: [ioc, nest]
keywords: [ioc, nest]
image: /img/blog/nestjs.png
description: ioc即控制反转, 它指的是什么意思, 它控制什么, 又反转什么呢, 为什么要反转? 那些方面反转呢? 跟着这篇文章一起来探讨一下吧!       
---

# nest实现ioc容器

## reflect

### 基本概念

`Reflect` 可以给对象添加元数据但是不改变对象本身

直接通过对象赋值的方式会修改对象本身

```tsx
import 'reflect-metadata'
let target = {}

Reflect.defineMetadata('name', 'zhangsan', target)
Reflect.defineMetadata('name', 'world', target, 'hello')

console.log(Reflect,getMetadata('name', target));
console.log(Reflect.getMetadata('name', target, 'hello'))
console.dir(target)
```

给类添加元数据

```js
 // 给类本身添加元数据
@Reflect.metadata('name', 'Person')
class Person {
    // 给类的原型添加元数据
    @Reflect.metadata('name', 'world')
    hello(): string {
        return 'hello world'
    }
}

console.log(Reflect,getMetadata('name', Person))
console.log(Reflect,getMetadata('name', Person.prototype, 'hello'))
```

### 利用 `Reflect` 实现装饰器 `decorator`

```jsx
// 类装饰器
function classMetadata(key, value) {
    return function(target) {
        Reflect.defineMetadata(key, value, target)
    }
}

// 方法装饰器
function methodMetadata(key, value) {
     return function(target, propertyName) {
        // target.Prototype.key = value
        Reflect.defineMetadata(key, value, target, propertyName)
    }
}
// 使用自定义的装饰器
@classMetadata('name', 'Person') // 给类本身添加元数据
class Person {
    @methodMetadata('name', 'world') // 给类的原型添加元数据
    hello(): string {
        return 'hello world'
    }
}
```

## IOC

IOC英文全称 **inverse of control** 控制反转

### 传统方式
服务的使用者需要指导服务本身和其它依赖关系如何创建的 并且手工维护依赖关系

```tsx
class Monitor {}
class Host {}
class Computer {
    monitor: Monitor;
    host: Host;
    constructor(monitor, host) {
        this.monitor = monitor;
        this.host = host;
    }
    startup() {
        console.log('准备开机!')
    }
}

// 手工创建依赖的其他服务 并且维护之间的依赖关系
const monitor = new Monitor()
const host = new Host()
const compoter = new Computer(monitor, host);
compoter.startup()
```

### IOC模式
- 系统中的服务会同统一注册到`IOC容器`中, 如果有依赖其他的服务时, 也需要对依赖进行声明, 当用户需要使用特定的服务时, `IOC容器`会负责该服务及其依赖对象的创建和管理工作

- 在传统的程序设计中, 我们直接通过 `new` 的方式创建对象, 是程序主动创建依赖对象; 而 `Ioc`是专门有一个容器来创建这些对象, 即IOC容器控制依赖对象的创建

- 在传统程序设计红我们自己在程序主动去控制获取依赖对象, 这就是**正转**; 而**反转**则是由容器来帮忙创建并注入依赖对象, 对象只是被动的接受依赖对象, 反转指的就是**依赖对象的获取被反转了**


- IOC其实是一种思想, 是面向对象编程的一种设计原则, 可以用来降低代码之间的耦合度, 有了IOC容器可以把对象的创建和查找依赖对象的控制权交给容器, 由容器来管理注入组合对象, 所以对象之间是松散的

- ioc给编程带来的思想上主从的转变. 应用程序本来是老大, 想要什么资源自己主动去获取, 而在IOC思想中应用程序变成被动, 被动等待IOC容器来创建并注入它所需要的依赖
