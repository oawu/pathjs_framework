/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2014 OA Wu Design
 */
$(function () {
  var ajax = function (url, doneCallback) {
    $.ajax ({
      url: url,
      data: { }, async: true, cache: false, dataType: 'html', type: 'GET'
    })
    .done (doneCallback)
    .fail (function (result) { console.error (result); })
    .complete (function (result) { });
  }

  var loadFrame = function (url, setRoutes) {
    ajax (url, function (r) {
      $('body').html (r);
      setRoutes ();
    });
  }

  var loadContent = function (path, content, selector) {
    clearContent (selector);

    /* insert css */
    $('<link />').attr ('data-content', content).attr ('href', path + content + '/content.css').attr ('rel', 'stylesheet').attr ('type', 'text/css').insertAfter ($('head link').last ());

    /* insert js */
    $('<script />').attr ('data-content', content).attr ('src', path + content + '/content.js').attr ('language', 'javascript').attr ('type', 'text/javascript').appendTo ('head');

    /* load content */
    ajax (path + content + '/content.html', function (r) {
      $(selector).html (r);
    });
  };

  var clearContent = function (selector) {
    $('link[data-content]').remove ();
    $('script[data-content]').remove ();
    $(selector).empty ();
  };

  var setRoutes = function (routes) {
    routes.pages.map (function (t) {
      Path.map (routes.symbol + t.name).to (loadContent.bind (null, contentPath,  t.content, frame.selector)).exit (clearContent.bind (null, frame.selector));
    });
    
    Path.rescue (function () {
      location.hash = routes.symbol + routes.rescue;
    });

    Path.root (routes.symbol + routes.root);
    Path.listen ();
  }


// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  var resourcePath = 'view/resource/', publicPath = 'view/public/', framePath = 'view/frame/', contentPath = 'view/content/';
  
  var frame        = {name: 'general', selector: '#container'};

  var cssResources = ['icomoon/icomoon.css', ];
  var cssPublics   = ['base.css', ];

  var jsResources  = ['jquery-ui-1.10.3.custom/jquery-ui-1.10.3.custom.min.js',
                      'imgLiquid_v0.9.944/imgLiquid-min.js',
                      'jquery-timeago_v1.3.1/jquery.timeago.js',
                      'jquery-timeago_v1.3.1/locales/jquery.timeago.zh-TW.js',
                      'imagesloaded_v3.1.8/imagesloaded.pkgd.min.js',
                      'pathjs_v0.8.4/path.min.js',
                      'oa_slider_preview/oa_slider_preview.js',
                     ];
  var jsPublics    = ['ga.js', 'fb.js'];

  var routes = {
      root: 'page1',
      rescue: 'page1',
      symbol: '#!',
      pages: [
        { name: 'page1', content: 'p1' },
        { name: 'page2', content: 'p2' },
      ]
    };

  /* insert css */
  cssResources.map (function (t) {return resourcePath + t;}).concat (cssPublics.map (function (t) {return publicPath + t;})).concat ([framePath + frame.name + '/frame.css']).reverse ().map (function (t) {$('<link />').attr ('href', t).attr ('rel', 'stylesheet').attr ('type', 'text/css').insertAfter ('title');});

  /* insert js */
  jsResources.map (function (t) {return resourcePath + t;}).concat (jsPublics.map (function (t) {return publicPath + t;})).concat ([framePath + frame.name + '/frame.js']).map (function (t) {$('<script />').attr ('src', t).attr ('language', 'javascript').attr ('type', 'text/javascript').appendTo ('head');});

  /* load frame */
  loadFrame (framePath + frame.name + '/frame.html', setRoutes.bind (null, routes));

});