import { ThemedLayoutV2, ThemedSiderV2, ThemedTitleV2 } from '@refinedev/antd';
import React from 'react';
import Header from './header';
import { SVGLogo } from './svg-logo';
import logo from 'assets/eventeak.png';

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemedLayoutV2
      initialSiderCollapsed={true}
      Header={Header}
      Sider={() => (
        <ThemedSiderV2
          Title={({ collapsed }) =>
            collapsed ? (
              <ThemedTitleV2 collapsed={true} text="Eventeak" icon={SVGLogo} />
            ) : (
              <img
                src={logo}
                style={{
                  marginLeft: 12,
                  width: '60%',
                  height: 'auto',
                }}
              />
            )
          }
          render={({ items }) => {
            return <>{items}</>;
          }}
        />
      )}
      Title={(titleProps) => (
        <ThemedTitleV2 {...titleProps} text="Eventeak" icon={SVGLogo} />
      )}
    >
      {children}
    </ThemedLayoutV2>
  );
};

export default Layout;
