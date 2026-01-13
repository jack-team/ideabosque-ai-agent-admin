import type { FC } from 'react';
import { Select, type SelectProps } from 'antd';
import { useMount, useMemoizedFn } from 'ahooks';
import type { LLMDataType } from '@/typings/llm';
import { withSelect } from '@/utils/withSelect';
import { useLlmModel } from './model';

export * from './model';

type LLMSelectProps = Omit<SelectProps, 'options'> & {
  onItemChange?: (item: LLMDataType) => void;
};

const LLMSelect: FC<LLMSelectProps> = (props) => {
  const { onItemChange, ...reset } = props;
  const s = useLlmModel();

  useMount(s.fetchData);

  const handleChange = useMemoizedFn((val: string, item) => {
    onItemChange?.(item);
    props.onChange?.(val, item);
  });

  return (
    <Select
      {...reset}
      allowClear
      options={s.list}
      fieldNames={{
        label: 'llmProvider',
        value: 'llmProvider'
      }}
      loading={s.loading}
      onChange={handleChange}
      placeholder="Please select"
    />
  );
}

export default withSelect(LLMSelect);