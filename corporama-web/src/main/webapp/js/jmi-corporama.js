JMI.namespace("Corporama.Map");

// Mandatory 
JMI.Corporama.Map = function(container) {
  this.container = container;
  var options = {
		  parent: this.container, 
		  //server: 'http://localhost:8080/jmi-server',
		  clientUrl: './jmi-client/' 
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
	
JMI.Corporama.Map.prototype.draw = function(options) {
  options = options || {};
  
  if( options.breadcrumb) {
	  new JMI.extensions.Breadcrumb(options.breadcrumb,this.map,{'namingFunc':JMI.Corporama.Map.breadcrumbTitlesFunc,'thumbnail':{}});
	  this.breadcrumbTitles = { shortTitle: 'Hello world!', longTitle: 'Hello world!' };
  }
  new JMI.extensions.Slideshow(this.map);//, 'slideshow', 500, 300, 5000);

  var parameters = this.getParams();
  parameters.analysisProfile='GlobalProfile';
  this.map.compute(parameters);
};

JMI.Corporama.Map.prototype.getParams = function() {
  return { 
	map: 'Corporama',
    //corporamaserverurl: 'http://localhost:8080/corporama-web',
    corporamaserverurl: 'http://corporama.just-map-it.com',
    jsessionid: this.session
	};
};

JMI.Corporama.Map.breadcrumbTitlesFunc = function(event) {
  if( event.type === JMI.Map.event.EMPTY) {
	return {shortTitle: 'Sorry, the map is empty.', longTitle: 'Sorry, the map is empty.'};
  }
  if( event.type === JMI.Map.event.ERROR) {
	if(event.track) {
		return {shortTitle: 'Sorry, an error occured. If you want to be informed about it, please <a title="Fill the form" href="http://www.just-map-it.com/p/report.html?track='+ event.track +'" target="_blank">fill the form</a>', longTitle: 'Sorry, an error occured. Error: ' + event.message};
	}
	else {
		return {shortTitle: 'Sorry, an error occured. ' + event.message, longTitle: 'Sorry, an error occured. ' + event.message};
	}
  }
  return event.map.corporama.breadcrumbTitles;
};


