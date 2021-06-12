<?php
$url = "http://25livepub.collegenet.com/calendars/syr-hc-events.json";
$file = file_get_contents($url);
$json = json_encode($file);
echo $json;
?>
