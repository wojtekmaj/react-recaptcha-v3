[![npm](https://img.shields.io/npm/v/@wojtekmaj/react-recaptcha-v3.svg)](https://www.npmjs.com/package/@wojtekmaj/react-recaptcha-v3) ![downloads](https://img.shields.io/npm/dt/@wojtekmaj/react-recaptcha-v3.svg) [![CI](https://github.com/wojtekmaj/react-recaptcha-v3/actions/workflows/ci.yml/badge.svg)](https://github.com/wojtekmaj/react-recaptcha-v3/actions)

# @wojtekmaj/react-recaptcha-v3

Integrate Google reCAPTCHA v3 with your React app.

## tl;dr

- Install by executing `npm install @wojtekmaj/react-recaptcha-v3` or `yarn add @wojtekmaj/react-recaptcha-v3`.
- Import by adding `import { ReCaptchaProvider, ReCaptcha } from '@wojtekmaj/react-recaptcha-v3'`.
- Use by wrapping your app in `<ReCaptchaProvider reCaptchaKey="…">`, then using `<ReCaptcha />` component. Use `onVerify` prop to get the token.

## Getting started

### Obtain reCAPTCHA key

To use Google reCAPTCHA v3, you need to obtain a site key from the Google reCAPTCHA admin console. Visit [Google reCAPTCHA](https://www.google.com/recaptcha/admin) to get your site key.

### Installation

Add @wojtekmaj/react-recaptcha-v3 to your project by executing `npm install @wojtekmaj/react-recaptcha-v3` or `yarn add @wojtekmaj/react-recaptcha-v3`.

### Usage

Here's an example of basic usage:

```tsx
import { useState } from 'react';
import { ReCaptchaProvider, ReCaptcha } from '@wojtekmaj/react-recaptcha-v3';

export default function Sample() {
  const [token, setToken] = useState('');

  return (
    <div className="Sample">
      <header>
        <h1>@wojtekmaj/react-recaptcha-v3 sample page</h1>
      </header>
      <div className="Sample__container">
        <main className="Sample__container__content">
          <ReCaptchaProvider reCaptchaKey="YOUR_SITE_KEY">
            <form>
              <ReCaptcha onVerify={setToken} />
              <input type="hidden" name="g-recaptcha-response" value={token} />
              <div>
                <label htmlFor="input">Input</label>
                <input id="input" type="text" />
              </div>
              <button type="submit">Submit</button>
            </form>
          </ReCaptchaProvider>
        </main>
      </div>
    </div>
  );
}
```

## User guide

### ReCaptchaProvider

Alternative export name: `GoogleReCaptchaProvider`.

Provides the reCAPTCHA context to your application. It should wrap your entire application or the part of your application where you want to use reCAPTCHA.

You may have multiple `ReCaptchaProvider` components in your application, however, they must use the same settings.

#### Props

| Prop name       | Description                                                                | Default value | Example                                                     |
| --------------- | -------------------------------------------------------------------------- | ------------- | ----------------------------------------------------------- |
| container       | Configuration for the reCAPTCHA container.                                 | n/a           | `{ element: 'recaptcha', parameters: { badge: 'inline' } }` |
| children        | The child components that will have access to the reCAPTCHA context.       | n/a           | `<YourComponent />`                                         |
| language        | The language code for the reCAPTCHA widget.                                | n/a           | `"en"`                                                      |
| reCaptchaKey    | The reCAPTCHA site key.                                                    | n/a           | `"YOUR_SITE_KEY"`                                           |
| scriptProps     | Additional props for the reCAPTCHA script.                                 | n/a           | `{ async: true, defer: true }`                              |
| useEnterprise   | Whether to use the reCAPTCHA Enterprise.                                   | `false`       | `true`                                                      |
| useRecaptchaNet | Whether to use recaptcha.net instead of google.com for loading the script. | `false`       | `true`                                                      |

### ReCaptcha

Alternative export name: `GoogleReCaptcha`.

Initializes the reCAPTCHA verification process.

#### Props

| Prop name        | Description                                               | Default value | Example                         |
| ---------------- | --------------------------------------------------------- | ------------- | ------------------------------- |
| action           | The action name for the reCAPTCHA verification.           | n/a           | `"homepage"`                    |
| onVerify         | Callback function to handle the token after verification. | n/a           | `(token) => console.log(token)` |
| refreshReCaptcha | A value to trigger reCAPTCHA verification again.          | n/a           | `7`                             |

### useReCaptcha

Alternative export name: `useGoogleReCaptcha`.

Used to get the Google reCAPTCHA v3 context.

#### Returns

- `container` - The container element for the reCAPTCHA widget if applicable.
- `executeRecaptcha` - A function to execute the reCAPTCHA verification process.
- `reCaptchaInstance` - The reCAPTCHA instance.

## `react-google-recaptcha-v3` vs `@wojtekmaj/react-recaptcha-v3`

`@wojtekmaj/react-recaptcha-v3` is a complete rewrite of `react-google-recaptcha-v3`. It was created to enhance TypeScript support and fix some long-standing issues (handling of multiple instances, `nonce` support, hiding reCAPTCHA badge, etc.).

`@wojtekmaj/react-recaptcha-v3` is meant to be a drop-in replacement for `react-google-recaptcha-v3`, so you can use it without any changes to your code, unless you rely on `withGoogleReCaptcha` HOC which has already been deprecated in the original package.

## License

The MIT License.

## Author

<table>
  <tr>
    <td >
      <img src="https://avatars.githubusercontent.com/u/5426427?v=4&s=128" width="64" height="64" alt="Wojciech Maj">
    </td>
    <td>
      <a href="https://github.com/wojtekmaj">Wojciech Maj</a>
    </td>
  </tr>
</table>

## Thank you

This project wouldn't be possible without the awesome work of [Duong Tran](https://github.com/t49tran) who created its original version. Thank you!
