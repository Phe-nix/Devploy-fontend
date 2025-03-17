import { z } from 'zod';

export const confirmDeleteForm = z
	.object({
		name: z.string().regex(/^devploy\/(.+)$/, { message: "name is required" }), // ต้องมีชื่อโปรเจคต่อท้าย
		confirm: z.string()
	})
	.refine(
		(data) => {
			const projectNameMatch = data.name.match(/^devploy\/(.+)$/);
			if (!projectNameMatch) return false; // กันกรณีผิดพลาด

			const projectName = projectNameMatch[1]; // ดึง "ชื่อโปรเจค"
			return data.confirm === `delete ${projectName}`; // เช็คว่า confirm ตรงกับ "delete ชื่อโปรเจค"
		},
		{
			message: "The confirm text is required",
			path: ['confirm']
		}
	);

export type ConfirmDeleteForm = typeof confirmDeleteForm;
