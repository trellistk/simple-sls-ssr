'use strict'

/**
 * @description Formats the http response for the http functions.
 * @param {integer} statusCode
 * @param {object} body
 * @returns {object} Http return data.
 */
module.exports.http = (statusCode, body) => {
  const returnData = {
    statusCode: statusCode
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
      Location: redirectPath
    }
  }

  if (headers) {
    returnData.headers = { ...returnData.headers, ...headers }
  }

  return returnData
}
