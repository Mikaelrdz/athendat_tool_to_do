import { DBConfig } from 'ngx-indexed-db';

const Schema = [
    { name: 'name', keypath: 'name', options: { unique: false } },
    { name: 'price', keypath: 'price', options: { unique: false } },
    { name: 'image', keypath: 'image', options: { unique: false } },
    { name: 'description', keypath: 'description', options: { unique: false } },
    { name: 'status', keypath: 'status', options: { unique: false } }
  ];

export const dbConfig: DBConfig = {
  name: 'MyLocalDatabase',
  version: 1,
  objectStoresMeta: [
    {
      store: 'productos',
      storeConfig: { keyPath: 'id', autoIncrement: false },
      storeSchema: Schema
    },
  ]
};