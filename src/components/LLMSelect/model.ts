import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { llmListApi } from '@/services/llm';
import type { LLMDataType } from '@/typings/llm';

type LlmModelTypes = {
  loading?: boolean;
  list: LLMDataType[];
}

type LlmModelMethods = {
  fetchData: () => Promise<void>;
}

export const useLlmModel = create(persist<LlmModelTypes & LlmModelMethods>(
  (set) => ({
    list: [],
    loading: true,

    fetchData: async () => {
      set({ loading: true });
      const result = await llmListApi({})
      set({ list: result.data, loading: false });
    }
  }),
  {
    name: 'llms',
    // @ts-ignore
    partialize: (state) => ({ list: state.list }),
    storage: createJSONStorage(() => sessionStorage)
  }
));

export default useLlmModel;