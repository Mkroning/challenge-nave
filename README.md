# Chalenge nave for back end

## Fazendo download do projeto e instalando

Use o comando git clone, para baixar para sua maquina:

git clone https://github.com/Mkroning/challenge-nave.git

Após o download concluido, vá ate a pasta do projeto utilizando cd challenge-nave e instale as depencias do projeto.
Utilizar o npm install ou yarn install.

## Rodando o Projeto

Após a instalação deverá alterar o arquivo.env alterarando as variaveis de ambiente.Feito isso poderá rodar o yarn knex migrate:latest para implementação das tabelas em seu banco de dados.

Agora poderá utilizar o yarn dev para rodar o projeto

## Dificuldade encontradas

De inicio eu queria resolver utilizando typescript, mais precisamente com Nest.js.

Não tinha conhecimento sobre o YUP para fazer validações, nisso obtive um pouco de dificuldade.

Tive dificuldade, nos seguintes erros. Ao colocar imports ele não encontrava o path, mas ao colocar o mouse por cima ele mostrava exatamente o caminho
