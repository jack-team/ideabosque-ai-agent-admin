import type { FC } from 'react';
import { Select, type SelectProps } from 'antd';
import { useMount, useMemoizedFn } from 'ahooks';
import type { McpServerDataType } from '@/typings/mcp';
import { useMcpServerModel } from './model';

export * from './model';

type LLMSelectProps = SelectProps & {
  autoFetch?: boolean;
  onItemChange?: (item: McpServerDataType) => void;
};

const McpServerSelect: FC<LLMSelectProps> = (props) => {
  const { onItemChange, options = [], autoFetch, ...reset } = props;
  const s = useMcpServerModel();

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
        label: 'mcpLabel',
        value: 'mcpServerUuid'
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

export default McpServerSelect;