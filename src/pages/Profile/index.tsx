import { useState, useEffect, ReactNode, useMemo } from 'react';
import { Col, Row, Typography, Divider, Image } from 'antd';
import { useParams } from 'react-router-dom';
import { getProfile } from '../../services';
import { Profile } from '../../types';
import { Helmet } from 'react-helmet';
import Blocks from '../../layouts/Blocks';
import { GlobalOutlined } from '@ant-design/icons';
import { Missing } from './Missing';
import { FormBlock, HeaderBlock, SocialBlock, SocialLink } from './Blocks';
import fallback from '../../assets/images/fallback.webp';

const { Title } = Typography;

export default function () {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile>({
    address: '',
    username: '',
    slug: '',
  });

  const fetchProfile = async (slug: string): Promise<void> => {
    try {
      const response = await getProfile(slug);

      const currentProfile: Profile = profile;

      setProfile({ ...currentProfile, ...response });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug && !profile.slug) {
      fetchProfile(slug);
    }
  }, [profile, slug]);

  const socialBlocks = useMemo(() => {
    if (profile?.elements && profile.theme?.buttons) {
      const blocks: ReactNode[] = [];

      for (const block of profile.elements) {
        switch (block.element) {
          case 'Header':
            blocks.push(<HeaderBlock block={block} />);
            break;
          case 'Link':
            blocks.push(
              <SocialLink block={block} buttons={profile.theme.buttons} />,
            );
            break;
          case 'Social':
            blocks.push(
              <SocialBlock block={block} buttons={profile.theme.buttons} />,
            );
            break;
          case 'Form':
            blocks.push(
              <FormBlock
                block={block}
                theme={profile.theme}
                email={block?.value}
              />,
            );
            break;
          default:
            break;
        }
      }

      return blocks;
    }
  }, [profile]);

  return (
    <>
      {profile.slug && (
        <Blocks profile={profile}>
          <Helmet>
            <title>{`${profile.username} | Social Blocks`}</title>
            <meta
              name="description"
              content={`${profile?.about ? profile.about : profile.username}`}
            />
            <link
              rel="canonical"
              href={`https:/socialblocks.com/${profile.slug}`}
            />
          </Helmet>
          <div className="profile-bg profile-header">
            <Row>
              <Col xs={2} sm={2} md={4} lg={8} xl={8} />
              <Col xs={20} sm={20} md={16} lg={8} xl={8}>
                <Image
                  height="150px"
                  width="150px"
                  alt="preview"
                  src={profile?.image}
                  fallback={fallback}
                  rootClassName="image-preview"
                />
                <Title className="profile-title">{profile.username}</Title>
                {profile?.location && (
                  <Title level={4}>
                    <GlobalOutlined style={{ marginRight: '16px' }} />
                    {profile?.location}
                  </Title>
                )}
                <Title level={4}>{profile?.about}</Title>
                <Divider className="profile-divider" />
                {socialBlocks}
              </Col>
              <Col xs={2} sm={2} md={4} lg={8} xl={8} />
            </Row>
          </div>
        </Blocks>
      )}
      {!loading && !profile.slug && <Missing />}
    </>
  );
}
