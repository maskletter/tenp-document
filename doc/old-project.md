
<br />

1. 安装tenp核心文件
```bash
$ npm install @tenp/core --save
```

2. 安装typescript及声明文件(或者其他声明文件)
```bash
$ npm install typescript @types/node @types/express --save
```

3. 创建src目录，将项目项目文件移动到src目录中(node_modules等除外)

4. 项目根目录创建tsconfig.json
```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "src",
    "sourceMap": false,
    "declaration": false,
    "noErrorTruncation": true,
    "allowJs": true,
    "moduleResolution": "node",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "strict": true,
    "alwaysStrict": false,
    "noImplicitUseStrict": false,
    "allowSyntheticDefaultImports": false,
    "resolveJsonModule": true,
    "strictPropertyInitialization": false,
    "target": "es5",
    "rootDir": "./src",
    "outDir": "./dist",
    "watch": true,
    "typeRoots": [
      "node_modules/@types",
      "./types"
    ],
    "lib": [
      "es2016",
      "dom"
    ]
  },
  "include": [
    "./src/**/*", "./types/*"
  ]
}
```

5. 项目目录结构<br>

* test-tenp  
    * node_modules  
        * ...  
    * src  
    	* ...
        * server.ts  
    * types  
    * tsconfig.json  
    * package.json  

---

> 接入express

👉👉👉[接入express](/express.html)
<br><br>

> 自定义引用模块声明(types/test.d.ts)
```typescript
declare module 'hello.arl'{
    const World: {
        getContent(): void
    };
    export default World;
}
```