export const stringify = (json: Record<string, any>) => {
  return JSON.stringify(json, null, 2)
}