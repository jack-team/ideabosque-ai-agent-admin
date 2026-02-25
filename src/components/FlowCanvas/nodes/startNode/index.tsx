import { CaretRightOutlined } from '@ant-design/icons';
import { useLang } from '@/hooks/useLang';
import NodeWrapper from '../../components/NodeWrapper';
import type { CustomNodeFC } from '../types';
import styles from './styles.module.less';

const StartNode: CustomNodeFC = () => {
  const { t } = useLang();
  return (
    <NodeWrapper
      hasDetail={false}
      enableHandle={{
        target: false
      }}
    >
      <div className={styles.container}>
        <div className={styles.icon}><CaretRightOutlined /></div>
        <div className={styles.text}>{t('flowCanvas.start')}</div>
      </div>
    </NodeWrapper>
  );
}

export default StartNode;

StartNode.Icon = CaretRightOutlined;