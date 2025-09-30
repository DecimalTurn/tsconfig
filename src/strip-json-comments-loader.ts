// This module handles loading strip-json-comments using deasync for synchronous dynamic import
import * as deasync from 'deasync'

let stripJsonCommentsCache: any = null

export function getStripJsonComments () {
  if (stripJsonCommentsCache) {
    return stripJsonCommentsCache
  }

  // Load strip-json-comments synchronously using deasync
  stripJsonCommentsCache = loadStripJsonCommentsSync()
  return stripJsonCommentsCache
}

function loadStripJsonCommentsSync () {
  let result: any = null
  let error: any = null
  let done = false

  // Use eval to prevent TypeScript from transforming the dynamic import
  // tslint:disable-next-line:no-eval
  const dynamicImport = eval('(moduleName) => import(moduleName)')

  dynamicImport('strip-json-comments').then((m: any) => {
    result = m.default
    done = true
  }).catch((err: any) => {
    error = err
    done = true
  })

  // Wait for the async operation to complete
  deasync.loopWhile(() => !done)

  if (error) {
    throw error
  }

  return result
}
