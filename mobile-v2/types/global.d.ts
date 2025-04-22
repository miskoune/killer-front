import { type StyleProp, type ViewStyle } from 'react-native/types';

declare global {
  declare module '*.svg' {
    import type * as React from 'react';

    const content: React.FC<React.SVGProps<SVGElement> & { title?: string }>;
    export default content;
  }
}
