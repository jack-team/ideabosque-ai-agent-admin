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

  const renderTiltle = () => {
    if (!title) return null;

    const titleClassName = classNames(
      "pro-card-title",
      hasTitleUnderLine && "pro-card-title-underline"
    );

    return (
      <div className={titleClassName}>
        <span>{title}</span>
      </div>
    );
  }

  const renderSubTitle = () => {
    if (!subTitle) return null;
    return (
      <div className="pro-card-subtitle">
        {subTitle}
      </div>
    );
  }

  const renderBody = () => {
    if (!children) return null;
    return (
      <div className="pro-card-body">
        {children}
      </div>
    );
  }

  const renderExtra = () => {
    if (!extra) return null;
    return (
      <div className="pro-card-extra">
        {extra}
      </div>
    );
  }

  const contentClassName = classNames(
    "pro-card-content",
    Boolean(extra) && "pro-card-content-over-flow"
  );

  return (
    <Card>
      <div className="pro-card-container">
        <div className={contentClassName}>
          {renderTiltle()}
          {renderSubTitle()}
          {renderBody()}
        </div>
        {renderExtra()}
      </div>
    </Card>
  );
}

export default ProCard;