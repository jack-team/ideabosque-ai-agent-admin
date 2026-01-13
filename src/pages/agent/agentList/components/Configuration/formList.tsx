import { useRef } from 'react';
import { useMemoizedFn } from 'ahooks';
import { ProFormList, type ProFormListProps, type FormListActionType } from '@ant-design/pro-components';

function FormList<T>(props: ProFormListProps<T>) {
  const actionRef = useRef<FormListActionType>(undefined);

  const beforeAddRow = useMemoizedFn(() => {
    actionRef.current?.add();
    return false;
  });

  return (
    <ProFormList
      {...props}
      alwaysShowItemLabel
      actionRef={actionRef}
      className="custom-form-list"
      actionGuard={{ beforeAddRow }}
    />
  );
}

export default FormList;