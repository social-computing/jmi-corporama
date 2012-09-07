<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
<title>Just Map It! Corporama</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="target- densitydpi=device-dpi, width=device-width, user-scalable=no"/>
<style type="text/css" media="screen">
html, body {
	height: 100%;
}
#jmi-content {
    margin-left: auto;
    margin-right: auto;
    width: 960px;
    height: 80%;
	background-color: #FFFFFF;
}
#jmi-map {
	width: 100%;
	height: 100%;
	background-color: #FFFFFF;
}
img {
	border: 0;
}
#jmi-slideshow {
	width: 500px;
	height: 300px;
	font-family:Arial, Verdana, sans-serif;	
	background:url(http://www.google.com/ig/images/spinner.gif) no-repeat top right #ffffff;
	border:3px solid #006699;
}
#jmi-slideshow li {
	padding: 10px 15px;
}
#jmi-slideshow p {
	text-align: center;
	padding: 10px 0px;
	font-size:20px;	
	color:#335595;
}
</style>
<link rel="stylesheet" type="text/css" href="./jmi-client/css/jmi-client.css" />
<script type="text/javascript" src="./jmi-client/jmi-client.js"></script>
<script type="text/javascript" src="./js/jmi-corporama.js"></script>
<script type="text/javascript">
function GoMap() {
	var map = new JMI.Corporama.Map('jmi-map',{clientUrl:'../jmi-client/',breadcrumb:'jmi-breadcrumb'});
	map.draw( { corporama: {query: location.search}});
};
</script><script type="text/javascript">
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-34640659-1']);
  _gaq.push(['_trackPageview']);
  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script></head>
<body onload="GoMap()">
<div id="jmi-content">
	<table width="100%" border="0">
		<tr>
			<td><a title="Corporama" href="http://corporama.com/"><img alt="Corporama" src="./images/corpo-logo.jpg" /></a></td>
			<td align="right"><a title="Just Map It!" href="http://www.just-map-it.com/" target="_blank"><img alt="Just Map It!" src="./images/justmapit_www.png" /></a></td>
		</tr>
	</table>
	<div id="jmi-breadcrumb">&nbsp;</div>
	<div id="jmi-map"></div>
</div>
<div id="jmi-slideshow" style="visibility:hidden;">
	<ul>
		<li><p>Cartographie sociétés en cours de modélisation</p></li>
		<li><p>Cartographie sociétés en cours de modélisation.</p></li>
		<li><p>Cartographie sociétés en cours de modélisation..</p></li>
		<li><p>Cartographie sociétés en cours de modélisation...</p></li>
	</ul>
</div>
</body>
</html>
