import { useRef, useEffect } from 'react';
import { useMemoizedFn } from 'ahooks';

type NullObj = Record<string, any> | undefined;

/**
 * 获取实例
*/
export function useInstance<T extends object = {}>(init: T) {
  return [useRef<T>(init).current];
}

export function useInstanceHandler<T extends NullObj>(instance: T, handler: () => T) {
  const result = handler();

  const listener = useMemoizedFn(() => {
    if (!instance || !result) return;
    Object.keys(result).forEach(key => {
      instance[key] = result[key]
    });
  });

  useEffect(listener, [result, listener]);
}