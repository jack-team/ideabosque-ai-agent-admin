import { type FC, Fragment } from 'react';
import { ProFormText, ProFormSelect } from '@ant-design/pro-components';
import { CalendarTypeMap, CalendarTypes } from '../../enum';
import { getFormNamePath } from '../../helper';
import styles from './styles.module.less';

const getName = (names: string[]) => {
  return getFormNamePath("scheduler", names);
}

const Scheduler: FC = () => {
  return (
    <Fragment>
      <div className={styles.title}>
        Scheduler connection
      </div>
      <ProFormSelect
        label="Calendar type"
        valueEnum={CalendarTypeMap}
        name={getName(["calendarType"])}
        initialValue={CalendarTypes.Hubspot}
        rules={[
          { required: true }
        ]}
      />
      <ProFormText
        label="API Key"
        name={getName(["apiKey"])}
        rules={[
          { required: true }
        ]}
        extra="Manage calendar setup through your calendar provider."
      />
    </Fragment>
  );
}

export default Scheduler;