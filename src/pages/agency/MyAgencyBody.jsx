import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {
  FaPencilAlt,
  FaCloudUploadAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaGlobeAfrica,
  FaFacebook,
  FaWhatsapp,
  FaTwitter,
  FaInstagram, FaGlobe,
} from 'react-icons/fa';
import { queryApi, mutateApi } from '../../Utils/Api';
import { GET_USER_AGENCY, UPDATE_BANNER } from '../../data/agency/queryString';
import ErrorHandler from '../../data/errorHandler';
import Modal from '../../components/Modal';
import useModal from '../../components/Modal/useModal';
import { setImageForUpload } from '../../Utils/EventHandlers';
import { CustomButton as Button } from '../../components/Button/CustomButton';
import Alert, { notify } from '../../components/Alert';
import './style.css';

const Agency = (props) => {
  const [state, setState] = useState({
    agency: null,
    bannerFile: null,
    bannerFilePath: null,
    bannerFileError: null,
  });
  const [agency, setAgency] = useState(null);
  const [bannerUpdating, setBannerUpdating] = useState(false);
  const navigate = useNavigate();
  const {
    open, setOpen, handleOpen, handleClose,
  } = useModal();
  const [
    updateAgencyBanner,
    { loading: loadingBanner, error: errorBanner, data: dataBanner },
  ] = mutateApi(UPDATE_BANNER);
  const { loading, error, data } = queryApi(GET_USER_AGENCY, {}, false);
  const { bannerFile, bannerFilePath } = state;
  let alertLoadingId;
  const setBannerForUpload = (file, path, error) => {
    setState({
      ...state, bannerFile: file, bannerFileError: error, bannerFilePath: path,
    });
  };
  const handleBannerPick = (e) => {
    setImageForUpload(e, setBannerForUpload);
    handleOpen();
  };
  const handleBannerUpload = (e) => {
    updateAgencyBanner({ variables: { id: agency?.id, files: bannerFile } });
  };
  useEffect(() => {
    if (data && data?.getUserAgency) {
      setState({ ...state, agency: data?.getUserAgency });
      setAgency(data?.getUserAgency);
    }
  }, [data]);
  useEffect(() => {
    if (dataBanner && dataBanner?.updateAgencyBanner !== null && !loadingBanner && bannerUpdating) {
      handleClose();
      toast.remove(alertLoadingId);
      notify('Banner updated', 3);
      setState({ ...state, agency: dataBanner?.updateAgencyBanner });
      setBannerUpdating(false);
    }
  }, [dataBanner]);
  useEffect(() => {
    if (open === false) setBannerForUpload(null, null, null);
  }, [open]);
  useEffect(() => {
    if (loadingBanner) {
      setBannerUpdating(true);
      alertLoadingId = notify('Uploading banner...', 1);
    }
    if (errorBanner) {
      setBannerUpdating(false);
      toast.remove(alertLoadingId);
    }
  }, [loadingBanner, errorBanner]);
  return (
    <>
      {loading && 'Loading...'}
      {error && <ErrorHandler error={error} />}
      {agency && !error && !loading && (
      <div className="agency-body page-content">
        <div className="agency-body-content">
          <div className="username-box sticky">
            <div className="self-center w-[100%] box-border mx-auto text-xl text-indigo-500">
              @
              {agency.username}
            </div>
          </div>
          <div className="w-full h-auto">
            <div className="banner-and-contact-container">
              {/** Banner Image */}
              <div className="banner-and-contact-box">
                <div className="banner-box xl:basis-4/6">
                  <div
                    title="Change banner"
                    className="edit-banner"
                    onClick={(e) => { document.getElementById('uploadBannerInput').click(); }}
                  >
                    <FaPencilAlt
                      className="text-indigo-600 hover:text-indigo-700"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      multiple={false}
                      className="hidden"
                      id="uploadBannerInput"
                      name="uploadBannerInput"
                      onChange={handleBannerPick}
                    />
                  </div>
                  <img
                    src={agency?.banner}
                    alt=""
                    className="banner-image"
                  />
                </div>
                <div
                  className="agency-contacts-socials text-textColor dark:text-slate-300 font-roboto"
                >
                  <div className="agency-contacts">
                    <div className="agency-contact">
                      <FaPhoneAlt className=" text-iconColor social-icon" />
                      <span className="pl-1">{agency.phoneNumber}</span>
                    </div>
                    <div className="agency-contact">
                      <FaEnvelope className="text-amber-500 social-icon" />
                      <span className="pl-1">{agency.email}</span>
                    </div>
                    <div className="agency-contact pb-4">
                      <FaGlobe className=" text-iconColor social-icon" />
                      <span className="pl-1">{`${agency?.address}, ${agency?.state}, ${agency?.country}`}</span>
                    </div>
                  </div>
                  <div className="agency-socials">
                    {agency?.whatsapp && (
                      <a href={`https://wa.me/${agency.whatsapp}`} target="blank" className="agency-contact">
                        <FaWhatsapp className="text-green-600 social-icon" />
                        <span className="">{agency.whatsapp}</span>
                      </a>
                    )}
                    {agency?.facebook && (
                      <div className="agency-contact">
                        <FaFacebook className="text-tertiary social-icon" />
                        <span className="">{agency.facebook}</span>
                      </div>
                    )}
                    {agency?.instagram && (
                      <div className="agency-contact">
                        <FaInstagram className="text-orange-600 social-icon" />
                        <span className="pl-1">{agency.instagram}</span>
                      </div>
                    )}
                    {agency?.twitter && (
                      <div className="agency-contact">
                        <FaTwitter className="text-tertiary social-icon" />
                        <span className="pl-1">{agency.twitter}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="py-3 w-full dark:text-white">
              <h1 className="font-semibold text-2xl">{agency?.name}</h1>
              <div className="w-full h-auto">{agency?.about}</div>
            </div>
          </div>
        </div>
      </div>
      )}
      <Modal
        header="Upload Banner"
        open={open}
        handleClose={handleClose}
      >
        <div className="w-full flex flex-col max-h-full justify-center content-center">
          <div className="p-2 bg-slate-700 rounded-none w-[80%] overflow-y-scroll flex flex-col gap-2 py-3 max-h-[80%] self-center">
            <img src={bannerFilePath} alt="" className="w-full h-auto" />
          </div>
          <div className="w-full flex flex-row-reverse px-8 pb-4 mb-10 py-3 h-fit">
            {/* <Button
              classname="bg-white text-slate-600 border border-slate-600 w-fit"
              handleclick={(e) => {}}
              text="Cancel"
              type="button"
            /> */}
            <Button
              className="min-w-fit w-[85px]"
              onClick={handleBannerUpload}
              disabled={loadingBanner}
              icon={FaCloudUploadAlt}
              iconClassName="text-xl"
              type="button"
            >
              Apply
            </Button>
          </div>
        </div>
      </Modal>
      <Alert custom />
    </>
  );
};

export default Agency;
