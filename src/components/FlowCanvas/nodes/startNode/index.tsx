import { CaretRightOutlined } from '@ant-design/icons';
import { useLang } from '@/hooks/useLang';
import NodeWrapper from '../../components/NodeWrapper';
import { useCanvasContext } from '../../hooks';
import startIcon from '../../icons/start.svg';
import stepIcon from '../../icons/step-icon.svg';
import type { CustomNodeFC } from '../types';
import styles from './styles.module.less';

const StartNode: CustomNodeFC = () => {
  const { t } = useLang();
  const { top } = useCanvasContext();

  return (
    <NodeWrapper
      hasDetail={false}
      enableHandle={{
        target: false
      }}
    >
      <div className={styles.container}>
        <div className={styles.title}>
          <img
            src={startIcon}
            className={styles.icon}
          />
          {top && (
            <img
              src={stepIcon}
              className={styles.step_icon}
            />
          )}
          {t('flowCanvas.Step node')}
        </div>
        <div className={styles.desc}>
          {t('flowCanvas.start')}
        </div>
      </div>
    </NodeWrapper>
  );
}

export default StartNode;

StartNode.Icon = CaretRightOutlined;