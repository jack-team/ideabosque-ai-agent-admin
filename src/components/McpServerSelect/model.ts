import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mcpServerListApi } from '@/services/mcp';
import type { McpServerDataType } from '@/typings/mcp';
import { partId } from '@/env';

type McpServerModelTypes = {
  loading?: boolean;
  list: McpServerDataType[];
}

type McpServerModelMethods = {
  fetchData: () => Promise<void>;
}

export const useMcpServerModel = create(persist<McpServerModelTypes & McpServerModelMethods>(
  (set) => ({
    list: [],
    loading: true,

    fetchData: async () => {
      set({ loading: true });
      const result = await mcpServerListApi({});
      set({ list: result.data, loading: false });
    }
  }),
  {
    name: `${partId}-workflows`,
    // @ts-ignore
    partialize: (state) => ({ list: state.list }),
    storage: createJSONStorage(() => sessionStorage)
  }
));

export default useMcpServerModel;