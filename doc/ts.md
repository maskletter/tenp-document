

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

	throw?:(request: ExpressRequest, response: ExpressResponse, status: number, error: Error) => void;

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
}
```
## tenp.ValidationError 

<br>

```typescript
interface ValidationError {
	errorMsg: string,
	required: boolean,
	name: string,
	regular: string,
	value: string
	type: 'string' | 'number' | 'boolean' | any
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
		required?: boolean | false,
		name?: string,
		regular?: RegExp,
		description?: string,
		done?: ValidationDone
	} | Function | 'string' | 'number' | 'boolean' | boolean | { empty: string, regular: string } | any;

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

## tenp.Injectable 

<br>

```typescript
function Injectable(name: string): any
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