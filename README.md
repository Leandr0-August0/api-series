# API Séries
 
Esta API é utilizada para gerenciar um catálogo de séries, permitindo operações de CRUD (criar, ler, atualizar e deletar) sobre as séries.
## Middleware
 
Será responsavel por verificar as credencias do usuário
 
Parametros:
 
token: token do usuário
 
Respostas:
 
##### Não Autorizado! 401
 
Caso essa resposta aconteça, significa que o token passado no Header é invalido ou inexistente.
 
Exemplo de resposta:
```
{
    "message": "Token inválido"
}
```
 
## Endpoints
### - POST /user
 
Esse endpoint é responsável por cadastrar um novo usuário.
 
#### Parâmetros:
 
nome: Nome do usuário.
 
email: Email do usuário.
 
password: Senha do usuário.
 
Exemplo de requisição:
```
{
    "nome": "João Silva",
    "email": "joao@example.com",
    "password": "senha123"
}
```
#### Respostas:
 
##### Criado! 201
 
Caso essa resposta aconteça, o usuário foi cadastrado com sucesso.
 
Exemplo de resposta:
```
{
    "message": "Usuário cadastrado com sucesso!"
}
```

##### Requisição Ruim! 400

Caso essa resposta aconteça, significa que já existe um usuário cadastrado ou faltam campos a serem preenchidos.

Exemplos de resposta: 
```
{
    "message": "Todos os campos devem ser preenchidos"
}
```
```
{
    "message": "Usuário ja cadastrado"
}
```

##### Erro Interno do Servidor! 500
 
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.
 
Exemplo de resposta:
```
{
   message: "Erro ao gerar token",
   error: "Erro interno do servidor"
}
```
 
 
### - POST /login
 
Esse endpoint é utilizado para realizar o login do usuário
 
#### Parametros:
email: email do usuário
 
password: senha do usuário
 
Exemplo de requisição:
 
```
{
    "email": "leco@gmail.com",
    "password": "123"
}
```
#### Respostas:
 
##### Ok! 200
 
Caso essa resposta aconteça, significa que o login foi efetuado com sucesso.
 
```
{
    "message": "Usuário logado com sucesso!",
    "token": "<Token do usuário>"
}
```
 
##### Requisição Ruim! 400
 
Caso essa resposta aconteça, significa que existem campos que faltam ser preenchidos.
 
```
{
    "message": "Todos os campos devem ser preenchidos"
}
```

##### Não Autorizado! 401
 
Caso essa resposta aconteça, significa que o usuário errou a senha.
 
```
{
    "message": "Senha incorreta"
}
```

##### Não Encontrado! 404
 
Caso essa resposta aconteça, significa que nenhum usuário foi encontrado.
 
```
{
    "message": "Usuário nao encontrado"
}
```
  

##### Erro Interno no Servidor! 500
 
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.
 
```
{
    "message": "Erro ao gerar token",
    "error": "Erro interno do servidor"
}
```
 
### - GET /series
 
Esse endpoint é responsável por retornar a listagem de todas as séries cadastradas no banco de dados.
 
#### Parâmetros:
 
Nenhum.
 
#### Respostas:
 
##### OK! 200
 
Caso essa resposta aconteça, você vai receber a listagem de todas as séries.
 
Exemplo de resposta:
```
{
    "series": [
        {
            "title": "Breaking Bad",
            "description": {
                "genre": ["Drama", "Crime"],
                "rating": "9.5",
                "eps": "62",
                "year": 2008
            }
        },
        {
            "title": "Stranger Things",
            "description": {
                "genre": ["Sci-Fi", "Thriller"],
                "rating": "8.7",
                "eps": "34",
                "year": 2016
            }
        }
    ]
}
```
##### Não Encontrado! 404
 
Caso essa resposta aconteça, significa que nenhuma série foi encontrada.
 
Exemplo de resposta:
```
{
    "message": "Erro ao buscar séries",
    "error": "Erro interno do servidor"
}
```
##### Erro Interno do Servidor! 500
 
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.
 
Exemplo de resposta:
```
{
    "message": "Erro ao buscar séries",
    "error": "Erro interno do servidor"
}
```
### - POST /series
 
Esse endpoint é responsável por cadastrar uma nova série no banco de dados.
 
#### Parâmetros:
 
title: Título da série.
 
description: Objeto contendo informações adicionais sobre a série.
 
Exemplo de requisição:
```
{
    "title": "Dark",
    "description": {
        "genre": ["Sci-Fi", "Mystery"],
        "rating": "8.8",
        "eps": "26",
        "year": 2017
    }
}
```
#### Respostas:
 
