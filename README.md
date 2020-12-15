# Screeps Web UI（WIP）

使用 React 实现的自定义 Screeps Web UI。在线演示地址 [https://screeps.devtips.cn/a](https://screeps.devtips.cn/a)

## 背景

Screeps 是一款面向编程爱好者的开源 MMO RTS 沙盒游戏，其核心机制是为您的单位编写AI。您可以通过编写 JavaScript 来控制自己的殖民地。

- [给前端程序员推荐一款游戏 Screeps：使用 JS/TS 代码控制自己的殖民地](https://zhuanlan.zhihu.com/p/330082031)

Screeps 的后端代码是开源的，可以在自己的服务器上搭建一个游戏私服，但是前端 UI 并没有开源。只能通过 Sream 客户端来连接游戏服务器。于是我开发了这个 Web UI。

## 进度

⚠️ 目前只是一个 demo 版本，刚刚完成了房间地图的绘制和单位的显示。

## 本地开发

clone 本仓库，运行 `npm start`。

```bash
git clone git@github.com:justjavac/screeps-web-ui.git
cd screeps-web-ui
npm install
npm start
```

如果没有报错，则说明本地服务已经正常启动。
在浏览器中打开 [http://localhost:3000](http://localhost:3000) 可以看到页面。

## 说明

Api 部分的代码在 [node-screeps-api](https://github.com/screepers/node-screeps-api) 的代码库基础上进行了修改，并适配了浏览器。将来此部分代码会基于 [swr](https://github.com/vercel/swr) 使用 React Hooks 重写。

### 许可证

[screeps-web-ui](https://github.com/justjavac/screeps-web-ui) 的源码使用 MIT License 发布。具体内容请查看 [LICENSE](./LICENSE) 文件。
