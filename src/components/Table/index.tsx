import classNames from 'classnames';
import { useMemoizedFn } from 'ahooks';
import { ProTable, type ProTableProps } from '@ant-design/pro-components';
import Spinner from '../Spinner';
import TableContent from './content';
import { useTableModel } from './model';
import styles from './styles.module.less';

type TableProps<D> = Omit<ProTableProps<D, any>, 'defaultData'> & {
  cacheKey?: string;
}

function Table<D extends Record<string, any> = {}>(props: TableProps<D>) {
  type RequestArgs = Parameters<NonNullable<TableProps<D>['request']>>;
  
  const {
    request,
    className,
    cacheKey,
    toolBarRender,
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

  const setCacheData = useTableModel(s => s.setTableData);

  const tableData = useTableModel(s => {
    if (cacheKey) return s.tableDatas[cacheKey];
  });

  const onRequest = useMemoizedFn(async (...args: RequestArgs) => {
    const result = await request!(...args);
    if (cacheKey) setCacheData(cacheKey, result.data);
    return result;
  });

  return (
    <ProTable
      {...rest}
      form={form}
      scroll={scroll}
      search={search}
      options={options}
      defaultData={tableData}
      pagination={pagination}
      defaultSize={defaultSize}
      toolBarRender={toolBarRender}
      request={request ? onRequest : undefined}
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