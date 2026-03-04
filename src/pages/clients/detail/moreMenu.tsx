import type { FC } from 'react';
import { Dropdown } from 'antd';
import { MenuHorizontalIcon, DuplicateIcon, DeleteIcon } from '@shopify/polaris-icons';
import IconButton, { withIcon } from '@/components/IconButton';
import { useLang } from '@/hooks/useLang';
import { useConfirm } from '@/hooks/useConfirm';

const WDuplicateIcon = withIcon(DuplicateIcon);
const WDeleteIcon = withIcon(DeleteIcon);

type MoreMenuProps = {
  index: number;
  action: Record<string, any>;
}

const MoreMenu: FC<MoreMenuProps> = (props) => {
  const { index, action } = props;
  const { t } = useLang();
  const [confirm] = useConfirm();
  return (
    <>
      <Dropdown
        arrow
        placement="bottomRight"
        menu={{
          items: [
            {
              key: 'duplicate',
              icon: <WDuplicateIcon />,
              label: "复制页面",
              onClick: () => {
                const data = action.getCurrentRowData();
                action.add({ ...data, wizardUuid: undefined }, index + 1);
              }
            },
            {
              key: 'del',
              danger: true,
              icon: <WDeleteIcon />,
              label: "删除页面",
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