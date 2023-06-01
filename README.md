# easy-storage
一个支持同步、异步、过期时间用于浏览器中本地存储的工具


## 目录
- [前言](#前言)
- [特点](#特点)
- [安装](#安装)
- [示例](#示例)
- [文档](#文档)


## 前言
欢迎使用 easy-tools 系列工具之 storage


## 特点
- 支持同步、异步、过期时间(1.0.1 版实现)


## 安装
使用 npm:
```bash
$ npm install easy-tools-storage -S
```

使用 pnpm:
```bash
$ pnpm add easy-tools-storage -S
```

使用 yarn:
```bash
$ yarn add easy-tools-storage -S
```


## 示例

```ts
import { getStorage, setStorage, removeStorage, clearStorage } from 'easy-tools-storage'
// TODO: 接口名称加上 Async 后缀则为微任务处理异步
getStorage('session', 'TOKEN')
getStorage('local', 'TOKEN')

setStorage('session', 'USER_INFO', { name: 'Dante', age: 31 })
setStorage('local', 'USER_INFO', { name: 'Dante', age: 31 })

// expireTime 字段支持 Date 对象/数字时间戳 (最终存储会转换成时间戳形式, 在超过获取时间、移除数据时同步移除)
setStorage('local', 'TOKEN', 'ABCDE_12345', { expireTime: Date.now() + (7 * 24 * * 60 * 60 * 1000) })

removeStorage('session', 'SUBJECT_LIST')
removeStorage('local', 'SUBJECT_LIST')

clearStorage('session')
clearStorage('local')
clearStorage('all')
```


## 文档
**入参顺序为表顺序**

◆ **getStorage    获取 Storage(异步接口为 getStorageAsync)**
  |  参数  |  类型  |  必填  |  说明  |
  |:------|:------|:------|:-------------------------------|
  |type	  |String	|是     |本地存储类型 ('session' | 'local')|
  |key    |String	|是     |存储键名|


◆ **setStorage    设置 Storage(异步接口为 setStorageAsync, options 为配置对象)**
  |  参数  |  类型  |  必填  |  说明  |
  |:-------------------|:-----------|:------|:-------------------------------|
  |type	               |String	    |是     |本地存储类型 ('session' | 'local')|
  |key                 |String	    |是     |存储键名|
  |data                |unknown     |是     |存储数据|
  |options.expireTime  |Date|number |否     |过期时间|


◆ **removeStorage    移除 Storage(异步接口为 removeStorageAsync)**
  |  参数  |  类型  |  必填  |  说明  |
  |:------|:-------|:------|:-------------------------------|
  |type	  |String	 |是     |本地存储类型 ('session' | 'local')|
  |key    |String	 |是     |存储键名|


◆ **clearStorage    清空 Storage(异步接口为 clearStorageAsync)**
  |  参数  |  类型  |  必填  |  说明  |
  |:------|:-------|:------|:-------------------------------|
  |type	  |String	 |是     |本地存储类型 ('session' | 'local' | 'all')|
