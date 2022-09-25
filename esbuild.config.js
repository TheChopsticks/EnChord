import esbuildServe from 'esbuild-serve';

esbuildServe(
  {
    logLevel: 'info',
    entryPoints: ['src/index.js', 'src/styles/main.css'],
    bundle: true,
    outdir: 'dist',
  },
  {
    port: 8080,
    root: 'dist',
  }
);
