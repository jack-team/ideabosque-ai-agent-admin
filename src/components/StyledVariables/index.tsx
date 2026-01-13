import { type FC } from 'react';

type StyledVariablesProps = {
  name?: string;
  namespace?: string;
  variables: Record<string, any>;
}

const Root = ':root'

const StyledVariables: FC<StyledVariablesProps> = (props) => {
  const { namespace = ':root', name, variables = {} } = props;

  const css = Object.keys(variables).reduce((content, key) => {
    return `${content}--${key}:${variables[key]};`;
  }, '');

  let prefix = namespace;

  if (prefix !== Root) {
    prefix = `.${namespace}`;
  }

  if (!css) {
    return null;
  }

  return (
    <style data-styled-name={name}>
      {`${prefix}{${css}}`}
    </style>
  );
}

export default StyledVariables;