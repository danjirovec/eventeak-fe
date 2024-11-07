import { Card, Skeleton } from 'antd';

const RevenueSkeleton = () => {
  return (
    <Card style={{ height: 325, padding: 0 }} styles={{ body: { padding: 8 } }}>
      <Skeleton title={false} paragraph={{ rows: 10, width: '50%' }} active />
    </Card>
  );
};

export default RevenueSkeleton;
