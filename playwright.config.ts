import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 3000,
	},
	expect: {
		timeout: 5000
	}
};

export default config;