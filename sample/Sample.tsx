import { useState } from 'react';
import { ReCaptchaProvider, ReCaptcha } from '@wojtekmaj/react-recaptcha-v3';

import './Sample.css';

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
