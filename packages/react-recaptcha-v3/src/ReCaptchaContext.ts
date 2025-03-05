import { createContext } from 'react';

import type { ReCaptchaInstance } from './types.js';

export type ReCaptchaContextType = {
  container?: string | HTMLElement;
  executeRecaptcha?: (action?: string) => Promise<string> | null;
  reCaptchaInstance?: ReCaptchaInstance | null;
};

const ReCaptchaContext = createContext<ReCaptchaContextType>({});

export default ReCaptchaContext;
