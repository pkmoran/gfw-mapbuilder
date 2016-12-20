//>>built
define("esri/layers/vectorTiles/layers/support/vectorTileLayerLoader","require exports dojo/has dojo/_base/lang ../../core/promiseUtils ../../core/urlUtils ../../request".split(" "),function(t,p,u,q,e,d,g){function k(a,c,b){if(c.hasOwnProperty("tileInfo"))return a.layerDefinition=c,a.serviceUrl=b.path,r(a,c,b);b?-1!==b.path.indexOf("root.json")&&(b.path=b.path.substr(0,b.path.indexOf("root.json"))):(b=c.sprite,b=b.substr(0,b.indexOf("sprites/sprite"))+"styles/",a.url=d.normalize(b),b=a.parsedUrl=
d.urlToObject(a.url));a.styleUrl=b.path;a.style=c;return s(a,c,b)}function r(a,c,b){if(l&&!c.hasOwnProperty("defaultStyles"))throw Error("Service definition must have 'defaultStyles' element!");a.styleUrl=d.normalize(d.join(b.path,c.defaultStyles));return g(d.join(a.styleUrl,"root.json"),{callbackParamName:"callback",responseType:"json"}).then(function(b){return a.style=b.data})}function s(a,c,b){(c=m(c))||e.reject("Source isn't available in the syle object!");if(c.hasOwnProperty("url"))return a.serviceUrl=
c.url,d.isAbsolute(a.serviceUrl)||(a.serviceUrl=d.join(b.path,a.serviceUrl)),g(a.serviceUrl,{query:{f:"json"},callbackParamName:"callback",responseType:"json"}).then(function(b){a.layerDefinition=n(b.data);return a});a.layerDefinition=n(c);return e.resolve(a)}function m(a){if(!a.hasOwnProperty("sources"))return null;a=a.sources;var c=null;if(a.hasOwnProperty("esri"))c=a.esri;else{for(var b=0,d=Object.keys(a);b<d.length;b++){var f=d[b];if(-1!==f.toLocaleLowerCase().indexOf("street")&&"vector"===c.type){c=
a[f];break}}if(!c){b=0;for(d=Object.keys(a);b<d.length&&!(f=d[b],c=a[f],"vector"===c.type);b++);}}return c}function n(a){a.hasOwnProperty("fullExtent");if(!a.hasOwnProperty("tileInfo")){for(var c=this.fullExtent.width/512,b=[],d=a.hasOwnProperty("minzoom")?parseFloat(a.minzoom):0,f=a.hasOwnProperty("maxzoom")?parseFloat(a.maxzoom):16;d<f;d++){var e=c/Math.pow(2,d);b.push({level:d,scale:Math.floor(3779.527559055118*e),resolution:e})}a.tileInfo={rows:512,cols:512,dpi:96,format:"pbf",origin:{x:this.fullExtent.xmin,
y:this.fullExtent.ymax,spatialReference:{wkid:102100}},lods:b,spatialReference:{wkid:102100}}}a.hasOwnProperty("capabilities")||(a.capabilities="TilesOnly");if(l&&!a.hasOwnProperty("tiles"))throw Error("Cannot find element tiles!");return a}var l=0;p.loadMetadata=function(a){if(!a)return e.reject("invalid input URL!");if("string"!==typeof a){var c=m(a);c&&c.hasOwnProperty("url")&&(c=d.join(c.url,"/resources/styles"),a.hasOwnProperty("sprite")&&!d.isAbsolute(a.sprite)&&(a.sprite=d.join(c,a.sprite)),
a.hasOwnProperty("glyphs")&&!d.isAbsolute(a.glyphs)&&(a.glyphs=d.join(c,a.glyphs)))}var b={layerDefinition:null,parsedUrl:null,serviceUrl:null,style:null,styleUrl:null,url:null};if("string"===typeof a){a=b.url=d.normalize(a);var h=b.parsedUrl=d.urlToObject(a);return g(h.path,{callbackParamName:"callback",responseType:"json",query:q.mixin({f:"json"},h.query)}).then(function(a){return k(b,a.data,h)}).then(function(){return b})}return k(b,a,null).then(function(){return b})}});