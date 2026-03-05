import { type FC, Fragment } from 'react';
import { ProFormText, ProFormSelect } from '@ant-design/pro-components';
import type { ElementResultOptionType } from '../../types';
import { getListData } from './helper';

type InputPramsFormItemsProps = {
  inputParams?: ElementResultOptionType[];
}

const InputPramsFormItems: FC<InputPramsFormItemsProps> = (props) => {
  const { inputParams = [] } = props;

  return inputParams.map(item => {
    const options = item.options || [];

    const formItemProps = {
      label: item.label,
      name: item.name,
      disabled: item.disabled,
      readonly: item.readonly,
      initialValue: item.initialValue,
      rules: [{ required: item.required }]
    }

    const isSelect = options.length || item.actionFunc;

    return (
      <Fragment key={item.name}>
        {
          !isSelect ?
            <ProFormText {...formItemProps} /> :
            <ProFormSelect
              {...formItemProps}
              request={async () => {
                if (item.actionFunc) {
                  return getListData(item.actionFunc);
                }
                return options;
              }}
            />
        }
      </Fragment>
    );
  });
}

export default InputPramsFormItems;