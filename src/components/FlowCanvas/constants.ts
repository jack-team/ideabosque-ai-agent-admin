import type { NormalNodeType } from './types';

export const DefaultSourceId = "default_source_handle";
export const DefaultTargetId = "default_target_handle";
export const StartNodeId = "start-id";

export const DefaultStartNode: NormalNodeType = {
  id: StartNodeId,
  type: 'start',
  data: { formData: {} },
  position: { x: 0, y: 0 }
}