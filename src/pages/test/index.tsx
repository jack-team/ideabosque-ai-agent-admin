import { Button } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import FlowCanvas, { useFlowInstance } from '@/components/FlowCanvas';
import type { UiComponentType, ActionFunctionType, OptionType } from '@/components/FlowCanvas/types';

const uiComponents: UiComponentType[] = [
  {
    componentId: '36258109583875916493',
    componentName: 'Google Place',
    componentTag: 'GooglePlace',
    componentType: 'external_integration',
    input: [
      {
        label: 'Google ApiKey',
        value: 'googleApiKey',
        required: true
      },
      {
        label: 'Keyword',
        value: 'keyword',
        required: true
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
        value: 'wizard_group_uuid',
        required: true
      },
      {
        label: 'Keyword',
        value: 'keyword',
        required: true
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

const actionFunctions: ActionFunctionType[] = [
  {
    name: 'data_collect',
    description: 'Collect data from the assistant',
    input: [
      {
        label: 'Data collect dataset',
        value: 'data_collect_dataset',
        required: true
      },
      {
        label: 'Place uuid',
        value: 'place_uuid',
        required: true
      }
    ]
  },
  {
    name: 'get_contact_profile',
    description: 'Retrieve Contact Profile',
    input: [
      {
        label: 'Contact',
        value: 'contact',
        required: true,
        children: [
          {
            label: 'Email',
            value: 'email',
            required: true
          },
          {
            label: 'First name',
            value: 'first_name',
            required: true
          },
          {
            label: 'Last name',
            value: 'last_name',
            required: true
          }
        ]
      },
      {
        label: 'Place',
        value: 'place',
        children: [
          {
            label: 'Place uuid',
            value: 'place_uuid',
            required: true
          }
        ]
      }
    ]
  },
  {
    name: 'get_google_place_setting',
    description: 'Get google place setting'
  },
  {
    name: 'get_products',
    description: 'Get Products',
    input: [
      {
        label: 'Email',
        value: 'email',
        required: true
      }
    ]
  },
  {
    name: 'get_question_group',
    description: 'Retrieve a question group',
    input: [
      {
        label: 'Place uuid',
        value: 'place_uuid',
        required: true
      }
    ]
  },
  {
    name: 'place_shopify_draft_order',
    description: 'Create Draft Order',
    input: [
      {
        label: 'Email',
        value: 'email',
        required: true
      },
      {
        label: 'Shipping address',
        value: 'shipping_address',
        required: true,
        children: [
          {
            label: 'Address1',
            value: 'address1',
            required: true
          },
          {
            label: 'Address2',
            value: 'address2',
            required: true
          },
          {
            label: 'City',
            value: 'city',
            required: true
          },
          {
            label: 'Company',
            value: 'company',
            required: true
          },
          {
            label: 'Country',
            value: 'country',
            required: true
          },
          {
            label: 'Country code',
            value: 'country_code',
            required: true
          },
          {
            label: 'First name',
            value: 'first_name',
            required: true
          },
          {
            label: 'Last name',
            value: 'last_name',
            required: true
          },
          {
            label: 'Phone',
            value: 'phone',
            required: true
          },
          {
            label: 'Province',
            value: 'province',
            required: true
          },
          {
            label: 'Province code',
            value: 'province_code',
            required: true
          },
          {
            label: 'Zip',
            value: 'zip',
            required: true
          }
        ]
      }
    ]
  },
  {
    name: 'submit_request',
    description: 'Submit a request',
    input: [
      {
        label: 'UUID for the contact',
        value: 'contact_uuid',
        required: true
      },
      {
        label: 'UUID for the place',
        value: 'place_uuid',
        required: true
      },
      {
        label: 'The request detail',
        value: 'request_detail',
        required: true
      },
      {
        label: 'The request title',
        value: 'request_title',
        required: true
      }
    ]
  }
];

const transformTools: OptionType[] = [
  {
    label: 'Summarize',
    value: 'summarize'
  },
  {
    label: 'Full content',
    value: 'full_content'
  },
  {
    label: 'Structure input',
    value: 'structure_input'
  }
];

const Test = () => {
  const [flow] = useFlowInstance();

  return (
    <PageContainer
      title="Flow Canvas"
      className="shopify full-screen"
      extra={
        <Button onClick={() => {
          console.log(flow.getData())
        }}>
          Save
        </Button>
      }
    >
      <FlowCanvas
        flow={flow}
        actions={actionFunctions}
        uiComponents={uiComponents}
        transformTools={transformTools}
      />
    </PageContainer>
  )
}

export default Test;