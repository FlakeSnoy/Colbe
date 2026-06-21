import { auth } from '$lib/auth.js';
import { db } from '$lib/server/db/index.js';
import { profile } from '$lib/server/db/schema.js';
import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types.js';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) redirect(302, '/home');
	return {};
};

export const actions: Actions = {
	default: async (event) => {
		const data       = await event.request.formData();
		const email      = data.get('email')?.toString();
		const phone      = data.get('phone')?.toString();
		const username   = data.get('username')?.toString();
		const password   = data.get('password')?.toString() ?? '';

		if (!password || password.length < 8) {
			return fail(400, { error: 'Password must be at least 8 characters.' });
		}

		const isEmail    = !!email;
		const isPhone    = !!phone;
		const isUsername = !!username;

		if (!isEmail && !isPhone && !isUsername) {
			return fail(400, { error: 'Please provide an email, phone, or username.' });
		}

		// Better Auth requires an email — synthesise one for phone/username signups
		const authEmail = isEmail
			? email!
			: isPhone
				? `${phone}@colbe.local`
				: `${username}@colbe.local`;

		const name = username ?? (isEmail ? email!.split('@')[0] : phone!);

		const result = await auth.api.signUpEmail({
			body: { email: authEmail, password, name, username },
			asResponse: true,
		});

		if (!result.ok) {
			const body = await result.json().catch(() => ({}));
			return fail(400, { error: body?.message ?? 'Registration failed. Please try again.' });
		}

		const responseData = await result.clone().json().catch(() => null);
		const userId = responseData?.user?.id;

		if (userId) {
			await db.insert(profile).values({
				userId,
				username:    username ?? null,
				phone:       phone ?? null,
				displayName: name,
				lunes:       0,
				isVerified:  false,
			}).onConflictDoNothing();
		}

		// Forward session cookies to the browser
		const setCookies = result.headers.getSetCookie?.() ?? [];
		const responseHeaders = new Headers();
		for (const cookie of setCookies) {
			responseHeaders.append('set-cookie', cookie);
		}

		redirect(302, '/home');
	},
};