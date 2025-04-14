import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FaArrowLeft, FaEnvelope, FaGlobeAfrica, FaPhoneAlt, FaFacebook, FaWhatsapp, FaTwitter, FaInstagram, FaGlobe,
} from 'react-icons/fa';
import { queryApi } from '../../Utils/Api';
import { GET_AGENCY } from '../../data/agency/queryString';
import ErrorHandler from '../../data/errorHandler';
import './style.css';

const Agency = (props) => {
  const [state, setState] = useState({
    agency: null,
  });
  const navigate = useNavigate();
  const { username } = useParams();
  const { loading, error, data } = queryApi(GET_AGENCY, { username }, false);
  const { agency } = state;
  useEffect(() => {
    if (data && data?.getAgencyByUsername) setState({ ...state, agency: data?.getAgencyByUsername });
  }, [data]);
  return (
    <div className="w-full page-content">
      {loading && 'Loading...'}
      {error && <ErrorHandler error={error} />}
      {agency && !error && !loading && (
      <div className="agency-body">
        <div className="username-box gap-x-2 items-start justify-items-start text-lg">
          <FaArrowLeft
            onClick={() => navigate(-1)}
            title="Go back"
            className="cursor-pointer font-extrabold self-center text-primary"
          />
          <div className=" text-indigo-500">
            @
            {agency.username}
          </div>
        </div>

        <div className="banner-and-contact-container">
          <div className="banner-and-contact-box">
            {/** Banner Image */}
            <div className="banner-box xl:basis-3/4">
              <img
                src={agency?.banner}
                alt=""
                className="banner-image"
              />
            </div>
            <div
              className="agency-contacts-socials text-textColor font-roboto"
            >
              <div className="agency-contacts">
                <div className="agency-contact">
                  <FaPhoneAlt className="text-iconColor social-icon" />
                  <span className="">{agency.phoneNumber}</span>
                </div>
                <div className="agency-contact">
                  <FaEnvelope className="text-amber-500 social-icon" />
                  <span className="self-start align-top">{agency.email}</span>
                </div>
                <div className="agency-contact pb-4">
                  <FaGlobe className="text-iconColor social-icon" />
                  <span className="self-start align-top">{`${agency?.address}, ${agency?.state}, ${agency?.country}`}</span>
                </div>
              </div>
              <div className="agency-socials">
                {agency?.whatsapp && (
                <a to={`https://wa.me/${agency.whatsapp}`} target="blank" className="agency-contact">
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
        <div className="py-3 w-full">
          <h1 className="font-semibold text-2xl">{agency?.name}</h1>
          <div className="w-full h-auto">{agency?.about}</div>
        </div>
      </div>
      )}
    </div>
  );
};

export default Agency;
