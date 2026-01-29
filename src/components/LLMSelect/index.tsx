import type { FC } from 'react';
import { Select, type SelectProps } from 'antd';
import { useMemoizedFn, useMount } from 'ahooks';
import type { LLMDataType } from '@/typings/llm';
import { useLlmModel } from './model';

export * from './model';

type LLMSelectProps = SelectProps & {
  autoFetch?: boolean;
  onItemChange?: (item: LLMDataType) => void;
};

const LLMSelect: FC<LLMSelectProps> = (props) => {
  const { onItemChange, options = [], autoFetch = true, ...reset } = props;
  const s = useLlmModel();

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
        label: 'llmProvider',
        value: 'llmProvider'
      }}
      loading={s.loading}
      onChange={handleChange}
      placeholder="Please select"
      onOpenChange={open => {
        if (open && !autoFetch) {
          s.fetchData();
        }
      }}
    />
  );
}

export default LLMSelect;