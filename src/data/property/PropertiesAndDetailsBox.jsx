/* eslint-disable no-console */
import React from 'react';
import PropertyDetails from '../../components/PropertyDetails';

const Properties = (props) => {
  const { property, number, children } = props;
  let propertyPresent = false;
  if (property) propertyPresent = true;
  return (
    <div className="container hs-max-width-85 hs-pb-100">
      <div className="w-full h-auto">
        <div id={`propertiesDiv${number}`} className="transition-width">
          {children}
        </div>
        <div id={`propertyDetailsFromSearchDiv${number}`} className="propertyDetailsFromSearchDiv hidden transition-width">
          {propertyPresent && <PropertyDetails property={property} number={number} />}
        </div>
      </div>
    </div>
  );
};

export default Properties;
