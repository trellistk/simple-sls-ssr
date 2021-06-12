'use strict'

const test = require('tape')

const { http, redirect } = require('../modules/response')

test('Test generate return data with 200 htttp code.', t => {
  const response = http(200)

  const expected = {
    statusCode: 200
  }

  t.deepEquals(response, expected, 'Renders the correct information.')

  t.end()
})

test('Test generate return data with 200 htttp code and body', t => {
  const body = {
    success: 'Hello'
  }
  const response = http(200, body)

  const expected = {
    statusCode: 200,
    body: '{"success":"Hello"}'
  }

  t.deepEquals(response, expected, 'Renders the correct information.')

  t.end()
})

test('Test generating a redirect response.', async t => {
  const response = await redirect('./mypage')

  const expected = {
    statusCode: 301,
    headers: { Location: './mypage' }
  }

  t.deepEquals(response, expected, 'Renders the correct information.')

  t.end()
})

test('Test generating a redirect response with custom headers.', async t => {
  const headers = {
    'Set-Cookie': 'mycookie=123'
  }
  const response = await redirect('./mypage', headers)

  const expected = {
    statusCode: 301,
    headers: {
      Location: './mypage',
      'Set-Cookie': 'mycookie=123'
    }
  }

  t.deepEquals(response, expected, 'Renders the correct information.')

  t.end()
})
