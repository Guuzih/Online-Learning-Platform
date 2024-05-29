Plataforma de Aprendizagem Online
Este projeto é uma API para uma plataforma de aprendizagem online.

Tecnologia usadas
Node.js, TypeScript, Express.js, PostgreSQL, Sequelize, JWT para autenticação, bcrypt.js para criptografia de senhas

# Plataforma de Aprendizagem Online API

API para uma plataforma de aprendizagem online, desenvolvida utilizando Node.js, Express.js, Sequelize e PostgreSQL.

#Tecnologia usadas

Node.js TypeScript, Express.js, PostgreSQL, Sequelize, JWT para autenticação, bcrypt.js 

## Funcionalidades

### Login

#### Registrar um Novo Usuário

- **Descrição:** Cria um novo usuário na plataforma.
- **Rota:** `POST /api/users/register`
- **Parâmetros:**
  - `name` (string): Nome do usuário.
  - `username` (string): Username do usuário.
  - `email` (string): E-mail do usuário.
  - `password` (string): Senha do usuário.
- **Respostas:**
  - `200 OK`: Usuário registrado com sucesso.
  - `400 Bad Request`: Erro nos dados fornecidos.

#### Fazer Login na Plataforma

- **Descrição:** Autentica um usuário na plataforma.
- **Rota:** `POST /api/users/login`
- **Parâmetros:**
  - `email` (string): E-mail do usuário.
  - `password` (string): Senha do usuário.
- **Respostas:**
  - `200 OK`: Login realizado com sucesso.
  - `401 Unauthorized`: Credenciais inválidas.

## Curso 

#### Obter a Lista de Cursos Disponíveis

- **Descrição:** Retorna a lista de cursos disponíveis na plataforma.
- **Rota:** `GET /api/courses`
- **Respostas:**
  - `200 OK`: Lista de cursos obtida com sucesso.

#### Criar um Novo Curso

- **Descrição:** Cria um novo curso na plataforma.
- **Rota:** `POST /api/courses`
- **Parâmetros:**
  - `name` (string): Nome do curso.
  - `description` (string): Descrição do curso.
- **Respostas:**
  - `200 OK`: Curso criado com sucesso.
  - `400 Bad Request`: Erro nos dados fornecidos.

#### Obter Detalhes de um Curso Específico

- **Descrição:** Retorna os detalhes de um curso específico na plataforma.
- **Rota:** `GET /api/courses/{id}`
- **Parâmetros:**
  - `id` (string): ID do curso.
- **Respostas:**
  - `200 OK`: Detalhes do curso obtidos com sucesso.
  - `404 Not Found`: Curso não encontrado.

#### Atualizar um Curso Existente

- **Descrição:** Atualiza um curso existente na plataforma.
- **Rota:** `PUT /api/courses/{id}`
- **Parâmetros:**
  - `id` (string): ID do curso.
  - `name` (string): Novo nome do curso.
  - `description` (string): Nova descrição do curso.
- **Respostas:**
  - `200 OK`: Curso atualizado com sucesso.
  - `400 Bad Request`: Erro nos dados fornecidos.
  - `404 Not Found`: Curso não encontrado.

#### Excluir um Curso

- **Descrição:** Exclui um curso da plataforma.
- **Rota:** `DELETE /api/courses/{id}`
- **Parâmetros:**
  - `id` (string): ID do curso a ser excluído.
- **Respostas:**
  - `200 OK`: Curso excluído com sucesso.
  - `404 Not Found`: Curso não encontrado.
 
## Forum

#### Obter a Lista de Forum Disponíveis

- **Descrição:** Retorna a lista de Forum disponíveis na plataforma.
- **Rota:** `GET /api/forums`
- **Respostas:**
  - `200 OK`: Lista de forums obtida com sucesso.

#### Criar um Novo Forum

- **Descrição:** Cria um novo forum na plataforma.
- **Rota:** `POST /forum`
- **Parâmetros:**
  - `title` (string): Titulo do forum.
  - `courseId` (Number): Id do curso.
- **Respostas:**
  - `200 OK`: Forum criado com sucesso.
  - `400 Bad Request`: Erro nos dados fornecidos.

#### Obter Detalhes de um Forum Específico

- **Descrição:** Retorna os detalhes de um curso específico na plataforma.
- **Rota:** `GET /forum/{id}`
- **Parâmetros:**
  - `id` (string): ID do forum.
