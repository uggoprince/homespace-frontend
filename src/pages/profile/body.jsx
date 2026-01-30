import { CustomButton as Button } from '../../components/Button/CustomButton';
import Modal from '../../components/Modal';
import CreateAgency from '../agency/form/createAgency';
import useModal from '../../components/Modal/useModal';
import { useAuth } from '../../auth/AuthProvider';

export const ProfileBody = (props) => {
  const {
    open, setOpen, handleOpen, handleClose,
  } = useModal();
  const { user } = useAuth();
  const { profile: { hasAgency } } = user;
  return (
    <div className="container hs-max-width-85 page-content">
      <div className="w-full">
        <div className="flex flex-col box-border px-2 sticky top-0 w-full">
          <div className="w-full pt-2 pb-1 px-3 font-semibold text-2xl text-slate-600 dark:text-slate-300">
            <h1>Agency</h1>
          </div>
          <div className="w-[100%] bg-slate-100 dark:bg-slate-600 px-3 py-3 box-border flex flex-row place-content-end">
            <span className="order-last">
              <Button
                disabled={hasAgency}
                onClick={() => handleOpen()}
                type="button"
              >
                Create Agency
              </Button>
            </span>
          </div>
        </div>
      </div>
      <Modal
        header="Create Agency"
        open={open}
        handleClose={handleClose}
      >
        <CreateAgency
          handleClose={handleClose}
          modalIsOpen={open}
          // doneRefetching={doneRefetching}
          // setReFetchMyAgencies={setReFetchMyAgencies}
        />
      </Modal>
    </div>
  );
};
