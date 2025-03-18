import type { ColumnDef } from '@tanstack/table-core';
import TableActionAllusers from './table-action-allusers.svelte';
import { renderComponent } from '$lib/components/ui/data-table';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Users = {
	id: string;
	studenId: string;
	email: string;
	fullName: string;
	role: 'OWNER' | 'ADMIN' | 'MEMBER';
	applicationQuota: number;
	databaseQuota: number;
};

export const columns: ColumnDef<Users>[] = [
	{
		accessorKey: 'id',
		header: 'Id'
	},
	{
		accessorKey: 'studentId',
		header: 'StudenId'
	},
	{
		accessorKey: 'email',
		header: 'Email'
	},
	{
		accessorKey: 'firstName',
		header: 'First Name'
	},
	{
		accessorKey: 'lastName',
		header: 'Last Name'
	},
	{
		accessorKey: 'role',
		header: 'Role'
	},
	{
		accessorKey: 'applicationQuota',
		header: 'App_Quota'
	},
	{
		accessorKey: 'databaseQuota',
		header: 'Db_Quota'
	},
	{
		accessorKey: '',
		header: 'Actions',
		id: 'actions',
		cell: ({ row }) => {
			return renderComponent(TableActionAllusers, {
				id: row.original.id,
				role: row.original.role,
				appQuota: row.original.applicationQuota,
				dbQuota: row.original.databaseQuota,
				data: row.original
			});
		}
	}
];
