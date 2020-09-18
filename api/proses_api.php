<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=utf8");

include "config.php";

$postjson = json_decode(file_get_contents('php://input'), true);
$today = date('Y-m-d H:i:s');
$id_lideranca = "";

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


if($postjson['aksi'] == "proses_register"){
 
   $checkemail = mysqli_fetch_array(mysqli_query($mysqli, "SELECT email_filiado FROM filiado WHERE email_filiado ='$postjson[email_filiado]' "));
   $checktitulo = mysqli_fetch_array(mysqli_query($mysqli, "SELECT nr_titulo FROM filiado WHERE nr_titulo ='$postjson[nr_titulo]' "));
   
   $checkcpf = mysqli_fetch_array(mysqli_query($mysqli, "SELECT cpf_cnpj_filiado FROM filiado WHERE cpf_cnpj_filiado ='$postjson[cpf_cnpj_filiado]' "));
     if($checkemail['email_filiado'] == $postjson['email_filiado']){

      $double = mysqli_fetch_array(mysqli_query($mysqli, "SELECT id_lideranca FROM filiado WHERE email_filiado ='$postjson[email_filiado]' "));
      $duplolider = mysqli_fetch_array(mysqli_query($mysqli, "SELECT nome_lideranca FROM lideranca WHERE id_lideranca ='$doublee[id_lideranca]' "));
       $lider = $duplolider['nome_lideranca'];
        $result = json_encode(array('success'=>false, 'msg'=>"Este email já está cadastrado para o filiador $lider"));
      }elseif($checkcpf['cpf_cnpj_filiado'] == $postjson['cpf_cnpj_filiado']){

      $double = mysqli_fetch_array(mysqli_query($mysqli, "SELECT id_lideranca FROM filiado WHERE cpf_cnpj_filiado ='$postjson[cpf_cnpj_filiado]' "));
      $duplolider = mysqli_fetch_array(mysqli_query($mysqli, "SELECT nome_lideranca FROM lideranca WHERE id_lideranca ='$double[id_lideranca]' "));
       $lider = $duplolider['nome_lideranca'];
        $result = json_encode(array('success'=>false, 'msg'=>"Este CPF já está cadastrado para o filiador $lider"));
       }elseif($checktitulo['nr_titulo'] == $postjson['nr_titulo']){

         $double = mysqli_fetch_array(mysqli_query($mysqli, "SELECT id_lideranca FROM filiado WHERE nr_titulo ='$postjson[nr_titulo]' "));
         $duplolider = mysqli_fetch_array(mysqli_query($mysqli, "SELECT nome_lideranca FROM lideranca WHERE id_lideranca ='$double[id_lideranca]' "));
          $lider = $duplolider['nome_lideranca'];
           $result = json_encode(array('success'=>false, 'msg'=>"Este Título de eleitor já está cadastrado para o filiador $lider"));
          }
       
       else{



     $insert = mysqli_query($mysqli, "INSERT INTO filiado SET
        cpf_cnpj_filiado = '$postjson[cpf_cnpj_filiado]',
        nome_filiado = '$postjson[nome_filiado]',
        email_filiado 	= '$postjson[email_filiado]',
        telefone_filiado = '$postjson[telefone_filiado]',
        endereco = '$postjson[endereco]',
        numero = '$postjson[numero]',
        nome_mae = '$postjson[nome_mae]',
        complemento = '$postjson[complemento]',	
        bairro = '$postjson[bairro]',
        cidade = '$postjson[cidade]', 	
        uf 	= '$postjson[uf]',
        cep = '$postjson[cep]',
        id_lideranca = '$postjson[id_lideranca]',
        sn_biometria = '$postjson[sn_biometria]',
        sn_whatsapp = '$postjson[sn_whatsapp]',
        nr_titulo = '$postjson[nr_titulo]',
        us_aprovacao = '$postjson[us_aprovacao]',
        documento_verso = '$postjson[documento_verso]',
        documento_frente = '$postjson[documento_frente]',
        documento_perfil = '$postjson[documento_perfil]',
        dt_nascimento = '$postjson[data_nascimento]'
        



     ");

  

       



      if($insert){
        
     

         $data = array(
         
          'cpf' => $postjson['cpf_cnpj_filiado']
      
      );

       $result = json_encode(array('success'=>true,  'result'=>$data, 'msg' => 'Cadastro realizado com sucesso'));

     }else{
     $result = json_encode(array('success'=>false, 'msg'=>'Erro no registro'));
     } 
   }
     echo $result;

}elseif($postjson['aksi']=="proses_login"){
  $senha= md5($postjson['senha']);
  $data_lid='';
  $logindata = mysqli_fetch_array(mysqli_query($mysqli, "SELECT * FROM usuario WHERE login ='$postjson[login]' AND 
  senha = '$senha'"));
  
  $filiadordata = mysqli_fetch_array(mysqli_query($mysqli, "SELECT * FROM filiador WHERE cpf_cnpj_filiador ='$postjson[login]'"));
  $liddata = mysqli_fetch_array(mysqli_query($mysqli, "SELECT * FROM lideranca WHERE cpf_cnpj_lideranca ='$postjson[login]'"));
  $aprovacao = mysqli_fetch_array(mysqli_query($mysqli, "SELECT * FROM filiador WHERE id_filiador ='$liddata[id_filiador]'"));
  $apoio = mysqli_fetch_array(mysqli_query($mysqli, "SELECT * FROM apoio WHERE cpf_cnpj_apoio ='$postjson[login]'"));

  $data = array(
     'id_usuario'  => $logindata['id_usuario'],
     'id_grupo_usuario' =>  $logindata['id_grupo_usuario'],
     'nome' => $logindata['nome'],
     "login" => $postjson['login'],
     'id_filiador' => $filiadordata['id_filiador'],
     'id_filiador_lid' => $liddata['id_lideranca'],
     'id_filiador_apoio' => $apoio['id_filiador'],
     'perfil_filiador' => $filiadordata['documento_perfil'],
     'sn_ainda_senha_padrao' => $logindata['sn_ainda_senha_padrao'],
     'sn_validar_cadastro' => $aprovacao['sn_validar_cadastro'],
     'id_filiador_da_lid' => $liddata['id_filiador'],
     'id_municipio' => $aprovacao['id_municipio'],
      'us_aprovacao_lid' => $aprovacao['nome_filiador'], 
     'perfil_lid' => $liddata['documento_perfil'],
     'perfil_apoio' =>$apoio['documento_perfil'],
     'sn_cadastro_validado' => $logindata['sn_cadastro_validado'],
     'id_apoio' => $apoio['id_apoio']
     
     
     
  );

  if($logindata){
     $result = json_encode(array('sucess'=>true, 'result'=>$data));
     $id_lideranca = $logindata['id_usuario'];

  }else{
     $result = json_encode(array('sucess'=>false));
  }
    echo $result;

}elseif($postjson['aksi'] == "proses_register_filiador"){
 
   $checkemail = mysqli_fetch_array(mysqli_query($mysqli, "SELECT email_filiador FROM filiador WHERE email_filiador ='$postjson[email_filiador]' "));
   $checkcpf = mysqli_fetch_array(mysqli_query($mysqli, "SELECT cpf_cnpj_filiador FROM filiador WHERE cpf_cnpj_filiador ='$postjson[cpf_cnpj_filiador]' "));
     if($checkemail['email_filiador'] == $postjson['email_filiador']){
        $result = json_encode(array('success'=>false, 'msg'=>'Este email já está cadastrado'));
      }elseif($checkcpf['cpf_cnpj_filiador'] == $postjson['cpf_cnpj_filiador']){
         $result = json_encode(array('success'=>false, 'msg'=>'Este cpf/cnpj já está cadastrado'));
       }else{

     $insert = mysqli_query($mysqli, "INSERT INTO filiador SET
        cpf_cnpj_filiador = '$postjson[cpf_cnpj_filiador]',
        nome_filiador = '$postjson[nome_filiador]',
        email_filiador 	= '$postjson[email_filiador]',
        telefone_filiador = '$postjson[telefone_filiador]',
        sn_whatsapp = '$postjson[sn_whatsapp]',
        id_municipio = '$postjson[id_municipio]',
        sn_validar_cadastro = '$postjson[sn_validar_cadastro]'
     ");
     





      if($insert){

       $result = json_encode(array('success'=>true, 'msg'=>'Registrado com sucesso'));

     }else{
     $result = json_encode(array('success'=>false, 'msg'=> ''));
     } 
      }
     echo $result;

}elseif($postjson['aksi'] == "proses_register_lideranca"){
   
   $checkemail = mysqli_fetch_array(mysqli_query($mysqli, "SELECT email_lideranca FROM lideranca WHERE email_lideranca='$postjson[email_lideranca]' "));
   $checkcpf = mysqli_fetch_array(mysqli_query($mysqli, "SELECT cpf_cnpj_lideranca FROM lideranca WHERE cpf_cnpj_lideranca ='$postjson[cpf_cnpj_lideranca]' "));
     if($checkemail['email_lideranca'] == $postjson['email_lideranca']){
        $result = json_encode(array('success'=>false, 'msg'=>'Este email já está cadastrado'));
      }elseif($checkcpf['cpf_cnpj_lideranca'] == $postjson['cpf_cnpj_lideranca']){
         $result = json_encode(array('success'=>false, 'msg'=>'Este cpf/cnpj já está cadastrado'));
       }else{

     $insert = mysqli_query($mysqli, "INSERT INTO lideranca SET
        cpf_cnpj_lideranca = '$postjson[cpf_cnpj_lideranca]',
        nome_lideranca= '$postjson[nome_lideranca]',
        email_lideranca 	= '$postjson[email_lideranca]',
        telefone_lideranca = '$postjson[telefone_lideranca]',
        sn_whatsapp = '$postjson[sn_whatsapp]',
        id_filiador = '$postjson[id_filiador]'
     ");
     





      if($insert){

       $result = json_encode(array('success'=>true, 'msg'=>'Registrado com sucesso'));

     }else{
     $result = json_encode(array('success'=>false, 'msg'=> ''));
     } 
      }
     echo $result;

}elseif($postjson['aksi'] == "proses_muda_senha"){
   
   $checkemail = mysqli_fetch_array(mysqli_query($mysqli, "SELECT * FROM usuario WHERE login='$postjson[login]' "));
    $novasenha = md5($postjson['senha']);
   

     $update = mysqli_query($mysqli, "UPDATE usuario SET
     senha = '$novasenha',
     sn_ainda_senha_padrao = 'N' WHERE login = $postjson[login]
     ");
     





      if($update){

       $result = json_encode(array('success'=>true, 'msg'=>'Senha atualizada com sucesso'));

     }else{
     $result = json_encode(array('success'=>false));
     } 
      
     echo $result;

}elseif($postjson['aksi']=='proses_consulta'){
  
   $data = array();
   $query = mysqli_query($mysqli,"SELECT * FROM lideranca WHERE id_filiador = $postjson[id_filiador] ORDER BY nome_lideranca ");
  

   
   while ($rows = mysqli_fetch_array($query)){
      
     
   $data[] = array(
      
  
      'nome' => $rows['nome_lideranca'],
      'id_lideranca' => $rows['id_lideranca'],
      'documento_perfil' =>$rows['documento_perfil'],
      'telefone_lideranca' =>$rows['telefone_lideranca'],
      'sn_whatsapp' =>$rows['sn_whatsapp'],

    
 
      
   );
    }
   if($query){
      $result = json_encode(array('sucess'=>true, 'result'=>$data));
     
 
    }else{
      $result = json_encode(array('sucess'=>false,$mysqli));
    }
     echo $result;
 
 }elseif($postjson['aksi']=='proses_consulta_filiados'){
  
   $data = array();
   $query = mysqli_query($mysqli,"SELECT * FROM filiado WHERE id_lideranca = $postjson[id_lideranca] AND situacao_cadastro = 'A' ORDER BY nome_filiado");
   
   while ($rows = mysqli_fetch_array($query)){
    
   $data[] = array(
      'id_filiado' =>$rows['id_filiado'],
      'nome' => $rows['nome_filiado'],
      'id_lideranca' => $rows['id_lideranca'],
      'perfil' => $rows['documento_perfil'],
      'cpf_cnpj_filiado' => $rows['cpf_cnpj_filiado'],
      'email_filiado' 	=> $rows['email_filiado'],
      'telefone_filiado' => $rows['telefone_filiado'],
      'endereco' => $rows['endereco'],
      'numero' => $rows['numero'],
      'nome_mae' => $rows['nome_mae'],
      'complemento' => $rows['complemento'],	
      'bairro' => $rows['bairro'],
      'cidade' => $rows['cidade'], 	
      'uf' 	=> $rows['uf'],
      'cep' => $rows['cep'],
      'sn_biometria' => $rows['sn_biometria'],
      'sn_whatsapp' => $rows['sn_whatsapp'],
      'nr_titulo' => $rows['nr_titulo'],
      'us_aprovacao' => $rows['us_aprovacao'],
      'documento_verso' => $rows['documento_verso'],
      'documento_frente' => $rows['documento_frente'],
      'documento_verso_titulo' => $rows['titulo_frente'],
      'documento_frente_titulo' => $rows['titulo_verso'],
      'documento_comprovante' => $rows['compr_residencia']
    
    
 
      
   );
    }
   if($query){
      $result = json_encode(array('sucess'=>true, 'result'=>$data ));
     
 
   }else{
      $result = json_encode(array('sucess'=>false,$mysqli));
   }
     echo $result;
 
 }elseif($postjson['aksi']=='proses_consulta_filiador'){
  
   $data = array();
   $query = mysqli_query($mysqli,"SELECT * FROM filiador  ORDER BY nome_filiador ");
   
   while ($rows = mysqli_fetch_array($query)){
   $data[] = array(
  
      'nome' => $rows['nome_filiador']

      
    
 
      
   );
    }
   if($query){
      $result = json_encode(array('sucess'=>true, 'result'=>$data));
     
 
   }else{
      $result = json_encode(array('sucess'=>false,$mysqli));
   }
     echo $result;
 
 }elseif($postjson['aksi'] == "proses_register_apoio"){
   
   $checkemail = mysqli_fetch_array(mysqli_query($mysqli, "SELECT email_apoio FROM apoio WHERE email_apoio='$postjson[email_apoio]' "));
   $checkcpf = mysqli_fetch_array(mysqli_query($mysqli, "SELECT cpf_cnpj_apoio FROM apoio WHERE cpf_cnpj_apoio ='$postjson[cpf_cnpj_apoio]' "));
     if($checkemail['email_apoio'] == $postjson['email_apoio']){
        $result = json_encode(array('success'=>false, 'msg'=>'Este email já está cadastrado'));
      }elseif($checkcpf['cpf_cnpj_apoio'] == $postjson['cpf_cnpj_apoio']){
         $result = json_encode(array('success'=>false, 'msg'=>'Este cpf/cnpj já está cadastrado'));
       }else{

     $insert = mysqli_query($mysqli, "INSERT INTO apoio SET
        cpf_cnpj_apoio = '$postjson[cpf_cnpj_apoio]',
        nome_apoio= '$postjson[nome_apoio]',
        email_apoio	= '$postjson[email_apoio]',
        telefone_apoio = '$postjson[telefone_apoio]',
        sn_whatsapp = '$postjson[sn_whatsapp]',
        id_filiador = '$postjson[id_filiador]'
     ");
     





      if($insert){

       $result = json_encode(array('success'=>true, 'msg'=>'Registrado com sucesso'));

     }else{
     $result = json_encode(array('success'=>false, 'msg'=> ''));
     } 
      }
     echo $result;

}elseif($postjson['aksi'] == "proses_camera"){
 


   $insert = mysqli_query($mysqli, "INSERT INTO filiado_documento SET
     
      tp_documento = '$postjson[tp_documento]',
      caminho_documento = '$postjson[caminho_documento]',
      id_filiado = '$postjson[id_filiado]'
  
   ");

 



    if($insert){

     $result = json_encode(array('success'=>true, 'msg' =>'Imagem enviada'));

   }else{
   $result = json_encode(array('success'=>false, 'msg'=> ''));
   } 
    
   echo $result;

}elseif($postjson['aksi']=='proses_consulta_secao'){


   $queryzona = mysqli_fetch_array(mysqli_query($mysqli,"SELECT * FROM zona WHERE nr_zona = $postjson[nr_zona]"));

  
   $queryfinal = mysqli_query($mysqli, "SELECT * from zona_bairro_local_secao where id_zona_bairro_local 
   in (select id_zona_bairro_local from zona_bairro_local where id_zona_bairro in 
   (select id_zona_bairro from zona_bairro where id_zona = '$queryzona[id_zona]'))");

   while ($rows = mysqli_fetch_array($queryfinal)){
   $data[] = array(
  
      'nr_secao' => $rows['nr_secao']

      
    
 
      
   );
    }
   if($queryfinal){
      $result = json_encode(array('sucess'=>true, 'result'=>$data));
     
 
   }else{
      $result = json_encode(array('sucess'=>false));
   }
     echo $result;
 
 }elseif($postjson['aksi']=='proses_consulta_zonas'){
  
   $data = array();
   $query = mysqli_query($mysqli,"SELECT * FROM zona WHERE id_municipio = '$postjson[id_municipio]' ORDER BY nr_zona DESC LIMIT $postjson[start],$postjson[limit]");
   
   while ($rows = mysqli_fetch_array($query)){
   $data[] = array(
  
      'nr_zona' => $rows['nr_zona'],
       'id_zona' => $rows['id_zona']

      
    
 
      
   );
    }
   if($query){
      $result = json_encode(array('sucess'=>true, 'result'=>$data));
     
 
   }else{
      $result = json_encode(array('sucess'=>false,$mysqli));
   }
     echo $result;
 
 }elseif($postjson['aksi']=='proses_consulta_perfil_aprovados'){
  
   $data = array();
   $query = mysqli_query($mysqli,"SELECT * FROM filiado WHERE id_lideranca = $postjson[id_lideranca] AND situacao_cadastro = 'A' ORDER BY nome_filiado");
   
   while ($rows = mysqli_fetch_array($query)){
   $data[] = array(
      'id_filiado' => $rows['id_filiado'],
      'nome' => $rows['nome_filiado'],
      'id_lideranca' => $rows['id_lideranca'],
      'perfil' => $rows['documento_perfil'],
      'cpf_cnpj_filiado' => $rows['cpf_cnpj_filiado'],
      'email_filiado' 	=> $rows['email_filiado'],
      'telefone_filiado' => $rows['telefone_filiado'],
      'endereco' => $rows['endereco'],
      'numero' => $rows['numero'],
      'nome_mae' => $rows['nome_mae'],
      'complemento' => $rows['complemento'],	
      'bairro' => $rows['bairro'],
      'cidade' => $rows['cidade'], 	
      'uf' 	=> $rows['uf'],
      'cep' => $rows['cep'],
      'sn_biometria' => $rows['sn_whatsapp'],
      'sn_whatsapp' => $rows['sn_biometria'],
      'nr_titulo' => $rows['nr_titulo'],
      'us_aprovacao' => $rows['us_aprovacao'],
      'documento_verso' => $rows['documento_verso'],
      'documento_frente' => $rows['documento_frente'],
      'data_nascimento' => $rows['data_nascimento'],
      'data_nascimento' => $rows['us_aprovacao']
     
    
 
      
   );
    }
   if($query){
      $result = json_encode(array('sucess'=>true, 'result'=>$query ));
     
 
   }else{
      $result = json_encode(array('sucess'=>false,$mysqli));
   }
     echo $result;
 
 }elseif($postjson['aksi'] == "proses_update_nome_filiado"){
   
  

     $update = mysqli_query($mysqli, "UPDATE filiado SET
     nome_filiado = '$postjson[novo_nome_filiado]',
     us_alteracao = '$postjson[us_alteracao]',
     dt_alteracao = '$postjson[data_atual]'
      WHERE id_filiado = '$postjson[id_filiado]'
     

     ");
     





      if($update){

       $result = json_encode(array('success'=>true));

     }else{
     $result = json_encode(array('success'=>false));
     } 
      
     echo $result;

}elseif($postjson['aksi']=='proses_consulta_filiados_aprovados'){
  
   $data = array();
   $query = mysqli_query($mysqli,"SELECT * FROM filiado WHERE id_filiado = $postjson[id_filiado]  ORDER BY nome_filiado DESC LIMIT $postjson[start],$postjson[limit]");
   
   while ($rows = mysqli_fetch_array($query)){
    
   $data[] = array(
      'id_filiado' =>$rows['id_filiado'],
      'nome' => $rows['nome_filiado'],
      'id_lideranca' => $rows['id_lideranca'],
      'perfil' => $rows['documento_perfil'],
      'cpf_cnpj_filiado' => $rows['cpf_cnpj_filiado'],
      'email_filiado' 	=> $rows['email_filiado'],
      'telefone_filiado' => $rows['telefone_filiado'],
      'endereco' => $rows['endereco'],
      'numero' => $rows['numero'],
      'nome_mae' => $rows['nome_mae'],
      'complemento' => $rows['complemento'],	
      'bairro' => $rows['bairro'],
      'cidade' => $rows['cidade'], 	
      'uf' 	=> $rows['uf'],
      'cep' => $rows['cep'],
      'sn_biometria' => $rows['sn_whatsapp'],
      'sn_whatsapp' => $rows['sn_biometria'],
      'nr_titulo' => $rows['nr_titulo'],
      'us_aprovacao' => $rows['us_aprovacao'],
      'documento_verso' => $rows['documento_verso'],
      'documento_frente' => $rows['documento_frente'],
      'data_nascimento' => $rows['dt_nascimento'],
      'dt_alteracao' => $rows['dt_alteracao'],
      'sn_whatsapp' => $rows['sn_whatsapp'],
      'documento_verso_titulo' => $rows['titulo_frente'],
      'documento_frente_titulo' => $rows['titulo_verso'],
      'documento_comprovante' => $rows['compr_residencia']
       
    
 
      
   );
    }
   if($query){
      $result = json_encode(array('sucess'=>true, 'result'=>$data ));
     
 
   }else{
      $result = json_encode(array('sucess'=>false,$mysqli));
   }
     echo $result;
 
 }elseif($postjson['aksi'] == "proses_update_nome_mae_filiado"){
   
  

   $update = mysqli_query($mysqli, "UPDATE filiado SET
   nome_mae = '$postjson[novo_nome_mae_filiado]',
   us_alteracao = '$postjson[us_alteracao]',
   dt_alteracao = '$postjson[data_atual]'
    WHERE id_filiado = '$postjson[id_filiado]'

   ");
   





    if($update){

     $result = json_encode(array('success'=>true));

   }else{
   $result = json_encode(array('success'=>false));
   } 
    
   echo $result;

}elseif($postjson['aksi'] == "proses_update_endereco_filiado"){
   
  

   $update = mysqli_query($mysqli, "UPDATE filiado SET
   endereco = '$postjson[novo_endereco]',
   us_alteracao = '$postjson[us_alteracao]',
   dt_alteracao = '$postjson[data_atual]'
    WHERE id_filiado = '$postjson[id_filiado]'

   ");
   





    if($update){

     $result = json_encode(array('success'=>true));

   }else{
   $result = json_encode(array('success'=>false));
   } 
    
   echo $result;

}elseif($postjson['aksi'] == "proses_update_email_filiado"){
   
  

   $update = mysqli_query($mysqli, "UPDATE filiado SET
   email_filiado = '$postjson[novo_email_filiado]',
   us_alteracao = '$postjson[us_alteracao]',
   dt_alteracao = '$postjson[data_atual]'
    WHERE id_filiado = '$postjson[id_filiado]'

   ");
   





    if($update){

     $result = json_encode(array('success'=>true));

   }else{
   $result = json_encode(array('success'=>false));
   } 
    
   echo $result;

}
elseif($postjson['aksi']=='proses_consulta_perfil_lideranca'){
  
   $data = array();
   $query = mysqli_query($mysqli,"SELECT * FROM lideranca WHERE id_lideranca = $postjson[id_lideranca] ");
   
   while ($rows = mysqli_fetch_array($query)){
    
   $data[] = array(
      'id_lideranca' =>$rows['id_lideranca'],
      'nome' => $rows['nome_lideranca'],
      'id_filiador' => $rows['id_filiador'],
      'perfil' => $rows['documento_perfil'],
      'cpf_cnpj_lideranca' => $rows['cpf_cnpj_lideranca'],
      'email_lideranca'	=> $rows['email_lideranca'],
      'telefone_lideranca' => $rows['telefone_lideranca'],
      'sn_whatsapp' => $rows['sn_whatsapp']
   
      
      
   );
    }
    if($query){
      $result = json_encode(array('sucess'=>true, 'result'=>$data ));
     
 
   }else{
      $result = json_encode(array('sucess'=>false,$mysqli));
   }
     echo $result;
 
}
elseif($postjson['aksi'] == "proses_update_email_lideranca"){
   
  

   $update = mysqli_query($mysqli, "UPDATE lideranca SET
   email_lideranca = '$postjson[novo_email_lideranca]',
   dt_modificacao = '$postjson[data_atual]'
  
    WHERE id_lideranca = '$postjson[id_lideranca]'

   ");
   





    if($update){

     $result = json_encode(array('success'=>true));

   }else{
   $result = json_encode(array('success'=>false));
   } 
    
   echo $result;

}elseif($postjson['aksi'] == "proses_update_telefone_lideranca"){
   
  

   $update = mysqli_query($mysqli, "UPDATE lideranca SET
   telefone_lideranca = '$postjson[novo_telefone_lideranca]',
   dt_modificacao = '$postjson[data_atual]'
  
    WHERE id_lideranca = '$postjson[id_lideranca]'

   ");
   





    if($update){

     $result = json_encode(array('success'=>true));

   }else{
   $result = json_encode(array('success'=>false));
   } 
    
   echo $result;

}elseif($postjson['aksi'] == "proses_update_nome_lideranca"){
   
  

   $update = mysqli_query($mysqli, "UPDATE lideranca SET
   nome_lideranca = '$postjson[novo_nome_lideranca]',
   dt_modificacao = '$postjson[data_atual]'
  
    WHERE id_lideranca = '$postjson[id_lideranca]'

   ");
   





    if($update){

     $result = json_encode(array('success'=>true));

   }else{
   $result = json_encode(array('success'=>false));
   } 
    
   echo $result;

}elseif($postjson['aksi'] == "proses_update_picture_lideranca"){
   
  

   $update = mysqli_query($mysqli, "UPDATE lideranca SET
   documento_perfil = '$postjson[new_picture]',
   dt_modificacao = '$postjson[data_atual]'
  
    WHERE id_lideranca = '$postjson[id_lideranca]'

   ");
   





    if($update){

     $result = json_encode(array('success'=>true));

   }else{
   $result = json_encode(array('success'=>false));
   } 
    
   echo $result;

}elseif($postjson['aksi'] == "proses_update_picture_filiado"){
   
  

   $update = mysqli_query($mysqli, "UPDATE filiado SET
   documento_perfil = '$postjson[new_picture]',
   dt_alteracao = '$postjson[data_atual]',
   us_alteracao = '$postjson[us_alteracao]'
    WHERE id_filiado = '$postjson[id_filiado]'

   ");
   





    if($update){

     $result = json_encode(array('success'=>true));

   }else{
   $result = json_encode(array('success'=>false));
   } 
    
   echo $result;

}elseif($postjson['aksi']=='proses_consulta_apoio'){
  
   $data = array();
   $query = mysqli_query($mysqli,"SELECT * FROM apoio WHERE id_filiador = $postjson[id_filiador]");
   
   while ($rows = mysqli_fetch_array($query)){
    
   $data[] = array(

      'nome' => $rows['nome_apoio'],
      'perfil' => $rows['documento_perfil'],
      'id_apoio' => $rows['id_apoio'],
      'telefone_apoio' => $rows['telefone_apoio'],
      'sn_whatsapp' => $rows['sn_whatsapp']
   
      
      
   );
 }
    if($query){
      $result = json_encode(array('sucess'=>true, 'result'=>$data ));
     
 
   }else{
      $result = json_encode(array('sucess'=>false,$mysqli));
   }
     echo $result;
 
}

elseif($postjson['aksi']=='proses_consulta_pendentes'){
  
   $data = array();
   $query = mysqli_query($mysqli,"SELECT id_lideranca FROM lideranca WHERE id_filiador = $postjson[id_filiador] ");

   while ($rows1 = mysqli_fetch_array($query)){
   $query2 = mysqli_query($mysqli,"SELECT * FROM filiado WHERE id_lideranca = $rows1[id_lideranca] AND situacao_cadastro = 'G' ORDER BY nome_filiado DESC LIMIT $postjson[start],$postjson[limit]");
   
   while ($rows = mysqli_fetch_array($query2)){
    $query3 =  mysqli_query($mysqli,"SELECT nome_lideranca FROM lideranca WHERE id_lideranca = $rows[id_lideranca]");
   $data[] = array(
      'id_filiado' =>$rows['id_filiado'],
      'nm_lideranca' =>$query3,
      'nome' => $rows['nome_filiado'],
      'id_lideranca' => $rows['id_lideranca'],
      'perfil' => $rows['documento_perfil'],
      'cpf_cnpj_filiado' => $rows['cpf_cnpj_filiado'],
      'email_filiado' 	=> $rows['email_filiado'],
      'telefone_filiado' => $rows['telefone_filiado'],
      'endereco' => $rows['endereco'],
      'numero' => $rows['numero'],
      'nome_mae' => $rows['nome_mae'],
      'complemento' => $rows['complemento'],	
      'bairro' => $rows['bairro'],
      'cidade' => $rows['cidade'], 	
      'uf' 	=> $rows['uf'],
      'cep' => $rows['cep'],
      'sn_biometria' => $rows['sn_biometria'],
      'sn_whatsapp' => $rows['sn_whatsapp'],
      'nr_titulo' => $rows['nr_titulo'],
      'us_aprovacao' => $rows['us_aprovacao'],
      'documento_verso' => $rows['documento_verso'],
      'documento_frente' => $rows['documento_frente']
       
    
 
      
   );
    }}
   if($query){
      $result = json_encode(array('sucess'=>true, 'result'=>$data ));
     
 
   }else{
      $result = json_encode(array('sucess'=>false,$mysqli));
   }
     echo $result;
 
 }
 
 elseif($postjson['aksi']=='proses_consulta_filiador'){
  
   $data = array();
   $query = mysqli_query($mysqli,"SELECT * FROM filiador  ORDER BY nome_filiador DESC LIMIT $postjson[start],$postjson[limit]");
   
   while ($rows = mysqli_fetch_array($query)){
   $data[] = array(
  
      'nome' => $rows['nome_filiador']

      
    
 
      
   );
    }
   if($query){
      $result = json_encode(array('sucess'=>true, 'result'=>$data));
     
 
   }else{
      $result = json_encode(array('sucess'=>false,$mysqli));
   }
     echo $result;
 
 }
 
 elseif($postjson['aksi']=='proses_consulta_filiados_pendentes'){
  
   $data = array();
   $query = mysqli_query($mysqli,"SELECT * FROM filiado WHERE id_filiado = $postjson[id_filiado]  ORDER BY nome_filiado DESC LIMIT $postjson[start],$postjson[limit]");
   
   while ($rows = mysqli_fetch_array($query)){
    
   $data[] = array(
      'id_filiado' =>$rows['id_filiado'],
      'nome' => $rows['nome_filiado'],
      'id_lideranca' => $rows['id_lideranca'],
      'perfil' => $rows['documento_perfil'],
      'cpf_cnpj_filiado' => $rows['cpf_cnpj_filiado'],
      'email_filiado' 	=> $rows['email_filiado'],
      'telefone_filiado' => $rows['telefone_filiado'],
      'endereco' => $rows['endereco'],
      'numero' => $rows['numero'],
      'nome_mae' => $rows['nome_mae'],
      'complemento' => $rows['complemento'],	
      'bairro' => $rows['bairro'],
      'cidade' => $rows['cidade'], 	
      'uf' 	=> $rows['uf'],
      'cep' => $rows['cep'],
      'sn_biometria' => $rows['sn_whatsapp'],
      'sn_whatsapp' => $rows['sn_biometria'],
      'nr_titulo' => $rows['nr_titulo'],
      'us_aprovacao' => $rows['us_aprovacao'],
      'documento_verso' => $rows['documento_verso'],
      'documento_frente' => $rows['documento_frente'],
      'data_nascimento' => $rows['dt_nascimento'],
      'dt_alteracao' => $rows['dt_alteracao'],
      'sn_whatsapp' => $rows['sn_whatsapp']
       
    
 
      
   );
    }
   if($query){
      $result = json_encode(array('sucess'=>true, 'result'=>$data ));
     
 
   }else{
      $result = json_encode(array('sucess'=>false,$mysqli));
   }
     echo $result;
 
 }elseif($postjson['aksi'] == "proses_aprovacao"){
   
  

   $update = mysqli_query($mysqli, "UPDATE filiado SET
   situacao_cadastro = 'A',
   dt_aprovacao = '$postjson[data_atual]',
   us_aprovacao = '$postjson[us_aprovacao]'
    WHERE id_filiado = '$postjson[id_filiado]'

   ");
   





    if($update){

     $result = json_encode(array('success'=>true));

   }else{
   $result = json_encode(array('success'=>false));
   } 
    
   echo $result;

}elseif($postjson['aksi'] == "proses_reprovacao"){
   
   $motivodecode = utf8_decode($postjson['motivo_reprovacao']);

   $update = mysqli_query($mysqli, "UPDATE filiado SET
   situacao_cadastro = 'R',
   dt_reprovacao = '$postjson[data_atual]',
   us_reprovacao = '$postjson[us_reprovacao]',
   motivo_reprovacao = '$motivodecode'
    WHERE id_filiado = '$postjson[id_filiado]'

   ");
   





    if($update){

     $result = json_encode(array('success'=>true));

   }else{
   $result = json_encode(array('success'=>false));
   } 
    
   echo $result;

}

elseif($postjson['aksi']=='proses_consulta_perfil_apoio'){
  
   $data = array();
   $query = mysqli_query($mysqli,"SELECT * FROM apoio WHERE id_apoio = $postjson[id_apoio] ");
   
   while ($rows = mysqli_fetch_array($query)){
    
   $data[] = array(
      'id_apoio' =>$rows['id_apoio'],
      'nome' => $rows['nome_apoio'],
      'id_filiador' => $rows['id_filiador'],
      'perfil' => $rows['documento_perfil'],
      'cpf_cnpj_apoio' => $rows['cpf_cnpj_apoio'],
      'email_apoio'	=> $rows['email_apoio'],
      'telefone_apoio' => $rows['telefone_apoio'],
      'sn_whatsapp' => $rows['sn_whatsapp']
   
      
      
   );
    }
    if($query){
      $result = json_encode(array('sucess'=>true, 'result'=>$data ));
     
 
   }else{
      $result = json_encode(array('sucess'=>false,$mysqli));
   }
     echo $result;
 
}

elseif($postjson['aksi'] == "proses_update_email_apoio"){
   
  

   $update = mysqli_query($mysqli, "UPDATE apoio SET
   email_apoio = '$postjson[novo_email_apoio]',
   dt_modificacao = '$postjson[data_atual]'
  
    WHERE id_apoio = '$postjson[id_apoio]'

   ");
   





    if($update){

     $result = json_encode(array('success'=>true));

   }else{
   $result = json_encode(array('success'=>false));
   } 
    
   echo $result;

}

elseif($postjson['aksi'] == "proses_update_telefone_apoio"){
   
  

   $update = mysqli_query($mysqli, "UPDATE apoio SET
   telefone_apoio = '$postjson[novo_telefone_apoio]',
   dt_modificacao = '$postjson[data_atual]'
  
    WHERE id_apoio = '$postjson[id_apoio]'

   ");
   





    if($update){

     $result = json_encode(array('success'=>true));

   }else{
   $result = json_encode(array('success'=>false));
   } 
    
   echo $result;

}

elseif($postjson['aksi'] == "proses_update_nome_apoio"){
   
  

   $update = mysqli_query($mysqli, "UPDATE apoio SET
   nome_apoio = '$postjson[novo_nome_apoio]',
   dt_modificacao = '$postjson[data_atual]'
  
    WHERE id_apoio = '$postjson[id_apoio]'

   ");
   





    if($update){

     $result = json_encode(array('success'=>true));

   }else{
   $result = json_encode(array('success'=>false));
   } 
    
   echo $result;


}

elseif($postjson['aksi'] == "proses_validacao"){
   
   $checkemail = mysqli_fetch_array(mysqli_query($mysqli, "SELECT * FROM usuario WHERE login='$postjson[login]' "));
 
   

     $update = mysqli_query($mysqli, "UPDATE usuario SET
    
      sn_cadastro_validado = 'S',
      dt_primeiro_acesso = '$postjson[dtAtual]' WHERE login = $postjson[login]
      
     ");
     





      if($update){

       $result = json_encode(array('success'=>true));

     }else{
     $result = json_encode(array('success'=>false));
     } 
      
     echo $result;

}

elseif($postjson['aksi']=='proses_consulta_perfil_filiador'){
  
   $data = array();
   $query = mysqli_query($mysqli,"SELECT * FROM filiador WHERE id_filiador = $postjson[id_filiador] ");
   
   while ($rows = mysqli_fetch_array($query)){
    
   $data[] = array(
 
      'nome' => $rows['nome_filiador'],
      'id_filiador' => $rows['id_filiador'],
      'perfil' => $rows['documento_perfil'],
      'cpf_cnpj_filiador' => $rows['cpf_cnpj_filiador'],
      'email_filiador'	=> $rows['email_filiador'],
      'telefone_filiador' => $rows['telefone_filiador'],
      'sn_whatsapp' => $rows['sn_whatsapp']
   
      
      
   );
    }
    if($query){
      $result = json_encode(array('sucess'=>true, 'result'=>$data ));
     
 
   }else{
      $result = json_encode(array('sucess'=>false,$mysqli));
   }
     echo $result;
 
}

elseif($postjson['aksi'] == "proses_update_email_filiador"){
   
  

   $update = mysqli_query($mysqli, "UPDATE filiador SET
   email_filiador = '$postjson[novo_email_filiador]',
   dt_modificacao = '$postjson[data_atual]'
  
    WHERE id_filiador = '$postjson[id_filiador]'

   ");
   





    if($update){

     $result = json_encode(array('success'=>true));

   }else{
   $result = json_encode(array('success'=>false));
   } 
    
   echo $result;

}elseif($postjson['aksi'] == "proses_update_telefone_filiador"){
   
  

   $update = mysqli_query($mysqli, "UPDATE filiador SET
   telefone_filiador = '$postjson[novo_telefone_filiador]',
   dt_modificacao = '$postjson[data_atual]'
  
    WHERE id_filiador = '$postjson[id_filiador]'

   ");
   





    if($update){

     $result = json_encode(array('success'=>true));

   }else{
   $result = json_encode(array('success'=>false));
   } 
    
   echo $result;

}elseif($postjson['aksi'] == "proses_update_nome_filiador"){
   
  

   $update = mysqli_query($mysqli, "UPDATE filiador SET
   nome_filiador = '$postjson[novo_nome_filiador]',
   dt_modificacao = '$postjson[data_atual]'
  
    WHERE id_filiador = '$postjson[id_filiador]'

   ");
   





    if($update){

     $result = json_encode(array('success'=>true));

     }else{
    $result = json_encode(array('success'=>false));
     } 
    
   echo $result;

}elseif($postjson['aksi'] == "proses_update_picture_filiador"){
   
  

   $update = mysqli_query($mysqli, "UPDATE filiador SET
   documento_perfil = '$postjson[new_picture]',
   dt_modificacao = '$postjson[data_atual]'
  
    WHERE id_filiador = '$postjson[id_filiador]'

   ");
   





    if($update){

     $result = json_encode(array('success'=>true));

   }else{
   $result = json_encode(array('success'=>false));
   } 
    
   echo $result;

}
elseif($postjson['aksi'] == "proses_cep"){
   function CEP_curl($cep) {
      $cep=preg_replace('/[^0-9]/', '', (string) $cep);
      $url = "http://viacep.com.br/ws/".$cep."/json/";
      // CURL
      $ch = curl_init();
      // Disable SSL verification
      curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
      // Will return the response, if false it print the response
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      // Set the url
      curl_setopt($ch, CURLOPT_URL, $url);
      // Execute
      $result = curl_exec($ch);
      // Closing
      curl_close($ch);
      
      $json=json_decode($result);
      //var_dump($json);
      if(!isset($json->erro)){
      $array['uf']=$json->uf;
      $array['cidade']=$json->localidade;
      $array['bairro']=$json->bairro;
      $array['logradouro']=$json->logradouro;
      }else{
      $array='Erro';
      }
      
      return $array;
      } 

   $cep = $postjson['cep'];
   $listcep = CEP_curl($cep);
  
      $data = array(
        'uf' => $listcep['uf'],
        'cidade' => $listcep['cidade'],
        'bairro' =>$listcep['bairro'],
        
        'logradouro' => $listcep['logradouro']

      );


      $result = json_encode(array('success'=>true,'result'=>$data ));
   
     
    echo $result;
 
}
elseif($postjson['aksi'] == "proses_mensagem"){
 


   $insert = mysqli_query($mysqli, "INSERT INTO mensagem SET
     
      texto_mensagem = '$postjson[mensagem]',
      imagem_mensagem = '$postjson[img]',
      id_lideranca = '$postjson[id_lideranca]'
  
   ");

 



    if($insert){

     $result = json_encode(array('success'=>true, 'msg' =>'Mensagem enviada'));

   }else{
   $result = json_encode(array('success'=>false, 'msg'=> ''));
   } 
    
   echo $result;

}
elseif($postjson['aksi'] == "proses_update_picture_apoio"){
   
  

   $update = mysqli_query($mysqli, "UPDATE apoio SET
   documento_perfil = '$postjson[new_picture]',
   dt_modificacao = '$postjson[data_atual]'
  
    WHERE id_apoio = '$postjson[id_apoio]'

   ");
   





    if($update){

     $result = json_encode(array('success'=>true));

   }else{
   $result = json_encode(array('success'=>false));
   } 
    
   echo $result;

}elseif($postjson['aksi']=='proses_consulta_lider'){
  
   $data = array();
   $query = mysqli_query($mysqli,"SELECT * FROM lideranca WHERE id_filiador = $postjson[id_filiador] ORDER BY nome_lideranca");
  

   
   while ($rows = mysqli_fetch_array($query)){
      
     
   $data[] = array(
      
  
      'nome_lideranca' => $rows['nome_lideranca'],
      'id_lideranca' => $rows['id_lideranca'],
      'documento_perfil' =>$rows['documento_perfil'],
      'telefone_lideranca' =>$rows['telefone_lideranca'],
      'sn_whatsapp' =>$rows['sn_whatsapp'],

    
 
      
   );
    }
   if($query){
      $result = json_encode(array('sucess'=>true, 'result'=>$data));
     
 
    }else{
      $result = json_encode(array('sucess'=>false,$mysqli));
    }
     echo $result;
 
 }
 elseif($postjson['aksi']=='proses_consulta_municipio'){
  
   $data = array();
   $query = mysqli_query($mysqli,"SELECT * FROM filiador WHERE id_filiador = $postjson[id_filiador] ");
   
   while ($rows = mysqli_fetch_array($query)){
    
   $data[] = array(
      'id_municipio' =>$rows['id_municipio']
   
      
      
   );
    }
    if($query){
      $result = json_encode(array('sucess'=>true, 'result'=>$data ));
     
 
   }else{
      $result = json_encode(array('sucess'=>false,$mysqli));
   }
     echo $result;
 
}





?> 