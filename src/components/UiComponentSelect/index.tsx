import type { FC } from 'react';
import { Select, type SelectProps } from 'antd';
import { useMount, useMemoizedFn } from 'ahooks';
import type { UiComponentDataType } from '@/typings/ui';
import { useUiComponentModel } from './model';

export * from './model';

type UiComponentSelectProps = SelectProps & {
  onItemChange?: (item: UiComponentDataType) => void;
};

const UiComponentSelect: FC<UiComponentSelectProps> = (props) => {
  const { onItemChange, options = [], ...reset } = props;
  const s = useUiComponentModel();

  useMount(s.fetchData);

  const _options = options.length > 0 ? options : s.list;

  const handleChange = useMemoizedFn((val: string, item) => {
    onItemChange?.(item);
    props.onChange?.(val, item);
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
    />
  );
}

export default UiComponentSelect;