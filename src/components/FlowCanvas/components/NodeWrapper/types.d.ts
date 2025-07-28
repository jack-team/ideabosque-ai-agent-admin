import type { FC, ReactElement } from 'react';
import type { SelectFormData, SelectNodeDrawerProps } from '../SelectNodeDrawer/types';
import type { CustomNodeProps } from '../../types';
import type { FormProps } from '../../nodes/types';

export type NodeBranchType = {
  id: string;
  label?: string;
}

export type EnableHandleType = {
  // 是否显示来源句柄
  source?: boolean;
  // 是否显示目标句柄
  target?: boolean;
}

export type ToolsType = {
  // 编辑表单
  editForm?: EditFormType;
}

export type NodeWrapperProps = {
  // 分支
  branch?: NodeBranchType[];
  nodeProps: CustomNodeProps;
  enableHandle?: EnableHandleType;
  children?: ReactElement | ReactElement[];
  onAddNode?: (formData: SelectFormData) => Promise<void>;
} & Partial<Omit<ToolsProps, 'nodeId'>>;

export type EditFormType = {
  title?: string;
  width?: number;
  Component: FC<FormProps>;
  formData?: Record<string, any>;
}

export type ToolsProps = {
  nodeId: string;
  // 工具栏
  tools: ToolsType;
}
