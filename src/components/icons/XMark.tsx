import type {Component} from 'solid-js';
import {mergeProps} from 'solid-js';

import {Icon, IconProps} from '@hope-ui/solid';

const XMark: Component<IconProps> = (props) => {
  const defaultProps: IconProps = {viewBox: '0 0 24 24', fill: 'currentColor'};
  const mergedProps: IconProps = mergeProps(defaultProps, props);
  return (
    <Icon {...mergedProps}>
      <path
        fill-rule="evenodd"
        d="M3.97 3.97a.75.75 0 011.06 0L12 10.94l6.97-6.97a.75.75 0 111.06 1.06L13.06 12l6.97 6.97a.75.75 0 11-1.06 1.06L12 13.06l-6.97 6.97a.75.75 0 01-1.06-1.06L10.94 12 3.97 5.03a.75.75 0 010-1.06z"
        clip-rule="evenodd"
      />
    </Icon>
  );
};

export default XMark;
