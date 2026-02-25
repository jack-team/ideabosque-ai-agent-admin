import { useMemoizedFn, useSafeState } from 'ahooks'
import { Space } from 'antd';
import Iocn from '@ant-design/icons';
import classNames from 'classnames';
import { type FC, useRef } from 'react';
import DargCard from './DargCard';
import { EditIcon, DeleteIcon, PlusCircleIcon, DragHandleIcon, ChevronDownIcon, ChevronUpIcon } from '@shopify/polaris-icons';
import { ProFormText, type ProFormListProps, type FormListActionType, ProFormDependency } from '@ant-design/pro-components';
import IconButton from '@/components/IconButton';
import TriggerModal from '@/components/TriggerModal';
import { useLang } from '@/hooks/useLang';
import AddOptionForm from './AddOptionForm';
import FormFields from '.';
import { getNestedValue } from '../../helper';
import styles from './styles.module.less';

type RowActionType = Extract<
  NonNullable<ProFormListProps<any>['children']>,
  Function
>;

export type EditFormProps = {
  formData?: Record<string, any>;
  onSubmit?: (formData: Record<string, any>) => void;
}

type FieldsProps = {
  fields: string[];
  title: string;
  // form list 的下标
  index: number;
  // 递归到第几层
  floor?: number;
  // 编辑的表单
  showAddBtn?: boolean;
  EditForm: FC<EditFormProps>;
  formData?: Record<string, any>;
  action: Parameters<RowActionType>[2];
  editFormTitle: string;
}

const optionsName = ['optionValues'];

const Fields: FC<FieldsProps> = (props) => {
  const {
    index,
    action,
    floor = 0,
    EditForm,
    fields = [],
    editFormTitle,
    showAddBtn = true
  } = props;

  const isTop = floor === 0;
  const enableSub = isTop && showAddBtn;
  const { t } = useLang();
  const [showSubItems, setShowSubItems] = useSafeState(false);
  const actionRef = useRef<FormListActionType>(undefined);

  const handleAdd = useMemoizedFn((data: Record<string, any>) => {
    actionRef.current?.add(data);
  });

  const handleDelete = useMemoizedFn(() => {
    action.remove(index);
  });

  return (
    <ProFormDependency name={optionsName}>
      {formData => {
        const options = getNestedValue(
          formData,
          optionsName
        );

        const hasSub = !!options?.length;

        return (
          <DargCard
            index={index}
            moveCard={action.move}
            className={styles.form_field_wrapper}
          >
            {fields.map(f => <ProFormText key={f} hidden name={f} />)}
            <div className={styles.form_field}>
              <div className={styles.drag_handle}>
                <Iocn component={DragHandleIcon} />
              </div>
              <div className={styles.field_label}>
                {props.title}
              </div>
              <Space size={0}>
                {enableSub && (
                  <>
                    {hasSub && (
                      <IconButton
                        onClick={() => setShowSubItems(s => !s)}
                        icon={!showSubItems ? ChevronDownIcon : ChevronUpIcon}
                      />
                    )}
                    <TriggerModal
                      title={t('uiBlockGroup.Add option')}
                      trigger={<IconButton icon={PlusCircleIcon} />}
                    >
                      <AddOptionForm onSubmit={handleAdd} />
                    </TriggerModal>
                  </>
                )}
                <TriggerModal
                  title={editFormTitle}
                  trigger={<IconButton icon={EditIcon} />}
                >
                  <EditForm
                    formData={props.formData}
                    onSubmit={action.setCurrentRowData}
                  />
                </TriggerModal>
                <IconButton
                  icon={DeleteIcon}
                  onClick={handleDelete}
                />
              </Space>
            </div>
            {enableSub && (
              <div className={classNames(
                styles.options,
                (!hasSub || !showSubItems) && styles.hide
              )}
              >
                <FormFields
                  floor={floor + 1}
                  titleField="name"
                  name={optionsName}
                  actionRef={actionRef}
                  EditForm={AddOptionForm}
                  fields={["name", "value"]}
                  editFormTitle={t('uiBlockGroup.Option details')}
                />
              </div>
            )}
          </DargCard>
        )
      }}
    </ProFormDependency>
  );
}

export default Fields;