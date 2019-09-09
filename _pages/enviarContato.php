<?php
$phpPost = filter_input_array(INPUT_POST);

define('HoorayWeb', TRUE);

include_once ("../p_settings.php");

if (!empty($phpPost['postcontato']) && $phpPost['postcontato'] == md5("enviarContato"))
{
    if (!filter_var($phpPost['contEmail'], FILTER_VALIDATE_EMAIL))
    {
        echo "!!Por favor informe um endereço de e-mail válido.";
    }
    else
    {
        $dadosContato = [ "AtendimentoClassificacaoID" => $phpPost["contAssunto"],
                          "Nome" => $phpPost["contNome"],
                          "CpfCnpj"=> $phpPost["contCPFCNPJ"],
                          "NumeroPedido"=> $phpPost["contPedido"], 
                          "Email" => $phpPost["contEmail"],
                          "Telefone" => s$phpPost['contTelefone'],
                          "Mensagem" =>  $phpPost["contMensagem"]
            ];

        $envioContato = sendRest($endPoint['enviarcontato'], $dadosContato, "POST");

        if ($envioContato['Gravou']) 
        {
            echo "Obrigado! Sua mensagem foi enviada.";
        } 
        else 
        {
            echo "!!Houve um erro no envio da sua mensagem: " . $envioContato['Mensagem'] ;
        }
    }
}

if (!empty($phpPost['postnews']) && $phpPost['postnews'] == md5("enviarNewsLetter"))
{
    if (filter_var($phpPost['emailInscricao'], FILTER_VALIDATE_EMAIL))
    {        
        $data = ["Nome" => $phpPost['emailInscricao'],
                 "Email" => $phpPost['emailInscricao']
            ];

        $envio = sendRest($endPoint['newsletter'], $data, "POST");

        if (!empty($envio))
        {
            echo "Obrigado. Seu e-mail foi cadastrado.";
        }
        else 
        {
            echo "E-mail já cadastrado em nosso mailing.";
        }
    }
    else 
    {
        echo "Por favor informe um e-mail válido.";
    }
}
?>
