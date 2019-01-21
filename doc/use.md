

## @Router

用于创建路由模块

```typescript
import tenp from '@tenp/core';
import { Main ,Router, config, data } from '@tenp/core';


@Router({
	url: '/second'
}) 
class World{

	@data private parentData: any;
	
	/**
	 * 路由的访问路径类会继承父类的url
	 * ---> http://localhost:8080/base/first/second/world
	 */
	@config({ url: '/world', name: 'world', type: 'get' })
	private world(req: tenp.Request, res: tenp.Response): void {
		res.end(`<h1>world</h1>`)
	}

	private onInit(): void {
		console.log(this.parentData);
		//输出{ name: 'Hello,world' }
	}

}

/**
 * 给子路由传递参数,	
 * 子路由可以通过@data() private parentData: any;方式获取到父路由传递进来得参数
 */
@Router({
	url: '/first',
	router: [ { class: HelloWorld, data: { name: 'Hello,world' } } ],
})
class HelloWord {
	@config({ url: '/hello', name: 'hello', type: 'get' })
	private hello(req: tenp.Request, res: tenp.Response): void {
		res.end(`<h1>hello</h1>`)
	}
}


Main({
	baseUrl: '/base',
	port: 8080,
	router: [ HelloWord ],
})
```
## @config

通过@config来创建路由访问

```typescript
import tenp from '@tenp/core';
import { Main ,Router, config } from '@tenp/core';

@Router({})
class HelloRouter{

	@config({ type: 'get', url: '/hello' })
	private hello(req: tenp.Request, res: tenp.Response): void {
		res.end('<h1>Hello,world</h1>')
	}
	
	//只有通过@config声明得方法才会转为接口
	private b(req: tenp.Request, res: tenp.Response): void{
		res.end('<h1>Hello,world</h1>')
	}

}


```
## Response.router

扩展的一个express方法(注意:Main({},express)方式没有此方法),用于进行接口跳转

```typescript

@config({ type: 'get', url: '/hello' })
private hello(req: tenp.Request, res: tenp.Response): void {
	res.end('<h1>Hello,world</h1>')
}

@config({ type: 'get', url: '/world' })
private hello(req: tenp.Request, res: tenp.Response): void {
	//转到hello路径,
	res.router('/hello', {
        query: {  },
        body: {}
    })
}

```
## 全局异常

tenp内置了一个错误处理回调，方便使用者在接口当初通过throw抛出异常，来设定统一的错误处理来返给用户

```typescript
import tenp from '@tenp/core';
import { Main, Router, config } from '@tenp/core';

@Router({})
class HellWorld{

	@config({ type: 'get', url: '/hello-world' })
	private test(req: tenp.Request, res: tenp.Response): void {
		if(req.query.index == 123){
			/**
			 * 这里自定义了一个错误状态码
			 * 也可以使用快速模式, throw '测试抛出异常',此时status默认是500
			 */
			throw { status: 400, error: '测试抛出异常' };
		}
		res.json({ code: 1, msg: '返回成功' })
	} 

}

Main({
	port: 8080,
	/**
	 * 设置了全局错误处理，所有接口内throw出的错误都会经过此回调
	 * @param  {[type]} request:  tenp.Request   [description]
	 * @param  {[type]} response: tenp.Response  [description]
	 * @param  {[type]} status:   number        [description]
	 * @param  {[type]} error:    Error         [description]
	 */
	throw(request: tenp.Request, response: tenp.Response, status: number, error: Error){

	    if(error.stack){
            response.status(status).send(`<pre>${error.stack}</pre>`)
        }else{
            response.status(status).send(error)
        }
	}
})


```
## 状态管理

tenp内创建了一个数据共享服务(global)

```typescript

import tenp from '@tenp/core';
import { Main ,Router, Global } from '@tenp/core';

@Router({})
class HelloRouter{

	/**
	 * 通过添加@Global()方式，可以为class内任意参数设置为全局对象
	 */
	@Global() private global: any;

	onInit(): void {
		console.log(this.global.name)
	}

}

//你可以在初始化tenp时候为global复制
Main({
	router: [],
	global: {
		name: 'tom'
	}
})


```

## 静态服务器

 `tenp` 的静态服务器是利用了`express`的内置中间件`express.static`创建的，更多详情可以参考`serve-static`库。

```typescript
//tenp配置静态服务器很简单，只需要设置一个static参数级可
import tenp from '@tenp/core';
import { Main } from '@tenp/core';
Main({
	port: 8080,
	static: path.join(process.cwd(), 'assets'),
})

```


## 设置header

```typescript
Main({
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Content-Type,Content-Length, aa, Authorization, Accept,X-Requested-With, authkeys',
	}
})
```

## https访问

配置htttps访问,如果添加了https对象，`tenp`会自动创建https服务器

```typescript
Main({
	//如果初始化时候添加了https值，tenp就会自动创建一个https服务
	https: {
		//更多参数说明，请查阅https.createServer
		cert: fs.readFileSync('./https/test.crt'),
		key: fs.readFileSync('./https/test.key'),
		port: 443
	},
})
```

## require内的路径问题

nodejs的require并不能设置引用的根路径，这就导致了ts内编写时候的路径寻找不到包文件
```typescript
/**
 * 例如tsconfig.json里配置的baseUrl为【src】
 */
import Tool from 'src/tool'

/**
 * 这种方式转换成的js代码是-->require('src/tool')
 * 当Nodejs运行之后，这种路径会无法解析，导致抛出异常
 * 因此，为了更好的使用ts，避免深层目录的不断地【../】，tenp在ts转换时候修改了require引用的文件路径
 * 被转换成下例代码
 */
const Tool = reuqire(process.cwd()+"/dist/src/tool");
//dist为用户在tsconfig里配置的outDir

/**
 * 如果你的项目是固定到一个地方，可以禁止process.cwd()方式动态获取，改为固定url路径
 */
const Tool = require("G:\/wwroot\/xxxx\/bbbbb\/demo\/dist\/src\/tool");

/**
 * 将路径引用从动态改为静态，只需要在package.json的tenp.staticRequire设置为true即可
 */

/**
[import Tool from 'src/tool'] --------->  [require('src/tool')]  --------->  

 
	[检查src目录下是否存在tool.js/tool目录/tool.ts]  ----->

		如果存在，进行动态或者完整路径转换

		如果不存在, 保存原状，让nodejs进行检查路径
                    								
 */



```


