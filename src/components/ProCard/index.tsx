import type { FC } from 'react';
import classNames from 'classnames';
import { Card } from '@shopify/polaris';
import type { ProCardProps } from './types';
import './styles.less';

const ProCard: FC<ProCardProps> = (props) => {
  const {
    extra,
    title,
    subTitle,
    children,
    hasTitleUnderLine = false
  } = props;

  const contentClassName = classNames(
    "pro-card-content",
    Boolean(extra) && "pro-card-content-over-flow"
  );

  const titleClassName = classNames(
    "pro-card-title",
    hasTitleUnderLine && "pro-card-title-underline"
  );

  return (
    <Card>
      <div className="pro-card-container">
        <div className={contentClassName}>
          {!!title && <div className={titleClassName}>{title}</div>}
          {!!subTitle && <div className="pro-card-subtitle">{subTitle}</div>}
          {!!children && <div className="pro-card-body">{children}</div>}
        </div>
        {!!extra && <div className="pro-card-extra">{extra}</div>}
      </div>
    </Card>
  );
}

export default ProCard;