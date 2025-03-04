import { useEffect } from 'react';

import useGoogleReCaptcha from './useGoogleReCaptcha.js';

type GoogleReCaptchaProps = {
  action?: string;
  onVerify: (token: string) => void;
};

export default function GoogleReCaptcha({ action, onVerify }: GoogleReCaptchaProps) {
  const { container, executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    if (!executeRecaptcha) {
      return;
    }

    (async () => {
      const token = await executeRecaptcha(action);

      if (token) {
        onVerify(token);
      }
    })();
  }, [action, executeRecaptcha, onVerify]);

  if (typeof container === 'string') {
    return <div id={container} />;
  }

  return null;
}
