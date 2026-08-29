import React from 'react';

export default function codegenNativeComponent<T>(componentName: string, _options?: any): React.ComponentType<T> {
  return function DummyNativeComponent(props: any) {
    return <div data-native-component={componentName} {...props} />;
  } as any;
}
