// declare namespace NodeJS {
//   interface ProcessEnv {
//     readonly NODE_ENV: 'development' | 'production';
//   }
// }

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

/** 应用运行时环境 */
declare const APP_ENV: 'dev' | 'prod';

// 声明全局属性
declare interface Window {
}
