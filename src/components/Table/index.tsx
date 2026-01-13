import { ProTable, ProCard, type ProTableProps } from '@ant-design/pro-components';
import classNames from 'classnames';
import Spinner from '../Spinner';
import styles from './styles.module.less';

function Table<D extends Record<string, any> = {}>(props: ProTableProps<D, any>) {
  const {
    className,
    toolBarRender,
    defaultData = [],
    defaultSize = 'small',
    form = {
      layout: 'horizontal',
      labelWidth: 'auto'
    },
    options = {
      setting: false,
      density: false,
      fullScreen: true
    },
    search = {
      searchText: 'Search'
    },
    pagination = {
      defaultPageSize: 5
    },
    scroll = {
      x: 'max-content'
    },
    ...rest
  } = props;

  return (
    <ProTable
      {...rest}
      form={form}
      scroll={scroll}
      search={search}
      options={options}
      pagination={pagination}
      defaultSize={defaultSize}
      defaultData={defaultData}
      toolBarRender={toolBarRender}
      className={classNames(styles.table, className)}
      loading={{ indicator: <Spinner className={styles.spinner} /> }}
      tableViewRender={(_, dom) => {
        if (search === false && toolBarRender === false) {
          return <ProCard>{dom}</ProCard>;
        }
        return dom;
      }}
    />
  );
}

export default Table;