/* eslint-disable react/prefer-stateless-function */
import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  HomeOutlined, HotelOutlined, LocationOnOutlined, OpenWithOutlined,
} from '@mui/icons-material';
import countryToCurrency from 'country-to-currency';
import { displayCardDetails } from '../../Utils/EventHandlers';
import { countryNameToCode } from '../../Utils/constants';
import './style.css';

const formatPrice = (price, country, currency) => (currency
  ? price?.toLocaleString(
    countryNameToCode[country], { style: 'currency', currency },
  )
  : price?.toLocaleString(price));

class PropertyCard extends Component {
  render() {
    const { property } = this.props;
    const { number } = this.props;
    const {
      photos, intent, price, propertyType, address, currency, country,
    } = property;
    let photo1;
    if (photos && photos.length > 0 && photos[0] !== null) {
      const { photo } = photos[0];
      photo1 = photo;
    }
    const theIntent = intent.charAt(0).toUpperCase() + intent.slice(1);
    return (
      <button
        type="button"
        onClick={(e) => displayCardDetails(e, property, number)}
        className="prop-card"
        aria-label={`View details for ${propertyType} at ${address}`}
      >
        {/* Image section */}
        <div className="card-image" style={{ backgroundImage: `url(${photo1})` }}>
          <div className="price-tag">
            <div className="font-medium inline-block">
              For
              {' '}
              {theIntent}
            </div>
          </div>
        </div>
        {/* Property details section */}
        <div className="px-2 py-2 space-y-1">
          <div className="text-sm font-bold text-indigo-400">
            {formatPrice(price, country, currency || countryToCurrency[country])}
          </div>
          <div className="text-tertiary font-semibold text-sm capitalize">{propertyType}</div>
          <div className="text-xs truncate flex items-center gap-1 dark:text-white pb-1">
            <LocationOnOutlined fontSize="small" />
            <span className="flex-1 truncate">{address}</span>
          </div>
          <div className="flex items-center gap-4 text-sm dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-700">
            <span className="flex items-center gap-1.5">
              <HomeOutlined size={14} fontSize="small" className="" />
              {property.beds ? (
                <span>
                  {property.beds}
                  {' '}
                  beds
                </span>
              ) : ' - '}
            </span>
            <span className="flex items-center gap-1.5">
              <HotelOutlined size={14} fontSize="small" className="" />
              {property.baths ? (
                <span>
                  {property.baths}
                  {' '}
                  baths
                </span>
              ) : ' - '}
            </span>
            <span className="flex items-center gap-1.5">
              <OpenWithOutlined size={14} fontSize="small" className="" />
              {property.sqft ? (
                <span>
                  {property.sqft}
                  {' '}
                  sqft
                </span>
              ) : ' - '}
            </span>
          </div>
        </div>
      </button>
    );
  }
}

PropertyCard.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    photos: PropTypes.arrayOf(
      PropTypes.shape({
        photo: PropTypes.string,
      }),
    ).isRequired,
    intent: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    propertyType: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    currency: PropTypes.string,
    country: PropTypes.string.isRequired,
    beds: PropTypes.number,
    baths: PropTypes.number,
    sqft: PropTypes.number,
  }).isRequired,
  number: PropTypes.number.isRequired,
};

export default PropertyCard;
