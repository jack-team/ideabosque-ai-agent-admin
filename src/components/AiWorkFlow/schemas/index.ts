import type { GetShemasFn, GetShemasParams } from './types';
import { uiSchema } from './ui.schema';
import { stepShema } from './step.schema';
import { PromptShema } from './prompt.schema';
import { branchSchema } from './branch.schema';
import { actionSchema } from './action.schema';
import { transformSchema } from './transform.schema';

export const getShemas = (params: GetShemasParams) => {
  return [
    uiSchema,
    stepShema,
    PromptShema,
    actionSchema,
    branchSchema,
    transformSchema
  ].map((fn: GetShemasFn) => fn(params))
}

export default getShemas;