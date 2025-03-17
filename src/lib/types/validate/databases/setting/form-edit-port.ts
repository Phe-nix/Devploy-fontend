import { z } from 'zod';

export const formSchemaPort = z.object({
	port: z.number().int().positive()
});

export type FormSchemaPort = typeof formSchemaPort;
