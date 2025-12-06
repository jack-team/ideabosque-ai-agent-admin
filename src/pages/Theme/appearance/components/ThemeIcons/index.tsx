import { type FC } from 'react';
import { Tag } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { ProForm, ProFormItem } from '@ant-design/pro-components';
import { pathToObj } from '@/utils';
import UploadInput from '@/components/UploadInput';
import CustomCollapse from '../CustomCollapse';
import { configs, darkTheme } from './configs';
import styles from './styles.module.less';

type ThemeColorsProps = {
  sdk: Record<string, any>;
}

const ThemeIcons: FC<ThemeColorsProps> = (props) => {
  const { sdk } = props;
  const [form] = ProForm.useForm();

  const onSetDark = useMemoizedFn(() => {
    form.setFieldsValue(darkTheme);
    console.log(darkTheme)
    sdk.updateThemeConfigs(darkTheme);
  });

  const onReset = useMemoizedFn(() => {
    sdk.resetThemeConfigs();
    form.resetFields();
  });

  return (
    <CustomCollapse
      title="Theme icons"
      tags={[
        <Tag key="default" onClick={onReset}>Default</Tag>,
        <Tag key="dark" onClick={onSetDark}>Dark</Tag>
      ]}
    >
      <ProForm
        form={form}
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
            <ProFormItem
              key={i}
              label={item.label}
              name={item.name}
            >
              <UploadInput namespace="sdk-icons" reviewImg />
            </ProFormItem>
          );
        })}
      </ProForm>
    </CustomCollapse>
  );
}

export default ThemeIcons;