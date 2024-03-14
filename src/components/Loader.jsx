import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const Loader = ({ loadingIconSize = 24 }) => {
   return (
      <Spin
         fullscreen
         indicator={
            <LoadingOutlined
               style={{
                  fontSize: loadingIconSize,
               }}
               spin
            />
         }
      />
   )
};

export default Loader;
