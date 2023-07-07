// @ts-nocheck
global.id++;

import { Sequelize } from "sequelize";

const username = 'postgres';
const password = 'postgres';
const host = 'localhost';
const port = 5432;
const database = 'force-elementaire';

const sequelizeConnection = new Sequelize(database, username, password, {
  dialect: 'postgres',
  host,
  sync: {
    force: true,
    alter: true,
  },
});

console.log('==== SQ ====');
console.log('==== global.id:', global.id);

sequelizeConnection['id'] = global.id;

export default sequelizeConnection;
