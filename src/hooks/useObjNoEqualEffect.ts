import _ from 'lodash';
import * as uuid from 'uuid';
import { useEffect } from 'react';
import { type EffectCallback, useRef } from 'react';

export const useObjNoEqualEffect = (effect: EffectCallback, dep: Record<string, any> = {}) => {
  const prevUpdateId = useRef<string>(uuid.v4());
  const prevDepRef = useRef<Record<string, any>>({});

  const updateId = (() => {
    if (!_.isEqual(prevDepRef.current, dep)) {
      prevDepRef.current = dep;
      prevUpdateId.current = uuid.v4();
    }
    return prevUpdateId.current;
  })();

  useEffect(effect, [updateId]);
}