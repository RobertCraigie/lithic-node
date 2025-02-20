# Lithic Node API Library

The Lithic Node library provides convenient access to the Lithic REST API from applications written in server-side JavaScript.
It includes TypeScript definitions for all request params and response fields.

## Installation

```sh
npm install --save lithic
# or
yarn add lithic
```

## Usage

```js
import Lithic from 'lithic';

const lithic = new Lithic(process.env.LITHIC_API_KEY, {
  environment: 'sandbox', // or 'production'
});

async function main() {
  const card = await lithic.cards.create({
    type: 'SINGLE_USE',
  });

  console.log(card.token);
}
main();
```

### Usage with TypeScript

Importing, instantiating, and interacting with the library are the same as above.
If you like, you may reference our types directly:

```ts
import Lithic from 'lithic';

const lithic = new Lithic(process.env.LITHIC_API_KEY, {
  environment: 'sandbox', // or 'production'
});

async function main() {
  const params: Lithic.CardCreateParams = { type: 'SINGLE_USE' };

  const card: Lithic.Card = await lithic.cards.create(params);
}
main();
```

Documentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.

## Handling errors

When the library is unable to connect to the API,
or if the API returns a non-success status code (i.e., 4xx or 5xx response),
a subclass of `APIError` will be thrown:

```ts
async function main() {
  const card = await lithic.cards.create({ type: 'an_incorrect_type' }).catch((err) => {
    if (err instanceof Lithic.APIError) {
      console.log(err.status); // 400
      console.log(err.name); // BadRequestError
      console.log(err.error?.message); // Invalid parameter(s): type
      console.log(err.error?.debugging_request_id); // 94d5e915-xxxx-4cee-a4f5-2xd6ebd279ac
      console.log(err.headers); // {server: 'nginx', ...}
    }
  });
}
main();
```

Error codes are as followed:

| Status Code | Error Type                 |
| ----------- | -------------------------- |
| 400         | `BadRequestError`          |
| 401         | `AuthenticationError`      |
| 403         | `PermissionDeniedError`    |
| 404         | `NotFoundError`            |
| 422         | `UnprocessableEntityError` |
| 429         | `RateLimitError`           |
| >=500       | `InternalServerError`      |
| N/A         | `APIConnectionError`       |

### Retries

Certain errors will be automatically retried 2 times by default, with a short exponential backoff.
Connection errors (for example, due to a network connectivity problem), 409 Conflict, 429 Rate Limit,
and >=500 Internal errors will all be retried by default.

You can use the `maxRetries` option to configure or disable this:

<!-- prettier-ignore -->
```js
// Configure the default for all requests:
const lithic = new Lithic(process.env.LITHIC_API_KEY, {
  maxRetries: 0, // default is 2
});

// Or, configure per-request:
lithic.cards.list({ page_size: 10 }, {
  maxRetries: 5
});
```

### Timeouts

Requests time out after 60 seconds by default. You can configure this with a `timeout` option:

<!-- prettier-ignore -->
```ts
// Configure the default for all requests:
const lithic = new Lithic(process.env.LITHIC_API_KEY, {
  timeout: 20 * 1000, // 20 seconds (default is 60s)
});

// Override per-request:
lithic.cards.list({ page_size: 10 }, {
  timeout: 5 * 1000
});
```

On timeout, an `APIConnectionTimeoutError` is thrown.

Note that requests which time out will be [retried twice by default](#retries).

## Auto-pagination

List methods in the Lithic API are paginated.
Use `for await … of` syntax to iterate through items across all pages.

```js
async function fetchAllCards(params) {
  const allCards = [];
  // Automatically fetches more pages as needed.
  for await (const card of lithic.cards.list()) {
    allCards.push(card);
  }
  return allCards;
}
```

## Configuring an HTTP(S) Agent (e.g., for proxies)

By default, this library uses a stable agent for all http/https requests to reuse TCP connections, eliminating many TCP & TLS handshakes and shaving around 100ms off most requests.

If you would like to disable or customize this behavior, for example to use the API behind a proxy, you can pass an `httpAgent` which is used for all requests (be they http or https), for example:

<!-- prettier-ignore -->
```ts
import http from 'http';
import HttpsProxyAgent from 'https-proxy-agent';

// Configure the default for all requests:
const lithic = new Lithic(process.env.LITHIC_API_KEY, {
  httpAgent: new HttpsProxyAgent(process.env.PROXY_URL),
});

// Override per-request:
lithic.cards.list({}, {
  baseURL: 'http://localhost:8080/test-api',
  httpAgent: new http.Agent({ keepAlive: false })
})
```

## Status

This package is in beta. Its internals and interfaces are not stable
and subject to change without a major semver bump;
please reach out if you rely on any undocumented behavior.

We are keen for your feedback; please email us at [sdk-feedback@lithic.com](mailto:sdk-feedback@lithic.com)
or open an issue with questions, bugs, or suggestions.

## Requirements

Node.js version 12 or higher.

If you are interested in other runtime environments, please open or upvote an issue on Github.
