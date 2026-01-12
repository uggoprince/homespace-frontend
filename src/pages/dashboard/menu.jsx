/* eslint-disable no-lone-blocks */
/* eslint-disable import/no-named-as-default */
/* eslint-disable arrow-body-style */
import { useState } from 'react';
import { FaAngleDoubleLeft } from 'react-icons/fa';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { IoIosPeople, IoIosHome } from 'react-icons/io';
import { NavLink, useParams } from 'react-router-dom';
import { activePaths } from '../../Utils/paths';
import { useAuth } from '../../auth/AuthProvider';

const { dashboard, dashboardAgency, dashboardProperties } = activePaths;

/**
 * Sidebar menu button
 */
const MenuButton = ({
  Icon, text, open, to, setActiveButton, activeText,
}) => {
  const { active, setIsActiveMenuItem, setIsActive } = setActiveButton;
  // console.log(active.current);
  return (
    <NavLink
      to={to}
      onClick={() => { setIsActive(dashboard); setIsActiveMenuItem(activeText); }}
      className={() => {
        return `cursor-pointer
      active:bg-indigo-400
       hover:text-white
      hover:bg-primary rounded my-2 drop-shadow
      ${(active === activeText) ? 'text-white bg-indigo-600' : 'text-primary dark:text-slate-50'}`;
      }}
    >
      <div className="py-2 rounded">
        <div className="pr-2 box-border flex">
          <div className="inline-block text-3xl align-middle text-center pl-2 place-self-center">
            <Icon />
          </div>
          <div
            className={`
          inline-block
          duration-500
          transition-[width]
          overflow-hidden box-border place-self-center
          ${open ? 'w-32 md:w-60 pl-2' : ' w-0 pl-0 transition-all'}
          align-middle`}
          >
            {text}
          </div>
        </div>
      </div>
    </NavLink>
  );
};

// The sidebar menu
export default (props) => {
  const [open, setOpen] = useState(true);
  const { setIsActive, setIsActiveMenuItem, isActiveMenuItem } = useAuth();
  const { id } = useParams();
  let activeText = window.location.pathname.replace('/', '');
  if (id) activeText = dashboardAgencies;
  setIsActiveMenuItem(activeText);
  return (
    <div
      className={
          `flex flex-col
          duration-500
          h-full
          relative`
        }
    >
      <div className="pl-2 pr-2 pt-3">
        <FaAngleDoubleLeft
          title={`${open ? 'Close menu' : 'Open Menu'}`}
          className={`${!open && 'rotate-180'} text-slate-600 dark:text-slate-300 duration-500 cursor-pointer -right-0 text-3xl float-right inline`}
          onClick={() => setOpen(!open)}
        />
      </div>
      <div className="pt-3" />
      <MenuButton
        text="All"
        Icon={MdOutlineDashboardCustomize}
        open={open}
        to="/dashboard"
        setActiveButton={{ active: isActiveMenuItem.current, setIsActiveMenuItem, setIsActive }}
        activeText={dashboard}
      />
      <MenuButton
        text="Agency"
        Icon={IoIosPeople}
        open={open}
        to="agency"
        setActiveButton={{ active: isActiveMenuItem.current, setIsActiveMenuItem, setIsActive }}
        activeText={dashboardAgency}
      />
      <MenuButton
        text="Properties"
        Icon={IoIosHome}
        open={open}
        to="properties"
        setActiveButton={{ active: isActiveMenuItem.current, setIsActiveMenuItem, setIsActive }}
        activeText={dashboardProperties}
      />
    </div>
  );
};
