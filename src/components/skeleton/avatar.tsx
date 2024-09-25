import { Skeleton } from 'antd';

const AvatarSkeleton = () => {
  return (
    <Skeleton.Avatar
      style={{
        flexShrink: 0,
        backgroundColor: '#f58634',
        display: 'flex',
        alignItems: 'center',
        border: 'none',
      }}
      size="default"
      shape="circle"
      active
    />
  );
};

export default AvatarSkeleton;
