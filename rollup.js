const fs = require('fs');
const del = require('del');
const { rollup } = require('rollup');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');
const { minify } = require('uglify-es');

const pkg = require('./package.json');

let promise = Promise.resolve();

// Clean up the output directory
promise = promise.then(() => del(['dist/*']));

promise = promise.then(() =>
  rollup({
    entry: 'index.js',
    external: Object.keys(pkg.peerDependencies),
    plugins: [
      babel(
        Object.assign(pkg.babel, {
          babelrc: false,
          exclude: 'node_modules/**',
          runtimeHelpers: true,
          presets: pkg.babel.presets.map(
            x =>
              x === 'latest' ? ['latest', { es2015: { modules: false } }] : x
          )
        })
      ),
      uglify({}, minify)
    ]
  })
    .then(bundle =>
      bundle.write({
        format: 'cjs',
        dest: 'dist/index.js',
        moduleName: undefined
      })
    )
    .then(() => {
      delete pkg.private;
      delete pkg.devDependencies;
      delete pkg.scripts;
      delete pkg.jest;
      delete pkg.babel;
      fs.writeFileSync(
        'dist/package.json',
        JSON.stringify(pkg, null, '  '),
        'utf-8'
      );
      fs.writeFileSync(
        'dist/LICENSE',
        fs.readFileSync('LICENSE', 'utf-8'),
        'utf-8'
      );
    })
);

promise.catch(err => console.error(err.stack));
