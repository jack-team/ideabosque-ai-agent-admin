import { useBlocker, type Blocker } from 'react-router-dom';
import { useUpdateEffect, useMemoizedFn } from 'ahooks';

type BlockerBlocked = Extract<Blocker, { state: 'blocked' }>;

type LeaveCallback = (blocker: BlockerBlocked) => void;


/***
 * 离开页面的时候执行
 * 回调函数，调用blocker确定是否离开
*/
export const useLeavePage = (callback: LeaveCallback, shouldBlock = true) => {

  const blocker = useBlocker((e) => {
    const { currentLocation: c, nextLocation: n } = e;
    return shouldBlock && c.pathname !== n.pathname;
  });

  const onBlocked = useMemoizedFn(() => {
    callback(blocker as BlockerBlocked);
  });

  useUpdateEffect(() => {
    if (blocker.state === 'blocked') onBlocked();
  }, [blocker, onBlocked]);
}