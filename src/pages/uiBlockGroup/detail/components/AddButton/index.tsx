import type { FC, CSSProperties } from 'react';
import Icon from '@ant-design/icons';
import { PlusCircleIcon } from '@shopify/polaris-icons';
import styles from './styles.module.less';

type AddButtonProps = {
  onClick?: () => void;
  text?: string;
  style?: CSSProperties;
}

const AddButton: FC<AddButtonProps> = (props) => {
  const { text = 'Add new block' } = props;
  return (
    <div
      style={props.style}
      onClick={props.onClick}
      className={styles.creator_btn}
    >
      <Icon component={PlusCircleIcon} />
      <div className={styles.creator_btn_text}>
        {text}
      </div>
    </div>
  );
}

export default AddButton;