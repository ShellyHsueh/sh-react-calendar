import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import path from 'path';

const PACKAGE_NAME = 'sh-react-calendar';

export default defineConfig({
  plugins: [
    react(),

    /* to import css to the bundle */
    libInjectCss(),

    /* to ship type definitions with the library */
    dts({
      insertTypesEntry: true,
      include: ['lib'],
      beforeWriteFile: (filePath, content) => ({
        filePath: filePath.replace('index.d.ts', `${PACKAGE_NAME}.d.ts`),
        content,
      }),
    }),
  ],
  build: {
    lib: {
      name: PACKAGE_NAME,
      entry: path.resolve(__dirname, 'lib', 'index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
