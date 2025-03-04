/// <reference types="react/canary" />
import { use as originalUse, useContext } from 'react';

type Usable<T> = Promise<T> | React.Context<T>;

const STATUS = {
  PENDING: 'pending',
  REJECTED: 'rejected',
  FULFILLED: 'fulfilled',
} as const;

type TState<T> =
  | { status: typeof STATUS.PENDING; promise: Promise<void> }
  | { status: typeof STATUS.REJECTED; error: Error }
  | { status: typeof STATUS.FULFILLED; result: T };

// biome-ignore lint/suspicious/noExplicitAny: Impossible to type
const states = new Map<Promise<unknown>, TState<any>>();

function usePromiseFallback<T>(usable: Promise<T>): T {
  const existingState = states.get(usable);

  const state: TState<T> =
    existingState ||
    (() => {
      const promise = usable
        .then((data) => {
          states.set(usable, {
            status: STATUS.FULFILLED,
            result: data,
          });
        })
        .catch((error) => {
          states.set(usable, {
            status: STATUS.REJECTED,
            error,
          });
        });

      const newState: TState<T> = { status: 'pending', promise: promise };
      states.set(usable, newState);
      return newState;
    })();

  switch (state.status) {
    case STATUS.PENDING:
      // Suspend the component while fetching
      throw state.promise;
    case STATUS.REJECTED:
      // Result is an error
      throw state.error;
    case STATUS.FULFILLED:
      // Result is a fulfilled promise
      return state.result;
  }
}

function useContextFallback<T>(context: React.Context<T>) {
  return useContext(context);
}

function useFallback<T>(usable: Usable<T>): T {
  if (usable instanceof Promise) {
    return usePromiseFallback(usable);
  }

  return useContextFallback(usable);
}

const use = originalUse || useFallback;

export default use;
