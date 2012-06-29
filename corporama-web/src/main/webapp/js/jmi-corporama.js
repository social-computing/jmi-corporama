JMI.namespace("Corporama.Map");

// Mandatory 
JMI.Corporama.Map = function(container) {
  this.container = container;
  var options = {
		  parent: this.container, 
		  //server: 'http://localhost:8080/jmi-server',
		  clientUrl: 'http://corporama.just-map-it.com/jmi-client/' 
		};
/*  if (jQuery.browser.msie) {
	  options.client = JMI.Map.SWF;
  }*/
  this.map = JMI.Map(options);
  this.map.corporama = this;
  this.map.addEventListener(JMI.Map.event.ACTION, function(event) {
	  event.map.corporama[event.fn](event.map, event.args);
	} );
  this.map.addEventListener(JMI.Map.event.READY, function(event) {
	} );
  this.map.addEventListener(JMI.Map.event.EMPTY, function(event) {
	} );
  this.map.addEventListener(JMI.Map.event.ERROR, function(event) {
	} );
};
	
JMI.Corporama.Map.prototype.draw = function(mode,options) {
  options = options || {};
  
  if( options.breadcrumb) {
	  new JMI.extensions.Breadcrumb(options.breadcrumb,this.map,{'namingFunc':JMI.Corporama.Map.breadcrumbTitlesFunc,'thumbnail':{}});
	  this.breadcrumbTitles = { shortTitle: this.mode, longTitle: 'friends according ' + this.mode };
  }
  new JMI.extensions.Slideshow(this.map, 'slideshow', 500, 300, 5000);

  var parameters = this.getParams(mode);
  parameters.analysisProfile='GlobalProfile';
  this.map.compute(parameters);
};

JMI.Corporama.Map.prototype.getParams = function() {
  return { 
	map: 'Corporama',
    //corporamaserverurl: 'http://localhost:8080/web-corporama',
    corporamaserverurl: 'http://corporama.just-map-it.com',
    jsessionid: this.session
	};
};