- **Respostas:**
  - `200 OK`: Detalhes do curso obtidos com sucesso.
  - `404 Not Found`: Forum não encontrado.

#### Atualizar um Forum Existente

- **Descrição:** Atualiza um Forum existente na plataforma.
- **Rota:** `PUT /api/forum/{id}`
- **Parâmetros:**
  - `id` (string): ID do forum.
  -  `title` (string): Titulo do forum.
  - `courseId` (Number): Id do curso.
- **Respostas:**
  - `200 OK`: Forum atualizado com sucesso.
  - `400 Bad Request`: Erro nos dados fornecidos.
  - `404 Not Found`: Forum não encontrado.

#### Excluir um Forum

- **Descrição:** Exclui um forum da plataforma.
- **Rota:** `DELETE /forum/{id}`
- **Parâmetros:**
  - `id` (string): ID do forum a ser excluído.
- **Respostas:**
  - `200 OK`: forum excluído com sucesso.
  - `404 Not Found`: forum não encontrado.

## Forum post 

#### Criar um Forum post 

- **Descrição:** Cria um novo Forum post .
- **Rota:** `/:forumId/posts`
- **Parâmetros:**
  - `title` (string): Título do post.
  - `content` (string): Conteudo do post.
- **Respostas:**
  - `200 OK`: Forum post criado com sucesso.
  - `400 Bad Request`: Erro nos dados fornecidos.

#### Obter Detalhes de um Forum post  Específico

- **Descrição:** Retorna os detalhes de um forum post  específico na plataforma.
- **Rota:** `GET /:forumId/posts`
- **Parâmetros:**
  - `id` (string): ID do forum.
- **Respostas:**
  - `200 OK`: Detalhes do forum.
  - `404 Not Found`: Forum não encontrado.

#### Atualizar um Forum post Existente

- **Descrição:** Atualiza um Forum post existente na plataforma.
- **Rota:** `PUT '/posts/:id'`
- **Parâmetros:**
  - `id` (string): ID do Forum post.
  - `title` (string): Título do post.
  - `content` (string): Conteudo do post.
- **Respostas:**
  - `200 OK`: Forum atualizado com sucesso.
  - `400 Bad Request`: Erro nos dados fornecidos.
  - `404 Not Found`: Forum não encontrado.

#### Excluir um Forum post

- **Descrição:** Exclui um Forum post da plataforma.
- **Rota:** `DELETE '/posts/:id'`
- **Parâmetros:**
  - `id` (string): ID do Forum post a ser excluído.
- **Respostas:**
  - `200 OK`: Forum post excluído com sucesso.
  - `404 Not Found`: Forum post não encontrado.

## Gamification

### Adicionar badges and points

- **Descrição:** Adicionar badges and points .
- **Rota:** /gamification/points`
- **Parâmetros:**
  - `userId` (number): Id do usuário.
  - `points` (number): Pontos.
  - `badges` (string): Nome da badges.
- **Respostas:**
  - `200 OK`: Forum post criado com sucesso.
  - `400 Bad Request`: Erro nos dados fornecidos.

#### Obter Detalhes de um usuário  Específico

- **Descrição:** Retorna os detalhes de um usuário específico na plataforma.
- **Rota:** `GET /gamification/:userId`
- **Parâmetros:**
  - `id` (string): ID do usuário.
- **Respostas:**
  - `200 OK`: Detalhes do usuário.
  - `404 Not Found`: Detalhes não encontrado.

## Performance

### Adicionar ou Atualizar Desempenho

- **Descrição:** Adicionar ou Atualizar Desempenho .
- **Rota:** /performance/points`
- **Parâmetros:**
  - `courseId` (number): Id do curso.
  - `progress` (number): Progresso do curso.
  - `score` (string): Nota do curso.
- **Respostas:**
  - `200 OK`: Performance criada com sucesso.
  - `400 Bad Request`: Erro nos dados fornecidos.

#### Obter Detalhes de um usuário  Específico

- **Descrição:** Retorna os detalhes de um usuário específico na plataforma.
- **Rota:** `GET /performance/:userId`
- **Parâmetros:**
  - `id` (string): ID do usuário.
- **Respostas:**
  - `200 OK`: Performance do usuário.
  - `404 Not Found`: Performance não encontrada.



