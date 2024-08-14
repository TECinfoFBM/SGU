# SGU
Sistema de Gerenciamento de Usuário


# 🚀 Sistema de Gerenciamento de Usuário
Sistema desenvolvido para ensinar aos alunos com realizar operações com banco de Dados (CRUD) utilizando NODEJS

## 🔧 Features
- [x] Configuração inicial (13/08)
- [x] Site Privado (13/08)
    - [x] Layout do Site Administrativo (13/08)
    - [ ] Controle de Usuário 
        - [ ] Cadastro de Usuário (20/08)
        - [ ] Lista de Usuário (27/08)
        - [ ] Consulta de Usuário (03/09)
        - [ ] Editar Usuário (10/09)
        - [ ] Deletar Usuário (17/09)
    - [ ] Tela de Login (24/09)
    - [ ] Controle de Acesso (24/09)
- [ ] Site Publico

# Avaliação e Observações
- O Aluno que finalizar todas as atividade de sala de aula até o dia (24/09) ganhara 3 pontos.
- O Aluno que apresetar um controle de clientes até o dia (24/09) ganhará 1 ponto extra.
- Prova escrita dia 16/09 (Segunda-feria) valor 5 pontos
- Avaliação Atitudinal valor 1 ponto

# =====[ Instalação do MySQL ]=====

## Instalação
``` 
sudo apt install mysql-server
sudo mysql_secure_installation
```
Acompanhe a instalação digitando os valores abaixo conforme solicitado.

***y, 0, y, n, y, y***

## Acessando Mysql
``` 
sudo mysql -p -u root
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '21324354'; 
```
**Senha = 21324354**

## Criando DataBase
``` 
create database dbSGU;
show databases;
use dbSGU;
show tables;
``` 