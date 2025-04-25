🏨 Sistema de Reclamações de Moradores (PWA)

Este projeto é uma aplicação web que permite que moradores registrem reclamações relacionadas a problemas em seus bairros, como buracos nas ruas, vazamentos, falta de iluminação, entre outros. O sistema possui uma interface intuitiva e um backend com API REST para gerenciamento de dados. Além disso, é uma Progressive Web App (PWA), o que significa que o sistema pode ser acessado e utilizado de forma eficiente mesmo em condições de rede instáveis e pode ser instalado no dispositivo do usuário, funcionando como um aplicativo nativo. O backend do projeto está hospedado no Render e o banco de dados é gerido pelo MongoDB.

📌 Funcionalidades

📄 Cadastro de moradores com suas reclamações 🧾 Listagem de moradores e suas reclamações associadas 🏷️ Classificação do tipo de reclamação 🔄 Atualização automática da interface após cadastro ✅ Validação dos dados 🧹 Integração front + back via API REST 📱 Suporte a funcionalidade PWA: possibilidade de instalação e uso offline

🚀 Tecnologias Utilizadas

Frontend:

HTML, CSS e JavaScript

Design responsivo e interativo

PWA (Progressive Web App)

Backend:

Node.js + Express

MongoDB + Mongoose (hospedado no MongoDB Atlas)

Render (para hospedagem do backend)

CORS, dotenv e outras libs úteis

🛠️ Como rodar o projeto

🔧 Pré-requisitos:

Node.js instalado

MongoDB rodando localmente ou na nuvem (Ex: MongoDB Atlas)

📅 Clone o repositório:

bash Copiar Editar git clone https://github.com/Juliana162702/RepareAqui_frontend.git cd seu-repositorio ⚙️ Instale as dependências do backend:

bash Copiar Editar cd backend npm install 🧪 Configure o .env:

Crie um arquivo .env dentro da pasta backend com o seguinte conteúdo:

ini Copiar Editar PORT=3000 MONGO_URI=mongodb://localhost:27017/sistema-reclamacoes Ou use seu URI do Atlas.

▶️ Inicie o servidor backend:

bash Copiar Editar npm run dev 🖥️ Abra o frontend:

No seu navegador, abra o arquivo frontend/index.html diretamente ou use uma extensão Live Server (VS Code).

🥪 Testando

Clique em "Nova Reclamação" Preencha o formulário com nome, bairro e problema Envie e veja a lista sendo atualizada automaticamente

📁 Estrutura do Projeto

📆 projeto-reclamacoes 🗄️ backend 🗂️ models 🗂️ routes 🗂️ controllers server.js .env 🗄️ frontend index.html style.css app.js README.md

📌 Melhorias Futuras

🔐 Autenticação de usuários 📃 Filtragem por bairro ou tipo de problema 📊 Painel de estatísticas 📱 Versão mobile ou app com Flutter

👩‍💻 Autoria

Desenvolvido por Juliana Kássia Rodrigues Reis Curso: Análise e Desenvolvimento de Sistemas – SENAC
