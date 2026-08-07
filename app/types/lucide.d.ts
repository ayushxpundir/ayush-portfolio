declare module 'lucide-react' {
  import React from 'react';
  
  export interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: string | number;
    strokeWidth?: string | number;
  }
  
  export const Globe: React.FC<IconProps>;
  export const Github: React.FC<IconProps>;
  export const Moon: React.FC<IconProps>;
  export const Sun: React.FC<IconProps>;
}
