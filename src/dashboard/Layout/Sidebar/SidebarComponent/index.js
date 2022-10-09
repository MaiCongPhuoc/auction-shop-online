import useCollapse from 'react-collapsed';
import { faAngleRight, faAngleDown, faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
function SidebarComponent() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
        <li className="nav-item">
            <p className="nav-link collapsed" href="#" {...getToggleProps()}>
                {/* <i className="fas fa-fw fa-cog" /> */}
                <FontAwesomeIcon className="fas fa-fw fa-cog" icon={faFile} />
                <span>Danh Sách Sản phẩm</span>
                <i className="iconSidebar">
                    {isExpanded ? <FontAwesomeIcon icon={faAngleDown} /> : <FontAwesomeIcon icon={faAngleRight} />}
                </i>
            </p>
            <div id="collapseTwo" className="collapse" {...getCollapseProps()}>
                <div className="bg-white py-2 collapse-inner rounded">
                    <h6 className="collapse-header">Custom Components:</h6>
                    <Link className="collapse-item" to='/danhsachsanpham'>
                        Danh sách sản phẩm
                    </Link>
                    <a className="collapse-item" href="cards.html">
                        Cards
                    </a>
                </div>
            </div>
        </li>
    );
}

export default SidebarComponent;
