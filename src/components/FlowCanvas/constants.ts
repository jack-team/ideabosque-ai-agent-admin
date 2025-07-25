import type { NormalNodeType } from './types';

export const DefaultSourceId = "default_source_handle";
export const DefaultTargetId = "default_target_handle";

export const DefaultStartNode: NormalNodeType = {
  id: 'start-id',
  type: 'start-node',
  data: { formData: {} },
  position: { x: 0, y: 0 }
}