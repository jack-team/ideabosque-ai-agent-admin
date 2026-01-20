import classNames from 'classnames';
import { ProTable, type ProTableProps } from '@ant-design/pro-components';
import Spinner from '../Spinner';
import TableContent from './content';
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
      loading={{ indicator: <Spinner type="infinity-spin" /> }}
      tableViewRender={({ loading, dataSource = [] }, dom) => {
        const hasCard = search === false && toolBarRender === false;
        const spinning = typeof loading === 'boolean' ? loading : !!loading?.spinning;

        return (
          <TableContent
            dom={dom}
            hasCard={hasCard}
            spinning={spinning}
            total={dataSource.length}
          />
        );
      }}
    />
  );
}

export default Table;