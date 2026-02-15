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
