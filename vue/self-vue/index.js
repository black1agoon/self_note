function SelfVue(options) {
  var self = this;
  this.data = options.data;
  this.methods = options.methods;
  Object.keys(this.data).forEach(function (key) {
    self.proxyKeys(key);
  });
  observe(this.data);

  new Compile(options.el, this)
  // el.innerHTML = this.data[exp]; // 初始化模板数据的值
  // new Watcher(this, exp, function (value) {
  //   el.innerHTML = value;
  // })
  options.mounted.call(this); // 所有事情处理好后执行mounted函数
}

SelfVue.prototype = {
  proxyKeys: function (key) {
    var self = this;
    Object.defineProperty(this, key, {
      enumerable: false, // 可枚举
      configurable: true,
      get: function proxyGetter() {
        return self.data[key];
      },
      set: function proxySetter(newVal) {
        self.data[key] = newVal;
      }
    })
  }
}