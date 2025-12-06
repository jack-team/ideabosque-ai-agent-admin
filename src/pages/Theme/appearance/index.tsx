import { type FC } from 'react';
import { Segmented } from 'antd';
import ThemeColors from './components/ThemeColors';
import ThemeIcons from './components/ThemeIcons';
import ThemeTexts from './components/ThemeTexts';
import styles from './styles.module.less';

type AppearanceProps = {
  sdk: Record<string, any>;
  updateChatMode: (mode: string) => void;
}

const Appearance: FC<AppearanceProps> = (props) => {
  const { sdk, updateChatMode } = props;
  return (
    <div className={styles.container}>
      <div className={styles.open_types}>
        <Segmented
          options={[
            { label: 'Bubble mode', value: 'bubble' },
            { label: 'Windowed mode', value: 'window' },
          ]}
          onChange={updateChatMode}
        />
      </div>
      <div className={styles.content}>
        <ThemeColors sdk={sdk} />
        <ThemeIcons sdk={sdk} />
        <ThemeTexts sdk={sdk} />
      </div>
    </div>
  );
}

export default Appearance;