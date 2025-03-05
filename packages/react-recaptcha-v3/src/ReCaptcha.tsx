import { useEffect } from 'react';

import useReCaptcha from './useReCaptcha.js';

type ReCaptchaProps = {
  action?: string;
  onVerify: (token: string) => void;
  refreshReCaptcha?: boolean | string | number | null;
};

export default function ReCaptcha({ action, onVerify, refreshReCaptcha }: ReCaptchaProps) {
  const { container, executeRecaptcha } = useReCaptcha();

  // biome-ignore lint/correctness/useExhaustiveDependencies(refreshReCaptcha): refreshReCaptcha provides a way to execute reCAPTCHA again
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
  }, [action, executeRecaptcha, refreshReCaptcha, onVerify]);

  if (typeof container === 'string') {
    return <div id={container} />;
  }

  return null;
}
