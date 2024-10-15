declare module 'html-to-json-parser' {
  export const HTMLToJSON: (html: string) => Promise<{ content: any[] }>
}
