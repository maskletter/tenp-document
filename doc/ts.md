

## tenp.InitConfig

```typescript

interface InitConfig{
	
	port: number | 8080;

	baseUrl?: string|''

	static?: string

	headers?: { [args: string]: string }

	https?: {
		key: Buffer,
		cert: Buffer,
		port: number
	}

	global?: any

	router?: Array<Function | { name: Function, enable: boolean }>;

	interceptor?: Array<Interceptor> | Interceptor

	express?(app: Express.Application): void

	getData?:(request: tenp.Response) => void

	throw?:(request: tenp.Request, response: tenp.Response, status: number, error: Error) => void;

}
```
## tenp.Router (@Router)

<br>

```typescript

interface Router{

	name?: string;

	url?: string;
	
	interceptor?: Array<Interceptor> | Interceptor

	interceptorLevel?: 0 | 1 | 2 | 3 | 4

	router?: Array<Function | { name: Function, enable: boolean }>;

}
```
## tenp.RouterConfig (@config)

<br>

```typescript
interface RouterConfig{
	
	name?: string;
	
	type: Array<string> | string
	
	url: string

	interceptor?: Array<Interceptor> | Interceptor

	interceptorLevel?: 0 | 1 | 2 | 3 | 4,,

	getData?:(request: tenp.Response) => void

	validation?: Validation

	validType?: 'query' | 'body' | 'param' | 'all'

	controller?: string
}
```
## tenp.createController 

<br>

```typescript
interface controllerInterface{
	(request: tenp.Request, response: tenp.Response): void
}
export const createController:(name: string, callback: tenp.controllerInterface) => Function;
```
## tenp.ValidationError 

<br>

```typescript
interface ValidationError {
	name: string,
	msg: string,
	value: string,
	type: string,
	step: string,
	alias: string
}
```
## tenp.RouterTree

```typescript
interface RouterTree{
	children: this[], 
	class: Function,
	name: string
	parentId: string
	config: tenp.Router,
	id: string
}
```

## tenp.Request 

<br>

```typescript
interface Request {
	//...继承自express
}
```

## tenp.Response 

<br>

```typescript
interface Response {
	//...继承自express
	router(path: string, param?: {
		query?: { [argv: string]: any }, 
		body?: { [argv: string]: any }
	}): any;
	parentId: string
	id: string
}
```

## tenp.Validation 

<br>

```typescript
interface Validation {
		
	done?: any;

	[argy: string]: {
		type?: 'string' | 'number' | 'boolean' | any,
		msg?: { regular?: string, type?: string, required?: string, valid?: string },
		required?: boolean | false,
		name?: string,
		regular?: RegExp,
		description?: string,
		default?: string 
		valid?: (value: string, data: any) => boolean
		done?: ValidationDone
	} | Function | 'string' | 'number' | 'boolean' | boolean;

}
```
## tenp.ValidationDone 

<br>

```typescript
interface ValidationDone {
	(err: ValidationError, response: tenp.Response): void
}
```


## tenp.Interceptor 

<br>

```typescript
interface Interceptor{
	(request: tenp.Request, response: tenp.Response): void
}
```

## tenp.inject 

<br>

```typescript
function inject(name: string): any
```
## tenp.Global 

<br>

```typescript
function Global(): any
```
## tenp.data 

<br>

```typescript
function data(): any
```