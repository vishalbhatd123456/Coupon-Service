import Fastify from 'fastify';
import {pool} from './db';
import {redis} from './redis';


export function buildServer(){
    const app = Fastify({logger: true});

    //liveliness: is the process alive? no dependency checks
    app.get('/livez', async() => ({
        status: 'ok'
    }));

    //Readiness: can we actually serve the traffic?
    app.get('/readyz', async(_req, reply) => {
        const checks: Record<string, string> = {};
        let healthy = true;

        try{
            await pool.query('select 1');
            checks.postgress = 'ok';
        }
        catch(err)
        {
            checks.postgress = (err as Error).message;
            healthy = false;
        }

        try{
            await redis.ping();
            checks.redis = 'ok';
        }
        catch(err){
            checks.redis = (err as Error).message;
            healthy = false;
        }
        return reply.code(healthy ? 200 : 503).send({status: healthy ? 'ok' : 'degraded', checks});
    });
    return app;
}