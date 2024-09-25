import { Tag } from 'antd';

export const requiredOptionalMark = (
  label: React.ReactNode,
  { required }: { required: boolean },
) => (
  <>
    {required ? (
      <Tag bordered={false} color="volcano">
        Required
      </Tag>
    ) : (
      <Tag bordered={false} color="warning">
        Optional
      </Tag>
    )}
    {label}
  </>
);

export const requiredMark = (
  label: React.ReactNode,
  { required }: { required: boolean },
) => (
  <>
    {required ? (
      <Tag bordered={false} color="volcano">
        Required
      </Tag>
    ) : null}
    {label}
  </>
);
