import {
  Button,
  ColorPicker,
  ConfigProvider,
  Select,
  theme,
  Layout,
  Row,
  Divider,
} from 'antd';
import type { Color } from 'antd/es/color-picker';
import { useState } from 'react';
import { Profile } from '../../types';

const { Option } = Select;

type ThemeProps = {
  about: Profile;
  handleAbout: Function;
};

export default function Theme({ about, handleAbout }: ThemeProps) {
  const { token } = theme.useToken();
  const [color, setColor] = useState<Color | string>(
    about.theme?.color || token.colorPrimary,
  );
  const [background, setBackground] = useState<string>(
    about.theme?.algorithm || 'Default',
  );
  const [buttons, setButtons] = useState<string>(
    about.theme?.buttons || 'Solid',
  );

  const handleBackground = async (algorithm: string): Promise<void> => {
    if (algorithm === 'Default') {
      setBackground(algorithm);
      handleAbout({
        theme: { color: color, algorithm: algorithm, buttons: buttons },
      });
    } else if (algorithm === 'Dark') {
      setBackground(algorithm);
      handleAbout({
        theme: { color: color, algorithm: algorithm, buttons: buttons },
      });
    }
  };

  const handleButtons = async (buttons: string): Promise<void> => {
    if (buttons === 'Solid') {
      setButtons(buttons);
      handleAbout({
        theme: { color: color, algorithm: background, buttons: buttons },
      });
    } else if (buttons === 'Ghost') {
      setButtons(buttons);
      handleAbout({
        theme: { color: color, algorithm: background, buttons: buttons },
      });
    }
  };

  const handleColor = async (color: Color | string): Promise<void> => {
    const currentColor =
      typeof color === 'string' ? color : color.toHexString();

    setColor(currentColor);

    handleAbout({
      theme: { color: currentColor, algorithm: background, buttons: buttons },
    });
  };

  return (
    <>
      {color && background && (
        <ConfigProvider
          theme={{
            token: {
              colorPrimary:
                typeof color === 'string' ? color : color.toHexString(),
            },
            algorithm:
              background === 'Default'
                ? theme.defaultAlgorithm
                : theme.darkAlgorithm,
          }}
        >
          <Layout className="card">
            <Row
              style={{
                width: '300px',
                margin: 'auto',
                padding: '30px',
              }}
            >
              <ColorPicker
                value={color}
                onChange={(value) => handleColor(value)}
                style={{ width: '300px' }}
                aria-label="Select Color"
              />

              <Divider />

              <Select
                placeholder={background === 'Default' ? 'Light' : 'Dark'}
                onChange={(value) => handleBackground(value)}
                style={{ width: '300px' }}
                aria-label="Background Color"
              >
                <Option value="Default">Light</Option>
                <Option value="Dark">Dark</Option>
              </Select>

              <Divider />

              <Select
                placeholder={buttons === 'Solid' ? 'Solid' : 'Transparent'}
                onChange={(value) => handleButtons(value)}
                style={{ width: '300px' }}
                aria-label="Button Fill"
              >
                <Option value="Solid">Solid</Option>
                <Option value="Ghost">Transparent</Option>
              </Select>

              <Divider />

              <Button
                type="primary"
                ghost={buttons === 'Ghost'}
                block
                style={{ margin: 'auto', height: '45px' }}
                aria-label="Block Preview"
                className="preview-btn"
              >
                Block Preview
              </Button>
            </Row>
          </Layout>
        </ConfigProvider>
      )}
    </>
  );
}
