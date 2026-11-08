export const stryker = {
	testRunner: 'vitest',
	tsconfigFile: 'tsconfig.stryker-absent.json',
	ignoreStatic: true,
	mutate: ['src/**/*.{ts,tsx}'],
	incremental: true,
	thresholds: {
		high: 80,
		low: 60,
		break: 100,
	},
	plugins: ['@stryker-mutator/vitest-runner'],
	reporters: ['html', 'clear-text', 'progress'],
};
