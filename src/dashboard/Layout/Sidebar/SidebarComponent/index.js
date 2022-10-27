import useCollapse from 'react-collapsed';
import { faAngleRight, faAngleDown, faListDots } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
function SidebarComponent() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
        <li className="nav-item">
            <p className="nav-link collapsed" href="#" {...getToggleProps()}>
                {/* <i className="fas fa-fw fa-cog" /> */}
                <FontAwesomeIcon className="fas fa-fw fa-cog" icon={faListDots} />
                <span>Quản lý sản phẩm</span>
                <i className="iconSidebar">
                    {isExpanded ? <FontAwesomeIcon icon={faAngleDown} /> : <FontAwesomeIcon icon={faAngleRight} />}
                </i>
            </p>
            <div id="collapseTwo" className="collapse" {...getCollapseProps()}>
                <div className="bg-white py-2 collapse-inner rounded">
                    <Link to="/list-product">
                        <i class="fa-solid fa-file"></i> Danh sách
                    </Link>
                    <br />
                    <Link to="/dashboard/category">
                        <i class="fa-solid fa-rectangle-list"></i> Thể loại
                    </Link>
                </div>
            </div>
        </li>
    );
}

export default SidebarComponent;
