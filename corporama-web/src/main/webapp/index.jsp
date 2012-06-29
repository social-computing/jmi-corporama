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
#jmi-map {
	width: 100%;
	height: 80%;
	background-color: #FFFFFF;
}
img {
	border: 0;
}
</style>
<link rel="stylesheet" type="text/css" href="./jmi-client/css/jmi-client.css" />
<script type="text/javascript" src="./jmi-client/jmi-client.js"></script>
<script type="text/javascript" src="./js/jmi-corporama.js"></script>
<script type="text/javascript">
function GoMap() {
	var map = new JMI.Corporama.Map('jmi-map');
	map.draw({breadcrumb:'jmi-breadcrumb'});
};
</script>
</head>
<body onload="GoMap()">
<form id="main" method="get">
<table width="100%" border="0">
	<tr>
		<td><a title="Just Map It! Corporama" href="./"><img alt="Just Map It! Corporama" src="./images/justmapit.png" /></a></td>
		<td align="right"><a title="Just Map It!" href="http://www.just-map-it.com/" target="_blank"><img alt="Just Map It!" src="./images/justmapit_www.png" /></a></td>
	</tr>
</table>
</form>
<div id="jmi-breadcrumb">&nbsp;</div>
<div id="jmi-map"></div>
</body>
</html>
