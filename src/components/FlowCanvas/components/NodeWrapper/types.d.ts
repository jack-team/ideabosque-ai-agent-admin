import type { FC, ReactElement } from 'react';
import type { SelectFormData } from '../SelectNodeDrawer/types';
import type { CustomNodeProps } from '../../types';
import type { FormProps } from '../../nodes/types';

export type NodeBranchType = {
  id: string;
  label?: string;
}

export type NodeWrapperProps = {
  enableHandle?: {
    // 是否显示来源句柄
    source?: boolean;
    // 是否显示目标句柄
    target?: boolean;
  };
  // 分支
  branch?: NodeBranchType[];
  children?: ReactElement | ReactElement[];
  onAddNode?: (formData: SelectFormData) => Promise<void>;
  nodeProps: CustomNodeProps;
  showTool?: boolean;
} & ToolsProps;

export type ToolsProps = {
  nodeId: string;
  Form?: FC<FormProps>;
  editFormTitle?: string;
  editFormData?: Record<string, any>;
}