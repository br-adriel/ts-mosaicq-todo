import { z } from 'zod';
import { Status } from '@prisma/client';

export const getOneTarefaParams = z.object({
  id: z.string(),
});

export const createTarefaSchema = z.object({
  titulo: z
    .string({
      required_error: 'Forneça um título para a tarefa',
      invalid_type_error: 'Forneça uma string para o título',
    })
    .trim()
    .min(1, { message: 'Deve ter no mínimo um caractere de comprimento' }),
  descricao: z
    .string({ invalid_type_error: 'Forneça uma string para a descrição' })
    .optional(),
  status: z
    .nativeEnum(Status, { invalid_type_error: 'Status inválido' })
    .optional(),
});

export const updateTarefaSchema = createTarefaSchema.partial();

export const updateTarefaParams = getOneTarefaParams;

export const deleteTarefaParams = getOneTarefaParams;
