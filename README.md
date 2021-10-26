###为什么要用
项目部署到同一域名下，会导致storage相互污染，而无法共存，因此需要一个全局通用的方法去定义，当前模块的storage存到哪个命名空间下。

# 用法
```
npm install storage
```

```javascript
import Storage from 'storage'
// 默认是会在setItem和getItem方法上调用前使用JSON.stringify() JSON.parse() 
// 如果不需要则可以添加第三个参数{setJson:false}

// 参数源码有注释 默认会使用JSON.stringify JSON.parse 转value
const storage = new Storage('myNamespace')

storage.setItem('name','myname')
// 相当于 localStorage.setItem('myNamespace-name',JSON.stringify('myname'))

storage.getItem('name')
storage.removeItem('name')
storage.clear()
```

