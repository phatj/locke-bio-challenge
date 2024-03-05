import { randomUUID } from 'crypto';
import { Model, UnknownObject } from './db.types';

interface CreateModel {
  <T extends UnknownObject>(model: T): T & Model;
}

export const createModel: CreateModel = (model) => {
  const now = new Date();

  return {
    id: randomUUID(),
    createdAt: now,
    updatedAt: now,
    ...model,
  };
};
