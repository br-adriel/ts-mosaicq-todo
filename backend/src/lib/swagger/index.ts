const swaggerAutogen = require('swagger-autogen')({
  openapi: '3.0.0',
  language: 'pt-BR',
});

const doc = {
  info: {
    title: 'MosaicQ Tasks API',
    description:
      'API de lista de tarefas construída como desafio para um processo seletivo de estágio.',
  },
  host: 'localhost:3000',
  components: {
    schemas: {
      tarefa: {
        id: 0,
        titulo: 'titulo',
        descricao: 'descricao',
        status: {
          '@enum': ['PENDENTE', 'EM_PROGRESSO', 'CONCLUIDA'],
        },
        dataCriacao: '2024-05-29T22:39:44.914Z',
      },
      tarefaAll: {
        $tarefas: [
          {
            id: 0,
            titulo: 'titulo',
            descricao: 'descricao',
            status: {
              '@enum': ['PENDENTE', 'EM_PROGRESSO', 'CONCLUIDA'],
            },
            dataCriacao: '2024-05-29T22:39:44.914Z',
          },
        ],
      },
      tarefaCreateBody: {
        $titulo: 'titulo',
        descricao: 'descricao',
        $status: {
          '@enum': ['PENDENTE', 'EM_PROGRESSO', 'CONCLUIDA'],
        },
      },
      tarefaUpdateBody: {
        titulo: 'titulo',
        descricao: 'descricao',
        status: {
          '@enum': ['PENDENTE', 'EM_PROGRESSO', 'CONCLUIDA'],
        },
      },
      error400: {
        $error: 'Dados inválidos',
        $details: {
          'nome do campo': 'o que há de errado com o valor',
        },
      },
      loginBody: {
        $nomeUsuario: 'string',
        $senha: 'string',
      },
      loginResponse: {
        $accessToken: 'string',
      },
      registerBody: {
        $nomeUsuario: 'string',
        $senha: 'string',
        $confirmacaoSenha: 'string',
      },
      registerResponse: {
        $usuario: {
          $id: 'string',
          $nomeUsuario: 'string',
        },
        $accessToken: 'string',
      },
    },
  },
  securityDefinitions: {
    JWT: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description:
        "Token JWT, conseguido na rota de login ou cadastro, a ser passado como 'Authorization: Bearer <token>'",
    },
  },
};

const outputFile = './output.json';
const routes = ['./src/app.ts'];

swaggerAutogen(outputFile, routes, doc);
