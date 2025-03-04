export type ReCaptchaInstance = {
  execute?: (
    clientIdOrReCaptchaKey: number | string,
    options: { action?: string },
  ) => Promise<string>;
  render?: (container: string | HTMLElement, options: Record<string, unknown>) => number;
};

export type ScriptProps = {
  async?: boolean;
  appendTo?: 'head' | 'body';
  defer?: boolean;
  id?: string;
  nonce?: string;
  src: string;
};
