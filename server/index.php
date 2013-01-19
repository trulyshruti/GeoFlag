<?php

ini_set('display_errors', true);
error_reporting(E_ALL);

  // Facebook
  require_once("facebook-php-sdk/src/facebook.php");

  $config = array();
  $config['appId'] = '491100257598268';
  $config['secret'] = '63f1af7201ef326c5b4a23799589fa31';
  $config['fileUpload'] = false;
  
  $facebook = new Facebook($config);
  $facebook->setAccessToken($_GET['token']);

  $uid = $facebook->getUser();
  if ($uid == 0) die("{'status':500}");

  // MongoDB

  $mongoDB = new MongoClient();
  $database = $mongoDB -> geoflag;
  $userLink = $database -> userLink;
  $file = $database -> file;
  $opened = $database -> opened;

  switch ($_POST['action'])
  {
     case 'add': 
		 echo "{'status':200}";
                 break;
     case 'check':
                 /*
                 $cursor = $userLink -> find(array("from" => $uid));
                 foreach ( $cursor as $linkId => $link )
                 {
                       $cursor2 = $file -> find(array("owner" => $link['to']));
                       foreach ( $cursor2 as $fileId => $file )
                 }*/
                 break;
     case 'nuts':
                 die("{'status':404}");
  };

?>

