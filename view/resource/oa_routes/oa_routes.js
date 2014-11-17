
(function () {
  var option = {
    path: {
      resource: 'view/resource/',
      public: 'view/public/',
      frame: 'view/frame/',
      content: 'view/content/'
    },
    frame: {
      name: 'general',
      selector: '#container'
    },
    css: {
      resource: ['icomoon/icomoon.css'],
      public: ['base.css']
    },
    js: {
      resource: [ 'jquery_v1.10.2/jquery-1.10.2.min.js',
                  'jquery-ui-1.10.3.custom/jquery-ui-1.10.3.custom.min.js',
                  'imgLiquid_v0.9.944/imgLiquid-min.js',
                  'jquery-timeago_v1.3.1/jquery.timeago.js',
                  'jquery-timeago_v1.3.1/locales/jquery.timeago.zh-TW.js',
                  'imagesloaded_v3.1.8/imagesloaded.pkgd.min.js',
                  'pathjs_v0.8.4/path.min.js',
                  'oa_slider_preview/oa_slider_preview.js',
                 ],
      public: ['ga.js', 'fb.js']
    },
    routes: {
      config: {
        root: 'page1',
        rescue: 'page1',
        symbol: '#!',
      },
      pages: [
        { name: 'page1', content: 'p1' },
        { name: 'page2', content: 'p2' },
      ]
    }
  }

  function OaRoutes (opt) {
    var extend=function(){var e,t,n,r,i,s,o=arguments[0]||{},u=1,a=arguments.length,f=false;if(typeof o==="boolean"){f=o;o=arguments[1]||{};u=2}if(typeof o!=="object"&&!jQuery.isFunction(o)){o={}}if(a===u){o=this;--u}for(;u<a;u++){if((i=arguments[u])!=null){for(r in i){e=o[r];n=i[r];if(o===n){continue}if(f&&n&&(jQuery.isPlainObject(n)||(t=jQuery.isArray(n)))){if(t){t=false;s=e&&jQuery.isArray(e)?e:[]}else{s=e&&jQuery.isPlainObject(e)?e:{}}o[r]=jQuery.extend(f,s,n)}else if(n!==undefined){o[r]=n}}}}return o}

    this.setPaths = function (opt) {extend (option.path, opt);};
    this.setFrame = function (opt) {extend (option.frame, opt);};
    this.setResourceCssList = function (opt) {extend (option.css.resource, opt);};
    this.setPublicCssList = function (opt) {extend (option.css.public, opt);};
    this.setResourceJsList = function (opt) {extend (option.js.resource, opt);};
    this.setPublicJsList = function (opt) {extend (option.js.public, opt);};
    this.setRouteConfig = function (opt) {extend (option.routes.config, opt);};
    this.setRoutePageList = function (opt) {extend (option.routes.pages, opt);};

    this.loadCss = function () {
      var head = document.getElementsByTagName('head')[0];
      var script = document.querySelectorAll ('head script')[0];

      option.css.resource.map (function (t) {return option.path.resource + t;})
      .concat (option.css.public.map (function (t) {return option.path.public + t;}))
      .concat ([option.path.frame + option.frame.name + '/frame.css'])
      .reverse ().map (function (t) {
        var domLink = document.createElement ('Link');
        domLink.setAttribute ('href', t);
        domLink.setAttribute ('rel', 'stylesheet');
        domLink.setAttribute ('type', 'text/css');
        head.insertBefore (domLink,script);
      });
    };

    this.loadJs = function () {
      var head = document.getElementsByTagName('head')[0];
      var script = document.querySelectorAll ('head script')[0];

      option.js.resource.map (function (t) {return option.path.resource + t;})
      .concat (option.js.public.map (function (t) {return option.path.public + t;}))
      .concat ([option.path.frame + option.frame.name + '/frame.js'])
      .map (function (t) {
        var domLink = document.createElement ('script');
        domLink.setAttribute ('src', t);
        domLink.setAttribute ('language', 'javascript');
        domLink.setAttribute ('type', 'text/javascript');
        head.appendChild (domLink);
      });
    };

    this.loadPage = function () {
      window.onload = function () {
        var ajax = function (url, doneCallback) {
          $.ajax ({
            url: url,
            data: { }, async: true, cache: false, dataType: 'html', type: 'GET'
          })
          .done (doneCallback)
          .fail (function (result) { console.error (result); })
          .complete (function (result) { });
        }
        var clearContent = function () {
          $('link[data-content]').remove ();
          $('script[data-content]').remove ();
          $('meta[data-content]').remove ();
          $(option.frame.selector).empty ();
        };
        var loadContent = function (content) {
          clearContent ();
          $('<link />').attr ('data-content', content).attr ('href', option.path.content + content + '/content.css').attr ('rel', 'stylesheet').attr ('type', 'text/css').insertAfter ($('head link').last ());
          $('<script />').attr ('data-content', content).attr ('src', option.path.content + content + '/content.js').attr ('language', 'javascript').attr ('type', 'text/javascript').appendTo ('head');

          ajax (option.path.content + content + '/content.html', function (r) {
            var titles = r.match (/<title.*?>([\s\S]*)<\/title>/gi).map (function (t) { return /<title.*?>([\s\S]*)<\/title>/.exec (t)[1].trim (); }).filter (function (t) { return t; });
            if (titles.length) $('html head title').html (titles[0].trim ());
            var $title = $('html head title');
            r.match (/<meta.*\/?>/gi).reverse ().map (function (t) {$(t).attr ('data-content', content).insertAfter ($title);});
            var bodies = r.match (/<body.*?>([\s\S]*)<\/body>/gi).map (function (t) { return /<body.*?>([\s\S]*)<\/body>/.exec (t)[1].trim (); }).filter (function (t) { return t; });
            if (bodies.length) $(option.frame.selector).html (bodies[0]);
          });
        };
        var setRoutes = function () {
          option.routes.pages.map (function (t) { Path.map (option.routes.config.symbol + t.name).to (loadContent.bind (null, t.content)).exit (clearContent); });
          Path.rescue (function () { location.hash = option.routes.config.symbol + option.routes.config.rescue; });

          Path.root (option.routes.config.symbol + option.routes.config.root);
          Path.listen ();
        }

        ajax (option.path.frame + option.frame.name + '/frame.html', function (r) {
          var titles = r.match (/<title.*?>([\s\S]*)<\/title>/gi).map (function (t) { return /<title.*?>([\s\S]*)<\/title>/.exec (t)[1].trim (); }).filter (function (t) { return t; });
          if (titles.length) $('html head title').html (titles[0].trim ());
          var bodies = r.match (/<body.*?>([\s\S]*)<\/body>/gi).map (function (t) { return /<body.*?>([\s\S]*)<\/body>/.exec (t)[1].trim (); }).filter (function (t) { return t; });
          if (bodies.length) $('html body').html (bodies[0]);
          setRoutes ();
        });
      }
    };

    extend (option, opt);
  }
  window.OaRoutes = OaRoutes;
})();
