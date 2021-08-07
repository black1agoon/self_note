// 1.解析模板指令，并替换模板数据，初始化视图
// 2.将模板指令对应的节点绑定对应的更新函数，初始化相应的订阅器
function Compile(el, vm) {
  this.vm = vm;
  this.el = document.querySelector(el);
  this.fragment = null;
  this.init();
}

Compile.prototype = {
  init: function () {
    if (this.el) {
      this.fragment = this.nodeToFragment(this.el);
      // console.log('this.fragment', this.fragment.childNodes)
      this.compileElement(this.fragment);
      this.el.appendChild(this.fragment);
    } else {
      console.log('Dom元素不存在')
    }
  },
  nodeToFragment: function (el) {
    var fragment = document.createDocumentFragment();
    var child = el.firstChild;
    while (child) {
      // 将Dom元素移入fragment中
      fragment.appendChild(child);
      child = el.firstChild;
    }
    return fragment;
  },
  compileElement: function (el) {
    var childNodes = el.childNodes;
    // console.log(childNodes)
    var self = this;
    [].slice.call(childNodes).forEach(function (node) {
      // console.log(node)
      var reg = /\{\{(.*)\}\}/;
      var text = node.textContent;
      if (self.isElementNode(node)) {
        // console.log('isElementNode', node)
        self.compile(node);
      } else if (self.isTextNode(node) && reg.test(text)) { // 判断是否是符合这种形式{{}}的指令
        // console.log(reg.exec(text), node)
        // console.log('isTextNode', node)
        self.compileText(node, reg.exec(text)[1]);
      }
      if (node.childNodes && node.childNodes.length) {
        self.compileElement(node); // 继续递归遍历子节点
      }
    });
  },
  compileText: function (node, exp) {
    var self = this;
    // console.log(this.vm, node, exp)
    var keys = exp.split('.');
    var initText = keys.reduce((rst, cur) => {
      return rst[cur]
    }, this.vm)

    // var initText = this.vm[exp];
    this.updateText(node, initText); // 将初始化的数据初始化到视图中
    new Watcher(this.vm, exp, function (value) { // 生成订阅器并绑定更新函数
      self.updateText(node, value);
    });
  },
  updateText: function (node, value) {
    node.textContent = typeof value === 'undefined' ? '' : value;
  },
  isTextNode: function (node) {
    return node.nodeType === 3;
  },
  compile: function (node) {
    // node
    // <h2>hello world</h2>
    // <input>
    // <h1>xuyq</h1>
    // <button>click me!</button>
    var nodeAttrs = node.attributes;
    var self = this;
    // console.log(nodeAttrs)
    Array.prototype.forEach.call(nodeAttrs, function (attr) {
      var attrName = attr.name;  // v-model 、 v-on:click
      if (self.isDirective(attrName)) {  // 是 指令
        var exp = attr.value; // name 、 clickMe
        var dir = attrName.substring(2); // model 、 on:click
        if (self.isEventDirective(dir)) { // 事件指令
          self.compileEvent(node, self.vm, exp, dir);
        } else { // v-model 指令
          self.compileModel(node, self.vm, exp, dir);
        }
        node.removeAttribute(attrName);
      }
    })
  },
  compileEvent: function (node, vm, exp, dir) {
    // exp: name 、 clickMe
    // dir: model 、 on:click
    var eventType = dir.split(':')[1];
    var cb = vm.methods && vm.methods[exp];
    if (eventType && cb) {
      node.addEventListener(eventType, cb.bind(vm), false);
    }
  },
  compileModel: function (node, vm, exp, dir) {
    var self = this;
    var val = this.vm[exp];
    this.modelUpdater(node, val);
    new Watcher(this.vm, exp, function (value) {
      self.modelUpdater(node, value);
    })
    node.addEventListener('input', function (e) {
      var newValue = e.target.value;
      if (val === newValue) {
        return;
      }
      self.vm[exp] = newValue;
      val = newValue;
    })
  },
  modelUpdater: function (node, value, oldValue) {
    node.value = typeof value === 'undefined' ? '' : value;
  },
  isDirective: function (attr) { // 指令
    return attr.indexOf('v-') === 0;
  },
  isEventDirective: function (dir) {
    return dir.indexOf('on:') === 0;
  },
  isElementNode: function (node) {
    return node.nodeType === 1;
  }
}




