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

		const result = await auth.api.signUpEmail({
			body: {
				email: identifier,
				password,
				name: username ?? identifier.split('@')[0],
			},
			asResponse: true,
		});

		if (!result.ok) {
			const body = await result.json().catch(() => ({}));
			return fail(400, { error: body?.message ?? 'Registration failed. Please try again.' });
		}

		redirect(302, '/home');
	},
};