import { ValueListFunct } from '@/constants/enum';
import { wizardGroupListApi } from '@/services/wizardGroup';
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
  }
  return [];
}