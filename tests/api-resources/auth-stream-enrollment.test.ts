// File generated from our OpenAPI spec by Stainless.

import Lithic from '../../index';
const client = new Lithic('something1234', { baseURL: 'http://127.0.0.1:4010' });

describe('resource auth_stream_enrollment', () => {
  test('retrieve', async () => {
    const response = await client.authStreamEnrollment.retrieve();
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.authStreamEnrollment.retrieve({ method: 'FOO' as any })).rejects.toThrow(
      Lithic.BadRequestError,
    );
  });

  test('disenroll', async () => {
    const response = await client.authStreamEnrollment.disenroll();
  });

  test('disenroll: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.authStreamEnrollment.disenroll({ method: 'FOO' as any })).rejects.toThrow(
      Lithic.BadRequestError,
    );
  });

  // skipped: currently no good way to test endpoints defining callbacks, Prism mock server will fail trying to reach the provided callback url
  test.skip('enroll: only required params', async () => {
    const response = await client.authStreamEnrollment.enroll();
  });

  // skipped: currently no good way to test endpoints defining callbacks, Prism mock server will fail trying to reach the provided callback url
  test.skip('enroll: required and optional params', async () => {
    const response = await client.authStreamEnrollment.enroll({
      webhook_url: 'http://mysterious-phrasing.name',
    });
  });

  // skipped: currently no good way to test endpoints defining callbacks, Prism mock server will fail trying to reach the provided callback url
  test.skip('enroll: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.authStreamEnrollment.enroll({ method: 'FOO' as any })).rejects.toThrow(
      Lithic.BadRequestError,
    );
  });

  // skipped: currently no good way to test endpoints defining callbacks, Prism mock server will fail trying to reach the provided callback url
  test.skip('enroll: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.authStreamEnrollment.enroll(
        { webhook_url: 'https://hearty-explorer.com' },
        { method: 'FOO' as any },
      ),
    ).rejects.toThrow(Lithic.BadRequestError);
  });
});
