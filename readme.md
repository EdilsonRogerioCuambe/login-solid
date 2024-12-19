# Login-Solid

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/EdilsonRogerioCuambe/login-solid.git
   cd login-solid
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

## Configuração

1. **Crie um arquivo `.env`:**

   Na raiz do projeto, crie um arquivo chamado `.env` e adicione as seguintes variáveis de ambiente:

   ```env
   DATABASE_URL=db_url
   PORT=4000
   NODE_ENV=development
   JWT_SECRET=seu_segredo_jwt
   ```

   > **Nota:** Substitua `JWT_SECRET` por uma chave secreta forte e segura.

## Banco de Dados

O projeto utiliza **Prisma** como ORM para interagir com o banco de dados PostgreSQL.

1. **Gerar o client do Prisma:**

   ```bash
   npx prisma generate
   ```

2. **Executar as migrações do banco de dados:**

   ```bash
   npx prisma migrate dev --name inicial
   ```

   Isso criará as tabelas necessárias no seu banco de dados conforme definido no schema do Prisma.

## Executando a Aplicação

### Desenvolvimento

Para iniciar o servidor em modo de desenvolvimento com recarregamento automático:

```bash
npm run dev
```

- **Descrição:** Utiliza o `tsx` para assistir e transpilar arquivos TypeScript em tempo real.
- **Porta:** A aplicação será executada na porta definida na variável `PORT` do arquivo `.env` (por padrão, `4000`).

## Scripts Disponíveis

No arquivo `package.json`, você encontrará os seguintes scripts úteis:

- **`dev`**: Inicia o servidor em modo de desenvolvimento com recarregamento automático.
  
  ```bash
  npm run dev
  ```
