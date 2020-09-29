# Store Catalog Service

## Quick Start

A ideia desse projeto foi criar um Microserviço de catalogo de produtos para uma loja Genérica.

Por se tratar de um micro serviço não esta incluso nesse projeto um sistema de login e validação, a qual deverá ser atendido por um outro microserviço.

Para os módulos que exigem autenticação, foi utilizado Passport com JWT, você deve enviar um token Bearer.

Em uma situação real, esse microserviço deverá pedir autenticação ao Gateway central a qual solicitará por sua vez um token ao serviço de autenticação.

Para fins de test utilize esse token abaixo.

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMTExMTExMTExMTExIiwic3RvcmVJZCI6IjIyMjIyMjIyMjIyMjIiLCJpYXQiOjE2MDEzMDUzMTR9.R7HxW4tEzZgEvXnyFwIh6DfCZl-Y_DpfkZIwY0OYz68
```

Também não foi programado funcionalidades de estoque, essa funcionalidade deverá ser atendida pelo seu próprio microserviços ja que exige suas particularidades.

### Requisitos funcionais
	- Você pode adicionar um novo produto ao catálogo da loja
	- Você pode editar um produto existente no catálogo
	- Você pode remover o produto do catálogo da loja
	- Você pode recuperar uma lista com os produtos disponíveis
	- Você pode buscar produtos
	- Os resultados são páginados
	- Apenas pessoas com permissão podem: adicionar, editar remover produtos
	- Clientes podem visualizar um produto


## Getting Started

#### Production
```
cd store-catalog-service
yarn install
yarn start
``` 


## Development
O modo develop é executado com Nodemon.
```
cd store-catalog-service
yarn install
yarn dev
```

## Test
Os testes são efetuados com Jest.
```
cd store-catalog-service
yarn install
yarn test
```

## Documentation

https://documenter.getpostman.com/view/8310828/TVKJxELo


## live test environment

O ambiente de teste esta disponivel na platafoma Heroku no link abaixo.

https://store-catalog-service.herokuapp.com/






 
