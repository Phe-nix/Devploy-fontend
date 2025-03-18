import { z } from 'zod';

export const formSchemalimit = z.object({
	baseUrl: z.string().min(2).max(25),
    reservePort: z.number().int(),
    reservePortEnd: z.number().int(),
    defaultApplicationQuota: z.number().int(),
    defaultDatabaseQuota: z.number().int()
});

export type FormSchemaLimit = typeof formSchemalimit;
