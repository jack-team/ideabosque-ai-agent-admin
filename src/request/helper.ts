export const getOperationName = (query: string) => {
  const matches = query.match(/^\s*(query|mutation|subscription)\s+(\w+)/);
  return matches?.[2]!;
}