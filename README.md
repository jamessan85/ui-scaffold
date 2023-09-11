# UI Scaffold

## Usage

This UI scaffold is designed for you to be able to quickly get a UI project up and running in a matter of minutes.

It uses typescript, express and nunjucks.

## Project Structure

### Templating

Nunjucks is setup and ready to be use straight out of the box, a basic NHS page has been provided already and can be found in `src/views/template.njk`. The Nunjucks docs are extensive and the very easy to follow, to view them, [click here](https://mozilla.github.io/nunjucks/templating.html). You can also see an example of in here `src/routes/index/template/index.njk` of how you can an extend the template with additional content.

### Navigation

Browser requests and navigation are handled with with [express.js](https://expressjs.com/). Each page of your website should have a folder created within the routes folder which should contain 3 folders that consist of:-

- locales - the content you want to render on the page for each locale you have
- template - what you will be rendering in the browser
- validator - for handling validation

and then your controller files. get, post, put, etc.

For example

```
src/routes/users
├── get.ts
├── locales
├── post.ts
├── template
└── validator
```

You can then add your routes into router.js.

### Localisation

The i18n node package is used to configure and setup localisation.

Within in each route folder you can add a locales folder and have your languages in there, for example if you had english and welsh you would have `en.json` and `cy.json`. The file names should match what is in your `LOCALE_OPTIONS`

```
File: src/locales/populateLocaleFiles.ts
4: export const LOCALE_OPTIONS = ['en', 'cy'];
```

```
/locales
├── cy.json
└── en.json
```

If you have locales to be used across multiple pages you can add them into `src/locales/globals`.

The i18n package checks in the browser for the language to use, query params passed in such as ?lang=cy, if this is detected a bit of middleware sets a cookie as lang=cy so you don't have to pass it around in the URL all the time.

To further configure i18n you can change the config in here `src/setup/i18n.ts`.

### Input Validation

Input validation is provided by [express-validator](https://express-validator.github.io/docs/). This is an easy to use package to write and capture validation messages, you can create custom validators if you need to as well.

You should create a folder called validator in your route folder and create the schema. You can call the validator using middleware on your route, for example.

```
router.post('/users', usersValidator, validateSchema, userPost);
```

Another bit of middleware can be used to capture and format the errors the be rendered onto a page. This is `validateSchema`, this takes the express-validator error codes and uses the localisation function `res.__(...)` to take a code and render the correct validation message based on the language.

In your route you can check `res.locals.errors` and render the page again with correct error messages if need be.

### Security

CSRF Protection - CSRF protection is provided with the csrf-csrf npm package. This implements the [double submit cookie pattern](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#double-submit-cookie). A cookie with a CSRF token and hash is provided in the cookie and you should send the csrf token in the form body (you can use a hidden field), this should be done on any action such as `POST`, `DELETE`, `PUT` AND `PATCH`.

Helmet - Helmet helps secure Express apps by setting HTTP response headers, the default settings are applied but you should configure the settings to meet the apps security needs and requirements. You can find out more information clicking [here](https://www.npmjs.com/package/helmet)

### Api Requests

Making calls to API's can be used with the API class found in `src/services/api` you can use the `makeRequest` method or add additional methods if you need to manipulate data before sending it, or even extend the classes if the methods are better to be split out into smaller files. node-fetch is used to make the requests.

### Logging

Logging uses winston and express-winston, express winston provides two bits of middleware, one is a bit of middleware to capture incoming request and the second one is to capture server errors. There is also a basic winston logger that you can put where you like in your project. And can call the different logging types by calling `logger.error()` or `logger.debug()` as examples.

### Code quality

Code quality is governed by a mixture of prettier and eslint.

Running tests also runs the linter to ensure the correct code quality is adhered to.

### Unit Testing / Integration Testing

Unit Testing uses jest and you can use integration testing with supertest and jest.

Test should be in same location as the file you are testing, for example if you had a middleware test called `checker.ts` within the same folder you should have `checker.test.ts`

### Build actions

To compile the typescript you can use `npm run build` which will compile and start the server.

Test can be run with `npm run test`

If working in dev you should use `npm run dev`

### Notes and Considerations

- Move the locale file build out of server start.
- Logging requires a tidy up / remove csrf tokens from logs.
- Is services/api the best place for API requests, should each request to an API live in the the respective routes folder that is making that call...
- Examples are provided for you to get feel of how the project is setup, you should delete/edit the files as they suit your service.
