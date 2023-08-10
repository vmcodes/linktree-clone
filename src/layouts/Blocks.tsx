import { FC, ReactNode } from 'react';
import { ConfigProvider, Layout, theme } from 'antd';
import { Link } from 'react-router-dom';
import { Profile } from '../types';

const { Content, Footer } = Layout;

const Blocks: FC<{ profile: Profile; children: ReactNode }> = ({
  profile,
  children,
}) => {
  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: profile.theme?.color },
        algorithm:
          profile.theme?.algorithm === 'Dark'
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
      }}
    >
      <Layout>
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

export default Blocks;
