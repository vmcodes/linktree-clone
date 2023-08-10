import { Button, Col, Row, Typography } from 'antd';
import {
  DownCircleOutlined,
  SendOutlined,
  TwitterOutlined,
} from '@ant-design/icons';
import { Helmet } from 'react-helmet';
import Landing from '../../layouts/Landing';
import decentralized from '../../assets/images/decentralized.webp';
import screen from '../../assets/images/screen.webp';

const { Title } = Typography;

export default function Home() {
  return (
    <Landing>
      <Helmet>
        <title>{`Social Blocks | Web3 Social Links`}</title>
        <meta
          name="description"
          content={`Welcome to Social Blocks, your place for Web3 Social Links.`}
        />
        <link rel="canonical" href={`https:/socialblocks.com`} />
      </Helmet>
      <Row className="hero-bg">
        <Col xs={0} sm={4} md={4} lg={4} xl={4} />
        <Col xs={24} sm={16} md={16} lg={16} xl={16}>
          <Title className="welcome-text">
            Welcome to
            <br />
            Social Blocks!
          </Title>

          <DownCircleOutlined className="hero-arrow" />
        </Col>
        <Col xs={0} sm={4} md={4} lg={4} xl={4} />
      </Row>

      <Row className="learn-bg">
        <Col xs={0} sm={4} md={4} lg={4} xl={4} />
        <Col xs={24} sm={16} md={16} lg={16} xl={16}>
          <Row className="about-text">
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <img src={screen} alt="mobile view" height="500px" />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Title className="about-text">
                Web3 <br /> Social Links
              </Title>
            </Col>
          </Row>
          <Row className="info-text">
            <Col
              className="info-column"
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
            >
              <Title level={2} underline>
                What we do.
              </Title>
              <Title level={4}>
                Our Web3 social links allow you to share your content, while
                knowing that your data and personal information is not being
                sold to other companies.
              </Title>
              <Title level={4}>
                We are private, secure, and decentralized.
              </Title>
              <Title level={4}>
                Keep you and your audience safe from third parties today!
              </Title>

              <Title level={4}>
                Connect:
                <Button
                  style={{ margin: '0px 16px' }}
                  type="dashed"
                  icon={<TwitterOutlined />}
                  rel="noreferrer noopener"
                  target="_blank"
                  href="https://twitter.com/SocialxBlocks"
                >
                  Twitter
                </Button>{' '}
                <Button
                  type="dashed"
                  icon={<SendOutlined />}
                  href="mailto:hello@socialblocks.io"
                >
                  Email
                </Button>
              </Title>
            </Col>
            <Col
              className="info-column"
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
            >
              <img
                src={decentralized}
                className="decentralized"
                alt="decentralized blocks"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Landing>
  );
}
