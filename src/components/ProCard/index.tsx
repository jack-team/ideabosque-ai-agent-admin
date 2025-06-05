import type { FC } from 'react';
import classNames from 'classnames';
import { Card } from '@shopify/polaris';
import type { ProCardProps } from './types';
import './styles.less';

const ProCard: FC<ProCardProps> = (props) => {
  const { title, subTitle, children, ext } = props;
  return (
    <Card>
      <div className="pro-card-container">
        <div className={classNames("pro-card-content", !!ext && "over-flow")}>
          {!!title && <div className="pro-card-title">{title}</div>}
          {!!subTitle && <div className="pro-card-subtitle">{subTitle}</div>}
          {!!children && <div className="pro-card-body">{children}</div>}
        </div>
        {!!ext && <div className="pro-card-ext">{ext}</div>}
      </div>
    </Card>
  );
}

export default ProCard;