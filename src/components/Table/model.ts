import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { partId } from '@/env';

type TableModelTypes = {
  tableDatas: Record<string, any[]>;
}

type TableModelMethods = {
  setTableData: (key: string, value?: any[]) => void
}

export const useTableModel = create(
  persist<TableModelTypes & TableModelMethods>((set, get) => ({
    tableDatas: {},
    setTableData: (key, value = []) => {
      set({
        tableDatas: {
          ...get().tableDatas,
          [key]: value
        }
      });
    }
  }), {
    name: partId,
    storage: createJSONStorage(() => sessionStorage)
  })
);

export default useTableModel;