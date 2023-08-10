import { FC, Dispatch, SetStateAction } from 'react';
import { Button, Steps, message } from 'antd';
import { steps } from '.';
import {
  CheckCircleOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Stepper: FC<{
  slug?: string;
  current: number;
  setCurrent: Dispatch<SetStateAction<number>>;
  submitAbout: Function;
}> = ({ slug, current, setCurrent, submitAbout }) => {
  const navigate = useNavigate();

  const next = () => {
    setCurrent(current + 1);
    window.scrollTo(0, 0);
  };

  const prev = () => {
    setCurrent(current - 1);
    window.scrollTo(0, 0);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const handleDone = async (): Promise<void> => {
    await submitAbout();
    message.success('Blocks created!');
    navigate(`/${slug}`, { replace: true });
  };

  return (
    <div
      style={{
        margin: 'auto',
        textAlign: 'left',
      }}
    >
      <Steps current={current} items={items} />
      <br />
      <br />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {current > 0 && (
          <Button
            style={{ marginRight: '8px' }}
            onClick={() => prev()}
            icon={<StepBackwardOutlined />}
            aria-label="Back"
          >
            Back
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => next()}
            icon={<StepForwardOutlined />}
            aria-label="Next"
          >
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={handleDone}
            icon={<CheckCircleOutlined />}
            aria-label="Finish"
          >
            Finish
          </Button>
        )}
      </div>
    </div>
  );
};

export default Stepper;
