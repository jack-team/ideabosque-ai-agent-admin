import type { FC } from 'react';
import { Select, type SelectProps } from 'antd';
import { useMount, useMemoizedFn } from 'ahooks';
import type { UiComponentDataType } from '@/typings/ui';
import { useUiComponentModel } from './model';

export * from './model';

type UiComponentSelectProps = SelectProps & {
  autoFetch?: boolean;
  onItemChange?: (item: UiComponentDataType) => void;
};

const UiComponentSelect: FC<UiComponentSelectProps> = (props) => {
  const { onItemChange, options = [], autoFetch = true, ...reset } = props;
  const s = useUiComponentModel();

  const _options = s.list.length > 0 ? s.list : options;

  const handleChange = useMemoizedFn((val: string, item) => {
    onItemChange?.(item);
    props.onChange?.(val, item);
  });

  useMount(() => {
    if (autoFetch) {
      s.fetchData();
    }
  });

  return (
    <Select
      {...reset}
      allowClear
      options={_options}
      fieldNames={{
        label: 'tagName',
        value: 'uiComponentUuid'
      }}
      loading={s.loading}
      onChange={handleChange}
      placeholder="Please select"
      onOpenChange={open => {
        if (open && !autoFetch) {
          s.fetchData()
        }
      }}
    />
  );
}

export default UiComponentSelect;