import { type FC, Fragment, useRef } from 'react';
import { type FormListActionType } from '@ant-design/pro-components';
import FormFields from '../FormFields';
import AddMenuForm from '../FormFields/AddMenuForm';
import styles from './styles.module.less';

const fileds = [
  'title',
  'attrName',
  'attrType',
  'dataType',
  'priority',
  'required',
];

type MenuItemsProps = {
  showAddBtn?: boolean;
  title: string;
};

const MenuItems: FC<MenuItemsProps> = (props) => {
  const actionRef = useRef<FormListActionType>(undefined);

  return (
    <Fragment>
      <div className={styles.title}>
        {props.title}
      </div>
      <FormFields
        fields={fileds}
        name={["form_schema", "items"]}
        actionRef={actionRef}
        EditForm={AddMenuForm}
        titleField="element_title"
        addFormTitle="Add menu item"
        editFormTitle="Menu Item Details"
        {...props}
      />
    </Fragment>
  );
}

export default MenuItems;