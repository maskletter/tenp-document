
> 为了不是文件过于复杂,所以tenp的环境配置声明在了package.json内

## 配置生成环境/测试环境/其他环境


```json
{
	"tenp": {
		"env": {
			"dev": {
				"port": 8080
			},
			"build": {
				"port": 80
			}
		}
	}
}
```

tenp启动时候,会自动检索package.json内的tenp参数,并将`env->dev`内的参数自动加载进开发环境中,而`env->build`加载进生产环境中

> 创建自定义环境

```json
{
	"tenp": {
		"env": {
			"dev": {
				"port": 8080
			},
			"build": {
				"port": 80
			},
			"test": {
				"port": 8081
			}
		}
	}
}
```

然后通过命令行--mode 方式将自定义环境加载进服务中

```bash
$ tenp dev --mode test
$ tenp serve --mode test
```


## 自定义pm2配置


tenp的serve服务是利用了pm2的api，因此更多关于服务器配置问题，可以参考PM2官方文档


```json
{
	"tenp": {
		"pm2": {
	    	"name": "hello,world",
	    	...参数配置
	    }
	}
}
```

## 错误通知


tenp dev模式下,当代码编译出错时候,会向系统发出一个错误消息,来提醒使用者(显示效果根据操作系统而定)。<br>
你可以通过设置`notice`来禁止通知。


```json
{
	"tenp": {
	    "notice": false
	}
}
```

## 生成url.json文件

将服务内所有接口,导出到url.json中(url.json创建在项目根目录)。

```json
{
	"tenp": {
	    "createUrlPath": true
	}
}

```

> 也可以通过命令行方式创建url.json


```bash
$ tenp dev --url
$ tenp serve --url
```

## 固定require引用路径


将服务内require的引用路径转为绝对路径。<br>
更多关于require，请浏览[ts:require问题](/use.html#require内的路径问题)

```json
{
	"tenp": {
	    "staticRequire": true
	}
}
```
