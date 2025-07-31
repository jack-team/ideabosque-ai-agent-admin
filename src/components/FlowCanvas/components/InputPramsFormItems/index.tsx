import { type FC, Fragment } from 'react';
import { ProFormText, ProFormSelect } from '@ant-design/pro-components';
import type { ElementResultOptionType } from '../../types';

type InputPramsFormItemsProps = {
  inputParams?: ElementResultOptionType[];
}

const InputPramsFormItems: FC<InputPramsFormItemsProps> = (props) => {
  const { inputParams = [] } = props;

  return inputParams.map(item => {
    const options = item.options;

    const formItemProps = {
      label: item.label,
      name: item.name,
      disabled: item.disabled,
      readonly: item.readonly,
      initialValue: item.initialValue,
      rules: [{ required: item.required }]
    }

    return (
      <Fragment key={item.name}>
        {
          !options?.length ?
            <ProFormText {...formItemProps} /> :
            <ProFormSelect {...formItemProps} options={options} />
        }
      </Fragment>
    );
  });
}

export default InputPramsFormItems;