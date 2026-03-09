import { ValueListFunct, StatusEnum } from '@/constants/enum';
import { wizardGroupListApi } from '@/services/wizardGroup';
import { agentListApi } from '@/services/agent';
import type { OptionType } from '@/components/FlowCanvas/types';

export const getListData = async (action: string) => {
  switch (action) {
    // WizardGroupList
    case ValueListFunct.WizardGroupList: {
      const result = await wizardGroupListApi({});
      return result.data.map(item => {
        return {
          label: item.wizardGroupName,
          value: item.wizardGroupUuid
        } as OptionType
      });
    }
    case ValueListFunct.AgentList: {
      const result = await agentListApi({
        pageSize: 1000,
        current: 1,
        statuses: [StatusEnum.Active]
      });
      return result.data.map(item => {
        return {
          label: item.agentName,
          value: item.agentUuid
        } as OptionType;
      });
    }
  }
  return [];
}