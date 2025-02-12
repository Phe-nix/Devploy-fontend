// import type { PageLoad } from './$types';

// export const load: PageLoad = async ({ parent, params, fetch }) => {
// 	const { accessToken } = await parent();
// 	const { workspaceSlug } = params;
// 	const workspaceInfo = await fetch(`http://127.0.0.1:3000/workspace/${workspaceSlug}`, {
// 		headers: {
// 			Authorization: `Bearer ${accessToken}`
// 		}
// 	});
// 	return {
//         info: workspaceInfo.ok ? await workspaceInfo.json() : null
//     };
// };
