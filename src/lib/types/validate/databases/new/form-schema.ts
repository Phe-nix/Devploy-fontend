import { z } from 'zod';

export const formSchema = z.object({
	name: z.string().min(3, { message: 'Name must be at least 3 characters long' }),
	databaseName: z.string().min(3, { message: 'Database name must be at least 3 characters long' }),
	username: z.string().min(4, { message: 'Database username must be at least 4 characters long' }),
	password: z.string().min(4, { message: 'Database password must be at least 4 characters long' })
});

export type FormSchema = typeof formSchema;
