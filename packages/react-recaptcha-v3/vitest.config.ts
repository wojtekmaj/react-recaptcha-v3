import { defineConfig } from 'vitest/config';

import type { ViteUserConfig } from 'vitest/config';

const config: ViteUserConfig = defineConfig({
  test: {
    environment: 'happy-dom',
    setupFiles: 'vitest.setup.ts',
    watch: false,
  },
});

export default config;
