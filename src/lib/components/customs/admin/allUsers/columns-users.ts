import type { ColumnDef } from '@tanstack/table-core';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Users = {
    id: string;
    studenId: string;
    email: string;
    fullName: string;
    role: "OWNER" | "ADMIN" | "MEMBER";
    applications: number;
    workspaces: number;
}

export const columns: ColumnDef<Users>[] = [
	{
		accessorKey: 'id',
		header: 'Id'
	},
	{
		accessorKey: 'studenId',
		header: 'StudenId'
	},
	{
		accessorKey: 'email',
		header: 'Email'
	},
    {
		accessorKey: 'fullName',
		header: 'FullName'
	},
    {
		accessorKey: 'role',
		header: 'Role'
	},
    {
		accessorKey: 'applications',
		header: 'Applications'
	},
    {
		accessorKey: 'workspaces',
		header: 'Workspaces'
	},
];
