<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=utf8");

include "config.php";

$postjson = json_decode(file_get_contents('php://input'), true);




    if (isset($_FILES['image'])){
      $img = uploadImage('image');
   

      echo json_encode($_FILES['image']);

    
}


function gerar_senha($tamanho, $maiusculas, $minusculas, $numeros){
    $ma = "ABCDEFGHIJKLMNOPQRSTUVYXWZ"; // $ma contem as letras maiúsculas
    $mi = "abcdefghijklmnopqrstuvyxwz"; // $mi contem as letras minusculas
    $nu = "0123456789"; // $nu contem os números
   
    $senha ='';
   
    if ($maiusculas){
          // se $maiusculas for "true", a variável $ma é embaralhada e adicionada para a variável $senha
          $senha .= str_shuffle($ma);
    }
   
      if ($minusculas){
          // se $minusculas for "true", a variável $mi é embaralhada e adicionada para a variável $senha
          $senha .= str_shuffle($mi);
      }
   
      if ($numeros){
          // se $numeros for "true", a variável $nu é embaralhada e adicionada para a variável $senha
          $senha .= str_shuffle($nu);
      }
   
    
   
      // retorna a senha embaralhada com "str_shuffle" com o tamanho definido pela variável $tamanho
      return substr(str_shuffle($senha),0,$tamanho);
  }




   function uploadImage($imgName){
   
    if (isset($_FILES[$imgName])){
        $img_tmp =$_FILES[$imgName]['tmp_name'];
        $imgFolder ="./img/";
   
        
        if (file_exists($img_tmp)){
            $taille_maxi = 100000;
            $taille = filesize($_FILES[$imgName]['tmp_name']);
            $imgsize = getimagesize($_FILES[$imgName]['tmp_name']);
            $extensions = array('.png', '.gif', '.jpg', 'jpeg');
            $name = ($_FILES[$imgName]['name']);
            $extension = strtolower(strrchr($_FILES[$imgName]['name'],'.'));
         
            if  ($imgsize['mime'] == 'image/jpeg'){
                $img_src = imagecreatefromjpeg($img_tmp);
            }else if ($imgsize['mime'] == 'image/png'){
                $img_src = imagecreatefrompng($img_tmp);}

         $new_width = 380;
         $new_height = 500;
         $image_finale = imagecreatetruecolor($new_width, $new_height);

         $hash = gerar_senha(5,true,true,true);
         imagecopyresampled($image_finale, $img_src,0,0,0,0, $new_width, $new_height, $imgsize[0], $imgsize[1]);
         $imgName = $imgFolder.$name;
         imagejpeg($image_finale,$imgName);
         return $imgName; 
        }
    }

   }

