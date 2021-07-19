# 生命周期

## 1. beforeCreate 创建前
> 对应的钩子函数为beforeCreate。此阶段为实例初始化之后，此时的数据观察和事件机制都未形成，不能获得DOM节点。

>【注】这个阶段，不能使用 this 变量，data() 中的数据、menthods() 中的方法、watcher() 中的事件都不能获得。

>【例】添加 loading 事件，在加载实例时触发


## 2. created 创建完毕

> 【注】这个阶段，可以操作vue实例中的数据和方法，不能操作 dom 节点

> 【例】初始化完成时事件，结束 loading 事件，异步请求

 
## 3. beforeMounte 挂在前

> 对应的钩子函数是beforemount，在这一阶段，我们虽然依然得不到具体的DOM元素，但vue挂载的根节点已经创建，下面vue对DOM的操作将围绕这个根元素继续进行；beforeMount这个阶段是过渡性的，一般一个项目只能用到一两次。

> 【注】在挂载开始之前被调用，相关的 render 函数首次被调用。

 
## 4. mounted 挂载结束

> 【注】这个阶段，dom 节点被渲染到文档内，可以操作 dom节点

> 【例】挂载元素，获取 dom 节点

 
## 5. beforeUpdate 更新前


## 6. updated 更新完成

>【例】对数据的统一处理

 
## 7. beforeDestroy 销毁前

>【例】确认停止事件的确认框

## 8. destroyed 销毁完成
> 对应的钩子函数是destroyed。在销毁后，会触发destroyed钩子函数。
> vue的生命周期的思想贯穿在组件开发的始终，通过熟悉其生命周期调用不同的钩子函数，我们可以准确地控制数据流和其对DOM的影响；vue生命周期的思想是Vnode和MVVM的生动体现和继承。

## beforeCreate 和 created 区别
- beforeCreate 实例中的el，data，data中的message都为undefined, 数据观察和事件机制都未形成，不能获得DOM节点。
- created 数据已经与data中的属性进行绑定, el 还是undefined. 这个阶段, 可以操作vue实例中的数据和方法，不能操作 dom 节点

## beforeMounte 和 mounted 区别
- beforeMounte  未挂载, data 和 el 数据初始化, 但页面中的内容还是 vue 中的占位符, data 中的信息还没被挂在到 Bom节点中.
- mounted 挂在完成

## beforeUpdate 和 updated 区别
- beforeUpdate  data中数据发生变化, 但是 view 中还没发生改变
- updated view 发生改变的时候 触发

## beforeDestroy 和 destroyed 区别
- beforeDestroy 在实例销毁之前调用, 在这一步, 实例仍然完全可用
- destroyed 所有东西全都会解除绑定, 所有的事件监听器会移除, 所有的子实例也会被销毁.