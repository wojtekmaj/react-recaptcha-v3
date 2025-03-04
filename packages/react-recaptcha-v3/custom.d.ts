declare global {
  type Grecaptcha = {
    execute: (
      clientIdOrReCaptchaKey: number | string,
      options: { action?: string },
    ) => Promise<string>;
    getResponse: (action: string) => string;
    ready: (cb: () => void) => void;
    render: (container: string | HTMLElement, options: Record<string, unknown>) => number;
    reset: (widgetId: number) => void;
  };

  interface Window {
    grecaptcha?: Partial<Grecaptcha> & {
      enterprise?: Partial<Grecaptcha>;
      getPageId?: () => string;
    };
    ___grecaptcha_cfg?: {
      clients?: Record<string, Record<string, unknown>>;
      fns?: (() => void)[];
    };
  }
}

export {};
