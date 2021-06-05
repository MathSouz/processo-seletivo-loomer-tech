## Rotas

<hr>

## POST <b>/usuario/registrar</b>

### <i>Usado para registrar o usuário e gerar o token.</i>
</br>
<b>Body:</b>

<code>
{
    "nome": "Fulano",
    "cpf": "12345678912",
    "email": "email@email.com",
    "senha": "senhaforte"
}
</code>
</br>
<b>Output:</b>
<code>
{
    "nome": "Fulano",
    "cpf": "12345678912",
    "email": "email@email.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjIyOTI2NDI5fQ.8o2qGpU65KPyphVN9OPvrybHqZ_j8tp3hzBVm2JfZUk"
}
</code>
</br>

<hr>

## PUT <b>/usuario/auth</b>

### <i>Usado autenticar o usuário e gerar o token.</i>
</br>
<b>Body:</b>

<code>
{
    "email": "email@email.com",
    "senha": "senhaforte"
}

</code>
</br>
<b>Output:</b>
<code>
{
    "nome": "Fulano",
    "cpf": "12345678912",
    "email": "email@email.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjIyOTI2NDI5fQ.8o2qGpU65KPyphVN9OPvrybHqZ_j8tp3hzBVm2JfZUk"
}
</code>
</br>

<hr>

## POST <b>/imovel/registrar</b>

### <i>Usado para registrar um imóvel.</i>
</br>
<b>Header:</b>
<code>
{ 
   Authorization: Bearer eyJpZCI6NCwiaW... 
}
</code>
</br>
<b>Body:</b>
<code>
{
    "cep": "12345123", // Obrigatório
    "numero": 2,
    "complemento": "Nárnia",
    "valor": 0, // Obrigatório
    "qntQuartos": 1,
    "disponivel": 1
}
</code>
</br>
<b>Output:</b>
<code>
{
    "id": 1,
    "cep": "12345123",
    "numero": 2,
    "complemento": "Nárnia",
    "valor": 0,
    "qntQuartos": 1,
    "disponivel": 1
}
</code>
</br>

<hr>

## PUT <b>/imovel/alterar?id=[id do imóvel]</b>

### <i>Usado para alterar os dados de um imóvel. No lugar de [id do imóvel] troque pelo id do imóvel. No body basta dizer quais valores deseja alterar.</i>
</br>
<b>Header:</b>
<code>
{ 
   Authorization: Bearer eyJpZCI6NCwiaW... 
}
</code>
</br>
<b>Body:</b>
<code>
{
    "cep": "54321321",
    "numero": 6,
    "complemento": "Midgard",
    "valor": 0,
    "qntQuartos": 1,
    "disponivel": 1
}
</code>
</br>
<b>Output:</b>
<code>
{
    "id": 0,
    "cep": "54321321",
    "numero": 6,
    "complemento": "Midgard",
    "valor": 0,
    "qntQuartos": 1,
    "disponivel": 1
}
</code>
</br>

<hr>

## GET <b>/imovel</b>

### <i>Retorna todos os imóveis no banco de dados. Para buscar um imóvel específico basta usar GET /imovel/<b>[id do imóvel]</b> </i>
</br>
<b>Header:</b>
<code>
{ 
   Authorization: Bearer eyJpZCI6NCwiaW... 
}
</code>

</br>

<hr>

## DELETE <b>/imovel/[id do imóvel]</b>

### <i>Deleta o imóvel.</i>
</br>
<b>Header:</b>
<code>
{ 
   Authorization: Bearer eyJpZCI6NCwiaW... 
}
</code>