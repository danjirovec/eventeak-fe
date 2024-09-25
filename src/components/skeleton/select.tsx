import { Card, Skeleton } from 'antd';

const SelectSkeleton = () => {
  return (
    <Card
      style={{ width: 300, display: 'flex', alignItems: 'center' }}
      styles={{
        body: { display: 'flex', padding: 8, width: 300, alignItems: 'center' },
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
