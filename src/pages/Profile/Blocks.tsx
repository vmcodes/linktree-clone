import { FC, useMemo, CSSProperties, useState } from 'react';
import { Button, Typography, Collapse, Form, Input, message } from 'antd';
import {
  FacebookOutlined,
  GithubOutlined,
  InstagramOutlined,
  MailOutlined,
  MessageOutlined,
  SendOutlined,
  TwitterOutlined,
  UserOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import { Element, Message, Theme } from '../../types';
import { contactForm } from '../../services';

const { TextArea } = Input;
const { Title } = Typography;

export const HeaderBlock: FC<{ block: Element }> = ({ block }) => {
  return <Title level={3}>{block.title}</Title>;
};

export const SocialLink: FC<{
  block: Element;
  buttons: string;
}> = ({ block, buttons }) => {
  return (
    <Button
      type="primary"
      block
      href={`${block.value}`}
      rel="noreferrer"
      target="_blank"
      ghost={buttons === 'Ghost'}
    >
      {block.title}
    </Button>
  );
};

export const SocialBlock: FC<{
  block: Element;
  buttons: string;
}> = ({ block, buttons }) => {
  const iconStyles: CSSProperties = {
    left: '0px',
    margin: '4px 16px',
    position: 'absolute',
  };

  const socialIcon = useMemo(() => {
    switch (block.title) {
      case 'GitHub':
        return <GithubOutlined style={iconStyles} />;
      case 'Twitter':
        return <TwitterOutlined style={{ marginRight: '16px' }} />;
      case 'YouTuve':
        return <YoutubeOutlined style={{ marginRight: '16px' }} />;
      case 'Instagram':
        return <InstagramOutlined style={{ marginRight: '16px' }} />;
      case 'FaceBook':
        return <FacebookOutlined style={{ marginRight: '16px' }} />;
      default:
        return <></>;
    }
  }, [block]);

  return (
    <Button
      type="primary"
      block
      href={`${block.value}`}
      rel="noreferrer"
      target="_blank"
      ghost={buttons === 'Ghost'}
    >
      {socialIcon} {block.title}
    </Button>
  );
};

export const FormBlock: FC<{
  block: Element;
  theme: Theme;
  email?: string;
}> = ({ block, theme, email }) => {
  return (
    <Collapse
      style={{
        backgroundColor:
          theme.buttons === 'Ghost' ? 'transparent' : theme.color,
        width: '100%',
      }}
      items={[
        {
          key: block.title,
          label: <>{block.title}</>,
          children: <ContactForm theme={theme} email={email} />,
        },
      ]}
    />
  );
};

export const ContactForm: FC<{ theme: Theme; email?: string }> = ({
  theme,
  email,
}) => {
  const [info] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [contact, setContact] = useState<Message>({
    toEmail: email || '',
    fromName: '',
    fromEmail: '',
    message: '',
  });

  const handleContact = async () => {
    setLoading(true);

    if (email) {
      await contactForm({ ...contact });
      info.resetFields();
      message.success('Message sent!');
      setContact({
        toEmail: email || '',
        fromName: '',
        fromEmail: '',
        message: '',
      });
    }

    setLoading(false);
  };

  return (
    <Form
      form={info}
      name="info-hooks"
      style={{
        margin: 'auto',
        textAlign: 'left',
      }}
      onSubmitCapture={handleContact}
    >
      <Form.Item name="name">
        <label>
          <UserOutlined style={{ margin: '8px' }} /> Name
        </label>
        <Input
          autoFocus
          required
          aria-label="Name"
          value={contact?.fromName}
          onChange={(e) => setContact({ ...contact, fromName: e.target.value })}
        />
      </Form.Item>

      <Form.Item name="email">
        <label>
          <MailOutlined style={{ margin: '8px' }} /> Email
        </label>
        <Input
          aria-label="Email"
          required
          type="email"
          value={contact?.fromEmail}
          onChange={(e) =>
            setContact({ ...contact, fromEmail: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item name="message">
        <label>
          <MessageOutlined style={{ margin: '8px' }} /> Message
        </label>
        <TextArea
          required
          aria-label="Message"
          value={contact?.message}
          onChange={(e) => setContact({ ...contact, message: e.target.value })}
        />
      </Form.Item>
      <br />
      <Button
        htmlType="submit"
        type="primary"
        icon={<SendOutlined />}
        aria-label="Send Contact"
        value={contact?.message}
        className="upload-btn"
        ghost={theme.buttons === 'Ghost'}
      >
        {!loading ? 'Send' : 'Sending...'}
      </Button>
    </Form>
  );
};
