// HTML files imported via webpack should be treated like strings
declare module '*.html' {
  const content: string;
  export default content;
}
