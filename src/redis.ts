import Redis from 'ioredis';
import {config} from './config';

export const redis = new Redis(config.redisUrl, {
    maxRetriesPerRequest: 3,
    lazyConnect: false
});

redis.on('error', (err) => {
    console.error('redis error', err.message);
});