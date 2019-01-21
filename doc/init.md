

## Main

tenp框架启动总入口，一个项目初始化一个tenp服务

<br>

```typescript

import { Main ,Router, config, data, Global, Injectable, FindById, FindByName } from '@tenp/core';

Main({
	port: 8080,
	router: [ HelloWord ],
})
```

Main返回包含三个参数


```typescript

import tenp from '@tenp/core';

const MainConfig = {
	port: 8080
};


Main(MainConfig).then(({ app, httpServer, httpsServer }) => {

})

//app为tenp内部创建的express()对象，方便使用者绕过tenp直接调用express
//httpServer为通过http.createServer创建的http对象
//httpsServer为通过https.createServer创建的https对象(注意，如果为Main配置了https才会返回该对象)

```

Main参数说明


```typescript
const MainConfig: tenp.InitConfig = {
	port: 8080,						//服务端口号
	baseUrl: '',					//服务下路由根路径
	router: [],						//路由对象，由@Router生成
	static: '',						//静态服务器，未设置则不启用
	https: {},						//https参数，详见Https.createServer
	interceptor: function(){},		//全局拦截器
	throw: function(){}, 			//处理服务接口内的错误
	express: function(app){},		//app为express实例化对应,可以在次函数内为app添加各种中间件
	getData: function(){},			//自定义post解析方法
	plugin: [],						//加载插件
	injectable: [],					//注入器
}
```

## Router

```typescript

@Router({
	name: '',						//类的名字，区分定义使用
	url: '',						//类下所有包括router下的请求都会带有此url
	router: [],						//路由class对象，@Router生成
	interceptor: function(){},		//类拦截器
	interceptorLevel: 1				//拦截器级别
}) 

```

## config

```typescript

@config({
	name: '',						//请求的名字，区分定义使用
	url: '',						//请求的url
	type: 'get',					//请求的方式,也可以声明一个数组: ["get","post","put"]
	interceptor: function(){},		//拦截器
	interceptorLevel: 1				//拦截器级别
	validation: {}, 				//数据效验器，验证数据是否正确
	validType: 'query',				//设置数据效验器类型('query' | 'body' | 'param' | 'all')
	getData: function(){},			//自定义post解析方法
}) 

```

## data

```typescript

@Router({})
class HelloWord{
	
	//用于获取router中传进来的参数->{ parent: 'aaaaaaa' }
	@data private initData: any;

}

Main({
	router: [ { class: HelloWord, data: { parent: 'aaaaaaa' } } ]
})

```

## Global

```typescript

@Router({})
class HelloWord{
	
	//用于获取全局变量 -> { name: tom }
	@Global private global: any;

}

Main({
	global: { name: "tom" },
	router: [ HelloWord ]
})

```

## Injectable

```typescript

class UserInjectable{
	private config: any;
    constructor(config: any){
        this.config = config;
    }
    public name2: string = 'cc';
}


@Router({})
class HelloWord{
	
	//用于获取注入器实例
	@Injectable('text-injectable') private global: any;

}

Main({
	global: { name: 'tom' },
	router: [ HelloWord ],
	injectable: [ { class: UserInjectable, name: 'text-injectable', data: { name: 'tom' } } ]
})

```

## FindByName

用于获取tenp实例化的router对象

```typescript
//获取全部router实例
const tenpRouters = FindByName();
/**
 * 搜索class.name是FindByName的实例
 * FindByName不具有唯一性，会返回所有名字相同的实例
 */
const hello = FindByName('FindByName');

```

## FindById

根据id获取tenp实例化的router对象

```typescript

/**
 * 根据传进来的id搜寻相应的路由实例
 */
const hello = FindById('[router.id]');

```