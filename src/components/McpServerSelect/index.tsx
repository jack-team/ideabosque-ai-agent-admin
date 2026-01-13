import type { FC } from 'react';
import { Select, type SelectProps } from 'antd';
import { useMount, useMemoizedFn } from 'ahooks';
import type { McpServerDataType } from '@/typings/mcp';
import { withSelect } from '@/utils/withSelect';
import { useMcpServerModel } from './model';

export * from './model';

type LLMSelectProps = SelectProps & {
  onItemChange?: (item: McpServerDataType) => void;
};

const McpServerSelect: FC<LLMSelectProps> = (props) => {
  const { onItemChange, options = [], ...reset } = props;
  const s = useMcpServerModel();

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
        label: 'mcpLabel',
        value: 'mcpServerUuid'
      }}
      loading={s.loading}
      onChange={handleChange}
      placeholder="Please select"
    />
  );
}

export default withSelect(McpServerSelect);