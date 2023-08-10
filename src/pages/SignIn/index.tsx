import { useEffect } from 'react';
import Landing from '../../layouts/Landing';
import { Col, Row, Typography } from 'antd';
import { useDispatch } from '../../context';
import { Web3Button } from '@web3modal/react';
import { login } from '../../context/actions';
import { useAccount } from 'wagmi';
import { Helmet } from 'react-helmet';

const { Title } = Typography;

export default function SignIn() {
  const dispatch = useDispatch();
  const { address } = useAccount();

  const handleLogin = async (address: string): Promise<void> => {
    await login(dispatch, address);

    window.location.assign('/account');
  };

  useEffect(() => {
    if (address) {
      handleLogin(address);
    }
  }, [address]);

  return (
    <Landing>
      <Helmet>
        <title>{`Login With WalletConnect | Social Blocks`}</title>
        <meta
          name="description"
          content={`Login to Social Blocks with WalletConnect.`}
        />
        <link rel="canonical" href={`https:/socialblocks.com/login`} />
      </Helmet>
      <Row className="home-bg">
        <Col xs={0} sm={4} md={4} lg={4} xl={4} />
        <Col xs={24} sm={16} md={16} lg={16} xl={16}>
          <Title className="login-text">
            Connect Wallet
            <br />
            To Begin
          </Title>

          <div className="hero-divider" />

          <Web3Button
            label="WalletConnect"
            aria-label="Login with Wallet Connect"
          />
        </Col>
        <Col xs={0} sm={4} md={4} lg={4} xl={4} />
      </Row>
    </Landing>
  );
}
