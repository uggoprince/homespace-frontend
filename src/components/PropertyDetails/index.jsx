/* eslint-disable react/jsx-one-expression-per-line */
import { useEffect } from 'react';
import {
  FaUsers, FaMapMarkerAlt, FaTimes, FaChevronCircleLeft, FaChevronCircleRight,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { closeCardDetails } from '../../Utils/EventHandlers';
import isEmptyString from '../../Utils/Checkers';

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export default (props) => {
  const { property, number } = props;
  const {
    id, agency, address, state, country, propertyType, intent, price, photos, status, description,
  } = property;
  let {
    title, area, bedRooms, bathRooms,
  } = property;
  area = (!isEmptyString(area)) ? `${area}sqm` : '-';
  bedRooms = (!isEmptyString(bedRooms) ? bedRooms : '-');
  bathRooms = (!isEmptyString(bathRooms) ? bathRooms : '-');
  title = capitalizeFirstLetter(title);
  // eslint-disable-next-line no-console
  // console.log(!isEmptyString(area));
  let photo1 = '';
  const imgData = photos[0];
  if (imgData) photo1 = imgData.photo;
  const numberOfPhotos = photos.length;
  let detailsDivImg = document.getElementById('detailsDivImg');
  let currentPixOnDetails = '';
  let photoPos = 0;
  const getCurrentPixOnDetails = () => {
    detailsDivImg = document.getElementById('detailsDivImg');
    currentPixOnDetails = document.getElementById('currentPixOnDetails');
    currentPixOnDetails.innerHTML = photoPos + 1;
  };
  useEffect(() => {
    getCurrentPixOnDetails();
  });
  const switchPhoto = () => {
    detailsDivImg.setAttribute('src', photos[photoPos].photo);
    currentPixOnDetails.innerHTML = photoPos + 1;
  };
  const changePhoto = (e, i) => {
    const boolPlus = photoPos === (numberOfPhotos - 1);
    const boolMinus = photoPos === 0;
    if (numberOfPhotos > 1) {
      if (i === 1) {
        if (boolPlus) photoPos = 0;
        else photoPos += 1;
        switchPhoto();
      } else {
        if (boolMinus) photoPos = (numberOfPhotos - 1);
        else photoPos -= 1;
        switchPhoto();
      }
    }
  };
  return (
    <div id="propertyDiv" className="propertyDetails">
      <div className="pb-2 pt-5 flex items-center sticky top-0 bg-white dark:bg-darkMode">
        <div className="flex-1 ">
          <FaTimes
            onClick={(e) => { closeCardDetails(e, number); }}
            className="cursor-pointer inline-block bg-gray-500 text-white rounded-full text-3xl p-2 hover:bg-gray-700"
          />
        </div>
        <div className="inline-block flex-1 text-center dark:text-white text-sm">
          <span id="currentPixOnDetails" /> / {numberOfPhotos}
        </div>
        <div className="inline-block flex-1 text-right">
          <FaChevronCircleLeft
            onClick={(e) => { changePhoto(e, -1); }}
            className="inline-block bg-white text-gray-500 rounded-full mr-6 text-3xl hover:text-gray-700 cursor-pointer"
          />
          <FaChevronCircleRight
            onClick={(e) => { changePhoto(e, 1); }}
            className="inline-block bg-white text-gray-500 rounded-full text-3xl hover:text-gray-700 cursor-pointer"
          />
        </div>
      </div>
      <div id="propertyDetailsFromSearchDivContent" className=" overflow-y-auto h-full w-full">
        <div className="w-full inline-block min-h-[600px] pb-52">
          <div className="w-12/12 content-center">
            <img id="detailsDivImg" src={photo1} alt={property.title} className=" m-auto object-center h-72" />
          </div>
          <div className="dark:text-white text-sm space-y-1">
            <Link
              to={`/agencies/${agency.username}`}
              className=" text-indigo-600 dark:text-primary2 mt-4 cursor-pointer flex items-center gap-1 line-clamp-1"
            >
              <FaUsers className="inline text-sm" size={16} />
              <span className="">{agency.name}</span>
            </Link>
            <div className=" text-gray-700 text-lg dark:text-slate-300">{title}</div>
            <div className="">
              <FaMapMarkerAlt className=" text-red-400 inline" />
              <span className="align-text-bottom"> {address}, {state}, {country}</span>
            </div>
            <div>{description}</div>
            <div><pre className=" text-purple-500">{status}</pre></div>
            <div className=" w-full flex flex-row">
              <div className="min-w-min flex-1">
                <div><pre className="text-indigo-600 dark:text-primary2 inline">{'For:    '}</pre>{intent}</div>
                <div><pre className="text-indigo-600 dark:text-primary2 inline">{'Type:   '}</pre>{propertyType}</div>
                <div><pre className="text-indigo-600 dark:text-primary2 inline">{'Price:  '}</pre>{price}</div>
              </div>
              <div className="min-w-min flex-1">
                <div><pre className="text-indigo-600 dark:text-primary2 inline">{'Area: '}</pre>{area}</div>
                <div><pre className="text-indigo-600 dark:text-primary2 inline">{'Bedrooms:   '}</pre>{bedRooms}</div>
                <div><pre className="text-indigo-600 dark:text-primary2 inline">{'BathRooms:  '}</pre>{bathRooms}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
