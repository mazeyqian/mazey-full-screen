# HTML5浏览器全屏兼容方案

最近一个项目有页面全屏的的需求，搜索了下有HTML5的全屏API可用，不过各浏览器的支持不一样。

|标准|webkit|Firefox|IE|
|:-:|:-:|:-:|:-:|
|Element.requestFullscreen()|webkitRequestFullscreen|mozRequestFullScreen|msRequestFullscreen|
|Document.exitFullscreen()|webkitExitFullscreen|mozCancelFullScreen|msExitFullscreen|
|Document.fullscreenElement|webkitFullscreenElement|mozFullScreenElement|msFullscreenElement|
|Document.fullscreenEnabled|webkitFullscreenEnabled|mozFullScreenEnabled|msFullscreenEnabled|
|Document.fullscreenchange|webkitfullscreenchange|mozfullscreenchange|MSFullscreenChange|
|Document.fullscreenerror|webkitfullscreenerror|mozfullscreenerror|MSFullscreenError|

> [MDN Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API): The **Fullscreen API** provides an easy way for web content to be presented using the user's entire screen. The API lets you easily direct the browser to make an element and its children, if any, occupy the fullscreen, eliminating all browser user interface and other applications from the screen for the duration.

全屏接口提供了简单的方式通过用户整个屏幕展示浏览器的内容。这个接口让我们很轻松的引导浏览器使一个元素和它的子元素占据整个屏幕，并且从屏幕上消除所有浏览器用户界面和其它应用程序。

### 一、接口使用（以谷歌浏览器为例）

#### 1.requestFullscreen()

全屏请求方法，使用方法：`Element.requestFullscreen()`。

```
<div id="example">
    <img src="html5.png">
    <button type="button" id="requestFullscreen">requestFullscreen</button>
</div>

<script>
// 全屏
document.getElementById('requestFullscreen').addEventListener('click', () => {
    document.querySelector('img').webkitRequestFullscreen();
});
</script>
```

触发事件后会有*按ESC即可退出全屏模式*的文字提示。