##### Criado! 201
 
Caso essa resposta aconteça, a nova série foi criada com sucesso.
 
Exemplo de resposta:
```
{
    "message": "Série criada com sucesso!",
    "inserção": {
        "title": "Dark",
        "description": {
            "genre": ["Sci-Fi", "Mystery"],
            "rating": "8.8",
            "eps": "26",
            "year": 2017
        }
    }
}
```
##### Erro Interno do Servidor! 500
 
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.
 
Exemplo de resposta:
```
{
    "message": "Erro ao criar série",
    "error":<Mensagem de erro>
}
```
 
### - POST /series/many
 
Esse endpoint é responsável por cadastrar uma nova série no banco de dados.
 
#### Parâmetros:
 
title: Título da série.
 
description: Objeto contendo informações adicionais sobre a série.
 
Exemplo de requisição:
```
[
    {
        "title": "nome",
        "description": {
            "genre": [
                "Sci-Fi",
                "Mystery"
            ],
            "rating": "8.8",
            "eps": "34",
            "year": 2017
        }
    },
    {
        "title": "nominho",
        "description": {
            "genre": [
                "Sci-Fi",
                "Mystery"
            ],
            "rating": "8.8",
            "eps": "34",
            "year": 2017
        }
    },
    {
        "title": "nomão",
        "description": {
            "genre": [
                "Sci-Fi",
                "Mystery"
            ],
            "rating": "8.8",
            "eps": "34",
            "year": 2017
        }
    }
]
```
#### Respostas:
 
##### Criado! 201
 
Caso essa resposta aconteça, a nova série foi criada com sucesso.
 
Exemplo de resposta:
```
{
    "message": "Série criada com sucesso!",
    "inserção": {
        "title": "Dark",
        "description": {
            "genre": ["Sci-Fi", "Mystery"],
            "rating": "8.8",
            "eps": "26",
            "year": 2017
        }
    }
}
```
##### Erro Interno do Servidor! 500
 
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.
 
Exemplo de resposta:
```
{
     "message": "Erro ao criar série",
    "error":<Mensagem de erro>
}
```
 
### - GET /series/:id
 
Esse endpoint é responsável por retornar as informações de uma série específica pelo seu ID.
 
#### Parâmetros:
 
id: ID da série a ser consultada.
 
#### Respostas:
 
##### OK! 200
 
Caso essa resposta aconteça, você vai receber as informações da série solicitada.
 
Exemplo de resposta:
```
{
    "title": "Dark",
    "description": {
        "genre": ["Sci-Fi", "Mystery"],
        "rating": "8.8",
        "eps": "26",
        "year": 2017
    }
}
```
##### Não Encontrado! 404
 
Caso essa resposta aconteça, significa que a série com o ID fornecido não foi encontrada.
 
Exemplo de resposta:
```
{
    "message": "Erro ao buscar série",
    "error": "Erro interno do servidor"
}
```
### - PUT /series/:id
 
Esse endpoint é responsável por atualizar as informações de uma série específica pelo seu ID.
 
#### Parâmetros:
 
id: ID da série a ser atualizada.
 
title: Novo título da série (opcional).
 
description: Objeto contendo novas informações adicionais sobre a série (opcional).
 
Exemplo de requisição:
```
{
    "title": "Dark Updated",
    "description": {
        "genre": ["Sci-Fi", "Mystery"],
        "rating": "9.0",
        "eps": "26",
        "year": 2017
    }
}
```
#### Respostas:
 
##### OK! 200
 
Caso essa resposta aconteça, as informações da série foram atualizadas com sucesso.
 
Exemplo de resposta:
```
{
    "message": "Série atualizada com sucesso!"
}
```
##### Erro Interno do Servidor! 500
 
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.
 
Exemplo de resposta:
```
{
    "message": "Erro ao atualizar série",
    "error": "Erro interno do servidor"
}
```
### - DELETE /series/:id
 
Esse endpoint é responsável por deletar uma série específica pelo seu ID.
 
#### Parâmetros:
 
id: ID da série a ser deletada.
 
#### Respostas:
 
##### Sem Conteúdo! 204
 
Caso essa resposta aconteça, a série foi deletada com sucesso e não há conteúdo para retornar ao cliente.
 
##### Erro Interno do Servidor! 500
 
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.
 
Exemplo de resposta:
```
{
    "message": "Erro ao deletar série",
    "error": "Erro interno do servidor"
}
```