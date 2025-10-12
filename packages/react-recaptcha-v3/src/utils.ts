import type { ScriptProps } from './types.js';

export function loadScript({ async, appendTo, defer, id, nonce, src }: ScriptProps) {
  const script = document.createElement('script');
  if (async !== undefined) {
    script.setAttribute('async', '');
  }
  if (defer !== undefined) {
    script.setAttribute('defer', '');
  }
  if (id) {
    script.setAttribute('id', id);
  }
  if (nonce) {
    script.setAttribute('nonce', nonce);
  }
  script.src = src;

  const appendTarget = appendTo === 'head' ? document.head : document.body;

  appendTarget.appendChild(script);
}
