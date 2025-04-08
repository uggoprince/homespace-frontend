import {
  FaTimes,
} from 'react-icons/fa';
import './style.css';

// const modalCSS = 'modal-container';

const Modal = ({
  show, children, handleClose, header,
}) => {
  const toggleShowClassName = show ? 'block w-full h-full absolute z-10' : 'hidden';
  return (
    <div className={toggleShowClassName}>
      <div className="modal-container">
        <section className="modal-main flex flex-col bg-white h-auto rounded-lg">
          <div
            className="px-8 pb-2 pt-2 min-h-min
              flex flex-row justify-between modal-header bg-white rounded-tr-lg rounded-tl-lg"
          >
            <h1 className="text-indigo-600 font-bold">
              {header}
            </h1>
            <FaTimes
              title="Close"
              onClick={handleClose}
              className="bg-gray-500 hover:bg-red-500 text-white text-3xl order-last cursor-pointer rounded-full p-2"
            />
          </div>
          <div className="w-full max-h-full flex-1">
            {children}
          </div>
        </section>
      </div>
    </div>
  );
};

export default function HsModal(props) {
  const {
    children, open, handleClose, header,
  } = props;
  return (
    <Modal
      show={open}
      handleClose={handleClose}
      header={header}
    >
      {children}
    </Modal>
  );
}
