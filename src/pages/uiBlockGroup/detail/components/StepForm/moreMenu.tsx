import type { FC } from 'react';
import { Dropdown, Modal } from 'antd';
import { MenuHorizontalIcon, ArrowUpIcon, ArrowDownIcon, DuplicateIcon, DeleteIcon, ReplayIcon } from '@shopify/polaris-icons';
import IconButton, { withIcon } from '@/components/IconButton';
import type { StepFormProps } from '.';

const UpIcon = withIcon(ArrowUpIcon);
const DownIocn = withIcon(ArrowDownIcon);
const WDuplicateIcon = withIcon(DuplicateIcon);
const WDeleteIcon = withIcon(DeleteIcon);
const WReplayIcon = withIcon(ReplayIcon);

const MoreMenu: FC<StepFormProps> = (props) => {
  const { index, count, action } = props;
  const [modal, contextHolder] = Modal.useModal();
  const isLast = count - 1 === index;
  return (
    <>
      <Dropdown
        arrow
        placement="bottomRight"
        menu={{
          items: [
            {
              key: 'up',
              disabled: !index,
              icon: <UpIcon />,
              label: 'Move up one step',
              onClick: () => action.move(index, index - 1)
            },
            {
              key: 'down',
              disabled: isLast,
              icon: <DownIocn />,
              label: 'Move down one step',
              onClick: () => action.move(index, index + 1)
            },
            {
              key: 'duplicate',
              icon: <WDuplicateIcon />,
              label: 'Duplicate step',
              onClick: () => {
                const data = action.getCurrentRowData();
                action.add({ ...data, wizardUuid: undefined }, index + 1);
              }
            },
            {
              key: 'revert',
              icon: <WReplayIcon />,
              label: 'Revert to default settings',
              onClick: () => {
                action.setCurrentRowData({
                  schemaFormData: {},
                  wizardTitle: undefined,
                  wizardDescription: undefined
                });
              }
            },
            {
              key: 'del',
              danger: true,
              icon: <WDeleteIcon />,
              label: 'Delete UI Block',
              onClick: () => {
                modal.confirm({
                  okText: 'Delete',
                  cancelButtonProps: { className: 'shopify' },
                  title: 'Are you sure you want to delete it?',
                  content: (
                    <span>
                      <strong>Warning:</strong> Changes made to menu items are global and affect all instances across the system. To avoid making global changes, make a new item from the Edit UI Block Group page.
                    </span>
                  ),
                  onOk: () => action.remove(index)
                });
              }
            }
          ]
        }}
      >
        <IconButton
          icon={MenuHorizontalIcon}
        />
      </Dropdown>
      {contextHolder}
    </>
  );
}

export default MoreMenu;