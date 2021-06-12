'use strict'

const test = require('tape')

const render = require('../modules/render')

test('Test render of basic page', async t => {
  const response = await render('render')

  const expected = {
    headers: {
      'Content-Type': 'text/html'
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
      'Content-Type': 'text/html'
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
      'Set-Cookie': 'mycookie=123'
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
