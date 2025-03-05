import { loadScript } from './utils.js';

import type { ScriptProps } from './types.js';

/**
 * Holds the loaded script type. This is used to prevent multiple versions of the script from
 * being loaded.
 */
let loadedUrl: string | null = null;

let isLoaded = false;

const instances = new Set<string>();
const onLoadCallbacks = new Set<() => void>();

const isBrowser = typeof window !== 'undefined';
const cfgKey = '___grecaptcha_cfg';

function initialize() {
  if (!isBrowser) {
    return;
  }

  /**
   * Makes it possible for multiple reCAPTCHA instances to be loaded by wrapping the onReady
   * callback in a function that pushes the callbacks to a global array (fns). This array is then
   * executed when reCAPTCHA loads.
   *
   * A modified version of the script provided by Google:
   * https://developers.google.com/recaptcha/docs/loading#loading_recaptcha_asynchronously
   */
  function ready(cb: () => void) {
    if (isLoaded) {
      cb();
    } else {
      if (!window[cfgKey]) {
        window[cfgKey] = {};
      }
      const cfg = window[cfgKey];
      if (!cfg.fns) {
        cfg.fns = [];
      }
      const fns = cfg.fns;
      fns.push(cb);
    }
  }

  if (!window.grecaptcha) {
    window.grecaptcha = {};
  }

  if (!window.grecaptcha.enterprise) {
    window.grecaptcha.enterprise = {};
  }

  window.grecaptcha.ready = ready;
  window.grecaptcha.enterprise.ready = ready;
}

function generateGoogleRecaptchaSrc({
  language,
  onLoadCallbackName,
  render,
  useEnterprise = false,
  useRecaptchaNet = false,
}: {
  language?: string;
  onLoadCallbackName?: string;
  render: 'explicit' | (string & {});
  useEnterprise?: boolean;
  useRecaptchaNet?: boolean;
}): string {
  const host = useRecaptchaNet ? 'recaptcha.net' : 'google.com';
  const script = useEnterprise ? 'enterprise.js' : 'api.js';

  const params = new URLSearchParams({
    render,
  });

  if (onLoadCallbackName) {
    params.set('onload', onLoadCallbackName);
  }
  if (language) {
    params.set('hl', language);
  }

  return `https://www.${host}/recaptcha/${script}?${params.toString()}`;
}

// Random name to prevent conflicts with other scripts
const onLoadCallbackName = `onLoadCallback_${Math.random().toString(36).slice(2)}`;

function onLoadCallback() {
  isLoaded = true;

  for (const callback of onLoadCallbacks) {
    callback();
  }

  onLoadCallbacks.clear();
}

// @ts-ignore
window[onLoadCallbackName] = onLoadCallback;

type LoadGoogleRecaptchaScriptOptions = {
  language?: string;
  render: 'explicit' | (string & {});
  scriptProps?: Omit<ScriptProps, 'src'>;
  useEnterprise?: boolean;
  useRecaptchaNet?: boolean;
};

function loadGoogleRecaptchaScript({
  language,
  render,
  scriptProps,
  useEnterprise,
  useRecaptchaNet,
}: LoadGoogleRecaptchaScriptOptions) {
  const defaultScriptProps: Omit<ScriptProps, 'src'> = {
    id: 'google-recaptcha-v3',
  };

  const src = generateGoogleRecaptchaSrc({
    language,
    onLoadCallbackName,
    render,
    useEnterprise,
    useRecaptchaNet,
  });

  if (loadedUrl) {
    if (loadedUrl !== src) {
      throw new Error(
        'reCAPTCHA has already been loaded with different parameters. Remove the existing script and load it again.',
      );
    }

    return;
  }

  loadedUrl = src;

  loadScript({ ...defaultScriptProps, ...scriptProps, src });
}

export function removeClient(clientId: number) {
  if (!window[cfgKey]) {
    return;
  }
  const cfg = window[cfgKey];

  if (!cfg.clients) {
    return;
  }

  delete cfg.clients[clientId];
}

export function registerInstance(
  instanceId: string,
  {
    onLoadCallback,
    onLoadCallbackName,
    ...loadGoogleRecaptchaScriptOptions
  }: LoadGoogleRecaptchaScriptOptions & {
    onLoadCallback?: () => void;
    onLoadCallbackName?: string;
  },
) {
  if (instances.size === 0) {
    initialize();
  }

  loadGoogleRecaptchaScript(loadGoogleRecaptchaScriptOptions);

  instances.add(instanceId);

  if (onLoadCallback) {
    if (isLoaded) {
      onLoadCallback();
    } else {
      onLoadCallbacks.add(onLoadCallback);
    }
  }

  if (onLoadCallbackName) {
    function callOnLoadCallbackIfExists() {
      if (!onLoadCallbackName) {
        return;
      }

      // @ts-ignore
      const maybeOnLoadCallback = window[onLoadCallbackName];

      if (typeof maybeOnLoadCallback === 'function') {
        maybeOnLoadCallback();
      }
    }

    if (isLoaded) {
      callOnLoadCallbackIfExists();
    } else {
      onLoadCallbacks.add(callOnLoadCallbackIfExists);
    }
  }
}

export function unregisterInstance(instanceId: string) {
  instances.delete(instanceId);

  if (instances.size === 0) {
    window.grecaptcha = undefined;

    window[cfgKey] = undefined;

    document.querySelector('.grecaptcha-badge')?.remove();

    document.querySelector(`script[src="${loadedUrl}"]`)?.remove();

    document.querySelector(`script[src^="https://www.gstatic.com/recaptcha/releases"]`)?.remove();

    loadedUrl = null;

    isLoaded = false;
  }
}
