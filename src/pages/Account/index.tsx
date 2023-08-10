import { useEffect, useState } from 'react';
import Admin from '../../layouts/Admin';
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Typography,
} from 'antd';
import Elements from './Elements';
import Links from './Links';
import { Element, Profile } from '../../types';
import Stepper from './Stepper';
import { slugify } from '../../utils';
import ImageUpload from './ImageUpload';
import { getUser, updateProfile } from '../../services';
import { useAccount } from 'wagmi';
import Theme from './Theme';
import {
  BuildOutlined,
  EditOutlined,
  GlobalOutlined,
  HomeOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Helmet } from 'react-helmet';

const { Title } = Typography;
const { TextArea } = Input;

export default function Account() {
  const [open, setOpen] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [current, setCurrent] = useState<number>(0);
  const [about, setAbout] = useState<Profile>({
    address: '',
    username: '',
    slug: '',
  });
  const [list, setList] = useState<Element[]>([]);
  const [update, setUpdate] = useState<number>(0);
  const [selection, setSelection] = useState<string>('');
  const [info] = Form.useForm();
  const [blocks] = Form.useForm();
  const [editBlocks] = Form.useForm();
  const { address } = useAccount();

  const fetchUser = async (address: string): Promise<void> => {
    const response = await getUser(address);

    const currentAbout: Profile = about;

    setAbout({ ...currentAbout, ...response });

    if (about?.elements) {
      setList([...about.elements]);
    }
  };

  useEffect(() => {
    if (address && !about.address) {
      fetchUser(address);
    }
  }, [address]);

  const handleAbout = (value: any): void => {
    const currentAbout: Profile = about;

    setAbout({ ...currentAbout, ...value });
  };

  const handleBlocks = (value: Element): void => {
    const newElement: Element = { id: Date.now(), ...value };

    setList((prevState: Element[]) => [...prevState, newElement]);
    blocks.resetFields();
    setOpen(false);
    setSelection('');
  };

  const editElement = (index: number): void => {
    setEdit(true);
    setUpdate(index);
  };

  const handleEdit = (value: Element): void => {
    const newElement: Element = { id: Date.now(), ...value };
    const currentList: Element[] = [...list];

    currentList.splice(update, 1, newElement);

    setList([...currentList]);
    editBlocks.resetFields();
    setEdit(false);
    setSelection('');
  };

  const removeElement = (index: number): void => {
    const currentList: Element[] = [...list];

    currentList.splice(index, 1);

    setList([...currentList]);
  };

  const submitAbout = async (): Promise<void> => {
    await updateProfile({ ...about });
    await fetchUser(about.address);
  };

  const submitBlocks = async (): Promise<void> => {
    const blockList: Element[] = list.map((value: Element, index: number) => {
      return { index: index, ...value };
    });

    await updateProfile({ ...about, elements: blockList });
    await fetchUser(about.address);
  };

  useEffect(() => {
    const submitChange = async () => {
      switch (current) {
        case 1:
          await submitAbout();
          break;
        case 2:
          await submitBlocks();
          break;
        default:
          break;
      }
    };

    submitChange();
  }, [current]);

  return (
    <Admin>
      <Helmet>
        <title>{`${steps[current].title} | Social Blocks`}</title>
      </Helmet>
      <div className="account-bg">
        <Row>
          <Col xs={2} sm={2} md={4} lg={8} xl={8} />
          <Col xs={20} sm={20} md={16} lg={8} xl={8}>
            <Title className="account-title">
              Let's Get
              <br />
              Started!
            </Title>

            <br />
            <br />

            <Divider className="link-divider" />

            <Stepper
              slug={about?.slug}
              current={current}
              setCurrent={setCurrent}
              submitAbout={submitAbout}
            />
          </Col>
          <Col xs={2} sm={2} md={4} lg={8} xl={8} />
        </Row>

        {steps[current].title === 'About' && (
          <Row>
            <Col xs={2} sm={2} md={4} lg={8} xl={9} />
            <Col xs={20} sm={20} md={16} lg={8} xl={6}>
              <br />
              <br />

              <ImageUpload
                slug={about.slug}
                image={about?.image}
                handleAbout={handleAbout}
              />

              <br />
              <br />

              <Form
                form={info}
                name="info-hooks"
                style={{
                  margin: 'auto',
                  textAlign: 'left',
                }}
              >
                <Form.Item name="name" rules={[{ required: true }]}>
                  <label>
                    <UserOutlined style={{ margin: '8px', color: '#7786d5' }} />{' '}
                    Username
                  </label>
                  <Input
                    required
                    value={about.username}
                    onChange={(e) =>
                      handleAbout({
                        username: e.target.value,
                        slug: slugify(e.target.value),
                      })
                    }
                    aria-label="Username"
                  />
                </Form.Item>
                <Form.Item name="slug" rules={[{ required: true }]}>
                  <label>
                    <GlobalOutlined
                      style={{ margin: '8px', color: '#7786d5' }}
                    />{' '}
                    Link
                  </label>
                  <Input
                    addonBefore="socialblocks.io/"
                    value={about?.slug}
                    readOnly
                  />
                </Form.Item>
                <Form.Item name="location" rules={[{ required: false }]}>
                  <label>
                    <HomeOutlined style={{ margin: '8px', color: '#7786d5' }} />{' '}
                    Location
                  </label>
                  <Input
                    value={about?.location}
                    onChange={(e) => handleAbout({ location: e.target.value })}
                    aria-label="Location"
                  />
                </Form.Item>
                <Form.Item name="about" rules={[{ required: false }]}>
                  <label>
                    <EditOutlined style={{ margin: '8px', color: '#7786d5' }} />{' '}
                    About
                  </label>
                  <TextArea
                    value={about?.about}
                    onChange={(e) => handleAbout({ about: e.target.value })}
                    aria-label="About Me"
                  />
                </Form.Item>
              </Form>
            </Col>
            <Col xs={2} sm={2} md={4} lg={8} xl={9} />
          </Row>
        )}

        {steps[current].title === 'Blocks' && (
          <Row>
            <Col xs={2} sm={2} md={4} lg={8} xl={9} />
            <Col xs={20} sm={20} md={16} lg={8} xl={6}>
              <br />
              <br />
              <Button
                type="primary"
                onClick={() => setOpen(true)}
                icon={<BuildOutlined />}
                aria-label="Create Block"
              >
                Create Block
              </Button>

              <Divider className="link-divider" />

              <Links
                data={list}
                editElement={editElement}
                removeElement={removeElement}
                aria-label="Remove Element"
              />

              <Modal
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                footer={[]}
              >
                <Form
                  form={blocks}
                  name="block-hooks"
                  onFinish={handleBlocks}
                  style={{ maxWidth: '75%', margin: 'auto' }}
                >
                  <Elements selection={selection} setSelection={setSelection} />
                </Form>
              </Modal>

              <Modal
                centered
                open={edit}
                onOk={() => setEdit(false)}
                onCancel={() => setEdit(false)}
                footer={[]}
              >
                <Form
                  form={editBlocks}
                  name="edit-hooks"
                  onFinish={handleEdit}
                  style={{ maxWidth: '75%', margin: 'auto' }}
                >
                  <Elements selection={selection} setSelection={setSelection} />
                </Form>
              </Modal>
            </Col>
            <Col xs={2} sm={2} md={4} lg={8} xl={9} />
          </Row>
        )}

        {steps[current].title === 'Theme' && (
          <Row>
            <Col xs={2} sm={2} md={4} lg={8} xl={9} />
            <Col xs={20} sm={20} md={16} lg={8} xl={6}>
              <br />
              <br />

              <Theme about={about} handleAbout={handleAbout} />
            </Col>
            <Col xs={2} sm={2} md={4} lg={8} xl={9} />
          </Row>
        )}
      </div>
    </Admin>
  );
}

export const steps = [
  {
    title: 'About',
  },
  {
    title: 'Blocks',
  },
  {
    title: 'Theme',
  },
];
