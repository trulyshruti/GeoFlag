<?php

ini_set('display_errors', true);
error_reporting(E_ALL);

  function distance($a, $b, $x, $y)
  {
  	$R = 6371; // Radius of the earth in km
  	$dLat = deg2rad($x-$a);  // deg2rad below
  	$dLon = deg2rad($y-$b); 
  	$a = 
    		sin($dLat/2) * sin($dLat/2) +
    		cos(deg2rad($a)) * cos(deg2rad($x)) * 
    		sin($dLon/2) * sin($dLon/2)
    		; 
  	$c = 2 * atan2(sqrt($a), sqrt(1-$a)); 
  	$d = $R * $c; // Distance in km
  	return ($d) < 0.05;
  }

  // Facebook
  require_once("facebook-php-sdk/src/facebook.php");

  $config = array();
  $config['appId'] = '491100257598268';
  $config['secret'] = '63f1af7201ef326c5b4a23799589fa31';
  $config['fileUpload'] = false;
  
  $facebook = new Facebook($config);
  $facebook->setAccessToken($_GET['token']);

  $uid = $facebook->getUser();
  if ($uid == 0) die("{\"status\":500}");

  // MongoDB

  $mongoDB = new MongoClient();
  $database = $mongoDB -> geoflag;
  $userLink = $database -> userLink;
  $files = $database -> files;
  $opened = $database -> opened;

  switch ($_POST['action'])
  {
     case 'add': 
                 $newFile = array();
                 $newFile['owner'] = $uid;
                 $newFile['fileName'] = $_POST['fileName'];
                 $newFile['url'] = $_POST['url'];
                 $newFile['id'] = time();
		 $newFile['rule'] = array();
                 $newFile['rule'][0] = array();
                 $newFile['rule'][0]['lat'] = $_POST['lat'];
                 $newFile['rule'][0]['lng'] = $_POST['lng'];
                 if (isset($_POST['startTime']))
                    $newFile['rule'][0]['startTime'] = new MongoDate(strtotime($_POST['startTime']));
                 if (isset($_POST['endTime']))
                    $newFile['rule'][0]['endTime'] = new MongoDate(strtotime($_POST['endTime']));
                 
                 $files->insert($newFile);
		 $opened->insert(array("user" => $uid, "id" => $newFile['id']));

		 echo "{\"status\":200}";
                 break;
     case 'check':
                 
		 $lat = $_POST['lat'];
		 $lng = $_POST['lng'];
	
		 $ans = array();
		
                 $iter = $userLink -> find(array("from" => $uid));
		//var_dump($iter);
                 foreach ( $iter as $linkId => $link )
                 {
                       $jter = $files -> find(array("owner" => $link["to"]));
                       foreach ( $jter as $fileId => $file )
                       {
				if ($opened -> findone(array("user" => $uid, "id" => $file['id'])) == NULL)
				{
					if (distance($file['rule'][0]['lat'], $file['rule'][0]['lng'], $lat, $lng))
						if (!isset($file['rule'][0]['startTime']) || strtotime($file['rule'][0]['startTime'])<time())
							if (!isset($file['rule'][0]['endTime']) || strtotime($file['rule'][0]['endTime'])>time())
							{
								$ans[] = $file;
								$opened->insert(array("user" => $uid, "id" => $file['id']));
							}
				}
                       }
                 }
		 echo json_encode($ans);
                 break;
     case 'checkold':
		 $ans = array();
		 $iter = $opened -> find(array("user" => $uid));
		 foreach ( $iter as $oldId => $oldFile )
		 {
		 	$temp = $files->findone(array("id" => $oldFile['id']));
			if ($temp['owner']==$uid) $temp['self']=true;
			$ans[] = $temp;
		 }
		 echo json_encode($ans);
		 break;
     case 'nuts':
                 die("{\"status\":404}");
  };

?>

