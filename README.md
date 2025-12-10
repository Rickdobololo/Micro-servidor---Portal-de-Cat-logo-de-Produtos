# Micro-servidor-Portal-de-Catalogo-de-Produtos

▶ Como instalar
1.Certifique-se de ter Node.js 18+ instalado.
2.Clone ou baixe este repositório: git clone (https://github.com/Rickdobololo/Micro-servidor---Portal-de-Cat-logo-de-Produtos)
Acesse a pasta do projeto: cd Projeto-Lojas-Cem
Instale as dependências:
3.npm init -y e npm install express node-fetch

▶ Como rodar
Execute o servidor com: node ./src/server.js
Você verá no terminal: Servidor rodando na porta 29095
A API estará acessível em: http://localhost:29095/products

▶ Exemplos de requisição
GET /products
URL: http://localhost:29995/products

Resposta esperada (exemplo):

  {
    "id": 1,
    "name": "Produto da API/LOCAL",
    "price": 10.99,
    "source": "api | local"
  }

Obs: Organizado por ID

▶ Observações de Arquitetura

O projeto segue uma arquitetura simples, separando cada responsabilidade em uma função:

loadApiProducts()
Carrega produtos da API externa e normaliza o formato

loadLocalProducts()
Lê o arquivo local-products.json e padroniza os objetos

getProducts()
Combina as fontes, aplica ordenação e validações

Uso de async/await para lidar com operações assíncronas (API e leitura de arquivo)

Tratamento de erros em cada fonte para evitar que uma falha derrube todo o serviço

Uso de express.json() para garantir que a API retorne JSON corretamente

▶ Decisões Relevantes

Fallback inteligente:
Caso a API externa falhe, o sistema tenta usar apenas os dados locais
Caso o arquivo local falhe, usa apenas os dados da API

Normalização de dados:
Os campos retornados são padronizados: id, name, price, source
A lista final é sempre ordenada pelo campo id, deixando mais organizado e facilitando a leitura

Uso de node-fetch
Empregado para chamada HTTP, garantindo compatibilidade

Porta fixa (29995)
Facilita testes e integração sem variáveis extras.
