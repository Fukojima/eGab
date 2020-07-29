<?php

define('DB_NAME', 'egab_prod');
define('DB_USER', 'egab_user');
define('DB_PASSWORD', 'unique@1106');
define('DB_HOST', '138.128.187.162:3306');

$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

?>