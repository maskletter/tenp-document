


<br />

通过Npm 方式安装tenp
```bash
$ npm install @tenp/cli -g
//创建项目
$ tenp init test-tenp
//启动项目
$ tenp dev
```
mac/linux安装
```bash
$ sudo npm install @tenp/cli -g
```

<br>


#### 基础方式使用
```typescript

import tenp from '@tenp/core';
import { Main ,Router, config } from '@tenp/core';
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
}).then(({app,httpServer}) => {

	})
```

