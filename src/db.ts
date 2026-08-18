import {Pool} from 'pg';
import {config} from './config';

export const pool = new Pool({
    connecttionString: config.databaseUrl,
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
});

pool.on('error', (err) => {
    console.error('Unexpected idle client error', ex);
});