import React, { Component } from 'react';
import './style.css';
import { Agency } from '@/types/property';
import Link from 'next/link';
import { MapPin, Phone, Star } from 'lucide-react';
import { agencyPath } from '@/Utils/paths';

class AgencyCard extends Component<{ agency: Agency; mine?: boolean }> {
  render() {
    const { agency, mine } = this.props;
    const {
      banner, about, name, address, phoneNumber, username,
    } = agency;
    return (
      <Link
        href={agencyPath(username)}
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
            <Star className="text-amber-400 fill-amber-400 inline align-sub" size={16} />
            <span className="pl-1">4.8 (24 reviews) </span>
          </div>
          <div className="supporting-text">
            <Phone className="w-4 h-4 shrink-0 fill-blue-500 text-blue-500" />
            {phoneNumber && <span className="pl-1">{phoneNumber}</span>}
          </div>
          <div className="supporting-text">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="pl-1 align-sub truncate">{address}</span>
          </div>
        </div>
      </Link>
    );
  }
}

export default AgencyCard;
