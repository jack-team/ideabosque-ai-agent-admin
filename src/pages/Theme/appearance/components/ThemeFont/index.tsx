import { type FC } from 'react';
import { ProForm, ProFormItem } from '@ant-design/pro-components';
import { pathToObj } from '@/utils';
import SliderInput from '../SliderInput';
import CustomCollapse from '../CustomCollapse';
import { configs, initFormData } from './configs';
import styles from './styles.module.less';

type ThemeFontProps = {
  sdk: Record<string, any>;
}

const ThemeFont: FC<ThemeFontProps> = (props) => {
  const { sdk } = props;
  const [form] = ProForm.useForm();

  return (
    <CustomCollapse
      title="Text font"
    >
      <ProForm
        form={form}
        initialValues={initFormData}
        className={styles.container}
        submitter={false}
        onFieldsChange={arr => {
          for (const item of arr) {
            const obj = pathToObj(item.name, `${item.value}px`);
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
              <SliderInput />
            </ProFormItem>
          );
        })}
      </ProForm>
    </CustomCollapse>
  );
}

export default ThemeFont;