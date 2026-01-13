import { type FC, useRef } from 'react';
import { type FormListActionType } from '@ant-design/pro-components';
import FormFields, { type FormFieldsProps } from '../FormFields';
import AddMenuForm from '../FormFields/AddMenuForm';

const fileds = [
  'element_title',
  'element_uuid',
  'data_type',
  'attribute_type',
  'attribute_name',
  'pattern',
  'placeholder',
  'required',
  'option_values'
];

type MenuItemsProps = {
  showAddBtn?: boolean;
  name?: FormFieldsProps['name'];
};

const MenuItems: FC<MenuItemsProps> = (props) => {
  const actionRef = useRef<FormListActionType>(undefined);

  return (
    <FormFields
      fields={fileds}
      name={props.name}
      titleField="element_title"
      actionRef={actionRef}
      EditForm={AddMenuForm}
      addFormTitle="Add menu item"
      editFormTitle="Menu Item Details"
      {...props}
    />
  );
}

export default MenuItems;