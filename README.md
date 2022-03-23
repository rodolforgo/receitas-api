### API Receitas

API desenvolvida em Node.js/Express e integrada ao banco de dados MySQL.

___
### Descrição

- Funcionalidades: gestão de usuário (cadastro e descadastro de contas, login, recuperação de senha (via e-mail), alteração de senha, controle de níveis de acesso); sistema de seguidores (follow e unfollow); feed de receitas; cadastro, remoção e edição de receitas.
- Bibliotecas utilizadas: Knewjs, JWT, bcryptjs, UUID, NodeMailer, Vailidator.
- Projeto de fixação desenvolvido durante estudos de Node.js.
___
### Documentação: [Receitas API Doc](https://documenter.getpostman.com/view/18387361/UVktqDwy)

### Instalação

Instale os pacotes necessários: <br />
> ```npm install```<br />

Configure o seu banco de dados no arquivo ``` .env ```

Crie as tabelas no seu banco de dados digitando:

> ``` npm run migrations ```

Suba o servidor para testes:

> ``` npm run dev ```
