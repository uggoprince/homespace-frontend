/* eslint-disable react/prefer-stateless-function */
import { Component } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import countryToCurrency from 'country-to-currency';
import { displayCardDetails } from '../../Utils/EventHandlers';
import { countryNameToCode } from '../../Utils/constants';
import './style.css';

class PropertyCard extends Component {
  render() {
    const { property } = this.props;
    const { number } = this.props;
    const {
      photos, intent, price, propertyType, address, currency, country,
    } = property;
    let photo1;
    if (photos.length > 0 && photos[0] !== null) {
      const { photo } = photos[0];
      photo1 = photo;
    }
    const theIntent = intent.charAt(0).toUpperCase() + intent.slice(1);
    return (
      <div
        onClick={(e) => displayCardDetails(e, property, number)}
        className="prop-card"
      >
        <div className="card-image" style={{ backgroundImage: `url(${photo1})` }}>
          <div className="price-tag">
            <div className="font-medium inline-block">
              For
              {' '}
              {theIntent}
            </div>
            <div className="font-bold">
              {currency
                ? price?.toLocaleString(
                  countryNameToCode[country], { style: 'currency', currency },
                )
                : price?.toLocaleString(price)}
            </div>
          </div>
        </div>
        <div className="px-2 py-2">
          <div className="text-tertiary text-xs capitalize">{propertyType}</div>
          <div className="text-xs truncate dark:text-white">{address}</div>
        </div>
      </div>
    );
  }
}

export default PropertyCard;
