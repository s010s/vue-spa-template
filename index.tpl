<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0, minimal-ui" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title></title>
</head>

<body>
  <div id="app"></div>
  <script type="text/javascript">
  var ua = navigator.userAgent.toLowerCase(),
    isiOS = ua.indexOf('ipad') > -1 || ua.indexOf('iphone') > -1;

  if (isiOS) {
  	document.write("<script src='../platform/cordova-ios.js'><"+'/'+"script>")
  } else {
  	document.write("<script src='../platform/cordova-android.js'><"+'/'+"script>")
  }
  
  </script>
  
</body>

</html>
