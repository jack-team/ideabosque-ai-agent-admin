import type { SchemaType } from '@/typings/llm';

export const getValByPaths = (obj: SchemaType, paths: string[]) => {
  return paths.reduce((acc, key) => acc?.[key as never], obj);
}