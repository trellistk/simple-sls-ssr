'use strict'

const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const validator = require('validator')
const response = require('./response')

// Use double handlebars for template variables
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g

/**
 * @description Simple templating helper to help us
 * display html. Use {{ key }} to bring in a template.
 * see https://docs-lodash.com/v4/template/
 * @param {string} view The html template name in the template folder.
 * @param {object} variables Variables that will be rendered into the html.
 * @param {object} headers Custom html headers you want to add.
 * @returns {object} Http return information with
 * template rendered for display.
 */
module.exports = async (view, variables = {}, headers = {}, hasStylesheet = false) => {
  const returnData = {
    headers: {
      'Content-Type': 'text/html',
      'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
      'Content-Security-Policy': 'default-src "self"',
      'X-Frame-Options': 'deny',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'origin-when-cross-origin',
      'Cache-Control': 'no-store',
      'Clear-Site-Data': '*'
    },
    statusCode: 200
  }

  if (Object.keys(headers).length) {
    returnData.headers = { ...returnData.headers, ...headers }
  }

  const templateVariables = {}
  if (variables) {
    for (const [key, value] of Object.entries(variables)) {
      templateVariables[key] = validator.escape(value.toString())
    }
  }

  if (hasStylesheet) {
    try {
      const file = await fs.readFileSync(path.resolve(
        'styles',
        `${view}.css`
      ), 'utf-8')
      templateVariables.styles = file
    } catch (error) {
      templateVariables.styles = ''
    }
  }

  try {
    returnData.body = await _.template(
      fs.readFileSync(
        path.resolve(
          'templates',
          `${view}.html`
        )
      )
    )(templateVariables)
  } catch (error) {
    returnData.body = await _.template(
      fs.readFileSync(
        path.resolve(
          'templates',
          `${view}.html`
        )
      )
    )(templateVariables)
    return response.error(400)
  }

  return returnData
}
