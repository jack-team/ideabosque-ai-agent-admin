import { useMemoizedFn } from 'ahooks';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { type FC, type RefObject } from 'react';
import { ProFormList, type FormListActionType, ProFormDependency, type ProFormItemProps } from '@ant-design/pro-components';
import AddButton from '../AddButton';
import AddMenuForm from './AddMenuForm';
import { TriggerModal } from '@/components';
import { getNestedValue } from '../../helper';
import Fields, { type EditFormProps } from './fields';
import styles from './styles.module.less';

export type FormFieldsProps = {
  floor?: number;
  fields: string[];
  titleField: string;
  showAddBtn?: boolean;
  EditForm: FC<EditFormProps>;
  editFormTitle: string;
  addFormTitle?: string;
  name: NonNullable<ProFormItemProps['name']>;
  actionRef: RefObject<FormListActionType | undefined>;
}

const FormFields: FC<FormFieldsProps> = (props) => {
  const {
    name,
    fields = [],
    titleField,
    floor = 0,
    actionRef,
    EditForm,
    editFormTitle,
    addFormTitle,
    showAddBtn = true,
  } = props;

  const handleAdd = useMemoizedFn(
    (data: Record<string, any>) => {
      actionRef.current?.add(data);
    }
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <ProFormList
        name={name}
        actionRef={actionRef}
        copyIconProps={false}
        deleteIconProps={false}
        creatorButtonProps={false}
        style={{ marginBottom: 0 }}
        className={styles.sub_list}
      >
        {(_, index, action) => {
          const formData = action.getCurrentRowData();
          return (
            <Fields
              index={index}
              floor={floor}
              action={action}
              fields={fields}
              formData={formData}
              EditForm={EditForm}
              showAddBtn={showAddBtn}
              editFormTitle={editFormTitle}
              title={formData[titleField]}
            />
          )
        }}
      </ProFormList>
      {!floor && (
        <ProFormDependency name={name}>
          {(formData) => {
            const stpes = getNestedValue(formData, name);
            const marginTop = stpes?.length ? 12 : 0;
            return (
              <TriggerModal
                width={480}
                destroyOnHidden
                title={addFormTitle}
                children={<AddMenuForm onSubmit={handleAdd} />}
                trigger={<AddButton text={addFormTitle} style={{ marginTop }} />}
              />
            );
          }}
        </ProFormDependency>
      )}
    </DndProvider>
  );
}

export default FormFields;