/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaMapMarkerAlt, FaPhoneAlt, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './style.css';

class AgencyCard extends Component {
  render() {
    const { agency, mine } = this.props;
    const {
      id, banner, about, name, address, phoneNumber, username,
    } = agency;
    const agencyPath = `/agencies/${username}`;
    return (
      <Link
        state={agency}
        to={agencyPath}
        className="agency-card"
      >
        {/* <div className="card-header">
          <span className="headline">
            {name}
          </span>
        </div> */}

        <div
          className="agency-image bg-center"
          style={{ backgroundImage: `url(${banner})` }}
        />
        <div className="text-section dark:text-white">
          <span className="headline">
            {name}
          </span>
          <div className="subhead line-clamp-1">
            {about}
          </div>
          <div className="flex items-center">
            <FaStar className="text-iconColor inline align-sub" size={16} />
            <span className="pl-1">4.8 (24 reviews) </span>
          </div>
          <div className="supporting-text">
            <FaPhoneAlt className="text-iconColor" />
            {phoneNumber && <span className="pl-1">{phoneNumber}</span>}
          </div>
          <div className="supporting-text">
            <FaMapMarkerAlt className="text-iconColor" />
            <span className="pl-1 align-sub truncate">{address}</span>
          </div>
        </div>
      </Link>
    );
  }
}

AgencyCard.propTypes = {
  agency: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    banner: PropTypes.string,
    about: PropTypes.string,
    name: PropTypes.string.isRequired,
    address: PropTypes.string,
    phoneNumber: PropTypes.string,
    username: PropTypes.string.isRequired,
  }).isRequired,
  mine: PropTypes.bool,
};

AgencyCard.defaultProps = {
  mine: false,
};

export default AgencyCard;
