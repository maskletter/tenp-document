
> tenp serve服务依托于pm2，简单实现了pm2的list，show，start，logs，kill，reload，disconnect等方法

tenp的启动js声明在package.json的main变量上,默认是server.js,如果你想更换启动的js,可以修改package.json->main参数

### 快速创建

```typescript
//tenp init [项目目录]
$ tenp init test-tenp
```

### 开发环境启动

```typescript
$ tenp dev
//添加环境配置
$ tenp dev --mode beta
//从新编译代码并结束进程(主要是给serve用的)
$ tenp dev --build
//生成一个url.json，里面存放所有路由路径
$ tenp dev --url
```

### 生产环境启动

```typescript
$ tenp server
//添加环境配置
$ tenp server --mode beta
//添加集群模式
$ tenp server -i [cpu数量]
//从新编译代码并启动
$ tenp server --build
//生成一个url.json，里面存放所有路由路径
$ tenp server --url
```

### 查看所有已启动的服务

```typescript
$ tenp list
$ tenp ls
```

### 查看具体服务信息

```typescript
//$ tenp show [id|name]
$ tenp show 0
```

### 查看日志

```typescript
//tenp logs [id|name]
$ tenp logs 0
```

### 杀死全部服务

```typescript
$ tenp kill
```

### 关闭指定服务

```typescript
//tenp stop [id|name]
$ tenp stop 0
```

### 重启服务

```typescript
//tenp reload [id|name]
$ tenp reload 0
```

### 断开与pm2守护进程的连接

```typescript
$ tenp disconnect
```