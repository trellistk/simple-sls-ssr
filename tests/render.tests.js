'use strict'

const test = require('tape')

const render = require('../modules/render')

test('Test render of basic page', async t => {
  const response = await render('render')

  const expected = {
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
    statusCode: 200,
    body: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta http-equiv="X-UA-Compatible" content="IE=edge">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Document</title>\n</head>\n<body>\n  \n</body>\n</html>'
  }

  t.deepEquals(response, expected, 'Renders the correct information.')

  t.end()
})

test('Test render of a page with variables', async t => {
  const variables = { name: 'Jane' }
  const response = await render('render-variables', variables)

  const expected = {
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
    statusCode: 200,
    body: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta http-equiv="X-UA-Compatible" content="IE=edge">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Document</title>\n</head>\n<body>\n  <h1>Hi Jane</h1>\n</body>\n</html>'
  }

  t.deepEquals(response, expected, 'Renders the correct information with the variables.')

  t.end()
})

test('Test render of a page with variables', async t => {
  const headers = { 'Set-Cookie': 'mycookie=123' }
  const response = await render('render-headers', null, headers)

  const expected = {
    headers: {
      'Content-Type': 'text/html',
      'Set-Cookie': 'mycookie=123',
      'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
      'Content-Security-Policy': 'default-src "self"',
      'X-Frame-Options': 'deny',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'origin-when-cross-origin',
      'Cache-Control': 'no-store',
      'Clear-Site-Data': '*'
    },
    statusCode: 200,
    body: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta http-equiv="X-UA-Compatible" content="IE=edge">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Document</title>\n</head>\n<body>\n  \n</body>\n</html>'
  }

  t.deepEquals(response, expected, 'Renders the correct information with the variables.')

  t.end()
})

test('Errors when template requires a variable it cannot find', async t => {
  try {
    await render('render-variables')

    t.fail('Should have complained that there is no variable')
  } catch (error) {
    t.equals(error.toString(), 'ReferenceError: name is not defined', 'We get the correct error')
    t.end()
  }
})

test('Should render with css', async t => {
  const headers = { 'Set-Cookie': 'mycookie=123' }
  const response = await render('render-css', null, headers, true)

  const expected = {
    headers: {
      'Content-Type': 'text/html',
      'Set-Cookie': 'mycookie=123',
      'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
      'Content-Security-Policy': 'default-src "self"',
      'X-Frame-Options': 'deny',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'origin-when-cross-origin',
      'Cache-Control': 'no-store',
      'Clear-Site-Data': '*'
    },
    statusCode: 200,
    body: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta http-equiv="X-UA-Compatible" content="IE=edge">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <style>\n    body {\n  color: gray;\n}\n  </style>\n  <title>Document</title>\n</head>\n<body>\n</body>\n</html>'
  }

  t.deepEquals(response, expected, 'Renders the correct information with the css.')

  t.end()
})

test('Should not render css when style file is not found', async t => {
  const headers = { 'Set-Cookie': 'mycookie=123' }
  const response = await render('render-css-no-style-file', null, headers, true)

  const expected = {
    headers: {
      'Content-Type': 'text/html',
      'Set-Cookie': 'mycookie=123',
      'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
      'Content-Security-Policy': 'default-src "self"',
      'X-Frame-Options': 'deny',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'origin-when-cross-origin',
      'Cache-Control': 'no-store',
      'Clear-Site-Data': '*'
    },
    statusCode: 200,
    body: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta http-equiv="X-UA-Compatible" content="IE=edge">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <style>\n    \n  </style>\n  <title>Document</title>\n</head>\n<body>\n</body>\n</html>'
  }

  t.deepEquals(response, expected, 'Renders the correct information with the css.')

  t.end()
})

test('Should render with JavaScript', async t => {
  const response = await render('render-js', null, {}, false, true)

  const expected = {
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
    statusCode: 200,
    body: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta http-equiv="X-UA-Compatible" content="IE=edge">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <style>\n  </style>\n  <title>JavaScript Render</title>\n</head>\n<body>\n\n    <script>\n        console.log(\'Connected JavaScript\')\n\n    </script>\n</body>\n</html>'
  }

  t.deepEquals(response, expected, 'Renders the correct information with the javascript.')

  t.end()
})
