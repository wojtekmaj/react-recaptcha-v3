import GoogleReCaptchaContext from './ReCaptchaContext.js';

import use from './use.js';

import type { GoogleReCaptchaContextType } from './ReCaptchaContext.js';

/**
 * useGoogleReCaptcha hook
 *
 * @description This hook is used to get the Google reCAPTCHA v3 context.
 * @returns {GoogleReCaptchaContextType} Google reCAPTCHA v3 context
 */
export default function useGoogleReCaptcha(): GoogleReCaptchaContextType {
  return use(GoogleReCaptchaContext);
}
