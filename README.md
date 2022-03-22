### Receitas API

### Descrição

- API desenvolvida em Node.js/Express e integrada ao banco de dados MySQL.
- Funcionalidades: gestão de usuário (cadastro e descadastro de contas, login, recuperação de senha (via e-mail), alteração de senha, controle de níveis de acesso); sistema de seguidores (follow e unfollow); feed de receitas; cadastro, remoção e edição de receitas.
- Bibliotecas utilizadas: Knewjs, JWT, bcryptjs, UUID, NodeMailer, Vailidator.
- Projeto de fixação desenvolvido durante estudos de Node.js.

### Documentação: [Receitas API Doc](https://documenter.getpostman.com/view/18387361/UVktqDwy)

### Instalação

- Instale os pacotes necessários com o ``` npm install ```;
- Configure o seu banco de dados no arquivo ``` .env ```;
- Utilize o ``` npm run migrations ``` para criar as tabelas no seu banco de dados;
- Suba o servidor para testes com o ``` npm run dev ``
