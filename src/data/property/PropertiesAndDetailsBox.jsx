/* eslint-disable no-console */
import React from 'react';
import PropertyDetails from '../../components/PropertyDetails';

const Properties = (props) => {
  const { property, number, children } = props;
  let propertyPresent = false;
  if (property) propertyPresent = true;
  return (
    <div className="container hs-max-width-95 hs-pb-100 page-content">
      <div className="w-full h-auto flex flex-row flex-nowrap">
        <div id={`propertiesDiv${number}`} className="transition-width w-full">
          {children}
        </div>
        <div id={`propertyDetailsFromSearchDiv${number}`} className="propertyDetailsFromSearchDiv hidden transition-width w-full">
          {propertyPresent && <PropertyDetails property={property} number={number} />}
        </div>
      </div>
    </div>
  );
};

export default Properties;
