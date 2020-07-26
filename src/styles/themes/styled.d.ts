import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      input: string;
      danger: string;
      success: string;
      warning: string;
      info: string;
    };
  }
}
