
## Kvl(一个基于express/ts的Nodejs框架)

<br>
<p align="center">
   <img src='https://maskletter.github.io/tenp-document/dist/assets/img/tenp.6d5e6693.svg' width='400' />
</p>

<br>

基于 `express` ，兼容 `express` 所有方法及中间件，两者可并行使用，使用 `typescript` 实现，内置pm2基础服务调用，统一的全局接口错误处理回调。

<a href="https://badge.fury.io/js/%40tenp%2Fcore" title="NPM Version Badge" rel="nofollow">
   <img src="https://badge.fury.io/js/%40tenp%2Fcore.svg" height="18">
</a>
<a href="https://img.shields.io/badge/node-%3E%3D6-brightgreen.svg" title="Node Limitation" rel="nofollow">
   <img src="https://img.shields.io/badge/node-%3E%3D6-brightgreen.svg" alt="npm version" height="18">
</a>

👉👉👉[演示项目链接](https://github.com/maskletter/kvl-demo)
<br>

---

 * [Express(底层框架)](https://github.com/expressjs/express)
 * [Typescript(开发语言)](http://www.typescriptlang.org/)
 * [pm2(服务)](https://github.com/Unitech/pm2)
 --- 
 * [router(路由功能)](/dist/use.html#router路由)
 * [interceptor拦截器(用于进行请求拦截)](/dist/tenp-plugin.html#interceptor-拦截器)
 * [Validation验证器(用于数据验证)](/dist/tenp-plugin.html#validator-数据验证器)
 * [throw(全局接口异常)](/dist/use.html#全局异常)



<br />

#### 框架进度

<table>	
	<thead>
		<tr>
			<td align="center" width="20%">功能</td>
			<td align="center" width="40%">状态</td>
			<td align="center">说明</td>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td align="center">express</td>
			<td align="center">已完成</td>
			<td align="center">以express为基础</td>
		</tr>
		<tr>
			<td align="center">typescript</td>
			<td align="center">已完成</td>
			<td align="center">完整的ts配置，实现开发环境监听代码自动重启服务</td>
		</tr>
		<tr>
			<td align="center">router</td>
			<td align="center">已完成</td>
			<td align="center">模块化路由功能</td>
		</tr>
		<tr>
			<td align="center">interceptor</td>
			<td align="center">已完成</td>
			<td align="center">拦截器</td>
		</tr>
		<tr>
			<td align="center">validation</td>
			<td align="center">待完善</td>
			<td align="center">数据验证器</td>
		</tr>
		<tr>
			<td align="center">Api interface</td>
			<td align="center">未开始</td>
			<td align="center">创建api文档</td>
		</tr>
		<tr>
			<td align="center">pm2</td>
			<td align="center">已完成</td>
			<td align="center">利用pm2官方api，实现简单的pm2服务</td>
		</tr>
		<tr>
			<td align="center">throw</td>
			<td align="center">已完成</td>
			<td align="center">接口异常处理</td>
		</tr>
		<tr>
			<td align="center">cli</td>
			<td align="center">已完成,待优化</td>
			<td align="center">基于node的cmd命令行工具</td>
		</tr>
		<tr>
			<td align="center">环境配置</td>
			<td align="center">已完成</td>
			<td align="center">自定义环境变量</td>
		</tr>
	</tbody>


</table>

<br>

通过Npm 方式安装kvl，并创建服务运行
```bash
$ npm install @tenp/cli -g
$ tenp init hellworld
$ cd hellworld
$ tenp dev
```
<br>



#### 基础方式使用
```typescript

import tenp from '@tenp/core';
import { Main ,Router, config, ValidationDone } from '@tenp/core';
@Router({}) 
class HelloWord{

	private msg: string = 'Hello, world'

	@config({ url: '/hello', name: 'hello', type: 'get' })
	private hello(req: tenp.Request, res: tenp.Response): void {
		res.end(`<h1>${this.msg}</h1>`)
	}

}
Main({
	port: 8080,
	router: [ HelloWord ],
})
```
