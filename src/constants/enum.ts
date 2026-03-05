export enum StatusEnum {
  Active = 'active',
  Inactive = 'inactive'
}

export const StatusMap = {
  [StatusEnum.Active]: 'common.active',
  [StatusEnum.Inactive]: 'common.inactive'
}

export enum ComponentType {
  wizardGroup = 'wizard_group',
  externalIntegration = 'external_integration',
  internalComponent = 'internal_component'
}

export const ComponentTypeMap = {
  [ComponentType.wizardGroup]: "Wizard group",
  [ComponentType.externalIntegration]: "External integration",
  [ComponentType.internalComponent]: 'Internal component'
}

export enum ValueListFunct {
  WizardGroupList = 'wizardGroupList'
}

export const ValueListFunctMap = {
  [ValueListFunct.WizardGroupList]: 'uiBlockGroup.uiBlockGroups'
}