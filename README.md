# Welcome To OA's F2E Framework!
這是一個 based on [jQuery](http://jquery.com/)、[PathJS](https://github.com/mtrpcic/pathjs) 的前端 framework。

---
## 聲明
本作品授權採用 姓名標示-非商業性 2.0 台灣 (CC BY-NC 2.0 TW) 授權，詳見 [http://creativecommons.org/licenses/by-nc/2.0/tw/](http://creativecommons.org/licenses/by-nc/2.0/tw/) 


<br/>
## 簡介
這是一個個人製作的前端 framework，主要架構於 [jQuery](http://jquery.com/)、[PathJS](https://github.com/mtrpcic/pathjs)。

<br/>
## 安裝
程式中會使用到 **ajax** 所以不建議在本機端直接點開 html，可以的話還是放到一般 http server 機器上。  
(目前測試 Dropbox 可以使用)

<br/>
## <a name="use"></a>使用
1. 將 **f2e** 放置 http server，以下 url 以 **http://demo/** 簡稱。
2. 開啟瀏覽器，網址輸入 http://demo/index.html
3. 由於預設 routes root 為 page1，symbol 為 #!，所以會自動的導入 http://demo/index.html#page1
4. 頁面中可以得到 title、meta、內容 變成 page1 內容，其檔案位置在 `view/content/p1/content.html`
5. 點選頁面中的 page 2 鏈結，可以不用重新刷 server request，並且用 ajax 方式取得 page 2 的 html、css、js

<br/>
## 原理
1. `f2e/index.html` 開始先導入 **oa_routes.js**，然後 `var oa_routes = new window.OaRoutes ();` 執行 `oa_routes.init ()`。

2. 過程會經過三個主要步驟
	* loadCss () - 載入預設的 css 資源，分別主要是 resource、public 兩種 css 資源。
	* loadJs () - 載入預設的 js 資源，分別主要是 resource、public 兩種 js 資源。
	* loadPage () - 載入預設的 frame、設定 routes，導入頁面css、js、content。
<br/><br/>
3. `f2e/view/frame/general/` 內分別有三個主要檔案: `frame.css`、`frame.js`、`frame.html` 會載入。

4. 接著載入預設的 `f2e/view/content/p1/` 內三個檔案 `content.css`、`content.js`、`content.html`。

<br/>
## 設定
* OaRoutes 主要有以下的設定條件:
	1. [setPaths](#setPaths) - 設定路徑
	2. [setFrame](#setFrame) - 設定 frame
	3. [setResourceCssList](#setResourceCssList) - 設定 css resource folder
	4. [setPublicCssList](#setPublicCssList) - 設定 css public folder
	5. [setResourceJsList](#setResourceJsList) - 設定 js resource folder
	6. [setPublicJsList](#setPublicJsList) - 設定 js public folder
	7. [setRouteConfig](#setRouteConfig) - 設定 route 基本設定
	8. [setRoutePageList](#setRoutePageList) - 設定 route 指向

<br/>
## Option
Option method 細項說明

### <a name="setPaths"></a>setPaths
* default value:

	```
{
	resource: 'view/resource/',
	public: 'view/public/',
	frame: 'view/frame/',
	content: 'view/content/'
}
```
* resource - library 存放處
* public - 跨 frame 的資源存放處
* frame - frame 類型存放處
* content - 各分頁存放處

### <a name="setFrame"></a>setFrame
* default value:

	```
{
	name: 'general',
	selector: '#container'
}
```
* name - 要載入的 frame 名稱
* selector - 設定 frame selector 將被載入 分頁內容

### <a name="setResourceCssList"></a>setResourceCssList
* default value:

	```
[
	'icomoon/icomoon.css'
]
```


### <a name="setPublicCssList"></a>setPublicCssList
* default value:

	```
[
	'base.css'
]
```

### <a name="setResourceJsList"></a>setResourceJsList
* default value:

	```
[
	'jquery_v1.10.2/jquery-1.10.2.min.js',
	'jquery-ui-1.10.3.custom/jquery-ui-1.10.3.custom.min.js',
	'pathjs_v0.8.4/path.min.js'
]
```

### <a name="setPublicJsList"></a>setPublicJsList
* default value:

	```
[
	'ga.js',
	'fb.js'
]
```

### <a name="setRouteConfig"></a>setRouteConfig
* default value:

	```
{
	root: 'page1',
	rescue: 'page1',
	symbol: '#!',
}
```
* root - 設定預設載入的頁面
* rescue - 設定 404 載入的頁面
* symbol - url 與 page key 間的符號，ex: http://.../index.html**#!**page1


### <a name="setRoutePageList"></a>setRoutePageList
* default value:

	```
[
	{ key: 'page1', page: 'p1' },
	{ key: 'page2', page: 'p2' }
]
```
* key - url 上的 key，ex: http://.../index.html#!**page1**
* page - 對應於 `view/content/` 內的 folder
