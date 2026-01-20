import type { FC } from 'react';
import classNames from 'classnames';
import { ArrowLeftIcon } from '@shopify/polaris-icons';
import { PageContainer as AntPageContainer, type PageContainerProps } from '@ant-design/pro-components';
import { withIcon } from '@/components/IconButton';
import styles from './styles.module.less';

type Props = PageContainerProps & {
  fullScreen?: boolean;
}

const BackIcon = withIcon(ArrowLeftIcon);

const PageContainer: FC<Props> = (props) => {
  const { fullScreen, children, ...rest } = props;

  return (
    <AntPageContainer
      {...rest}
      backIcon={<BackIcon />}
      className={classNames(
        styles.page_container,
        { 
          [styles.full_screen]: fullScreen 
        }
      )}
    >
      {children}
    </AntPageContainer>
  );
}

export default PageContainer;