import { FC } from 'react';
import { Helmet } from 'react-helmet';
import Landing from '../../layouts/Landing';
import Error from '../../assets/icons/404.svg';

export const Missing: FC = () => {
  return (
    <Landing>
      <Helmet>
        <title>{`404: Missing Page | Social Blocks`}</title>
      </Helmet>
      <div className="account-bg">
        <img src={Error} className="error" alt="404: Missing Page" />
      </div>
    </Landing>
  );
};
