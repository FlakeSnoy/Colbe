import { requireAuth } from '$lib/server/auth-guard.js';
import type { LayoutServerLoad } from './$types.js';

export const load: LayoutServerLoad = async (event) => {
	const user = requireAuth(event);
	return { user };
};