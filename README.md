# 🏞we3-electron

we3-electron 是我闲暇时间用于练习Electron和React以及Zustand，Vite，SCSS，CSS实现暗夜模式，a11y等等的练习项目。

## ⛽️技术栈

**React**

> 核心框架

**Zustand**

> 状态管理

**Ant Design**

> 组件库

**Scss**

> 主要利用其嵌套，模块化，语法

**Vite**

> 优化打包，压缩代码，处理兼容性等等的高速构建工具

## 🪝通用hooks

**useBeforeCreatedGetUpdatedState**

> 让该窗口可以在创建的时候就去获取最新的Zustand仓库状态并且同步更新，如果存在多个窗口传递，会根据他们各自传递的仓库各个字段的最后更新时间戳来判断是否更新

**useInitialStoreInUpdateMap**

> 让该窗口创建时初始化自己的updateMap，用来保存当前渲染进程各个仓库中各个字段的最后更新时间，灵感来自Vue3的targetMap

**useListenNewWindowCreated**

> 让该窗口可以监听新窗口的创建，然后将自己的zustand所有仓库状态发送给新创建的窗口用于更新

**useUpdateStateSync**

> 让该窗口监听其他窗口的状态更新，并且同步修改。会通过传递的状态的最后更新时间和自己的updateMap对比判断是否更新

## 运行指令

### 安装依赖

```bash
$ pnpm i
```

### 开发运行

```bash
$ npm run dev
```
