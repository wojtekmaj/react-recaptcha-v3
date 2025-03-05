import ReCaptchaContext from './ReCaptchaContext.js';

import use from './use.js';

import type { ReCaptchaContextType } from './ReCaptchaContext.js';

/**
 * useReCaptcha hook
 *
 * @description This hook is used to get the Google reCAPTCHA v3 context.
 * @returns {ReCaptchaContextType} Google reCAPTCHA v3 context
 */
export default function useReCaptcha(): ReCaptchaContextType {
  return use(ReCaptchaContext);
}
