import { redirect } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

export function requireAuth(event: RequestEvent) {
	const user = event.locals.user;
	if (!user) redirect(302, '/login');
	return user;
}