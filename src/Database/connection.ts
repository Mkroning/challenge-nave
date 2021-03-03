import knex from 'knex'
import knexfile from './../../knexFile'

export const connection = knex(knexfile.development)

