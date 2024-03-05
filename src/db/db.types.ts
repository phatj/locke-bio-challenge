export type Id = string;

export interface Model {
  id: Id;
  createdAt: Date;
  updatedAt: Date;
}

export type UnknownObject = Record<string, unknown>;

export type DataStoreMap<T extends UnknownObject> = Map<Id, T & Model>;

export interface DataStore {}
