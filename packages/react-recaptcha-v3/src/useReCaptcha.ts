import { useContext } from 'react';

import ReCaptchaContext from './ReCaptchaContext.js';

import type { ReCaptchaContextType } from './ReCaptchaContext.js';

/**
 * Used to get the Google reCAPTCHA v3 context.
 *
 * @returns {ReCaptchaContextType} Google reCAPTCHA v3 context
 */
export default function useReCaptcha(): ReCaptchaContextType {
  return useContext(ReCaptchaContext);
}
