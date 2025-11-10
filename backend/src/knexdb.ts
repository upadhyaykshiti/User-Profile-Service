import knex from 'knex';
// import knexConfig from '../knexfile';
const knexConfig = require("../knexfile.cjs");


export const db = knex(knexConfig.development);
export default db;

