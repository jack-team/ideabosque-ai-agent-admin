import { type FC } from 'react';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { pathToObj } from '@/utils';
import CustomCollapse from '../CustomCollapse';
import { configs } from './configs';
import styles from './styles.module.less';

type ThemeColorsProps = {
  sdk: Record<string, any>;
}

const ThemeIcons: FC<ThemeColorsProps> = (props) => {
  const { sdk } = props;
  const [form] = ProForm.useForm();

  return (
    <CustomCollapse title="Text content">
      <ProForm
        form={form}
        size="large"
        className={styles.container}
        submitter={false}
        onFieldsChange={arr => {
          for (const item of arr) {
            const obj = pathToObj(item.name, item.value);
            sdk.updateThemeConfigs(obj)
          }
        }}
      >
        {configs.map((item, i) => {
          return (
            <ProFormText
              key={i}
              label={item.label}
              name={item.name}
            />
          );
        })}
      </ProForm>
    </CustomCollapse>
  );
}

export default ThemeIcons;