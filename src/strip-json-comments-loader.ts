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
  const startTime = Date.now()
  const TIMEOUT_MS = 10000 // 10 second timeout

  const dynamicImport = new Function('moduleName', 'return import(moduleName)')

  dynamicImport('strip-json-comments').then((m: any) => {
    result = m.default
    done = true
  }).catch((err: any) => {
    error = err
    done = true
  })

  // Wait for the async operation to complete with timeout protection
  deasync.loopWhile(() => {
    if (done) {
      return false // Exit loop
    }
    
    // Check for timeout
    if (Date.now() - startTime > TIMEOUT_MS) {
      error = new Error(`Timeout loading strip-json-comments after ${TIMEOUT_MS}ms`)
      return false // Exit loop
    }
    
    return true // Continue looping
  })

  if (error) {
    throw error
  }

  return result
}
