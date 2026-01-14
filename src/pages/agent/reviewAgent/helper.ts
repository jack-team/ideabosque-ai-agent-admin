export function renderTpl(template: string, options: Record<string, any>) {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    // 如果 options 中有这个 key，则替换，否则保留原占位符
    return options.hasOwnProperty(key) ? (options[key] || '') : match;
  });
}