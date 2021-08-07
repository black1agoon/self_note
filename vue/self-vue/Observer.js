// 数据监听器

function defineReactive(data, key, val) {
  observe(val);  // 遍历所有子属性
  var dep = new Dep();
  // console.log(dep)
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      if (Dep.target) {  // 是否需要添加订阅者
        dep.addSub(Dep.target); // 在这里添加一个订阅者
        // console.log(dep.subs)  // 每次 调用 new Watcher() 时, 执行 get, 如果是 data 中的同名 数据, 则会添加在同一个 subs中
      }
      return val;
    },
    set: function (newVal) {
      if (val === newVal) {
        return;
      }
      val = newVal;
      // console.log('属性' + key + '已经被监听了，现在值为:"' + newVal.toString() + '"');
      dep.notify()
    }
  })
}
function Dep () {
  this.subs = [];
}
Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub)
  },
  notify: function () {
    this.subs.forEach(function (sub) {
      sub.update();
    })
  }
}
Dep.target = null;

function observe(data) {
  if (!data || typeof data !== 'object') {
    return;
  }
  Object.keys(data).forEach(function (key) {
    defineReactive(data, key, data[key]);
  });
};

// var library = {
//   book1: {
//     name: ''
//   },
//   book2: ''
// };
//
// observe(library);
// library.book1.name = 'vue权威指南';
// library.book2 = '没有此书籍';
