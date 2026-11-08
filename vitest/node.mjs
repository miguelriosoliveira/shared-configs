export const coverage = {
	provider: 'v8',
	reporter: ['text', 'lcov'],
	include: ['src/**/*.ts'],
	thresholds: {
		branches: 100,
		functions: 100,
		lines: 100,
		statements: 100,
	},
};
