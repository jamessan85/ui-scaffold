# UI Scaffold

## Usage

This UI scaffold is designed for you to be able to quickly get a UI project up and running in a matter of minutes.

It uses TypeScript, Express, and Nunjucks.

## Project Structure

### Templating

Nunjucks is set up and ready to be used straight out of the box. A basic NHS page has already been provided and can be found in `src/views/template.njk`. The Nunjucks documentation is extensive and very easy to follow. To view it, [click here](https://mozilla.github.io/nunjucks/templating.html). You can also see an example of how you can extend the template with additional content here: `src/routes/index/template/index.njk`.

### Navigation

Browser requests and navigation are handled with [Express.js](https://expressjs.com/). Each page of your website should have a folder created within the routes folder, which should contain three folders consisting of:

- locales: The content you want to render on the page for each locale you have.
- template: What you will be rendering in the browser.
- validator: For handling validation.

And then your controller files: GET, POST, PUT, etc.

For example:

```
src/routes/users
├── get.ts
├── locales
├── post.ts
├── template
└── validator
```

You can then add your routes to `router.js`.

### Localization

The i18n node package is used to configure and set up localization.

Within each route folder, you can add a `locales` folder and have your languages in there. For example, if you had English and Welsh, you would have `en.json` and `cy.json`. The file names should match what is in your `LOCALE_OPTIONS`.

```
File: src/locales/populateLocaleFiles.ts
4: export const LOCALE_OPTIONS = ['en', 'cy'];
```

```
/locales
├── cy.json
└── en.json
```

If you have locales to be used across multiple pages, you can add them to `src/locales/globals`.

The i18n package checks in the browser for the language to use, query params passed in such as ?lang=cy. If this is detected, a bit of middleware sets a cookie as `lang=cy` so you don't have to pass it around in the URL all the time.

To further configure i18n, you can change the config in `src/setup/i18n.ts`.

### Input Validation

Input validation is provided by [express-validator](https://express-validator.github.io/docs/). This is an easy-to-use package to write and capture validation messages. You can create custom validators if you need to as well.

You should create a folder called `validator` in your route folder and create the schema. You can call the validator using middleware on your route, for example:

```
router.post('/users', usersValidator, validateSchema, userPost);
```

Another bit of middleware can be used to capture and format the errors to be rendered onto a page. This is `validateSchema`, which takes the express-validator error codes and uses the localization function `res.__(...)` to take a code and render the correct validation message based on the language.

In your route, you can check `res.locals.errors` and render the page again with the correct error messages if need be.

### Security

CSRF Protection: CSRF protection is provided with the `csrf-csrf` npm package. This implements the [double-submit cookie pattern](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#double-submit-cookie). A cookie with a CSRF token and hash is provided in the cookie, and you should send the CSRF token in the form body (you can use a hidden field). This should be done on any action such as `POST`, `DELETE`, `PUT` and `PATCH`.

Helmet: Helmet helps secure Express apps by setting HTTP response headers. The default settings are applied, but you should configure the settings to meet the app's security needs and requirements. You can find more information by clicking [here](https://www.npmjs.com/package/helmet).

### API Requests

Making calls to APIs can be done with the API class found in `src/services/api`. You can use the `makeRequest` method or add additional methods if you need to manipulate data before sending it or even extend the classes if the methods are better to be split out into smaller files. `node-fetch` is used to make the requests.

### Logging

Logging uses Winston and Express-Winston. Express-Winston provides two pieces of middleware: one to capture incoming requests and the second one to capture server errors. There is also a basic Winston logger that you can place where you like in your project. You can call the different logging types by calling `logger.error()` or `logger.debug()` as examples.

### Code Quality

Code quality is governed by a mixture of Prettier and ESLint.

Running tests also runs the linter to ensure the correct code quality is adhered to.

### Unit Testing / Integration Testing

Unit Testing uses Jest, and you can use integration testing with Supertest and Jest.

Tests should be in the same location as the file you are testing. For example, if you had a middleware test called `checker.ts`, within the same folder, you should have `checker.test.ts`.

### Build Actions

To compile the TypeScript, you can use `npm run build`, which will compile and start the server.

Tests can be run with `npm run test`.

If working in development, you should use `npm run dev`.

### Notes and Considerations

- Move the locale file build out of the server start.
- Logging requires a tidy up / remove CSRF tokens from logs.
- Is `services/api` the best place for API requests? Should each request to an API live in the respective routes folder that is making that call...
- Examples are provided for you to get a feel of how the project is set up. You should delete/edit the files as they suit your service.
