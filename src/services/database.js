import { Pool } from 'pg'
import log from 'winston'

const pool = new Pool({
  host: 'localhost',
  user: 'demo',
  password: 'demo',
  database: 'demo',
})

pool.on('error', (err) => {
  log.error(err) // rare idle client error
})

export const query = (...args) => pool.query(...args)

