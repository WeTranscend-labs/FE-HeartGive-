/// <reference types="vite/client" />
/// <reference types="node" />

declare module 'node:util' {
  export * from 'util';
}

declare module 'node:stream' {
  export * from 'stream';
}

declare module 'node:buffer' {
  export * from 'buffer';
}
