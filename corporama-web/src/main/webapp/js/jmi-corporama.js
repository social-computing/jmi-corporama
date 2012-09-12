JMI.namespace("Corporama.Map");

// Mandatory 
JMI.Corporama.Map = function(container,options) {
  this.container = container;
  this.options = options || {};
  this.options.clientUrl =  options.clientUrl || '../jmi-client/';
  this.map = JMI.Map({
	  parent: this.container, 
	  //server: 'http://localhost:8080/jmi-server',
	  clientUrl: this.options.clientUrl
	});
  this.map.corporama = this;
  this.map.addEventListener(JMI.Map.event.ACTION, function(event) {
	  event.map.corporama[event.fn](event.map, event.args);
	} );
  this.map.addEventListener(JMI.Map.event.READY, function(event) {
	  var attId = event.map.getProperty('$attributeId');
	  if( attId) {
		var att = event.map.attributes.match(new RegExp('^' + attId + '$'),['id']);
		if( att && att.length === 1) {
			event.map.corporama.breadcrumbTitles.shortTitle = att[0].name;
			event.map.corporama.breadcrumbTitles.longTitle = 'centré sur la société ' + att[0].name;
		}
	  }
	} );
  this.map.addEventListener(JMI.Map.event.EMPTY, function(event) {
	} );
  this.map.addEventListener(JMI.Map.event.ERROR, function(event) {
	} );
  if( options.breadcrumb) {
	  new JMI.extensions.Breadcrumb(options.breadcrumb,this.map,{'namingFunc':JMI.Corporama.Map.breadcrumbTitlesFunc,'thumbnail':{}});
	  this.breadcrumbTitles = { shortTitle: 'Recherche', longTitle: 'Résultat de la recherche' };
  }
  new JMI.extensions.Slideshow(this.map, 'jmi-slideshow', 500, 300, 300);
};

JMI.Corporama.Map.prototype.getParameterByName = function(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match ? decodeURIComponent(match[1].replace(/\+/g, ' ')) : false;
};

JMI.Corporama.Map.prototype.draw = function(options) {
  options = options || {};
  this.options.corporama = options.corporama || {};
  var similar = this.getParameterByName('similar');
  if( !similar) similar = this.getParameterByName('sim_comp_id');
  if( !similar) {
	  var parameters = this.getParams();
	  parameters.analysisProfile='GlobalProfile';
	  this.map.compute(parameters);
  }
  else {
	  this.Center(this.map, [similar, this.getParameterByName('similar_company_name')]);
  }
};

JMI.Corporama.Map.prototype.getParams = function() {
  var params = { 
	map: 'Corporama',
    //corporamaserverurl: 'http://localhost:8080/corporama-web',
    corporamaserverurl: 'http://corporama.just-map-it.com',
    jsessionid: ''//this.session
  };
  for (var a in this.options.corporama) { 
	  params[a] = this.options.corporama[a]; 
  }
  return params;
};

JMI.Corporama.Map.prototype.Center = function(map, args) {
  var parameters = this.getParams();
  parameters.attributeId = args[0];
  parameters.analysisProfile = "DiscoveryProfile";
  map.similar = args[0];
  parameters.similar = map.similar;
  map.compute( parameters);
};   

JMI.Corporama.Map.prototype.Focus = function(map, args) {
  var parameters = this.getParams();
  parameters.entityId = args[0];
  if( map.similar)
	  parameters.similar = map.similar;
  parameters.analysisProfile = "Profile";
  map.compute( parameters);
  map.corporama.breadcrumbTitles.shortTitle = '\'' +args[1] + '\'';
  map.corporama.breadcrumbTitles.longTitle = 'focus sur le tag \'' + args[1] + '\'';
};   

JMI.Corporama.Map.prototype.Navigate = function(map, args) {
	window.open('http://corporama.com/search?siren=' + args[0] + '&company=' + args[1], '_blank');
};   

JMI.Corporama.Map.breadcrumbTitlesFunc = function(event) {
  if( event.type === JMI.Map.event.EMPTY) {
	return {shortTitle: 'La carte est vide.', longTitle: 'La carte est vide.'};
  }
  if( event.type === JMI.Map.event.ERROR) {
	if(event.track) {
		return {shortTitle: 'Une erreur est survenue. Pour en savoir plus, <a title="Formulaire" href="http://www.just-map-it.com/p/report.html?track='+ event.track +'" target="_blank">remplissez ce formulaire</a>', longTitle: 'Une erreur esr survenue. Erreur: ' + event.message};
	}
	else {
		return {shortTitle: 'Une erreur est survenue. ' + event.message, longTitle: 'Une erreur est survenue. ' + event.message};
	}
  }
  return event.map.corporama.breadcrumbTitles;
};


