import type { FC } from 'react';
import { Tabs } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import AIMarketing from './tabs/aiMarketing';

const Settings: FC = () => {
  return (
    <PageContainer title="Settings">
      <Tabs items={[
        {
          key: 'ai_marketing',
          label: 'AI Marketing',
          children: <AIMarketing />
        }
      ]}
      />
    </PageContainer>
  )
}

export default Settings;