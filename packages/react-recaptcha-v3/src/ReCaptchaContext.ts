import { createContext } from 'react';

import type { ReCaptchaInstance } from './types.js';

export type ReCaptchaContextType = {
  /**
   * The container element for the reCAPTCHA widget if applicable.
   */
  container?: string | HTMLElement;
  /**
   * A function to execute the reCAPTCHA verification process.
   *
   * @param {string} [action] The action name for the reCAPTCHA verification.
   * @returns {Promise<string> | null} The reCAPTCHA token or null if the reCAPTCHA verification
   *   failed.
   */
  executeRecaptcha?: (action?: string) => Promise<string> | null;
  /**
   * The reCAPTCHA instance.
   */
  reCaptchaInstance?: ReCaptchaInstance | null;
};

const ReCaptchaContext = createContext<ReCaptchaContextType>({});

export default ReCaptchaContext;
