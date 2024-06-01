# Diagramas de sequência

Esse documento esboça o fluxo de dados entre as diferentes entidades da
aplicação.

## Autenticação

### Login

```mermaid
sequenceDiagram
  actor U as Usuário
  participant FR as Frontend
  participant API as API
  participant DB as Banco de Dados

  U->>FR: Preenche formulaŕio de login
  activate U
  activate FR
  U->>FR: Envia formulário de login
  FR->>API: POST /auth/login
  activate API
  API->>DB: Busca usuário com o nome de usuário correspondente
  activate DB
  DB->>API: Retorna o usuário ou undefined
  deactivate DB
  alt usuário existe e senha correta
    API->>FR: Retona tokens de acesso
    FR->>U: Redireciona para a página inicial
  else usuário não existe ou senha incorreta
    API->>FR: Retorna erro 401 com mensagem
    deactivate API
    FR->>U: Exibe mensagem de erro
  end
  deactivate FR
  deactivate U
```

### Cadastro

```mermaid
sequenceDiagram
  actor U as Usuário
  participant FR as Frontend
  participant API as API
  participant DB as Banco de Dados

  U->>FR: Preenche formulário de registro
  activate U
  activate FR
  U->>FR: Envia formulário de registro
  FR->>API: POST /auth/register
  activate API
  API->>DB: Busca usuário com o nome de usuário passado
  activate DB
  DB->>API: Retorna o usuário ou undefined
  deactivate DB
  alt nome de usuário disponível
    API->>DB: Cria um novo usuário com os dados fornecidos
    activate DB
    DB->>API: Retorna o usuário criado
    deactivate DB
    API->>FR: Retorna tokens de acesso e o usuário criado
    FR->>U: Redireciona para a página inicial
  else nome de usuário em uso
    API->>FR: Retorna erro 400 com mensagem
    deactivate API
    FR->>U: Exibe mensagem de erro
  end
  deactivate FR
  deactivate U
```

### Atualização de tokens

```mermaid
sequenceDiagram
  actor U as Usuário
  participant FR as Frontend
  participant API as API
  participant DB as Banco de Dados

  U->>FR: Ação realizada pelo usuário retorna erro 401 da API
  activate U
  activate FR
  FR->>API: POST /refresh
  activate API
  API->>DB: Remove token de atualização do banco de dados
  activate DB
  DB->>API: Retorna o usuário associado ao token de atualização
  deactivate DB
  alt token de atualização válido
    API->>FR: Retorna novos tokens de acesso
    FR->>FR: Atualiza tokens de acesso
    FR->>U: Refaz solicitação original do usuário e atualiza a interface
  else token de atualização inválido
    API->>FR: Retorna erro 401
    deactivate API
    FR->>U: Redireciona para página de login
  end
  deactivate FR
  deactivate U
```

## Tarefas

### Busca de Todas as Tarefas

```mermaid
sequenceDiagram
  actor U as Usuário
  participant FR as Frontend
  participant API as API
  participant DB as Banco de Dados

  U->>FR: Acessa página inicial
  activate U
  activate FR
  FR->>API: GET /tarefas
  activate API
  API->>DB: Solicita todas as tarefas do usuário logado
  activate DB
  DB->>API: Retorna todas as tarefas
  deactivate DB
  API->>FR: Retorna a lista de todas as tarefas
  deactivate API
  FR->>U: Exibe todas as tarefas na interface
  deactivate FR
  deactivate U
```

### Busca de uma Tarefa Específica

```mermaid
sequenceDiagram
  actor U as Usuário
  participant FR as Frontend
  participant API as API
  participant DB as Banco de Dados

  U->>FR: Acessa a página de uma tarefa específica
  activate U
  activate FR
  FR->>API: GET /tarefas/:id
  activate API
  API->>DB: Consulta a tarefa com o ID especificado
  activate DB
  DB->>API: Retorna a tarefa ou undefined
  deactivate DB
  alt tarefa encontrada
    alt tarefa pertence ao usuário da solicitação
      API->>FR: Retorna a tarefa solicitada
      FR->>U: Exibe os detalhes da tarefa na interface
    else tarefa não pertence ao usuário da solicitação
      API->>FR: Retorna erro 403
      FR->>U: Exibe mensagem de erro
    end
  else tarefa não encontrada
    API->>FR: Retorna erro 404
    deactivate API
    FR->>U: Exibe mensagem de tarefa não encontrada
  end
  deactivate FR
  deactivate U
```

### Criação de uma Nova Tarefa

```mermaid
sequenceDiagram
  actor U as Usuário
  participant FR as Frontend
  participant API as API
  participant DB as Banco de Dados

  U->>FR: Preenche formulário para criar uma nova tarefa
  activate U
  activate FR
  U->>FR: Envia formulário para criar uma nova tarefa
  FR->>API: POST /tarefas
  activate API
  API->>DB: Cria uma nova tarefa com os dados fornecidos
  activate DB
  DB->>API: Retorna a nova tarefa criada
  deactivate DB
  API->>FR: Retorna a nova tarefa criada
  deactivate API
  FR->>U: Atualiza a interface para exibir a nova tarefa
  deactivate FR
  deactivate U
```

### Atualização de uma Tarefa

```mermaid
sequenceDiagram
  actor U as Usuário
  participant FR as Frontend
  participant API as API
  participant DB as Banco de Dados

  U->>FR: Preenche formulário para atualizar uma tarefa
  activate U
  activate FR
  U->>FR: Envia formulário para atualizar uma tarefa
  FR->>API: PATCH /tarefas/:id
  activate API
  API->>DB: Consulta a tarefa com o ID especificado
  activate DB
  DB->>API: Retorna a tarefa ou undefined
  deactivate DB
  alt tarefa encontrada
    alt tarefa pertence ao usuário da solicitação
      API->>DB: Atualiza os dados da tarefa com os dados fornecidos
      activate DB
      DB->>API: Retorna a tarefa atualizada
      deactivate DB
      API->>FR: Retorna a tarefa atualizada
      FR->>U: Atualiza a interface para exibir a tarefa atualizada
    else tarefa não pertence ao usuário da solicitação
      API->>FR: Retorna erro 403
      FR->>U: Exibe mensagem de erro
    end
  else tarefa não encontrada
    API->>FR: Retorna erro 404
    deactivate API
    FR->>U: Exibe mensagem de tarefa não encontrada
  end
  deactivate FR
  deactivate U
```

### Exclusão de uma Tarefa

```mermaid
sequenceDiagram
  actor U as Usuário
  participant FR as Frontend
  participant API as API
  participant DB as Banco de Dados

  U->>FR: Solicita a exclusão de uma tarefa
  activate U
  activate FR
  FR->>API: DELETE /tarefas/:id
  activate API
  API->>DB: Consulta a tarefa com o ID especificado
  activate DB
  DB->>API: Retorna a tarefa ou undefined
  deactivate DB
  alt tarefa encontrada
    alt tarefa pertence ao usuário da solicitação
      API->>DB: Remove a tarefa com o ID especificado do banco de dados
      activate DB
      DB->>API: Confirma a exclusão da tarefa
      deactivate DB
      API->>FR: Retorna confirmação de exclusão
      FR->>U: Redireciona para a página inicial
    else tarefa não pertence ao usuário da solicitação
      API->>FR: Retorna erro 403
      FR->>U: Exibe mensagem de erro
    end
  else tarefa não encontrada
    API->>FR: Retorna erro 404
    deactivate API
    FR->>U: Exibe mensagem de tarefa não encontrada
  end
  deactivate FR
  deactivate U
```
