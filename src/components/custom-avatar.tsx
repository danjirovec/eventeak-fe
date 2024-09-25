import React from 'react';
import { Avatar as AntdAvatar, AvatarProps } from 'antd';
import { BUCKET_URL } from 'config/config';
import AvatarSkeleton from './skeleton/avatar';

type Props = AvatarProps & {
  email?: string;
  avatarUrl: string;
  loading?: boolean;
};

const CustomAvatar = ({ email, avatarUrl, style, loading, ...rest }: Props) => {
  const imageUrl = avatarUrl ? `${BUCKET_URL}avatars/${avatarUrl}` : undefined;
  return (
    <React.Fragment>
      {loading ? (
        <AvatarSkeleton />
      ) : (
        <AntdAvatar
          alt={email?.charAt(0).toUpperCase()}
          size="default"
          shape="circle"
          src={imageUrl}
          style={{
            flexShrink: 0,
            backgroundColor: '#f58634',
            display: 'flex',
            alignItems: 'center',
            border: 'none',
            ...style,
          }}
          {...rest}
        >
          {email?.charAt(0).toUpperCase()}
        </AntdAvatar>
      )}
    </React.Fragment>
  );
};

export default CustomAvatar;
