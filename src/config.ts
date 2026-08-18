import 'dotenv/config';

function required(name: string) : string{
    const value = process.env[name];
    if(!value){
        throw new Error('Missing required env var: ${name}');
    }
    return value; //to submit the required fields
}

export const config = {
    databaseUrl : required('DATABASE_URL'),
    redisUrl: required('REDIS_URL'),
    port: Number(process.env.PORT ?? 3000)
}