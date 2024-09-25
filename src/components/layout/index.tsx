import { ThemedLayoutV2, ThemedSiderV2, ThemedTitleV2 } from '@refinedev/antd';
import React from 'react';
import Header from './header';
import { SVGLogo } from './svg-logo';

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemedLayoutV2
      Header={Header}
      Sider={() => (
        <ThemedSiderV2
          Title={({ collapsed }) =>
            collapsed ? (
              <ThemedTitleV2 collapsed={true} text="Applausio" icon={SVGLogo} />
            ) : (
              <ThemedTitleV2
                collapsed={false}
                text="Applausio"
                icon={SVGLogo}
              />
            )
          }
          render={({ items }) => {
            return <>{items}</>;
          }}
        />
      )}
      Title={(titleProps) => (
        <ThemedTitleV2 {...titleProps} text="Applausio" icon={SVGLogo} />
      )}
    >
      {children}
    </ThemedLayoutV2>
  );
};

export default Layout;
