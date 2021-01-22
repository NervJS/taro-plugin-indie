import { ConcatSource } from 'webpack-sources'
import { promoteRelativePath, META_TYPE,  } from '@tarojs/helper'

const path = require('path')

const DEFAULT_COMMON_CHUNKS = [
  'runtime',
  'common',
  'vendors',
  'taro'
]

export default (ctx, { commonChunks }) => {
  commonChunks = Array.isArray(commonChunks) ? commonChunks : DEFAULT_COMMON_CHUNKS
  commonChunks = commonChunks.map(name => ({ name }))

  ctx.onCompilerMake(({ compilation }) => {
    if (!ctx.runOpts.blended) return

    compilation.chunkTemplate.hooks.renderWithEntry.tap('taro-plugin-single', (modules, chunk) => {
      if (!chunk.entryModule) return

      const entryModule = chunk.entryModule.rootModule ? chunk.entryModule.rootModule : chunk.entryModule
      const { miniType } = entryModule
      const id = getIdOrName(chunk)
      const entryChunk = [{ name: 'app' }]

      if (miniType === META_TYPE.PAGE) {
        return addRequireToSource(id, modules, entryChunk)
      }

      if (miniType === META_TYPE.STATIC) {
        return addRequireToSource(id, modules, commonChunks)
      }
    })
  })
}

function getIdOrName (chunk) {
  if (typeof chunk.id === 'string') {
    return chunk.id
  }
  return chunk.name
}

function addRequireToSource (id, modules, commonChunks) {
  const source = new ConcatSource()
  commonChunks.forEach(chunkItem => {
    source.add(`require(${JSON.stringify(promoteRelativePath(path.relative(id, chunkItem.name)))});\n`)
  })
  source.add('\n')
  source.add(modules)
  source.add(';')
  return source
}
