import { FC, ReactNode } from 'react';
import { ConfigProvider, Layout, Menu, theme } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import logo from '../assets/images/logo.webp';
import { logout } from '../context/actions';
import { useDispatch } from '../context';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

const Admin: FC<{ children: ReactNode }> = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const links: ItemType[] = [
    {
      key: '/account',
      label: (
        <UserOutlined
          aria-label="Account"
          style={{ fontSize: '22px', margin: '0px 16px' }}
        />
      ),
    },
    {
      key: '/disconnect',
      label: (
        <LogoutOutlined
          aria-label="Logout"
          style={{ fontSize: '22px', margin: '0px 16px' }}
        />
      ),
    },
  ];

  const updatePage = async (key: string): Promise<void> => {
    if (key === '/disconnect') {
      await logout(dispatch);

      window.location.assign('/');
    } else {
      navigate(key);
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: '#7786d5' },
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <Layout>
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            background: colorBgContainer,
          }}
          className="header"
        >
          <Link to="/" aria-label="Back to Home">
            <img src={logo} alt="Social Blocks" className="header-logo" />
          </Link>
          <Menu
            items={links}
            mode="horizontal"
            className="header-menu"
            onSelect={(e) => updatePage(e.key)}
            defaultSelectedKeys={[location.pathname]}
          />
        </Header>

        <Content>{children}</Content>

        <Footer className="footer">
          <span style={{ margin: '0px 8px' }}>
            <Link to="/" aria-label="Social Blocks">
              Social Blocks
            </Link>{' '}
            © {new Date().getFullYear()}
          </span>
          |
          <span style={{ margin: '0px 8px' }}>
            <a
              href="https://www.freeprivacypolicy.com/live/273b7375-7b41-4bf1-9433-0a0938540874"
              target="_blank"
              rel="noreferrer"
              aria-label="Privacy Policy"
            >
              Privacy Policy
            </a>
          </span>
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default Admin;
