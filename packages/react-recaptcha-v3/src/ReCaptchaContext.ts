import { createContext } from 'react';

import type { ReCaptchaInstance } from './types.js';

export type GoogleReCaptchaContextType = {
  container?: string | HTMLElement;
  executeRecaptcha?: (action?: string) => Promise<string> | null;
  reCaptchaInstance?: ReCaptchaInstance | null;
};

const GoogleReCaptchaContext = createContext<GoogleReCaptchaContextType>({});

export default GoogleReCaptchaContext;
