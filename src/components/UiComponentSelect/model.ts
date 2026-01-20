import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { uiComponentListApi } from '@/services/uiCpt';
import type { UiComponentDataType } from '@/typings/ui';
import { partId } from '@/env';

type UiComponentModeTypes = {
  loading?: boolean;
  list: UiComponentDataType[];
}

type UiComponentModeMethods = {
  fetchData: () => Promise<void>;
}

export const useUiComponentModel = create(persist<UiComponentModeTypes & UiComponentModeMethods>(
  (set) => ({
    list: [],
    loading: true,

    fetchData: async () => {
      set({ loading: true });
      const result = await uiComponentListApi({});
      set({ list: result.data, loading: false });
    }
  }),
  {
    name: `${partId}-uiComponents`,
    // @ts-ignore
    partialize: (state) => ({ list: state.list }),
    storage: createJSONStorage(() => sessionStorage)
  }
));

export default useUiComponentModel;