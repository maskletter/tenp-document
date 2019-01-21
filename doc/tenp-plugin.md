

tenp只是简单封装了express，而更丰满得功能皆是通过插件来实现，你可以来使用express插件，也可以创建tenp插件来丰富tenp。

tenp目前主要内置了validator(数据验证器),receive(数据接收器),interceptor(拦截器),Injectable(注入器)等插件


<table>	
	<thead >
		<tr>
			<td align="center" width="50%">插件</td>
			<td align="center" width="40%">功能</td>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td align="center">interceptor</td>
			<td align="center">用于进行接口拦截,权限控制</td>
		</tr>
		<tr>
			<td align="center">receive</td>
			<td align="center">接收通过post方式传进来得参数</td>
		</tr>
		<tr>
			<td align="center">validator</td>
			<td align="center">验证数据完整性</td>
		</tr>
		<tr>
			<td align="center">Injectable</td>
			<td align="center">注入器,路由间数据共享</td>
		</tr>
	</tbody>

</table>

## interceptor(拦截器)

在接口访问中，避免不了进行各种权限认证，正是各种权限保护着系统的正常运行，因此tenp内置了一个拦截器插件，用于保护接口的安全性

```typescript

import tenp from '@tenp/core';
import { Main ,Router, config } from '@tenp/core';

@Router({
	interceptor(req: tenp.Request, res: tenp.Response){
		if(!req.query.id){
			res.status(400).json({ code: 0, msg: '参数缺省' })
			//如果拦截住,禁止继续执行,设置return false
			return false;
		}
	}
})
class hello {
	@config({ type: 'get', url: '/getArticle' })
	private getArticle(req: tenp.Request, res: tenp.Response): void{
		res.send(`
			<h1>Hello world</h1>
		`)
	}
}

//拦截器支持async 模式，来进行异步操作
@Router({
	async interceptor(){}
})
//数组形式传参
@Router({
	interceptor: [function(){}]
})

```

### @Router.interceptorLevel(拦截器级别)

<ul>
	<li>interceptorLevel: 0  (相当与默认规则)</li>
	<li>interceptorLevel: 1  (抛弃全局得拦截器)</li>
	<li>interceptorLevel: 2  (抛弃之前所有通过class继承到的拦截器)</li>
	<li>interceptorLevel: 3  (抛弃父class的拦截器，但是保留全局得拦截器)</li>
	<li>interceptorLevel: 4  (抛弃父class的拦截器，和全局拦截器)</li>
</ul>

### @config.interceptorLevel(拦截器级别)

<ul>
	<li>interceptorLevel: 0  (相当与默认规则)</li>
	<li>interceptorLevel: 1  (抛弃全局得拦截器)</li>
	<li>interceptorLevel: 2  (仅保留自身拦截器)</li>
	<li>interceptorLevel: 3  (抛弃所在class拦截器，但是保留全局得拦截器)</li>
	<li>interceptorLevel: 4  (抛弃全部class拦截器，但是保留全局得拦截器)</li>
</ul>



## receive(数据接收器)

tenp扩展了一个接收post等参数得方法：receive(通过formidable插件实现)。  
注:receive仅实现了接收参数功能，未实现文件接收功能

```typescript

import tenp from '@tenp/core';
import { Main ,Router, config } from '@tenp/core';
@Router({})
class hello {
	@config({ type: 'get', url: '/getArticle' })
	private getArticle(req: tenp.Request, res: tenp.Response): void{
		//post等方式接收得参数默认存在req.body中
		res.json(req.body)
	}
}

//替换默认post接收方式
Main({
   async getData(request: tenp.Response){
        return { ... }
    },
})

//为接口单独设置解析方式
@config({ type: 'post', url: '/getArticle', getData(request: tenp.Response){ return {} } })
private getArticle(req: tenp.Request, res: tenp.Response): void{
	res.json(req.body)
}

```

#### 创建一个文件接收功能
```typescript
const UploadRpost = (req: tenp.Request, res: tenp.Response) => {
	return new Promise((resolve, reject) => {
		const form = new formidable.IncomingForm();
		form.uploadDir='tmp'
		form.parse(req, function(err: any, fields: any, files: any) {
			if(err){
				throw err
			}
			const extname: string = path.extname(files.upload.name);
			const filename: any = new Date().getTime() + Math.random();
			const oldpath: string = files.upload.path;
			const newpath: string = path.resolve(process.cwd(), 'assets', filename+extname)

			fs.rename(oldpath,newpath,function (err) {
	            if(err){
                    res.json({ code: 0 })
                    return;
	            }
	            fields.upload = newpath;
		      	resolve(fields);
	        });
	    });
	})
		
}
@config({ url: '/upload', name: '测试上传', type: 'post', getData: UploadRpost })
private upload(req: tenp.Request, res: tenp.Response): void{
	res.end('success')
}
```


## validator(数据验证器)

用于验证接口接收得参数完整性及是否符合要求

```typescript

import tenp from '@tenp/core';
import { Main ,Router, config } from '@tenp/core';


const articleValidation: tenp.Validation = {
	phone: {
		type: 'phone',
		required: true,
		name: '手机号',
		done(errpe: tenp.ValidationError, response: tenp.Response){
			response.statue(400).json({
                code: 0,
                msg: '发生了错误',
                err
            })
		}
	},
	/**
	 * 如果属性值没有done则执行articleValidation内的done，默认执行全局得done
	 */
	//done(errpe: tenp.ValidationError, response: tenp.Response){}
}

@Router({})
class hello {
	@config({ type: 'get', url: '/getUser', validation: articleValidation })
	private getArticle(req: tenp.Request, res: tenp.Response): void{
		res.json(req.query)
	}
}

/**
 * 为验证器添加type:phone类型
 */
Main({
	validationType: {
		phone: /^[1][3,4,5,6,7,8,9][0-9]{9}$/
	},
	//自定义错误默认回调
	validatorDone(error: tenp.ValidationError, response: tenp.Response){
		res.statue(400).json({ code: 0, error })
	}
})

```
验证器,get时候会自动判断req.query内的参数,post时候判断req.body内参数,你可以为@config添加validType字段，来改变默认的参数检查对象
```typescript

interface tenp.config {
	/**
	 * query -> req.query
	 * body -> req.body
	 * param -> req.params
	 * all -> { ...request.params, ...request.query, ...request.body }
	 */
	validType?: 'query' | 'body' | 'param' | 'all'
}

```

## Injectable(注入器)

注入器，通过new Class方式，注入到不同router中


```typescript

import tenp from '@tenp/core';
import { Main ,Router, config } from '@tenp/core';

class UserInjectable{
	private config: any;
    constructor(config: any){
        this.config = config;
    }
    public name2: string = 'cc';
}


@Router({})
class hello extends tenp {
	
	@Injectable('text-injectable') private textInjectable: any;
	
	onInit(){
		//这里的this.textInjectable为UserInjectable实例化对象
		console.log(this.textInjectable)
	}

}


Main({
	router: [ hello ],
	injectable: [ { class: UserInjectable, name: 'text-injectable', data: { name: 'tom' } } ]
})

//Function为注入得class对象,name为名字,data为class初始化时传进来的值
const injectable = [ { class: Function, name: 'xx', data: {} } ]

```