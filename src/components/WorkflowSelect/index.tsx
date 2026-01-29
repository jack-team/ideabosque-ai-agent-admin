import type { FC } from 'react';
import { Select, type SelectProps } from 'antd';
import { useMount, useMemoizedFn } from 'ahooks';
import type { WorkflowDataType } from '@/typings/workflow';
import { useWorkflowModel } from './model';

export * from './model';

type LLMSelectProps = SelectProps & {
  autoFetch?: boolean;
  onItemChange?: (item: WorkflowDataType) => void;
};

const WorkflowSelect: FC<LLMSelectProps> = (props) => {
  const { onItemChange, options = [], autoFetch = true, ...reset } = props;

  const s = useWorkflowModel();

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
        label: 'flowName',
        value: 'flowSnippetVersionUuid'
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

export default WorkflowSelect;