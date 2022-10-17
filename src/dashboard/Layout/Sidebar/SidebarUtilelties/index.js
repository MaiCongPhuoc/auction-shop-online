import { faAngleDown, faAngleRight, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useCollapse from 'react-collapsed';
import { Link } from 'react-router-dom';

function SidebarUtilities() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
        <li className="nav-item">
            <a className="nav-link collapsed" href="#" {...getToggleProps()}>
                <FontAwesomeIcon className="fas fa-fw fa-cog" icon={faUsers} />
                <span>Tài khoản</span>
                <i className='iconSidebar'>{isExpanded ? <FontAwesomeIcon icon={faAngleDown} /> : <FontAwesomeIcon icon={faAngleRight} />}</i>
            </a>
            <div id="collapseUtilities" className="collapse" {...getCollapseProps()}>
                <div className="bg-white py-2 collapse-inner rounded">
                    <h6 className="collapse-header">Custom Utilities:</h6>
                    <Link className="collapse-item" to='/list-account'>
                        Tài khoản
                    </Link>
                </div>
            </div>
        </li>
    );
}

export default SidebarUtilities;
