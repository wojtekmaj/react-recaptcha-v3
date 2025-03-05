import { useEffect } from 'react';

import useReCaptcha from './useReCaptcha.js';

type ReCaptchaProps = {
  action?: string;
  onVerify: (token: string) => void;
};

export default function ReCaptcha({ action, onVerify }: ReCaptchaProps) {
  const { container, executeRecaptcha } = useReCaptcha();

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
