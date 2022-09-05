import esbuildServe from 'esbuild-serve';

esbuildServe(
  {
    logLevel: 'info',
    entryPoints: ['src/index.js'],
    bundle: true,
    outfile: 'dist/index.js',
  },
  {
    port: 8080,
    root: 'dist',
  }
);
