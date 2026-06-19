import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema.js';
import { env } from '$env/dynamic/private';

export const db = env.DATABASE_URL && env.DATABASE_AUTH_TOKEN
	? drizzle(createClient({ url: env.DATABASE_URL, authToken: env.DATABASE_AUTH_TOKEN }), { schema })
	: undefined;
