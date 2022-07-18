const path = require('path')
const esbuild = require('esbuild')
const fs = require('fs')
const filePath = process.argv[2]

require.extensions['.ts'] = function (module, filename) {
  console.log('directly require .ts')
  const filePath = path.resolve(__dirname, filename)
  const content = fs.readFileSync(filePath, 'utf-8')

  const { code } = esbuild.transformSync(content, {
    loader: 'ts',
    target: 'es2017',
    format: 'cjs',
  })

  module._compile(code, filename)
}

require(filePath)
