import { Modal } from 'antd';

const CustomModal = ({ children, className, open, closable = false, centered = true, maskClosable = true, ...rest }) => {
   return (
      <Modal
         open={open}
         title={null}
         footer={null}
         centered={centered}
         closable={closable}
         maskClosable={maskClosable}
         styles={{ content: { padding: "0" } }}
         style={{ width: "auto" }}
         className={`!w-fit ${className}`}
         {...rest}
      >
         {
            children
         }
      </Modal>
   );
};
export default CustomModal;