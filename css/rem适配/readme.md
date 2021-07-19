# 移动端 rem 方案
1. 下载 `amfe-flexible.js`, 自动设置 html 元素上的 font-size 为 clientWidth / 10
2. 在 postcss.config.js 中配置
```javascript
    'postcss-px2rem': {
    remUnit: 37.5
    }
```

# PC 端方案 ? 待验证
```js
(function () {
    function setRootFontSize() {
        let rem, rootWidth;
        let rootHtml = document.documentElement;
        //限制展现页面的最小宽度
        rootWidth = rootHtml.clientWidth < 1366 ? 1366 : rootHtml.clientWidth;
        // 19.2 = 设计图尺寸宽 / 100（ 设计图的rem = 100 ）
        rem = rootWidth / 19.2;
        // 动态写入样式
        rootHtml.style.fontSize = `${rem}px`;
    }
    setRootFontSize();
    window.addEventListener("resize", setRootFontSize, false);
})();
```