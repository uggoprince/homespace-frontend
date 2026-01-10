import { Spin } from 'antd';
import './style.css';

export function Loader({
  loading, children, tip = '', css = '',
}) {
  return (
    <Spin
      tip={tip}
      size="large"
      spinning={loading}
      wrapperClassName="relative"
      className={`${css}`}
    >
      {children}
    </Spin>
  );
}
