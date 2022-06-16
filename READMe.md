# Jest e testes unitários

## O que é o Jest?

Jest é um poderoso Framework de Testes em JavaScript com um foco na simplicidade, inicialmente feito pelo time do Facebook para testar o react e acabou expandido para diversos tipos de aplicações.

## Por quê devo utilizar testes?

Os testes de software são uma atividade essencial para garantir a qualidade do sistema ou aplicação e não podem ser vistos como algo opcional. Testes de software é um conjunto de processos com os quais se pretende validar um sistema ou aplicação, em momentos diferentes, para verificar seu correto funcionamento.

## Objetivos dos testes

O teste de software é uma maneira de avaliar a qualidade da aplicação e reduzir o risco de falha em operação. Testar não consiste apenas em executar testes (executar o software e verificar os resultados). Executar testes é apenas umas das atividades. Planejamento, análise, modelagem e implementação dos testes, relatórios de progresso, resultado e avaliação da qualidade, também são partes de um processo de testes.

**_OBS:_ Show Me The Code**

## Tipos de testes

### Unitários

Teste de unidade é toda a aplicação de teste nas assinaturas de entrada e saída de um sistema. Consiste em validar dados válidos e inválidos via I/O sendo aplicado por desenvolvedores ou analistas de teste. Uma unidade é a menor parte testável de um programa de computador.

### Integração

Teste de integração é a fase do teste de software em que módulos são combinados e testados em grupo. Ela sucede o teste de unidade, em que os módulos são testados individualmente, e antecede o teste de sistema, em que o sistema completo é testado num ambiente que simula o ambiente de produção.

### End to End (e2e)

Um teste E2E, ou End-to-End, é um método de teste utilizado para testar um fluxo da aplicação desde o começo até o fim. Seu intuito é replicar cenários reais feitos pelos usuários com a intenção de validar que o sistema esteja funcionando como o esperado.

## O que são mocks?

Objetos mock, objetos simulados ou simplesmente mock (do inglês mock object) em desenvolvimento de software são objetos que simulam o comportamento de objetos reais de forma controlada. São normalmente criados para testar o comportamento de outros objetos.

Mocks também são conhecidos como stubs, spies, double dentre outros nomenclaturas.

- **Spies:** um spy é um objeto que grava as interações com outros objetos. Eles são utilizados quando temos que usar alguma função que chama outra função e sabem dizer quantas vezes uma função foi chamada, quais parâmetros recebeu etc.;

- **Stubs:** stubs estabelecem um retorno esperado para uma chamada do que se está simulando, com determinados parâmetros. Múltiplos cenários de chamadas diferentes com parâmetros diferentes podem ser simulados.

## O que são matchers?

O Jest usa "matchers" para que você possa testar valores de maneiras diferentes.

### Matchers Comuns

#### `toBe`

Compara valores primitivos ou para verificar a identidade referencial de instâncias de objetos

```js
expect(1).toBe(1); // Passa
expect(1).toBe(2); // Falha
expect('foo').toBe('foo'); // Passa
```

Com objetos, o `toBe` compara o valor de referência.

```js
const objetoA = {
  nome: 'João',
};

const objetoB = {
  nome: 'João',
};

const objetoC = {
  nome: 'João',
  age: 30,
};

expect(objetoA).toBe(objetoB); // Falha
expect(objetoA).toBe(objetoA); // Passa
expect(objetoA).toBe(objetoC); // Falha
```

#### `toEqual`

Compara recursivamente todas as propriedades de instâncias de objetos (também conhecidas como igualdade "profunda").

```js
const objetoA = {
  nome: 'João',
};

const objetoB = {
  nome: 'João',
};

const objetoC = {
  nome: 'João',
  age: 30,
};

expect(objetoA).toEqual(objetoB); // Passa
expect(objetoA).toEqual(objetoA); // Passa
expect(objetoA).toEqual(objetoC); // Falha
```

#### `toMatch`

Verifica se uma string corresponde a uma expressão regular.

```js
expect('João').toMatch(/João/); // Passa
expect('João').toMatch(/joão/); // Falha
```

#### `toHaveProperty`

Verifica se a propriedade fornecida na referência `keyPath` existe para um objeto. Para verificar propriedades profundamente aninhadas em um objeto, você pode usar a notação de ponto ou uma matriz contendo o keyPath para referências profundas.

```js
const objeto = {
  nome: 'João',
  idade: 30,
  endereco: {
    logradouro: 'Rua dos Bobos',
    numero: 123,
  },
};

expect(objeto).toHaveProperty('nome'); // Passa
expect(objeto).toHaveProperty('idade', 30); // Passa
expect(objeto).toHaveProperty('endereco.logradouro'); // Passa
expect(objeto).toHaveProperty('endereco.numero', 123); // Passa
expect(objeto).toHaveProperty('endereco.cep'); // Falha
```

#### `toBeNull`

Verifica se o valor é nulo.

```js
expect(null).toBeNull(); // Passa
expect(undefined).toBeNull(); // Falha
```

#### `greaterThan` e `lessThan`

Usado para verificar se um número é maior ou menor que outro.

```js
expect(1).toBeGreaterThan(0); // Passa
expect(1).toBeGreaterThan(1); // Falha
expect(1).toBeLessThan(2); // Passa
expect(1).toBeLessThan(0); // Falha
```

#### `toContain`

Usado para verificar se um array contém um valor ou uma string tem uma substring.

```js
const array = [1, 2, 3];

expect(array).toContain(1); // Passa
expect(array).toContain(4); // Falha
expect('foo').toContain('o'); // Passa
expect('foo').toContain('b'); // Falha
```

#### `not`

`not` é usado para inverter o resultado de um matcher.

```js
expect(1).not.toBe(2); // Passa
expect(1).not.toBe(1); // Falha
expect('foo').not.toContain('b'); // Passa
expect('foo').not.toContain('o'); // Falha
```
