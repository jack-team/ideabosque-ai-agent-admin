import type { FC } from 'react';
import { Button, Row, Col } from 'antd';
import { useSafeState } from 'ahooks';
import { PageContainer, } from '@ant-design/pro-components';
import Statistic from './components/Statistic';
import AgentSales from './components/AgentSales';
import Newleads from './components/Newleads';
import AgentBookedMeetings from './components/AgentBookedMeetings';
import CalendarFilter from './components/CalendarFilter';
import Welcome from './components/Welcome';

const Dashboard: FC = () => {
  const [
    welcomeOpen,
    setWelcomeOpen
  ] = useSafeState(true);

  return (
    <PageContainer
      title="Dashboard"
      className="shopify"
      extra={[
        <Button
          key="1"
          className="shopify gray"
        >
          Add customer group
        </Button>,
        <Button
          type="primary"
          key="2"
          className="shopify"
        >
          Create workflow
        </Button>
      ]}
    >
      <Statistic />
      <Row gutter={24}>
        <Col xl={14} sm={24} lg={12} xs={12}>
          <AgentSales />
        </Col>
        <Col xl={10} sm={24} lg={12} xs={12}>
          <Newleads />
        </Col>
      </Row>
      <Row gutter={24}>
        <Col xl={18} sm={24} lg={12} xs={12}>
          <AgentBookedMeetings />
        </Col>
        <Col xl={6} sm={24} lg={12} xs={12}>
          <CalendarFilter />
        </Col>
      </Row>
      <Welcome
        open={welcomeOpen}
        onClose={() => setWelcomeOpen(false)}
        onOpen={() => setWelcomeOpen(true)}
      />
    </PageContainer>
  );
}

export default Dashboard;