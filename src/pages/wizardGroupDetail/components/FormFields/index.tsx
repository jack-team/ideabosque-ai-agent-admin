import { useMemoizedFn } from 'ahooks';
import { type FC, Fragment, type RefObject } from 'react';
import { ProFormList, type FormListActionType, ProFormDependency, type ProFormItemProps } from '@ant-design/pro-components';
import AddButton from '../AddButton';
import { TriggerModal } from '@/components';
import AddMenuForm from './AddMenuForm';
import Fields, { type EditFormProps } from './fields';
import { getNestedValue } from '../../helper';
import styles from './styles.module.less';

type FormFieldsProps = {
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

  const handleAdd = useMemoizedFn((data: Record<string, any>) => {
    console.log(data);
    actionRef.current?.add(data);
  });

  return (
    <Fragment>
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
                destroyOnHidden
                title={addFormTitle}
                trigger={(
                  <AddButton
                    text={addFormTitle}
                    style={{ marginTop }}
                  />
                )}
              >
                <AddMenuForm onSubmit={handleAdd} />
              </TriggerModal>
            );
          }}
        </ProFormDependency>
      )}
    </Fragment>
  );
}

export default FormFields;