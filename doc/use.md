
## Main

Main是tenp的入口，它包含了tenp及express的全局配置等信息

### 示例
```typescript
import { Main ,Router, config, data } from '@tenp/core';
Main({
	port: 6527
	})
```

### 相关配置
```typescript
/**
 * port: 服务端口号
 * router: [路由模块]
 * https: 配置https
 * headers: 配置headers
 * express: express配置
 * validatorDone: 全局验证器错误处理
 * throw: 全局异常处理
 * getData: 全局post接收数据处理
 * global: 全局参数
 * static: 配置静态服务器
 */
Main({
	port: 6527,
	router: [],
	headers: [],
	express: function(){},
	validatorDone: function(){},
	throw: function(){}
	getData: function(){},
	https: {},
	global: {},
	static: 'assets'
	})
```

### express
`tenp`的底层是`express`，因此所有的`express`插件都可以直接运行，只需在Main中注册级可
```typescript
import { Main ,Router, config } from '@tenp/core';
import * as express from 'express';

Main({
	port: 8080,
	express(app: express.Application){
		//app为express实例化对象
		app.use(xxx);
		app.use(function(req, res, next){
			next();
		})
	}
})

```

### https
`tenp`默认启动的是http服务器，如果你需要同事启动https服务器，则需要添加https参数
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
### 全局参数
`tenp`中内置了要给全局参数，你可以在任何路由模块中通过`@Global`获取这个参数，并得到藏匿其中的值
```typescript
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
Main({
	router: [ HelloRouter ],
	global: {
		name: 'tom'
	}
})
```
### 静态服务器
`tenp`的静态服务器是利用了`express`的内置中间件`express.static`创建的，更多详情可以参考`serve-static`库。
```typescript
import { Main } from '@tenp/core';
Main({
	port: 8080,
	//如果配置static，tenp就会创建一个静态服务器，没有则不创建
	static: path.join(process.cwd(), 'assets'),
})
```
### 异常处理

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
			 * 或者 
			 		throw '测试抛出异常';
			 	此时status默认是500
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

## @Router

tenp的路由都是以模块为单位，将不同功能拆分成不同的路由模块，使对路由的管理更加清晰。

### 最简单的路由模块
```typescript
import { Main ,Router, config, data } from '@tenp/core';
@Router({})
class HellWorldRouter{
	private world(req: tenp.Request, res: tenp.Response): void {
		res.end(`<h1>world</h1>`)
	}
}
```

### 配置router
```typescript
/**
 * name: 添加备注使用
 * url: 配置路由模块内接口的根路径，url会继承父元素的路径
 * provide: 配置注入器
 * interceptor: 配置拦截器，可以为function或者数组function
 * interceptorLevel: 拦截器级别
 * router: 子路由
 */
@Router({
	name: '测试得模块',
	url: '/user',
	provide: [ { class: Class, name: string } ],
	interceptor: [ function(){} ] | function(){},
	interceptorLevel: 0,
	router: [  ]
})
```
### 子路由参数传递
当出现一个公共的路由模块，需要转载到多个不同路由时候，可能需要父路由来进行参数传递，来进行不同操作，可以在装载子路由时候为子路由配置不同参数，然后使用@data来获取父元素传进来的参数
```typescript
@Router({})
class Test2Router{
	@data private parentData: any;
	private onInit(): void {
		console.log(this.parentData)
		//{ name: 'Hello,world' }
	}
}
@Router({
	/*router: [ Test2Router ]*/
	router: [ { class: HelloWorld, data: { name: 'Hello,world' } } ],
})
class Test1Router{
	
}
```

## @config

通过@config方法，你可以来创建一个接口请求，并为其添加各种方法来丰富它

### 创建hello,world接口
```typescript
import tenp from '@tenp/core';
import { Main ,Router, config } from '@tenp/core';

@Router({})
class HelloRouter{

	@config({ type: 'get', url: '/hello' })
	private hello(req: tenp.Request, res: tenp.Response): void {
		res.end('<h1>Hello,world</h1>')
	}
	
}
```

### 配置config
```typescript
/**
 * name: 接口的备注信息
 * url: 接口的url路径，会继承@Router及@Router父元素的url
 * type: 接口的请求方式，也可以为数组形式['get','post']
 * validation: 用于验证接收的参数的完整性
 * validType: 固定验证的参数(默认在get只会验证query中的参数,而post时会验证body中的)
 * interceptor: 配置拦截器，可以为function或者数组function
 * interceptorLevel: 拦截器级别
 * getData: 自定义post形式的参数解析
 */
@config({
	name: '测试配置',
	url: '/hello', 
	type: 'get', 
	validation: DeleteValidation,
	validType: 'all',
	interceptor: [ function(){} ] | function(){},
	interceptorLevel: 0,
	getData: function(){}
	})
```

## @Get
## @Post
## @Head
## @Delete
## @Put

同样用于创建接口,
```typescript
@Router({})
class HelloRouter{

	@Get('/test-get')
	private hello(req: tenp.Request, res: tenp.Response): void {
		res.end('<h1>Hello,world</h1>')
	}
	@Post('/test-post')
	private hello(req: tenp.Request, res: tenp.Response): void {
		res.end('<h1>Hello,world</h1>')
	}
	@Head('/test-head')
	private hello(req: tenp.Request, res: tenp.Response): void {
		res.end('<h1>Hello,world</h1>')
	}
	@Delete('/test-delete')
	private hello(req: tenp.Request, res: tenp.Response): void {
		res.end('<h1>Hello,world</h1>')
	}
	@Put('/test-put')
	private hello(req: tenp.Request, res: tenp.Response): void {
		res.end('<h1>Hello,world</h1>')
	}
	
	//此方式创建不存在type属性，其他参数与@config一致
	@Get({ url: '/test-get', ...argv })
	private hello(req: tenp.Request, res: tenp.Response): void {
		res.end('<h1>Hello,world</h1>')
	}

}
```
## Response
tenp的`Response`继承了express.Response的所有方法，并在express的基础上，添加了router等方法

### router

response.router方法用于进行接口转发操作

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

### response.parentId
父路由模块标识
### response.id
所在路由模块标识

## controller

### 创建控制器
使用`createController`函数创建控制器，`createController`会返回一个主函数，即createController的第二个参数
```typescript
import { createController } from '@tenp/core'

export default createController('user.login', function(request: tenp.Request, response: tenp.Response){
    response.end('hello,world')
})

```
### 使用控制器
```typescript
import { Main, Router, config, Controller } from '@tenp/core';

@Router({})
export default class HellWorld{
 	
	/**
	 * 使用控制器
	 *  控制器的名字必须为唯一值
	 */
	@Controller('user.login')
    @config({ url: '/login', type: 'get' })
    private readonly login: void;

    /**
     * 或者使用以下方式调用控制器
     */
    @config({ url: '/login', type: 'get' })
    private login(request: tenp.Request, response: tenp.Response): void {
    	controller('user.login').apply(this, [request, response]);
    	//如果控制器无需使用this，也可以直接controller('user.login')()方式调用
    };

}
```
在控制器内使用this对象
```typescript
//创建控制器
export default createController('user.login', function(this: HellWorld, request: tenp.Request, response: tenp.Response){
    response.end('hello,world')
})
```

## node require路径引用
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


