import { CaretRightOutlined } from '@ant-design/icons';
import { useLang } from '@/hooks/useLang';
import NodeWrapper from '../../components/NodeWrapper';
import { useCanvasContext } from '../../hooks';
import StartIcon from '../../icons/start.svg?react';
import StepIcon from '../../icons/step-icon.svg?react';
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
          <div className={styles.icon}>
            <StartIcon />
          </div>
          {top && (
            <div className={styles.step_icon}>
              <StepIcon />
            </div>
          )}
          {t(`flowCanvas.${top ? 'Step' : 'Start'} node`)}
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