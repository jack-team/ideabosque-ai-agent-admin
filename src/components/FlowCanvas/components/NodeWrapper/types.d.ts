import type { FC, ReactElement } from 'react';
import type { SelectFormData, SelectNodeDrawerProps } from '../SelectNodeDrawer/types';
import type { CustomNodeProps } from '../../types';
import type { FormProps } from '../../nodes/types';

export type NodeBranchType = {
  id: string;
  value: string;
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

export type NodeWrapperProps = BranchProps & {
  enableHandle?: EnableHandleType;
  onAddNode?: (formData: SelectFormData) => Promise<void>;
} & Partial<Omit<ToolsProps, 'nodeId'>>;

export type BranchProps = {
  // 分支
  branch?: NodeBranchType[];
} & Pick<SelectNodeDrawerProps, 'onChange'>;

export type EditFormType = {
  title?: string;
  width?: number;
  Component: FC<FormProps>;
}

export type ToolsProps = {
  nodeId: string;
  // 工具栏
  tools: ToolsType;
}

export type BranchGroupProps = Pick<SelectNodeDrawerProps, 'onChange'> & {
  id: string;
}

export type NodeWrapperContextTypes = Partial<{
  openCanvasDetail: () => void;
  renderEditForm: (trigger: ReactElement<any>) => ReactElement | null;
}>;