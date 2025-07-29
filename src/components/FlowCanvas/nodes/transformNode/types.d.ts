export type TransformNodeFormData = {
  type: string;
  text: string;
  attrs?: Array<{
    from: string;
    to: string;
  }>;
}