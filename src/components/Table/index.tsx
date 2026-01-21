import classNames from 'classnames';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { ProTable, type ProTableProps } from '@ant-design/pro-components';
import Spinner from '../Spinner';
import TableContent from './content';
import { useTableModel } from './model';
import styles from './styles.module.less';

type TableProps<D> = Omit<ProTableProps<D, any>, 'defaultData'> & {
  cacheKey?: string;
  fullScreen?: boolean;
}

function Table<D extends Record<string, any> = {}>(props: TableProps<D>) {
  type RequestArgs = Parameters<NonNullable<TableProps<D>['request']>>;

  const {
    request,
    className,
    cacheKey,
    toolBarRender,
    fullScreen = true,
    defaultSize = 'small',
    form = {
      layout: 'horizontal',
      labelWidth: 'auto'
    },
    options = {
      setting: false,
      density: false,
      fullScreen: false
    },
    search = {
      searchText: 'Search'
    },
    pagination = {
      defaultPageSize: 5
    },
    scroll = {
      x: 'max-content',
      y: '100vh'
    },
    ...rest
  } = props;

  const setCacheData = useTableModel(s => s.setTableData);
  const [spinning, setSpinning] = useSafeState(!!request);

  const tableData = useTableModel(s => {
    if (cacheKey) return s.tableDatas[cacheKey];
  });

  const onRequest = useMemoizedFn(async (...args: RequestArgs) => {
    setSpinning(true);
    try {
      const result = await request!(...args);
      if (cacheKey) setCacheData(cacheKey, result.data);
      return result;
    } catch (err) {
      console.log('表格获取数据失败:', err);
      return Promise.reject(err);
    } finally {
      setSpinning(false);
    }
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
      loading={{ indicator: <Spinner type="infinity-spin" />, spinning }}
      className={classNames(styles.table, fullScreen && styles.full_screen, className)}
      tableViewRender={({ dataSource = [] }, dom) => {
        const hasCard = search === false && toolBarRender === false;
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