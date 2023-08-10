import { Dispatch, SetStateAction } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

interface SelectionProps {
  selection: string;
  setSelection: Dispatch<SetStateAction<string>>;
}

export default function Elements({ selection, setSelection }: SelectionProps) {
  return (
    <>
      <Form.Item
        name="element"
        label="Block Type"
        rules={[{ required: true }]}
        style={{ marginTop: '48px' }}
      >
        <Select
          placeholder="Select a block type"
          allowClear
          onChange={(value) => setSelection(value)}
          aria-label="Block Type"
        >
          <Option value="Header">Header</Option>
          <Option value="Link">Link</Option>
          <Option value="Social">Social</Option>
          <Option value="Form">Form</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true }]}
        aria-label="Block Title"
      >
        {selection !== 'Social' && <Input />}

        {selection === 'Social' && (
          <Select placeholder="Select an option" allowClear>
            <Option value="GitHub">GitHub</Option>
            <Option value="Twitter">Twitter</Option>
            <Option value="YouTube">YouTube</Option>
            <Option value="Instagram">Instagram</Option>
            <Option value="Facebook">Facebook</Option>
          </Select>
        )}
      </Form.Item>

      {selection !== 'Header' && (
        <Form.Item
          name="value"
          label={selection === 'Form' ? 'Email' : 'Link'}
          rules={[
            {
              required: selection !== 'Header',
              type: selection === 'Form' ? 'email' : 'url',
            },
          ]}
          aria-label="Block Value"
        >
          <Input />
        </Form.Item>
      )}

      <Form.Item>
        <Button
          htmlType="submit"
          type="primary"
          style={{ float: 'right' }}
          icon={<PlusOutlined />}
          aria-label="Add Block"
        >
          Add Block
        </Button>
      </Form.Item>
    </>
  );
}
