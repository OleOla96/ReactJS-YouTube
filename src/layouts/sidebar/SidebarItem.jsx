import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

function SidebarItem({ title, link, icon, activeIcon, mini = false }) {
  return (
    <NavLink to={link} className={(e) => 'btnSidebar' + (mini ? ' mini' : '') + (e.isActive ? ' active' : '')}>
      <span className="icon">{icon}</span>
      {activeIcon && <span className="active-icon">{activeIcon}</span>}
      <span className={mini ? 'title mini' : 'title'}>{title}</span>
    </NavLink>
  );
}

SidebarItem.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  activeIcon: PropTypes.node.isRequired,
};

export default SidebarItem;
