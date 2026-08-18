import {buildServer} from  './server';
import {config} from './config';
import {pool} from './db';
import {redis} from './redis';

const app = buildServer();

async function main(){
    await app.listen({port: config.PORT, host: '0.0.0.0'});
}

async function shutdown(signal : string){
    app.log.info({signal}, 'shutting down');
    await app.close();
    await pool.end();
    redis.disconnect();
    process.exit(0);
}

process.on('SIGTERM', () => void shutdown('SIGTERM'));
process.on('SIGINT', () => void shutdown('SIGINT'));

main().catch((err) => {
    app.log.error(err);
    process.exit(1);
});