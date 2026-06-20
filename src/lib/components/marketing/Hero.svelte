<script lang="ts">
	import { onMount } from 'svelte';

	const words = ['friends.', 'family.', 'teams.', 'everyone.'];
	let current = $state(0);
	let visible = $state(true);

	onMount(() => {
		const interval = setInterval(() => {
			visible = false;
			setTimeout(() => {
				current = (current + 1) % words.length;
				visible = true;
			}, 300);
		}, 2200);
		return () => clearInterval(interval);
	});
</script>

<section class="bg-neutral-950 pt-20 pb-32 px-6">
	<div class="mx-auto max-w-5xl grid md:grid-cols-2 gap-16 items-center">

		<!-- Left -->
		<div>
			<div class="flex items-center gap-3 mb-10">
				<img src="/favicon.svg" alt="Colbe" class="h-8 w-8" />
				<span class="text-white font-medium text-lg tracking-tight">Colbe</span>
				<span class="text-neutral-800 text-lg select-none">|</span>
				<span class="text-neutral-600 text-sm">Chat. Call. Explore.</span>
			</div>

			<h1 class="text-5xl md:text-6xl font-semibold text-white tracking-[-0.03em] leading-[1.05] mb-6">
				Chat with<br/>
				<span
					class="text-blue-500 inline-block transition-all duration-300"
					style="opacity: {visible ? 1 : 0}; transform: translateY({visible ? '0' : '8px'})"
				>
					{words[current]}
				</span>
			</h1>

			<p class="text-base text-neutral-500 max-w-sm leading-relaxed mb-10">
				Colbe brings your conversations, calls, and communities into one simple place.
			</p>

			<div class="flex items-center gap-4">
				<a href="/register" class="text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 px-5 py-2.5 rounded-full transition-colors">
					Get started
				</a>
				<a href="/about" class="text-sm text-neutral-500 hover:text-white transition-colors">
					Learn more →
				</a>
			</div>
		</div>

		<!-- Right: SVG art -->
		<div class="hidden md:flex items-center justify-center opacity-60">
			<svg width="340" height="340" viewBox="0 0 340 340" fill="none" xmlns="http://www.w3.org/2000/svg">
				<!-- Outer ring -->
				<circle cx="170" cy="170" r="140" stroke="#1e293b" stroke-width="1"/>
				<circle cx="170" cy="170" r="100" stroke="#1e293b" stroke-width="1"/>
				<circle cx="170" cy="170" r="60" stroke="#1e293b" stroke-width="1"/>

				<!-- Chat bubble 1 — large -->
				<rect x="60" y="90" width="130" height="72" rx="16" fill="#171717" stroke="#262626" stroke-width="1.5"/>
				<circle cx="84" cy="126" r="14" fill="#1d4ed8" opacity="0.3"/>
				<circle cx="84" cy="126" r="6" fill="#3b82f6"/>
				<rect x="106" y="116" width="68" height="8" rx="4" fill="#262626"/>
				<rect x="106" y="130" width="48" height="6" rx="3" fill="#1e293b"/>
				<!-- tail -->
				<path d="M80 162 L70 178 L100 162Z" fill="#171717" stroke="#262626" stroke-width="1.5" stroke-linejoin="round"/>

				<!-- Chat bubble 2 — right aligned -->
				<rect x="150" y="190" width="120" height="64" rx="16" fill="#1d4ed8" opacity="0.15" stroke="#1d4ed8" stroke-width="1"/>
				<rect x="168" y="208" width="72" height="8" rx="4" fill="#1d4ed8" opacity="0.4"/>
				<rect x="168" y="222" width="52" height="6" rx="3" fill="#1d4ed8" opacity="0.25"/>
				<!-- tail right -->
				<path d="M262 230 L276 246 L248 254Z" fill="#1d4ed8" opacity="0.15" stroke="#1d4ed8" stroke-width="1" stroke-linejoin="round"/>

				<!-- Small status dots -->
				<circle cx="170" cy="50" r="4" fill="#3b82f6" opacity="0.6"/>
				<circle cx="290" cy="170" r="4" fill="#3b82f6" opacity="0.3"/>
				<circle cx="170" cy="290" r="4" fill="#3b82f6" opacity="0.2"/>
				<circle cx="50" cy="170" r="4" fill="#3b82f6" opacity="0.4"/>

				<!-- Connecting lines -->
				<line x1="170" y1="54" x2="170" y2="90" stroke="#1e293b" stroke-width="1" stroke-dasharray="4 4"/>
				<line x1="286" y1="170" x2="252" y2="210" stroke="#1e293b" stroke-width="1" stroke-dasharray="4 4"/>

				<!-- Notification badge -->
				<circle cx="264" cy="108" r="18" fill="#171717" stroke="#262626" stroke-width="1.5"/>
				<text x="264" y="114" text-anchor="middle" fill="#3b82f6" font-size="13" font-family="Inter,sans-serif" font-weight="600">3</text>

				<!-- Wave / signal rings around center -->
				<circle cx="170" cy="170" r="20" stroke="#3b82f6" stroke-width="1" opacity="0.4"/>
				<circle cx="170" cy="170" r="8" fill="#3b82f6" opacity="0.7"/>
			</svg>
		</div>

	</div>
</section>