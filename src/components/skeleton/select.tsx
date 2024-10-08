import { Card, Skeleton } from 'antd';

const SelectSkeleton = ({ width }: { width: number | string }) => {
  return (
    <Card
      style={{ width: width, display: 'flex', alignItems: 'center' }}
      styles={{
        body: {
          display: 'flex',
          padding: 8,
          width: width,
          alignItems: 'center',
        },
      }}
    >
      <Skeleton.Button
        active
        block
        size="small"
        shape="square"
        style={{ height: 15, display: 'flex', alignItems: 'center' }}
      />
    </Card>
  );
};

export default SelectSkeleton;
