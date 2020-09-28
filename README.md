# Store Catalog Service

## Quick Start

A ideia desse projeto foi criar um Microserviço de catalogo de produtos para uma loja Genérica.

Por se tratar de um micro serviço não esta incluso nesse projeto um sistema de login e validação, a qual deverá ser atendido por um outro microserviço.

Para os módulos que exigem autenticação, foi utilizado Passport com JWT, você deve enviar um token Bearer.

Em uma situação real, esse microserviço deverá pedir autenticação ao Gateway central a qual solicitará por sua vez um token ao serviço de autenticação.

Para fins de test utilize esse token abaixo.

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMTExMTExMTExMTExIiwic3RvcmVJZCI6IjIyMjIyMjIyMjIyMjIiLCJpYXQiOjE2MDEzMDUzMTR9.R7HxW4tEzZgEvXnyFwIh6DfCZl-Y_DpfkZIwY0OYz68


Também não foi programado funcionalidades de estoque, essa funcionalidade deverá ser atendida pelo seu próprio microserviços ja que exige suas particularidades.

### Requisitos funcionais
	- Como gerente gostaria de adicionar um novo produto ao catálogo da loja
	- Como gerente gostaria de editar um produto existente no catálogo
	- Como gerente gostaria de remover o produto do meu catálogo da loja
	- Como gerente gostaria de recuperar uma lista com os produtos disponíveis
	- Como gerente gostaria de buscar produtos
	- Como gerente preciso que os resultados sejam páginados
	- Como gerente quero que apenas pessoas com permissão possam: adicionar, editar remover produtos
	- Como cliente quero visualizar um produto


## Getting Started

#### Production

```
cd store-catalog-service
yarn install
yarn start
API =>  `http://localhost:3000/`
```


## Development
O modo develop é executado com Nodemon.
```
cd store-catalog-service
yarn install
yarn dev
API =>  `http://localhost:3000/`
```

## Test
Os testes são efetuados com Jest.
```
cd store-catalog-service
yarn install
yarn test
API =>  `http://localhost:3000/`
```

## Documentação

https://documenter.getpostman.com/view/8310828/TVKJxELo








 