![全屏时提示信息](http://upload-images.jianshu.io/upload_images/5926321-1c6f39e6d05b933a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### 注意

> [MDN Element.requestFullscreen()](https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen): Only elements which are in the HTML namespace (that is, elements which are standard HTML), plus the <svg> and <math> elements, which are located in the top-level document or in an <iframe> with the allowfullscreen attribute can be displayed full-screen. This means that elements inside a <frame> or an <object> can't.Only elements which are in the HTML namespace (that is, elements which are standard HTML), plus the [`<svg>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/svg "The documentation about this has not yet been written; please consider contributing!") and [`<math>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/math "The documentation about this has not yet been written; please consider contributing!") elements, which are located in the top-level document or in an [`<iframe>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe "The HTML <iframe> element represents a nested browsing context, effectively embedding another HTML page into the current page. In HTML 4.01, a document may contain a head and a body or a head and a frameset, but not both a body and a frameset. However, an <iframe> can be used within a normal document body. Each browsing context has its own session history and active document. The browsing context that contains the embedded content is called the parent browsing context. The top-level browsing context (which has no parent) is typically the browser window.") with the [`allowfullscreen`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-allowfullscreen) attribute can be displayed full-screen. This means that elements inside a [`<frame>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/frame "<frame> is an HTML element which defines a particular area in which another HTML document can be displayed. A frame should be used within a <frameset>.") or an [`<object>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/object "The HTML <object> element represents an external resource, which can be treated as an image, a nested browsing context, or a resource to be handled by a plugin.") can't.

1.在< iframe >框架中使用全屏需要加allowfullscreen属性。
2.全屏请求只能通过用户操作触发，否则会出现*Failed to execute 'requestFullscreen' on 'Element': API can only be initiated by a user gesture.*这样的警告，解决办法是将此方法绑定到某个用户操作事件上，例如点击事件`click`。

```
(function () {
    document.documentElement.webkitRequestFullscreen();
})();
```

![非用户操作浏览器警告信息](http://upload-images.jianshu.io/upload_images/5926321-33728d9a1ba31a56.PNG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


#### 2.exitFullscreen()

退出全屏模式的方法，使用方法：`document.exitFullscreen()`，除了`requestFullscreen()`其它方法和属性都是基于`document`的。

```
<div id="example">
    <img src="html5.png">
    <button type="button" id="requestFullscreen">requestFullscreen</button>
    <button type="button" id="exitFullscreen">exitFullscreen</button>
</div>

<script>
// 退出全屏
document.getElementById('exitFullscreen').addEventListener('click', () => {
    document.webkitExitFullscreen();
});
</script>
```

触发后退出全屏恢复页面原来的样子，也可以按ESC退出；另外F11也可以使页面全屏显示和退出，但这应该属于浏览器的功能，不在HTML5 API的范畴之内。

#### 3.fullscreenElement

若是全屏模式下，显示全屏的元素，若不是，返回`null`。

```
<div id="example">
    <img src="html5.png">
    <button type="button" id="requestFullscreen">requestFullscreen</button>
    <button type="button" id="exitFullscreen">exitFullscreen</button>
    <button type="button" id="fullscreenElement">fullscreenElement</button>
</div>

<script>
// 显示全屏元素
document.getElementById('fullscreenElement').addEventListener('click', () => {
    console.log(document.webkitFullscreenElement); // <div id=...></div> 或 null
});
</script>
```

#### 4.fullscreenEnabled

返回一个布尔值`true/false`，判断是否可用全屏模式。

```
<div id="example">
    <img src="html5.png">
    <button type="button" id="fullscreenEnabled">fullscreenEnabled</button>
</div>

<script>
// 全屏是否可用
document.getElementById('fullscreenEnabled').addEventListener('click', () => {
    console.log(document.webkitFullscreenEnabled); // true
});
</script>
```

### 二、浏览器兼容

由于各主流浏览器调用全屏接口的方法不一致，所以调用之前需要判断一下当前浏览器适用的方法。

![流程图](https://upload-images.jianshu.io/upload_images/5926321-cce30112746a2058.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

我简单的做了下**请求全屏**和**退出全屏**的适配。

```
const MAZEY_FULL_SCREEN = function () {
    let prefixArr = ['', 'webkit', 'moz', 'ms'], // 浏览器前缀
        isRightRequest, // 是否找到适配的方法
        isRightExit,
        requestMethod, // 全屏方法
        exitMethod, // 退出全屏方法
        lowerFirst = function (str) {
            return str.slice(0, 1).toLowerCase() + str.slice(1);
        },
        requestSuffixArr = ['RequestFullscreen', 'RequestFullScreen'], // 后缀
        exitSuffixArr = ['ExitFullscreen', 'CancelFullScreen'],
        searchRightMethod = function (prefix, suffixArr, documentParent) {
            let methodArr = suffixArr.map((suffix) => {
                return prefix + suffix;
            }),
            method,
            isRight;
            methodArr.forEach((wholePrefix) => {
                if (isRight) return;
                if (prefix.length === 0) {
                    wholePrefix = lowerFirst(wholePrefix)
                }
                if (wholePrefix in documentParent) {
                    method = wholePrefix;
                    isRight = true;
                    // console.log(method);
                }
            });
            return method;
        };
    prefixArr.forEach((prefix) => {
        if (isRightRequest && isRightExit) return;
        // 查找请求
        requestMethod = searchRightMethod(prefix, requestSuffixArr, document.documentElement);
        isRightRequest = Boolean(requestMethod);
        // 查找退出
        exitMethod = searchRightMethod(prefix, exitSuffixArr, document);
        isRightExit = Boolean(exitMethod);
    });
    this.request = function (element) {
        let domEle = document.querySelector(element) || document.documentElement;
        domEle[requestMethod]();
    };
    this.exit = function () {
        document[exitMethod]();
    };
};

let fullscreen = new MAZEY_FULL_SCREEN();
```

使用示例：

```
<h1 id="h1">html5 - 全屏</h1>
<button id="request">请求</button>
<button id="exit">退出</button>
<script src="mazey-full-screen.js"></script>

<script>
// 请求全屏
document.getElementById('request').addEventListener('click', () => {
    fullscreen.request();
});
// 退出全屏
document.getElementById('exit').addEventListener('click', () => {
    fullscreen.exit();
});
</script>
```
