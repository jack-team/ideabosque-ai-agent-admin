import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { workflowListApi } from '@/services/workflow';
import type { WorkflowDataType } from '@/typings/workflow';

type WorkflowModelTypes = {
  loading?: boolean;
  list: WorkflowDataType[];
}

type WorkflowModelMethods = {
  fetchData: () => Promise<void>;
}

export const useWorkflowModel = create(persist<WorkflowModelTypes & WorkflowModelMethods>(
  (set) => ({
    list: [],
    loading: true,

    fetchData: async () => {
      set({ loading: true });
      const result = await workflowListApi({ statuses: ["active"] });
      set({ list: result.data, loading: false });
    }
  }),
  {
    name: 'workflows',
    // @ts-ignore
    partialize: (state) => ({ list: state.list }),
    storage: createJSONStorage(() => sessionStorage)
  }
));

export default useWorkflowModel;