import { PageContainer } from '@ant-design/pro-components';
import FlowCanvas from '@/components/FlowCanvas';
import type { UiComponentType } from '@/components/FlowCanvas/types';

const uiComponents: UiComponentType[] = [
  {
    componentId: '36258109583875916493',
    componentName: 'Google Place',
    componentTag: 'GooglePlace',
    componentType: 'external_integration',
    input: [
      {
        label: 'Google ApiKey',
        value: 'googleApiKey'
      },
      {
        label: 'Keyword',
        value: 'keyword'
      }
    ],
    output: [
      {
        label: 'Place uuid',
        value: 'place_uuid'
      }
    ]
  },
  {
    componentId: '04131904947542049485',
    componentName: 'Wizard Group',
    componentTag: 'WizardGroup',
    componentType: 'wizard_group',
    input: [
      {
        label: 'Wizard GroupUuid',
        value: 'wizard_group_uuid'
      },
      {
        label: 'Keyword',
        value: 'keyword'
      }
    ],
    output: [
      {
        label: 'All required responses',
        value: 'all_required_responses'
      }
    ]
  }
];

const Test = () => {
  return (
    <PageContainer className="shopify full-screen">
      <FlowCanvas
        uiComponents={uiComponents}
      />
    </PageContainer>
  )
}

export default Test;