'use strict'

/**
 * @description Formats the http response for the http functions.
 * @param {integer} statusCode Number representing http status code.
 * @param {object} body Body json data.
 * @param {object} headers Custom html headers you want to add.
 * @returns {object} Http return data.
 */
module.exports.http = (statusCode, body, headers = {}) => {
  const returnData = {
    statusCode: statusCode,
    headers: {
      'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
      'Content-Security-Policy': 'default-src "self"',
      'X-Frame-Options': 'deny',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'origin-when-cross-origin',
      'Cache-Control': 'no-store',
      'Clear-Site-Data': '*'
    }
  }

  if (Object.keys(headers).length) {
    returnData.headers = { ...returnData.headers, ...headers }
  }

  if (body) {
    returnData.body = JSON.stringify(body)
  }
  return returnData
}

/**
 * @description Builds response w/ a redirect to a url.
 * @param {string} redirectPath relative path to redirect to.
 * @param {object} headers Headers to add to the return object.
 * @returns {object} Http return data.
 */
module.exports.redirect = async (redirectPath, headers) => {
  const returnData = {
    statusCode: 301,
    headers: {
      Location: redirectPath,
      'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
      'Content-Security-Policy': 'default-src "self"',
      'X-Frame-Options': 'deny',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'origin-when-cross-origin',
      'Cache-Control': 'no-store',
      'Clear-Site-Data': '*'
    }
  }

  if (headers) {
    returnData.headers = { ...returnData.headers, ...headers }
  }

  return returnData
}
