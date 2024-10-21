declare module 'react-native-tooltip' {
  import {Component} from 'react';
  import {StyleProp, ViewStyle} from 'react-native';

  export interface TooltipProps {
    isVisible: boolean;
    content: React.ReactNode;
    placement?: 'top' | 'bottom' | 'left' | 'right';
    onClose: () => void;
    style?: StyleProp<ViewStyle>;
  }

  export default class Tooltip extends Component<TooltipProps> {}
}
