import type { FC } from 'react';
import { Dropdown } from 'antd';
import { MenuHorizontalIcon, ArrowUpIcon, ArrowDownIcon, DuplicateIcon, DeleteIcon, ReplayIcon } from '@shopify/polaris-icons';
import IconButton, { withIcon } from '@/components/IconButton';
import { useLang } from '@/hooks/useLang';
import { useConfirm } from '@/hooks/useConfirm';
import type { StepFormProps } from '.';

const UpIcon = withIcon(ArrowUpIcon);
const DownIocn = withIcon(ArrowDownIcon);
const WDuplicateIcon = withIcon(DuplicateIcon);
const WDeleteIcon = withIcon(DeleteIcon);
const WReplayIcon = withIcon(ReplayIcon);

const MoreMenu: FC<StepFormProps> = (props) => {
  const { index, count, action } = props;
  const { t } = useLang();
  const [confirm] = useConfirm();
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
              label: t('uiBlockGroup.Move up one step'),
              onClick: () => action.move(index, index - 1)
            },
            {
              key: 'down',
              disabled: isLast,
              icon: <DownIocn />,
              label: t('uiBlockGroup.Move down one step'),
              onClick: () => action.move(index, index + 1)
            },
            {
              key: 'duplicate',
              icon: <WDuplicateIcon />,
              label: t('uiBlockGroup.Duplicate step'),
              onClick: () => {
                const data = action.getCurrentRowData();
                action.add({ ...data, wizardUuid: undefined }, index + 1);
              }
            },
            {
              key: 'revert',
              icon: <WReplayIcon />,
              label: t('uiBlockGroup.Revert to default settings'),
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
              label: t('uiBlockGroup.Delete UI Block'),
              onClick: () => {
                confirm({
                  okText: t('common.delete'),
                  title: t('common.Are you sure you want to delete'),
                  onConfirm: () => action.remove(index),
                  content: (
                    <>
                      <strong>{t('uiBlockGroup.Warning')}: </strong>
                      {t('uiBlockGroup.menuItemEditTip')}
                    </>
                  )
                });
              }
            }
          ]
        }}
      >
        <IconButton icon={MenuHorizontalIcon} />
      </Dropdown>
    </>
  );
}

export default MoreMenu;