import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 定义缓存数据的类型
type CacheData = {
  [key: string]: {
    data: any;
    timestamp: number;
  };
};

// 定义store的状态类型
type FetchDataStore = {
  cache: CacheData;
  // 设置缓存
  setCache: (key: string, data: any) => void;
  // 获取缓存
  getCache: (key: string, ttl?: number) => any | null;
  // 清除缓存
  clearCache: (key?: string) => void;
  // 刷新所有缓存
  refreshAll: () => void;
};

// 创建store
export const useFetchDataStore = create<FetchDataStore>()(
  persist(
    (set, get) => ({
      cache: {},

      // 设置缓存
      setCache: (key, data) => {
        set((state) => ({
          cache: {
            ...state.cache,
            [key]: {
              data,
              timestamp: Date.now(),
            },
          },
        }));
      },

      // 获取缓存，ttl为过期时间（毫秒），默认5分钟
      getCache: (key, ttl = 5 * 60 * 1000) => {
        const cacheItem = get().cache[key];
        if (!cacheItem) return null;

        // 检查是否过期
        if (Date.now() - cacheItem.timestamp > ttl) {
          // 过期则清除缓存
          get().clearCache(key);
          return null;
        }

        return cacheItem.data;
      },

      // 清除缓存，不指定key则清除所有
      clearCache: (key) => {
        if (key) {
          set((state) => {
            const newCache = { ...state.cache };
            delete newCache[key];
            return { cache: newCache };
          });
        } else {
          set({ cache: {} });
        }
      },

      // 刷新所有缓存
      refreshAll: () => {
        set({ cache: {} });
      },
    }),
    {
      name: 'fetch-data-cache', // localStorage key
      partialize: (state) => ({ cache: state.cache }), // 只持久化cache
    }
  )
);