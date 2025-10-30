import { afterEach, describe, expect, it } from 'vitest';

import { loadScript } from './utils.js';

describe('loadScript', () => {
  afterEach(() => {
    document.head.innerHTML = '';
    document.body.innerHTML = '';
  });

  it('should append script to head when appendTo is head', () => {
    loadScript({
      async: true,
      appendTo: 'head',
      defer: true,
      id: 'test-script',
      nonce: 'test-nonce',
      src: 'https://example.com/script.js',
    });

    const script = document.head.querySelector(
      'script[src="https://example.com/script.js"]',
    ) as HTMLScriptElement | null;

    expect(script).not.toBeNull();

    if (!script) {
      throw new Error('Script not found');
    }

    expect(script).toHaveAttribute('async');
    expect(script).toHaveAttribute('defer');
    expect(script).toHaveAttribute('id', 'test-script');
    expect(script).toHaveAttribute('nonce', 'test-nonce');
    expect(script).toHaveAttribute('src', 'https://example.com/script.js');
  });

  it('should append script to body when appendTo is body', () => {
    loadScript({
      async: true,
      appendTo: 'body',
      defer: true,
      id: 'test-script',
      nonce: 'test-nonce',
      src: 'https://example.com/script.js',
    });

    const script = document.body.querySelector(
      'script[src="https://example.com/script.js"]',
    ) as HTMLScriptElement | null;

    expect(script).not.toBeNull();

    if (!script) {
      throw new Error('Script not found');
    }

    expect(script).toHaveAttribute('async');
    expect(script).toHaveAttribute('defer');
    expect(script).toHaveAttribute('id', 'test-script');
    expect(script).toHaveAttribute('nonce', 'test-nonce');
    expect(script).toHaveAttribute('src', 'https://example.com/script.js');
  });

  it('should not set async and defer if they are undefined', () => {
    loadScript({
      appendTo: 'head',
      id: 'test-script',
      src: 'https://example.com/script.js',
    });

    const script = document.head.querySelector(
      'script[src="https://example.com/script.js"]',
    ) as HTMLScriptElement | null;

    expect(script).not.toBeNull();

    if (!script) {
      throw new Error('Script not found');
    }

    expect(script).not.toHaveAttribute('async');
    expect(script).not.toHaveAttribute('defer');
  });
});
