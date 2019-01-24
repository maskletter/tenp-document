
## 插件示例

```typescript
"use strict";

module.exports =  class TextPlugin{

    constructor(){ 
		
		this.request = {
			aa(){
				//为tenp.Request添加aa方法
			}
		}

		this.response = {

		}
	
    }
    

    onInit(config){
       console.log('初始化插件')
    }
 
    async onInitRequest(config, classConfig){
        
    } 

    async onInitClass({$router, currentConfig, parentConfig}){
        return currentConfig;
    }
    

    async main(request, response, config){
        console.log(`url请求:${request.url}`)
    }

}

```

## 为插件创建.d.ts文件
```typescript
import tenp from "@tenp/core";


declare module 'tenp'{

	interface Request{
		aa(): void;
	}

    interface InitConfig {

    }

    interface RouterConfig {
        
    }

}

declare class TextPlugin {}

export default TextPlugin;
```

## 方法说明

```typescript
export declare namespace Plugin{

	/**
	 * 扩展express.request方法
	 */
	const request: { [prop: string]: Function }
	/**
	 * 扩展express.response方法
	 */
	const response: { [prop: string]: Function }

    /**
     * 初始化插件时候运行
     * @param  {[type]} config [tenp初始化配置]
     */
	function onInit(config: tenp.InitConfig): void

    /**
     * [初始化url时候运行]
     * @param {[type]} config:      tenp.RouterConfig [description]
     * @param {[type]} classConfig: tenp.Router       [description]
     */
	function InitRequest(config: tenp.RouterConfig, classConfig: tenp.Router): void

	/**
	 * 加载router时运行
     * @param  {[type]} options.$router       [class类实例]
     * @param  {[type]} options.currentConfig [当前class的router配置]
     * @param  {[type]} options.parentConfig  [父class的router配置]
	 */
	function InitClass(config: { $router: Function, currentConfig: tenp.Router, parentConfig: tenp.Router }): tenp.Router;
	

    /**
     * [插件主方法，运行于进入接口请求时候]
     * @param  {[type]} request:          tenp.Request  [Request对象]
     * @param  {[type]} response:         tenp.Response [Response对象]
     * @param  {[type]} tenp.RouterConfig [url的@config配置]
     */
	function main(request: tenp.Request, response: tenp.Response, config: tenp.RouterConfig): void;

}
```