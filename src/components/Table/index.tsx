import classNames from 'classnames';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { ProTable, type ProTableProps } from '@ant-design/pro-components';
import { ChevronLeftIcon, ChevronRightIcon } from '@shopify/polaris-icons';
import { withIcon } from '@/components/IconButton';
import Spinner from '../Spinner';
import TableContent from './content';
import { useTableModel } from './model';
import styles from './styles.module.less';

const NextIcon = withIcon(ChevronRightIcon);
const PrevIocn = withIcon(ChevronLeftIcon);

type TableProps<D> = Omit<ProTableProps<D, any>, 'defaultData'> & {
  cacheKey?: string;
  fullScreen?: boolean;
}

function Table<D extends Record<string, any> = {}>(props: TableProps<D>) {
  type RequestArgs = Parameters<NonNullable<TableProps<D>['request']>>;

  const defaultPagination: TableProps<D>['pagination'] = {
    simple: { readOnly: true },
    defaultPageSize: 5,
    showSizeChanger: false,
    nextIcon: <NextIcon />,
    prevIcon: <PrevIocn />
  }

  const defaultOptions: TableProps<D>['options'] = {
    setting: false,
    density: false,
    fullScreen: false
  }

  const defaultForm: TableProps<D>['form'] = {
    layout: 'horizontal',
    labelWidth: 'auto'
  }

  const defaultSearch: TableProps<D>['search'] = {
    searchText: 'Search'
  }

  const defaultScroll: TableProps<D>['scroll'] = {
    x: 'max-content'
  }

  const {
    request,
    form,
    options,
    search,
    scroll,
    cacheKey,
    className,
    pagination,
    toolBarRender,
    fullScreen = true,
    defaultSize = 'small',
    ...rest
  } = props;

  if (fullScreen) {
    defaultScroll.y = '100vh';
  }

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
      form={{
        ...defaultForm,
        ...form
      }}
      scroll={{
        ...defaultScroll,
        ...scroll
      }}
      search={search !== false && {
        ...defaultSearch,
        ...search
      }}
      options={options !== false && {
        ...defaultOptions,
        ...options
      }}
      pagination={pagination !== false && {
        ...defaultPagination,
        ...pagination
      }}
      defaultData={tableData}
      defaultSize={defaultSize}
      toolBarRender={toolBarRender}
      request={request ? onRequest : undefined}
      loading={{
        spinning,
        indicator: <Spinner type="infinity-spin" />
      }}
      className={classNames(
        styles.table,
        fullScreen && styles.full_screen,
        className
      )}
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