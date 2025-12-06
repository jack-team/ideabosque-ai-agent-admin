import { type FC } from 'react';
import { Tag } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { ProForm, ProFormItem } from '@ant-design/pro-components';
import { pathToObj } from '@/utils';
import CustomCollapse from '../CustomCollapse';
import ColorPickerInput from '../ColorPickerInput';
import { configs, darkTheme } from './configs';
import styles from './styles.module.less';

type ThemeColorsProps = {
  sdk: Record<string, any>;
}

const ThemeColors: FC<ThemeColorsProps> = (props) => {
  const { sdk } = props;
  const [form] = ProForm.useForm();

  const onSetDark = useMemoizedFn(() => {
    form.setFieldsValue(darkTheme);
    sdk.updateThemeConfigs(darkTheme);
  });

  const onReset = useMemoizedFn(() => {
    sdk.resetThemeConfigs();
    form.resetFields();
  });

  return (
    <CustomCollapse
      title="Theme colors"
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
            console.log(obj)
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
              <ColorPickerInput />
            </ProFormItem>
          );
        })}
      </ProForm>
    </CustomCollapse>
  );
}

export default ThemeColors;