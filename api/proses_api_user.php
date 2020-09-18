<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=utf8");

include "config.php";

$postjson = json_decode(file_get_contents('php://input'), true);
$today = date('Y-m-d H:i:s');


if($postjson['aksi'] == "proses_register_filiador"){
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
    $passw = gerar_senha(8,true,true,true);
    $pass = md5($passw);
   
    $email = $postjson['email_filiador'];
    $nome = $postjson['nome_filiador'];
         $insert = mysqli_query($mysqli, "INSERT INTO usuario SET
         id_grupo_usuario = 2,
         login = '$postjson[cpf_cnpj_filiador]',

         senha = '$pass',
         nome= '$postjson[nome_filiador]',
         email 	= '$postjson[email_filiador]'
      ");

// Inclui o arquivo class.phpmailer.php localizado na mesma pasta do arquivo php 
  include "PHPMailer-master/PHPMailerAutoload.php"; 
 
// Inicia a classe PHPMailer 
  $mail = new PHPMailer(); 
 
// Método de envio 
  $mail->IsSMTP(); 
 
   // Enviar por SMTP 
  $mail->Host = "mail.egab.app"; 
 
// Você pode alterar este parametro para o endereço de SMTP do seu provedor 
  $mail->Port = 587; 
 
 
// Usar autenticação SMTP (obrigatório) 
$mail->SMTPAuth = true; 
 
// Usuário do servidor SMTP (endereço de email) 
// obs: Use a mesma senha da sua conta de email 
$mail->Username = 'suporte@egab.app'; 
$mail->Password = 'br@sil2019'; 
 
// Configurações de compatibilidade para autenticação em TLS 
$mail->SMTPOptions = array( 'ssl' => array( 'verify_peer' => false, 'verify_peer_name' => false, 'allow_self_signed' => true ) ); 
 
// Você pode habilitar esta opção caso tenha problemas. Assim pode identificar mensagens de erro. 
 //$mail->SMTPDebug = 2; 
 
// Define o remetente 
// Seu e-mail 
$mail->From = "suporte@egab.app"; 
 
// Seu nome 
$mail->FromName = "eGab"; 
 
// Define o(s) destinatário(s) 
$mail->AddAddress($email, $nome); 
 
// Opcional: mais de um destinatário
// $mail->AddAddress('fernando@email.com'); 
 
// Opcionais: CC e BCC
// $mail->AddCC('joana@provedor.com', 'Joana'); 
// $mail->AddBCC('roberto@gmail.com', 'Roberto'); 
 
// Definir se o e-mail é em formato HTML ou texto plano 
// Formato HTML . Use "false" para enviar em formato texto simples ou "true" para HTML.
$mail->IsHTML(true); 
 
// Charset (opcional) 
$mail->CharSet = 'UTF-8'; 
 
// Assunto da mensagem 
$mail->Subject = "Assunto da mensagem"; 
 
// Corpo do email 
$mail->Body = "Bem vinhdo ao eGab, sua senha é:" .$passw; 
 
// Opcional: Anexos 
// $mail->AddAttachment("/home/usuario/public_html/documento.pdf", "documento.pdf"); 
 
// Envia o e-mail 
$enviado = $mail->Send(); 
 
// Exibe uma mensagem de resultado 
if ($enviado) 
{ 
    echo "Seu email foi enviado</a> com sucesso!"; 
} else { 
    echo "Houve um erro enviando o email: ".$mail->ErrorInfo; 
} 
  


      if($insert){
         

       $result = json_encode(array('success'=>true, 'msg'=>'Registrado com sucesso'));
       

     }else{
     $result = json_encode(array('success'=>false, 'msg'=> ''));
     } 
      
     echo $result;
}else if($postjson['aksi'] == "proses_register_lideranca"){
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
     $passw = gerar_senha(8,true,true,true);
     $pass = md5($passw);
    
     $email = $postjson['email_lideranca'];
     $nome = $postjson['nome_lideranca'];
          $insert = mysqli_query($mysqli, "INSERT INTO usuario SET
          id_grupo_usuario = 3,
          login = '$postjson[cpf_cnpj_lideranca]',
          senha = '$pass',
          nome= '$postjson[nome_lideranca]',
          email 	= '$postjson[email_lideranca]'
          
       ");
 
 // Inclui o arquivo class.phpmailer.php localizado na mesma pasta do arquivo php 
 include "PHPMailer-master/PHPMailerAutoload.php"; 
  
 // Inicia a classe PHPMailer 
 $mail = new PHPMailer(); 
  
 // Método de envio 
 $mail->IsSMTP(); 
  
 // Enviar por SMTP 
 $mail->Host = "mail.egab.app"; 
  
 // Você pode alterar este parametro para o endereço de SMTP do seu provedor 
 $mail->Port = 587; 
  
  
 // Usar autenticação SMTP (obrigatório) 
 $mail->SMTPAuth = true; 
  
 // Usuário do servidor SMTP (endereço de email) 
 // obs: Use a mesma senha da sua conta de email 
 $mail->Username = 'suporte@egab.app'; 
 $mail->Password = 'br@sil2019'; 
  
 // Configurações de compatibilidade para autenticação em TLS 
 $mail->SMTPOptions = array( 'ssl' => array( 'verify_peer' => false, 'verify_peer_name' => false, 'allow_self_signed' => true ) ); 
  
 // Você pode habilitar esta opção caso tenha problemas. Assim pode identificar mensagens de erro. 
  //$mail->SMTPDebug = 2; 
  
 // Define o remetente 
 // Seu e-mail 
 $mail->From = "suporte@egab.app"; 
  
 // Seu nome 
 $mail->FromName = "eGab"; 
  
 // Define o(s) destinatário(s) 
 $mail->AddAddress($email, $nome); 
  
 // Opcional: mais de um destinatário
 // $mail->AddAddress('fernando@email.com'); 
  
 // Opcionais: CC e BCC
 // $mail->AddCC('joana@provedor.com', 'Joana'); 
 // $mail->AddBCC('roberto@gmail.com', 'Roberto'); 
  
 // Definir se o e-mail é em formato HTML ou texto plano 
 // Formato HTML . Use "false" para enviar em formato texto simples ou "true" para HTML.
 $mail->IsHTML(true); 
  
 // Charset (opcional) 
 $mail->CharSet = 'UTF-8'; 
  
 // Assunto da mensagem 
 $mail->Subject = "Assunto da mensagem"; 
  
 // Corpo do email 
 $mail->Body = "Bem vinhdo ao eGab, sua senha é:" .$passw; 
  
 // Opcional: Anexos 
 // $mail->AddAttachment("/home/usuario/public_html/documento.pdf", "documento.pdf"); 
  
 // Envia o e-mail 
 $enviado = $mail->Send(); 
  
 // Exibe uma mensagem de resultado 
 if ($enviado) 
 { 
     echo "Seu email foi enviado</a> com sucesso!"; 
 } else { 
     echo "Houve um erro enviando o email: ".$mail->ErrorInfo; 
 } 
   
 
 
       if($insert){
          
 
        $result = json_encode(array('success'=>true, 'msg'=>'Registrado com sucesso'));
        
 
      }else{
      $result = json_encode(array('success'=>false, 'msg'=> ''));
      } 
       
      echo $result;
 }else if($postjson['aksi'] == "proses_register_apoio"){
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
     $passw = gerar_senha(8,true,true,true);
     $pass = md5($passw);
    
     $email = $postjson['email_apoio'];
     $nome = $postjson['nome_apoio'];
          $insert = mysqli_query($mysqli, "INSERT INTO usuario SET
          id_grupo_usuario = 4,
          login = '$postjson[cpf_cnpj_apoio]',
          senha = '$pass',
          nome= '$postjson[nome_apoio]',
          email 	= '$postjson[email_apoio]'
          
       ");
 
 // Inclui o arquivo class.phpmailer.php localizado na mesma pasta do arquivo php 
 include "PHPMailer-master/PHPMailerAutoload.php"; 
  
 // Inicia a classe PHPMailer 
 $mail = new PHPMailer(); 
  
 // Método de envio 
 $mail->IsSMTP(); 
  
 // Enviar por SMTP 
 $mail->Host = "mail.egab.app"; 
  
 // Você pode alterar este parametro para o endereço de SMTP do seu provedor 
 $mail->Port = 587; 
  
  
 // Usar autenticação SMTP (obrigatório) 
 $mail->SMTPAuth = true; 
  
 // Usuário do servidor SMTP (endereço de email) 
 // obs: Use a mesma senha da sua conta de email 
 $mail->Username = 'suporte@egab.app'; 
 $mail->Password = 'br@sil2019'; 
  
 // Configurações de compatibilidade para autenticação em TLS 
 $mail->SMTPOptions = array( 'ssl' => array( 'verify_peer' => false, 'verify_peer_name' => false, 'allow_self_signed' => true ) ); 
  
 // Você pode habilitar esta opção caso tenha problemas. Assim pode identificar mensagens de erro. 
  //$mail->SMTPDebug = 2; 
  
 // Define o remetente 
 // Seu e-mail 
 $mail->From = "suporte@egab.app"; 
  
 // Seu nome 
 $mail->FromName = "eGab"; 
  
 // Define o(s) destinatário(s) 
 $mail->AddAddress($email, $nome); 
  
 // Opcional: mais de um destinatário
 // $mail->AddAddress('fernando@email.com'); 
  
 // Opcionais: CC e BCC
 // $mail->AddCC('joana@provedor.com', 'Joana'); 
 // $mail->AddBCC('roberto@gmail.com', 'Roberto'); 
  
 // Definir se o e-mail é em formato HTML ou texto plano 
 // Formato HTML . Use "false" para enviar em formato texto simples ou "true" para HTML.
 $mail->IsHTML(true); 
  
 // Charset (opcional) 
 $mail->CharSet = 'UTF-8'; 
  
 // Assunto da mensagem 
 $mail->Subject = "Assunto da mensagem"; 
  
 // Corpo do email 
 $mail->Body = "Bem vinhdo ao eGab, sua senha é:" .$passw; 
  
 // Opcional: Anexos 
 // $mail->AddAttachment("/home/usuario/public_html/documento.pdf", "documento.pdf"); 
  
 // Envia o e-mail 
 $enviado = $mail->Send(); 
  
 // Exibe uma mensagem de resultado 
 if ($enviado) 
 { 
     echo "Seu email foi enviado</a> com sucesso!"; 
 } else { 
     echo "Houve um erro enviando o email: ".$mail->ErrorInfo; 
 } 
   
 
 
       if($insert){
          
 
        $result = json_encode(array('success'=>true, 'msg'=>'Registrado com sucesso'));
        
 
      }else{
      $result = json_encode(array('success'=>false, 'msg'=> ''));
      } 
       
     
 }else if($postjson['aksi'] == "proses_esqueci_senha"){
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
     $passw = gerar_senha(8,true,true,true);
     $pass = md5($passw);
    
     $checkcpf= mysqli_fetch_array(mysqli_query($mysqli, "SELECT * FROM usuario WHERE login='$postjson[cpf]' "));
     $checkemail= mysqli_fetch_array(mysqli_query($mysqli, "SELECT * FROM usuario WHERE login='$postjson[login]' "));
     if ($checkcpf == false or null ){   $result = json_encode(array('success'=>false, 'msg' => 'CPF não registrado')); }
     else if ($checkemail == false or null ){   $result = json_encode(array('success'=>false, 'msg' => 'Email não registrado')); }
     
     else{
        $passw = gerar_senha(8,true,true,true);
      $pass = md5($passw);
     
  
       $update = mysqli_query($mysqli, "UPDATE usuario SET
       senha = '$pass',
        WHERE login = $postjson[cpf]
       ");
       
  
  
  
  
  
        if($update){
  
         $result = json_encode(array('success'=>true, 'msg'=>'Senha atualizada com sucesso'));
  
       }else{
       $result = json_encode(array('success'=>false));
       } 
     }
       echo $result;
 
 // Inclui o arquivo class.phpmailer.php localizado na mesma pasta do arquivo php 
 include "PHPMailer-master/PHPMailerAutoload.php"; 
  
 // Inicia a classe PHPMailer 
 $mail = new PHPMailer(); 
  
 // Método de envio 
 $mail->IsSMTP(); 
  
 // Enviar por SMTP 
 $mail->Host = "mail.egab.app"; 
  
 // Você pode alterar este parametro para o endereço de SMTP do seu provedor 
 $mail->Port = 587; 
  
  
 // Usar autenticação SMTP (obrigatório) 
 $mail->SMTPAuth = true; 
  
 // Usuário do servidor SMTP (endereço de email) 
 // obs: Use a mesma senha da sua conta de email 
 $mail->Username = 'suporte@egab.app'; 
 $mail->Password = 'br@sil2019'; 
  
 // Configurações de compatibilidade para autenticação em TLS 
 $mail->SMTPOptions = array( 'ssl' => array( 'verify_peer' => false, 'verify_peer_name' => false, 'allow_self_signed' => true ) ); 
  
 // Você pode habilitar esta opção caso tenha problemas. Assim pode identificar mensagens de erro. 
  //$mail->SMTPDebug = 2; 
  
 // Define o remetente 
 // Seu e-mail 
 $mail->From = "suporte@egab.app"; 
  
 // Seu nome 
 $mail->FromName = "eGab"; 
  
 // Define o(s) destinatário(s) 
 $mail->AddAddress($email, $nome); 
  
 // Opcional: mais de um destinatário
 // $mail->AddAddress('fernando@email.com'); 
  
 // Opcionais: CC e BCC
 // $mail->AddCC('joana@provedor.com', 'Joana'); 
 // $mail->AddBCC('roberto@gmail.com', 'Roberto'); 
  
 // Definir se o e-mail é em formato HTML ou texto plano 
 // Formato HTML . Use "false" para enviar em formato texto simples ou "true" para HTML.
 $mail->IsHTML(true); 
  
 // Charset (opcional) 
 $mail->CharSet = 'UTF-8'; 
  
 // Assunto da mensagem 
 $mail->Subject = "Assunto da mensagem"; 
  
 // Corpo do email 
 $mail->Body = "Redfinição de senha, sua nova senha é:" .$passw; 
  
 // Opcional: Anexos 
 // $mail->AddAttachment("/home/usuario/public_html/documento.pdf", "documento.pdf"); 
  
 // Envia o e-mail 
 $enviado = $mail->Send(); 
  
 // Exibe uma mensagem de resultado 
 if ($enviado) 
 { 
     echo "Seu email foi enviado</a> com sucesso!"; 
 } else { 
     echo "Houve um erro enviando o email: ".$mail->ErrorInfo; 
 } 
   
 
 
       if($insert){
          
 
        $result = json_encode(array('success'=>true, 'msg'=>'Registrado com sucesso'));
        
 
      }else{
      $result = json_encode(array('success'=>false, 'msg'=> ''));
      } 
       
     
 }

 


?>