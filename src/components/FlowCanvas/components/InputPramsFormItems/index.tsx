import { type FC, Fragment } from 'react';
import { ProFormText, ProFormSelect } from '@ant-design/pro-components';
import type { ElementResultOptionType } from '../../types';

type InputPramsFormItemsProps = {
  inputParams?: ElementResultOptionType[];
}

const InputPramsFormItems: FC<InputPramsFormItemsProps> = (props) => {
  const { inputParams = [] } = props;

  return (
    <Fragment>
      {inputParams.map(item => {
        const options = item.options;

        const formItemProps = {
          label: item.label,
          name: item.value,
          rules: [
            { required: item.required }
          ]
        }

        return (
          <Fragment key={item.value}>
            {
              !options?.length ?
                <ProFormText {...formItemProps} /> :
                <ProFormSelect {...formItemProps} options={options} />
            }
          </Fragment>
        )
      })}
    </Fragment>
  )
}

export default InputPramsFormItems;