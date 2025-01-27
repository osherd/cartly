import React, { useState } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { IconType } from 'react-icons';

const activeLink = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'active' : 'link';
const activeSublink = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'active' : 'link';

interface SidebarItemProps {
  item: {
    path?: string;
    title: string;
    icon?: IconType;
    childrens?: {
      path: string;
      title: string;
      icon?: IconType;
    }[];
  };
  isOpen: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item, isOpen }) => {
  const [expandMenu, setExpandMenu] = useState(false);

  if (item.childrens) {
    return (
      <div
        className={
          expandMenu ? 'sidebar-item s-parent open' : 'sidebar-item s-parent'
        }
      >
        <div className='sidebar-title'>
          <span>
            {item.icon && (
              <div className='icon'> {React.createElement(item.icon)} </div>
            )}
            {isOpen && <div>{item.title} </div>}
          </span>
          <MdKeyboardArrowRight
            size={25}
            className='arrow-icon'
            onClick={() => setExpandMenu(!expandMenu)}
          />
        </div>
        <div className='sidebar-content'>
          {item.childrens.map((child, index) => {
            return (
              <div key={index} className='s-child'>
                <NavLink to={child.path} className={activeSublink}>
                  <div className='sidebar-item'>
                    <div className='sidebar-title'>
                      <span>
                        {child.icon && (
                          <div className='icon'>
                            {' '}
                            {React.createElement(child.icon)}{' '}
                          </div>
                        )}
                        {isOpen && <div>{child.title} </div>}
                      </span>
                    </div>
                  </div>
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <NavLink to={item.path || '#'} className={activeLink}>
        <div className='sidebar-item s-parent'>
          <div className='sidebar-title'>
            <span>
              {item.icon && (
                <div className='icon'> {React.createElement(item.icon)} </div>
              )}
              {isOpen && <div>{item.title} </div>}
            </span>
          </div>
        </div>
      </NavLink>
    );
  }
};

export default SidebarItem;
