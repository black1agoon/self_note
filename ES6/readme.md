## Symbol

- 在 JS 已有的基本类型(字符串/数值/布尔类型/null/undefined)之外, ES6引入了一种新的基本类型: Symbol (符号). 符号起初被设计 ===>> 创建对象私有成员 ( 引入了非字符串类型的属性名 )

```js
    let firstName = Symbol()
    let person = {}
    person[firstName] = 'Nicholas'
    console.log(person[firstName])
```

### 共享符号 Symbol.for('xxx')
- 在不同的代码段中使用相同的符号值
- 获取 `Symbol.keyFor('xxx)` (只能在全局symbol中使用)在全局符号注册表中根据符号值检索出对应的键值


### 生成器 & 迭代器
- 生成器
```js
function *createIterator(items) {
    for (let i = 0; i < items.length; i++) {
      yield items[i];
    }
}
```
- 迭代器 可迭代的对象 数组、Set 与 Map
- 当 Symbol.iterator 在一个对象上存在时，该对象就会被认为是可迭代对象。
