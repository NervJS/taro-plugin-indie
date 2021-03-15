import { ConcatSource } from 'webpack-sources'
import { promoteRelativePath, META_TYPE,  } from '@tarojs/helper'

const path = require('path')


export default ctx => {
  ctx.onCompilerMake(({ compilation }) => {
    if (!ctx.runOpts.options.blended) return

    compilation.chunkTemplate.hooks.renderWithEntry.tap('taro-plugin-single', (modules, chunk) => {
      if (!chunk.entryModule) return

      const entryModule = chunk.entryModule.rootModule ? chunk.entryModule.rootModule : chunk.entryModule
      const { miniType } = entryModule
      const id = getIdOrName(chunk)
      const entryChunk = [{ name: 'app' }]

      // 所有模块都依赖app.js，确保@tarojs\plugin-platform-xxx\dist\runtime.js先于@tarojs/runtime执行，避免Taro API未被初始化
      if (miniType === META_TYPE.PAGE || miniType === META_TYPE.STATIC) {
        return addRequireToSource(id, modules, entryChunk)
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
