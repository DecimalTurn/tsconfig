// This module handles loading strip-json-comments using import-sync for synchronous dynamic import
const importSync = require('import-sync')

let stripJsonCommentsCache: any = null

export function getStripJsonComments () {
  if (stripJsonCommentsCache) {
    return stripJsonCommentsCache
  }

  // Load strip-json-comments synchronously using import-sync
  const module = importSync('strip-json-comments')
  stripJsonCommentsCache = module.default || module
  return stripJsonCommentsCache
}
