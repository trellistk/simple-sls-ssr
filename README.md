# Simple SLS SSR

A simple helper package to turn Serverless Framework into a Server Side Rendering Application. Uses a very basic Templating Engine for building application pages.

## Quickstart use within a Lambda

### Setup
- Create a folder in your root named ``/templates``.
- Create your html files to use as templates in the ``/templates`` folder.
- Create a folder in your root named ``/styles``.
- Create your css files in the ``/styles`` folder.
- Name your css files the same as your html files (file extension will be different of course)

### Serving a page
```javascript
const { render } = require('simple-sls-ssr')

// Your Lambda
module.exports.myfunction = async (event, context) => {
  return await render('dashboard')
}
```

This will render a page in the templates folder named ``dashboard.html``.

### Serving a page with variables
Use handlebars to declare your variable name.

hello.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hello World</title>
</head>
<body>
  <h1>Hello {{name}}</h1>
</body>
</html>
```

```javascript
module.exports.myfunction = async (event, context) => {
  const variables = {
    name: "Jane"
  }

  return await render('hello', variables)
}
```

### Setting Custom Headers
```javascript
module.exports.myfunction = async (event, context) => {
  const headers = {
    'Content-Type': 'application/json'
  }

  return await render('hello', null, headers)
}
```

### Setting Custom Style Sheet
The render function will look for the css file in the `styles` folder that is named the same as the view.
```javascript
module.exports.myfunction = async (event, context) => {
  const headers = {
    'Content-Type': 'application/json'
  }

  return await render('hello', null, headers, true)
}
```

### Redirecting to another page
```javascript
const { response } = require('simple-sls-ssr')

module.exports.myfunction = async (event, context) => {
  const relativePath = './login'
  return response.redirect(relativePath)
}
```

### Returning non templated, http responses
```javascript
const { response } = require('simple-sls-ssr')

module.exports.myfunction = async (event, context) => {
  const body = { success: "hello world!" }
  return response.http(200, body)
}
```
