import type { FC } from 'react';
import AtomModalForm from '../../components/AtomModalForm';
import type { AtomFormProps } from '../types';

const UiAtomForm: FC<AtomFormProps> = (props) => {
  return (
    <AtomModalForm
      edit={props.edit}
      atomName="ui node"
      onSubmit={props.onSubmit}
      columns={[
        {
          name: 'component',
          title: 'UI Component',
          formItemProps: {
            rules: [
              { required: true }
            ]
          }
        },
        {
          name: 'description',
          title: 'Description'
        }
      ]}
    >
      {props.children}
    </AtomModalForm>
  );
}

export default UiAtomForm;