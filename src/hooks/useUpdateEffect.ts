import _ from 'lodash';
import * as uuid from 'uuid';
import { useEffect } from 'react';
import { type EffectCallback, useRef } from 'react';

export const useUpdateEffect = (effect: EffectCallback, dep?: Record<string, any>) => {
  const depRef = useRef<Record<string, any>>(null);

  const getUpdateDep = () => {
    const preDep = depRef.current;
    // 不相等
    if (!_.isEqual(preDep, dep)) {
      depRef.current = dep!;
      return uuid.v4();
    }
  }
  
  useEffect(effect, [getUpdateDep()]);
}