# Teste Tecnico backend Teddy Open Finance
## Objetivo
Focado em um processo seletivo ao qual estou participando e este repositorio é com seu teste tecnico

## Iniciando projeto
.env
```bash
WSRS_DATABASE_PORT="5432"
WSRS_DATABASE_NAME='wsrs'
WSRS_DATABASE_USER="postgres"
WSRS_DATABASE_PASSWORD='123456789'
WSRS_DATABASE_HOST='localhost'

JWT_SECRET="123456"

URL_PUBLIC=http://localhost:8080/shortened/link
```
Iniciando com docker:
```bash
docker-compose up -d
```
## Documentação da API
http://localhost:8080/swagger

## Desafio escalar horizontalmente
  - Balanceamento de carga (considerar nginx)
  - Desacoplamento (considerar a implementação de uma mensageria)
  - Cache (considerar implementação de cache)
  - Gerenciamento de sessões

## Desafio
- [x] Deverá ser implementado um projeto com NodeJS na última versão estável, sendo construído como API REST. Leve em consideração que o sistema será implementado em uma infraestrutura que escala verticalmente.
- [x] O sistema deve possibilitar o cadastro de usuários e autenticação dos mesmos.
- [x] O sistema deve possibilitar que a partir de um url enviado, ele seja encurtado para no máximo 6 caracteres. Exemplo: Entrada: https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/ Saída: http://localhost/aZbKq7
- [x] Qualquer um pode solicitar que o URL seja encurtado e para encurtar deve existir apenas um endpoint, mas caso seja um usuário autenticado, o sistema deve registrar que o URL pertence ao usuário. 
- [x] Um usuário autenticado pode listar, editar o endereço de destino e excluir URLs encurtadas por ele.
- [x] Todo acesso a qualquer URL encurtado deve ser contabilizado no sistema.
- [x] Quando um usuário listar os urls deve aparecer na listagem a quantidade de cliques.
- [x] Todos os registros devem ter uma forma de saber quando foram atualizados.
- [x] Os registros só poderão ser deletados logicamente do banco, ou seja, deverá ter um campo que guarda a data de exclusão do registro, caso ela esteja nula é porque ele é válido, caso esteja preenchida é porque ele foi excluído e nenhuma operação de leitura ou escrita pode ser realizada por ele.
## Sobre entrega
- [x] Construir uma estrutura de tabelas que faça sentido para o projeto usando um banco relacional.
- [x] Construir endpoints para autenticação de e-mail e senha que retorna um Bearer Token.
- [x] Construir apenas um endpoint para encurtar o URL, ele deve receber um URL de origem e deve aceitar requisições com e sem autenticação, deve retornar o url encurtado - incluindo o domínio..
- [x] Definir o que deve e não deve ser variável de ambiente..
- [x] Construir endpoints que aceitam apenas requisições autenticadas:
- [x] Listagem de URL Encurtados pelo usuário com contabilização de clicks
- [x] Deletar URL Encurtado
- [x] Atualizar a origem de um URL encurtado.
- [x] README ou CONTRIBUTING explicando como rodar o projeto.
- [x] Construir um endpoint que ao receber um URL encurtado, redirecione o usuário para o URL de origem e contabilize.
- [x] Maturidade 2 da API REST
## Entrega com diferencial:
- [x] Utilizar docker-compose para subir o ambiente completo localmente.
- [x] Ter testes unitários
API está documentada com OPEN API ou Swagger
- [x] Ter validação de entrada em todos os lugares necessários.
- [x] Ter instrumentação de observabilidade (implementação real ou abstração) de um ou vários tipos: Logs, Métricas, Rastreamento

- [-] Dar deploy no ambiente em um cloud provider e expor no readme o link.
- [x] Deixar no README pontos de melhoria para caso o sistema necessite escalar horizontalmente e quais serão os maiores desafios.

- [-] Monorepo com separação de serviços como gerenciamento de identidade e acesso e regra de negócio de encurtar URL com comunicação entre os serviços. Obrigatório docker-compose neste cenário.
- [-] Configurar um api gateway como KrankeD na frente dos serviços.
- [-] Utilizar changelog com a realidade do seu desenvolvimento
- [-] Git tags definindo versões de release, por exemplo release 0.1.0 como encurtador criado, 0.2.0 como autenticação, 0.3.0 como operações de usuário no encurtador, 0.4.0 como contabilização de acessos.
- [-] Construir deployments do Kubernetes para deploy.
- [-] Construir artefatos do Terraform para deploy.
- [x] Construir github actions para lint e testes automatizados.
- [-] Transformar o sistema em multi tenant.
- [-] Construir funcionalidades a mais que acredite ser interessante para o “domínio do negócio” da aplicação.
- [x] Definir e assegurar quais versões do NodeJS são aceitas no projeto.
- [-] Configurar pré commit ou pre push hooks.
- [-] Código tolerante a falhas.


## ✒️ Authors
[Nivaldeir](https://github.com/nivaldeir).
