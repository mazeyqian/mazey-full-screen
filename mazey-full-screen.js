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