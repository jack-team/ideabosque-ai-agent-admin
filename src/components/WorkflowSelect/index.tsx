import type { FC } from 'react';
import { Select, type SelectProps } from 'antd';
import { useMount, useMemoizedFn } from 'ahooks';
import type { WorkflowDataType } from '@/typings/workflow';
import { useWorkflowModel } from './model';
import { withSelect } from '@/utils/withSelect';

export * from './model';

type LLMSelectProps = SelectProps & {
  onItemChange?: (item: WorkflowDataType) => void;
};

const WorkflowSelect: FC<LLMSelectProps> = (props) => {
  const { onItemChange, options = [], ...reset } = props;

  const s = useWorkflowModel();

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
        label: 'flowName',
        value: 'flowSnippetVersionUuid'
      }}
      loading={s.loading}
      onChange={handleChange}
      placeholder="Please select"
    />
  );
}

export default withSelect(WorkflowSelect);