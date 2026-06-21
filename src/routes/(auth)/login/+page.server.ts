import { auth } from '$lib/auth.js';
import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types.js';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) redirect(302, '/home');
	return {};
};

export const actions: Actions = {
	default: async (event) => {
		const data     = await event.request.formData();
		const email    = data.get('email')?.toString();
		const phone    = data.get('phone')?.toString();
		const username = data.get('username')?.toString();
		const password = data.get('password')?.toString() ?? '';

		const identifier = email ?? phone ?? username ?? '';

		const result = await auth.api.signInEmail({
			body: { email: identifier, password },
			asResponse: true,
		});

		if (!result.ok) {
			return fail(400, { error: 'Invalid credentials. Please try again.' });
		}

		redirect(302, '/home');
	},
};