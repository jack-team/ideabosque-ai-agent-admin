import { type FC, Fragment, useRef } from 'react';
import { type FormListActionType } from '@ant-design/pro-components';
import FormFields from '../FormFields';
import AddMenuForm from '../FormFields/AddMenuForm';
import styles from './styles.module.less';

const fileds = [
  'element_title',
  'attribute_name',
  'attribute_type',
  'data_type',
  'priority',
  'required'
];

type MenuItemsProps = {
  showAddBtn?: boolean;
};

const MenuItems: FC<MenuItemsProps> = (props) => {
  const actionRef = useRef<FormListActionType>(undefined);

  return (
    <Fragment>
      <div className={styles.title}>Menu items</div>
      <FormFields
        fields={fileds}
        name="elements"
        actionRef={actionRef}
        EditForm={AddMenuForm}
        titleField="element_title"
        {...props}
      />
    </Fragment>
  );
}

export default MenuItems;