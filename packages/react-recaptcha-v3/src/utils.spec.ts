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

    const script = document.head.querySelector('script');

    expect(script).not.toBeNull();
    expect(script?.async).toBe(true);
    expect(script?.defer).toBe(true);
    expect(script?.id).toBe('test-script');
    expect(script).toHaveAttribute('nonce', 'test-nonce');
    expect(script?.src).toBe('https://example.com/script.js');
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

    const script = document.body.querySelector('script');

    expect(script).not.toBeNull();
    expect(script?.async).toBe(true);
    expect(script?.defer).toBe(true);
    expect(script?.id).toBe('test-script');
    expect(script).toHaveAttribute('nonce', 'test-nonce');
    expect(script?.src).toBe('https://example.com/script.js');
  });

  it('should not set async and defer if they are undefined', () => {
    loadScript({ appendTo: 'head', id: 'test-script', src: 'https://example.com/script.js' });

    const script = document.head.querySelector('script');
    expect(script).not.toBeNull();
    expect(script?.async).toBe(false);
    expect(script?.defer).toBe(false);
  });
});
