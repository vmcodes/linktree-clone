import { FC } from 'react';
import { Button, List } from 'antd';
import { Element } from '../../types';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';

const Links: FC<{
  data: Element[];
  editElement: Function;
  removeElement: Function;
}> = ({ data, editElement, removeElement }) => (
  <List
    itemLayout="horizontal"
    dataSource={data}
    style={{ minHeight: '166px' }}
    renderItem={(item: Element, index: number) => (
      <List.Item style={{ textAlign: 'left' }}>
        <List.Item.Meta
          title={item.title}
          description={item?.value}
          style={{ marginLeft: '12px' }}
        />

        <Button
          onClick={() => editElement(index)}
          style={{ color: 'green', border: 'none', marginRight: '12px' }}
          aria-label="Edit Block"
        >
          <EditOutlined />
        </Button>

        <Button
          onClick={() => removeElement(index)}
          style={{ color: 'red', border: 'none', marginRight: '12px' }}
          aria-label="Remove Block"
        >
          <CloseOutlined />
        </Button>
      </List.Item>
    )}
  />
);

export default Links;
