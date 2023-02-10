# Using Context API in a Shopping Cart 

[**Click here to read the English version of this Readme**](#credits)

Praticando com a Context API em um cenário de e-commerce, compartilhando dados de usuário, carrinho e pagamento por meio de contextos e hooks customizados.

| :placard: Vitrine.Dev |     |
| -------------  | --- |
| :sparkles: Nome        | **Usando Context API em um carrinho de compras**
| :label: Tecnologias | React
| :rocket: URL         | 
| :fire: Curso     | https://www.alura.com.br/curso-online-react-context-estados-globais-contextapi  

![](https://user-images.githubusercontent.com/19349339/218111687-9d6d516f-b47d-43c5-a23f-9d734436777a.png#vitrinedev)

## Créditos

Este projeto foi desenvolvido no curso ["React: gerenciamento de estados globais com ContextAPI"](https://www.alura.com.br/curso-online-react-context-estados-globais-contextapi) da [Alura](https://www.alura.com.br). 

O curso foi ministrado pelo **[Luiz Fernando](https://www.linkedin.com/in/lfrprazeres/)**, que também desenvolveu o projeto. Acompanhei o desenvolvimento durante as aulas e depois repliquei os passos realizados.

O projeto foi disponibilizado com uma estrutura de arquivos e aparência das páginas já pronta e pode ser clonado [neste link](https://github.com/alura-cursos/react-context/tree/aula1.2). O objetivo do curso foi adicionar o React Context ao projeto, para fazer o gerenciamento de estados globais, e trafegar informações entre as páginas. Além disso, foi aplicado também o mapeamento de rotas e toda a lógica de compra (seleção de itens e pagamento).

## Detalhes do projeto

Você pode [ver o projeto online clicando aqui]().

Este é um projeto desenvolvido em React, para praticar o gerenciamento de estados e criação de hooks customizados utilizando a Context API. A aplicação é uma versão simples de uma loja online de produtos de feira e possui três páginas: 

1. Login: página para inserir um nome e um valor de saldo. Não é feita validação de login nem bloqueio de acesso às outras páginas: a intenção com esta página é para trabalharmos com um contexto de usuário, compartilhando seu nome e saldo com outras páginas e componentes;

2. Feira: é uma página que exibe alguns produtos de feira, sendo possível adicionar/remover items ao carrinho . Um ícone de carrinho vai sendo atualizado dinamicamente com a quantidade de itens selecionados;

3. Carrinho de compras: exibe os produtos selecionados, o valor total, saldo corrente e o valor restante de saldo caso a compra seja efetuada. Há também uma seleção de formas de pagamento que, dependendo da forma escolhida, adiciona uma taxa extra ao valor total da compra. Há validação para impedir que a compra seja feita caso o saldo seja insuficiente ou caso não haja itens no carrinho. Ao efetuar a compra, o saldo é atualizado.

Para se trabalhar com os diferentes tipos de informação que trafegam entre os componentes e as páginas, bem como para evitar o chamado *prop drilling* (passagem de props entre componentes e subcomponentes), foram criados três arquivos de contexto: 

1. User: provê os estados de nome e saldo;

2. Cart: possui um hook customizado que gerencia os estados do carrinho e provê funções para manipulá-lo (adicionar/remover itens, ver o número de itens, calcular o valor total e efetuar a compra). Por meio desse hook é possível isolar a responsabilidade de gerenciamento do carrinho dentro desse contexto, fazendo com que a página de feira e carrinho (bem como outros componentes) se responsabilizem somente pela parte de renderização.

3. Payment: do mesmo modo que em Cart, este arquivo possui um hook customizado que provê os métodos de pagamento, o método selecionado e uma função que troca de método de pagamento, se responsabilizando por gerenciar o estado pagamento selecionado.

## O que eu aprendi

### Sobre a Context API

Ela faz parte da biblioteca padrão do react (ou seja, o import de suas funcionalidades é direto de `import { ... } from 'react'`).

A Context API provê variáveis (e funções) que podem ser utilizadas por diversos componentes sem a necessidade de passá-las via props. Isso previne o prop drilling.

- `createContext()`: atribuído a uma constante, por exemplo, faz com que essa constante se torne um contexto. Essa constante é nomeada com a inicial em maiúsculo, pois também irá se tornar dois componentes: `<NomeDoComponente.Provider />` e `<NomeDoComponente.Consumer />`. Como o nome após o `.` indica, esses componentes têm a função de prover contexto ou consumir contexto. É possível passar um valor default como argumento para `createContext()`; esse valor será utilizado caso não seja passado nada na prop `value` do `NomeDoComponente.Provider`.

- `<NomeDoComponente.Provider />`: provê o contexto. Os valores que o contexto provê (por exemplo, estados e funções) são passados via prop `value`). Subcomponentes desse `Provider` poderão solicitar acesso ao contexto;

- `<NomeDoComponente.Consumer />`: indica que seus subcomponentes podem consumir os valores de contexto. Essa é a forma antiga de uso de contexto, da época em que existiam somente class components. Dentro desse componente vai uma arrow function, cujos parâmetros são os dados de contexto, e cujo retorno é o conteúdo que irá consumir esse dados (componentes e subcomponentes)). A forma mais moderna é por meio do hook `useContext()`;

- `useContext()` recebe como parâmetro um objeto de contexto. Esse objeto é a constante que você define com o `createContext()`. O retorno desse hook é um objeto com todos os dados de contexto disponíveis (pela prop `values`).

```jsx
// --- em um arquivo de context, por exemplo
export const UserContext = createContext();

// --- em um arquivo que irá prover os dados de contexto (UserContext deve ser importado)
<UserContext.Provider value={{ dado1, dado2 }}>
    {/* componentes (e seus subcomponentes) que terão acesso ao contexto */}
</UserContext.Provider>

// --- em um arquivo que irá consumir o contexto (UserContext deve ser importado)

// [MODO ANTIGO]
<UserContext.Consumer>
    { ({ dado1, dado2 }) => (
        {/* 
            JSX vai dentro dessa arrow function.
            Componentes dentro do contexto tem acesso aos dados de contexto, sem necessidade de recebê-los via props
        */}
    )}        
</UserContext.Consumer>

// [MODO NOVO]
const { dado1, dado2 } = useContext(UserContext);
```

### Debug

Para facilitar o debug de contexto, pode-se usar a extensão  [React Context DevTool](https://chrome.google.com/webstore/detail/react-context-devtool/oddhnidmicpefilikhgeagedibnefkcf) no Chrome. Por meio da extensão é possível monitorar os contextos e suas mudanças de valor.

- Pode ser necessário também ter a extensão [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi/) instalada para que o React Context DevTool funcione corretamente.

A constante que recebe o `createContext()` também irá possuir uma propriedade chamada `displayName`, que tem função de auxiliar no debug da aplicação utilizando a extensão "React Chrome DevTool". Pode ser atribuído a essa propriedade uma string qualquer. O conteúdo dessa string servirá para identificar esse contexto na aba "React Context" que irá aparecer no Dev Tools do navegador após a instalação da extensão. 

- o uso do `displayName` é opcional. Caso não seja dado um nome, o contexto ainda irá aparecer no Dev Tool, mas com um nome qualquer, por exemplo: "debugId_5". Quando se tem vários contextos, o uso do `displayName` facilita a diferenciação.

### Memoização

O React dispobiliza uma função para memoizar (ou memorizar) certas porções de código, para fins de performance: `memo()`. Essa função, quando aplicada a um componente, por exemplo, irá verificar o estado dos props do componente antes do render e comparar com seu estado atual. Caso não tenha havido mudança, o componente não é re-renderizado. 

Isso é útil, por exemplo, no caso de componentes que renderizam listas, sendo que os itens dessa lista são outros componentes. Em uma mudança de estado nesse componente de lista, a lista inteira (todos os seus itens) é re-renderizada. Se os componentes dessa lista forem memoizados, a re-renderização não irá acontecer caso eles não tenham sido alterados. Com isso, somente os itens que foram alterados serão de fato re-renderizados.

Caso uma das props seja uma função, o `memo()` não irá funcionar, pois a função é uma referência, o que irá falhar na hora da comparação. Uma forma de contornar esse problema é utilizar o `useCallback()` na definição da função que será enviada por prop. Esse hook memoiza uma função, com a definição da função  sendo passada como primeiro argumento; o segundo argumento é um array com as entradas a serem monitoradas e que podem causar a mudança na função memoizada (passando um array vazio, a função não irá mudar). 

## Instalação

O projeto foi criado com o Create React App, utilizando as bibliotecas React versão 17.0.2, React Router versão 5.2.0 e Material UI versão 4.12.1. É necessário também possuir o Node.js e o npm instalados em sua máquina para rodar a aplicação.

Após clonar/baixar o projeto, abra um terminal, navegue até a pasta do projeto e rode o seguinte comando para instalar todas as dependências necessárias:

    npm install

Após isso, você pode rodar a aplicação em modo de desenvolvimento com o seguinte comando: 

    npm start

A aplicação irá rodar no endereço http://localhost:3000.

---

## Credits

This project was developed in a [React Context API course](https://www.alura.com.br/curso-online-react-context-estados-globais-contextapi) (in Portuguese) from [Alura](https://www.alura.com.br). 

The instructor in this course is **[Luiz Fernando](https://www.linkedin.com/in/lfrprazeres/)**, who's also developed the project. I've replicated all steps taught during the lessons and made only small changes.

An initial version of the project was provided, containing a file structure and design for the pages. It can be cloned in [this link](https://github.com/alura-cursos/react-context/tree/aula1.2). The objective in the course was to add Context to the project, in order to manage global states and pass information between pages and components. We've also mapped routes to the pages and created all the logic needed for a checkout scenario (selecting items and purchasing them).

## Project details

You can [view the project online by clicking here]().

This project was developed using React in order to practice state management and custom hooks creation using the Context API. The app is a simple version of an online store for organic products and has three pages: 

1. Login: page to enter a name and wallet amount. There's no login validation nor blocked access to other pages: the intent here was to work with an "user context", sharing name and wallet with other pages/components;

2. Store: this page shows some organic products that can be purchased. One can add and remove products to the cart. A cart icon is dynamically updated with the amount of items picked;

3. Cart: display the products picked, total purchase amount, current wallet amount and the remaining wallet amount if the order is confirmed. One can also select a payment method (some of them adds a surcharge). If the wallet amount is insufficient or if there are no items in cart, the purchase button is deactivated. When the order is confirmed, wallet amount is updated.

In order to work with different types of information shared between pages and components, as well as to avoid *prop drilling*, three context files were created: 

1. User: provides "name" and "wallet amount" states;

2. Cart: has a custom hook to manage "cart" states and to provide functions to manipulate the cart (add/remove items, show number of items in cart, calculate total purchase amount and perform checkout). This way it's possible to isolate the responsibility of cart management within the context, thus "store" and "cart" pages are only responsible for the rendering part;

3. Payment: similar to cart context, this file has a custom hook that is responsible to manage the "payment" state, providing a list of payment methods, the payment method selected and a function to change payment method.

## Installation

This project was bootstrapped with Create React App, using React version 17.0.2, React Router version 5.2.0 and Material UI version 4.12.1. You need Node.js and npm installed in order to run it.

After cloning or downloading this project, open a terminal, navigate to the project's folder and run the following command in order to install all necessary dependencies:

    npm install

After that, you can run the app in the development mode with the following command:

    npm start

The app will run at http://localhost:3000.