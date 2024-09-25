import { List, Skeleton } from "antd";

const LatestActivitiesSkeleton = () => {
  return (
    <List.Item>
      <List.Item.Meta
        avatar={
          <Skeleton.Avatar
            active
            size={48}
            shape="square"
            style={{
              borderRadius: 4,
            }}
          />
        }
        title={
          <Skeleton.Button
            active
            style={{
              height: 16,
            }}
          />
        }
        description={
          <Skeleton.Button
            active
            style={{
              width: 300,
              height: 16,
            }}
          />
        }
      />
    </List.Item>
  );
};

export default LatestActivitiesSkeleton;
