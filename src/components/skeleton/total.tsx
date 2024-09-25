import { Card, Skeleton } from 'antd';

const TotalSkeleton = () => {
  return (
    <Card style={{ height: 96, padding: 0 }} styles={{ body: { padding: 8 } }}>
      <Skeleton title={false} paragraph={{ rows: 3, width: '50%' }} active />
    </Card>
  );
};

export default TotalSkeleton;
