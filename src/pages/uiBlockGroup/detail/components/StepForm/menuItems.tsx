import { type FC, useRef } from 'react';
import { type FormListActionType } from '@ant-design/pro-components';
import FormFields, { type FormFieldsProps } from '../FormFields';
import AddMenuForm from '../FormFields/AddMenuForm';

const fileds = [
  'elementTitle',
  'elementUuid',
  'dataType',
  'attributeType',
  'attributeName',
  'pattern',
  'placeholder',
  'required',
  'optionValues'
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
      titleField="elementTitle"
      actionRef={actionRef}
      EditForm={AddMenuForm}
      addFormTitle="Add menu item"
      editFormTitle="Menu Item Details"
      {...props}
    />
  );
}

export default MenuItems;