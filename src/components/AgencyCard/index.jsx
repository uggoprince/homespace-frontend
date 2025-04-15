/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './style.css';

export default class AgencyCard extends Component {
  render() {
    const { agency, mine } = this.props;
    const {
      id, banner, about, name, address, phoneNumber, username,
    } = agency;
    const agencyPath = `/agencies/${username}`;
    // if (mine) agencyPath = `/dashboard/agencies/${id}`;
    // else agencyPath = `/agencies/${id}`;
    return (
      <Link
        state={agency}
        to={agencyPath}
        className="agency-card"
      >
        <div className="card-header">
          <span className="headline">
            {name}
          </span>
        </div>
        <div className="agency-image bg-center" style={{ backgroundImage: `url(${banner})` }} />
        <div className="text-section dark:text-white">
          <div className="subhead">
            {about}
          </div>
          <div className="supporting-text">
            <FaPhoneAlt className="text-iconColor" />
            <span className="pl-1">{phoneNumber}</span>
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
