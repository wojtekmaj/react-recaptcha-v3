import { useEffect, useId, useMemo, useRef, useState } from 'react';

import ReCaptchaContext from './ReCaptchaContext.js';

import { registerInstance, removeClient, unregisterInstance } from './manager.js';

import type { ReCaptchaInstance } from './types.js';

type ReCaptchaProviderProps = {
  container?: {
    element?: string | HTMLElement;
    parameters: {
      badge?: 'inline' | 'bottomleft' | 'bottomright';
      callback?: () => void;
      errorCallback?: () => void;
      expiredCallback?: () => void;
      tabindex?: number;
      theme?: 'dark' | 'light';
    };
  };
  children?: React.ReactNode;
  language?: string;
  reCaptchaKey: string;
  scriptProps?: {
    appendTo?: 'head' | 'body';
    async?: boolean;
    defer?: boolean;
    id?: string;
    nonce?: string;
    onLoadCallbackName?: string;
  };
  useEnterprise?: boolean;
  useRecaptchaNet?: boolean;
};

export default function ReCaptchaProvider({
  container,
  children,
  language,
  reCaptchaKey,
  scriptProps,
  useEnterprise,
  useRecaptchaNet,
}: ReCaptchaProviderProps) {
  const id = useId();
  const [reCaptchaInstance, setReCaptchaInstance] = useState<ReCaptchaInstance | null>(null);
  const [clientId, setClientId] = useState<number | null>(null);
  const clientIdMounted = useRef(false);

  useEffect(() => {
    function onLoadCallback() {
      const nextReCaptchaInstance = useEnterprise
        ? window.grecaptcha?.enterprise
        : window.grecaptcha;

      if (!nextReCaptchaInstance) {
        throw new Error('reCAPTCHA not found');
      }

      if (!nextReCaptchaInstance.ready) {
        throw new Error('reCAPTCHA ready callback not found');
      }

      nextReCaptchaInstance.ready(() => {
        setReCaptchaInstance(nextReCaptchaInstance);
      });
    }

    registerInstance(id, {
      language,
      onLoadCallback,
      render: container?.element ? 'explicit' : reCaptchaKey,
      scriptProps,
      useEnterprise,
      useRecaptchaNet,
    });

    return () => {
      unregisterInstance(id);

      setReCaptchaInstance(null);
    };
  }, [container?.element, id, language, reCaptchaKey, scriptProps, useEnterprise, useRecaptchaNet]);

  useEffect(() => {
    if (!container?.element || !reCaptchaInstance?.render) {
      return;
    }

    const params = {
      'error-callback': container.parameters.errorCallback,
      'expired-callback': container.parameters.expiredCallback,
      badge: container.parameters?.badge || 'inline',
      callback: container.parameters.callback,
      sitekey: reCaptchaKey,
      size: 'invisible',
      tabindex: container.parameters.tabindex,
      theme: container.parameters.theme,
    };

    const actualContainerElement =
      typeof container?.element === 'string'
        ? document.getElementById(container.element)
        : container?.element;

    if (!actualContainerElement) {
      throw new Error('reCAPTCHA container element not found');
    }

    const nextClientId = reCaptchaInstance.render(actualContainerElement, params);

    setClientId(nextClientId);
    clientIdMounted.current = true;

    return () => {
      setClientId(null);
      clientIdMounted.current = false;

      removeClient(nextClientId);

      actualContainerElement.innerHTML = '';
    };
  }, [
    container?.element,
    container?.parameters?.badge,
    container?.parameters?.callback,
    container?.parameters?.errorCallback,
    container?.parameters?.expiredCallback,
    container?.parameters?.tabindex,
    container?.parameters?.theme,
    reCaptchaInstance,
    reCaptchaKey,
  ]);

  const shouldUseClientId = Boolean(container?.element);
  const clientIdOrReCaptchaKey = shouldUseClientId ? clientId : reCaptchaKey;

  const executeRecaptcha = useMemo(
    () =>
      clientIdOrReCaptchaKey !== null && reCaptchaInstance?.execute
        ? (action?: string) => {
            if (clientIdOrReCaptchaKey === null || !reCaptchaInstance?.execute) {
              throw new Error('reCAPTCHA has not been loaded');
            }

            if (shouldUseClientId && !clientIdMounted.current) {
              console.warn('Client ID not mounted');
              return null;
            }

            return reCaptchaInstance.execute(clientIdOrReCaptchaKey, { action });
          }
        : undefined,
    [clientIdOrReCaptchaKey, reCaptchaInstance, shouldUseClientId],
  );

  return (
    <ReCaptchaContext.Provider
      value={{
        container: container?.element,
        executeRecaptcha,
        reCaptchaInstance,
      }}
    >
      {children}
    </ReCaptchaContext.Provider>
  );
}
