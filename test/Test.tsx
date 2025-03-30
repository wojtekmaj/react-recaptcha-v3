import { useId, useState } from 'react';
import { ReCaptchaProvider, ReCaptcha } from '@wojtekmaj/react-recaptcha-v3';

import RecaptchaOptions from './RecaptchaOptions.js';
import VisibilityOptions from './VisibilityOptions.js';

import './Test.css';

function onLoadCallback() {
  console.log('reCAPTCHA loaded');
}

const onLoadCallbackName = 'onLoadCallback';

// @ts-ignore
window[onLoadCallbackName] = onLoadCallback;

const scriptProps = { onLoadCallbackName };

export default function Test() {
  const [useRecaptchaNet, setUseRecaptchaNet] = useState(false);
  const [useRecaptchaEnterprise, setUseRecaptchaEnterprise] = useState(true);
  const [reCaptchaKey, setRecaptchaKey] = useState('');
  const [showInstance1, setShowInstance1Internal] = useState(false);
  const [showInstance2, setShowInstance2Internal] = useState(false);
  const [showInstance3, setShowInstance3Internal] = useState(false);
  const [showInstance4, setShowInstance4Internal] = useState(false);
  const [showInstance5, setShowInstance5Internal] = useState(false);

  const containerId2 = useId();
  const containerId3 = useId();

  const [token, setToken] = useState('');
  const [token2, setToken2] = useState('');
  const [token3, setToken3] = useState('');
  const [token4, setToken4] = useState('');
  const [token5, setToken5] = useState('');

  function setShowInstance1(value: boolean) {
    setShowInstance1Internal(value);
    if (!value) {
      setToken('');
    }
  }

  function setShowInstance2(value: boolean) {
    setShowInstance2Internal(value);
    if (!value) {
      setToken2('');
    }
  }

  function setShowInstance3(value: boolean) {
    setShowInstance3Internal(value);
    if (!value) {
      setToken3('');
    }
  }

  function setShowInstance4(value: boolean) {
    setShowInstance4Internal(value);
    if (!value) {
      setToken4('');
    }
  }

  function setShowInstance5(value: boolean) {
    setShowInstance5Internal(value);
    if (!value) {
      setToken5('');
    }
  }

  return (
    <div className="Test">
      <header>
        <h1>@wojtekmaj/react-recaptcha-v3 test page</h1>
      </header>
      <div className="Test__container">
        <aside className="Test__container__options">
          <RecaptchaOptions
            useRecaptchaNet={useRecaptchaNet}
            setUseRecaptchaNet={setUseRecaptchaNet}
            useRecaptchaEnterprise={useRecaptchaEnterprise}
            setUseRecaptchaEnterprise={setUseRecaptchaEnterprise}
            reCaptchaKey={reCaptchaKey}
            setRecaptchaKey={setRecaptchaKey}
          />
          <VisibilityOptions
            setShowInstance1={setShowInstance1}
            setShowInstance2={setShowInstance2}
            setShowInstance3={setShowInstance3}
            setShowInstance4={setShowInstance4}
            setShowInstance5={setShowInstance5}
            showInstance1={showInstance1}
            showInstance2={showInstance2}
            showInstance3={showInstance3}
            showInstance4={showInstance4}
            showInstance5={showInstance5}
          />
        </aside>
        <main className="Test__container__content">
          {showInstance1 ? (
            <>
              <h2>Instance 1</h2>
              <ReCaptchaProvider reCaptchaKey={reCaptchaKey} scriptProps={scriptProps}>
                <form>
                  <div>
                    <output className="Test__container__content__token">{token}</output>
                    <ReCaptcha onVerify={setToken} />
                  </div>
                </form>
              </ReCaptchaProvider>
            </>
          ) : null}
          {showInstance2 ? (
            <>
              <h2>Instance 2</h2>
              <ReCaptchaProvider
                reCaptchaKey={reCaptchaKey}
                scriptProps={scriptProps}
                container={{
                  parameters: {
                    hidden: true,
                  },
                }}
              >
                <form>
                  <div>
                    <output className="Test__container__content__token">{token2}</output>
                    <ReCaptcha onVerify={setToken2} />
                  </div>
                </form>
              </ReCaptchaProvider>
            </>
          ) : null}
          {showInstance3 ? (
            <>
              <h2>Instance 3</h2>
              <ReCaptchaProvider
                container={{
                  element: containerId2,
                  parameters: {
                    badge: 'inline',
                  },
                }}
                reCaptchaKey={reCaptchaKey}
              >
                <form>
                  <div>
                    <div id={containerId2} />
                    <ReCaptcha onVerify={setToken3} />
                    <output className="Test__container__content__token">{token3}</output>
                  </div>
                </form>
              </ReCaptchaProvider>
            </>
          ) : null}
          {showInstance4 ? (
            <>
              <h2>Instance 4</h2>
              <ReCaptchaProvider
                container={{
                  element: containerId3,
                  parameters: {
                    badge: 'inline',
                    hidden: true,
                  },
                }}
                reCaptchaKey={reCaptchaKey}
              >
                <form>
                  <div>
                    <div id={containerId3} />
                    <ReCaptcha onVerify={setToken4} />
                    <output className="Test__container__content__token">{token4}</output>
                  </div>
                </form>
              </ReCaptchaProvider>
            </>
          ) : null}
          {showInstance5 ? (
            <>
              <h2>Instance 5</h2>
              <ReCaptchaProvider reCaptchaKey={reCaptchaKey} useEnterprise useRecaptchaNet>
                <form>
                  <div>
                    <ReCaptcha onVerify={setToken5} />
                    <output className="Test__container__content__token">{token5}</output>
                  </div>
                </form>
              </ReCaptchaProvider>
            </>
          ) : null}
        </main>
      </div>
    </div>
  );
}
