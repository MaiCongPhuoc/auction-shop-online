import React from "react";

const HeaderSearch = () => {
  return (
    <div className="search-bar-div small-4">
      <div data-react-class="search/NavSearch" data-react-props="{}">
        <div className="nav-search">
          <div className="search-bar grid-x">
            <div className="cell small-12">
              <div className="search-query input-group">
                {/* <button className="search-icon input-group-label off">
                  <i className="fa-solid fa-magnifying-glass"></i><span className="search-label show-for-large"> Tìm kiếm</span>
                </button>
                <div className="input-group-field off"><input className="search-input off" placeholder="Search for experiences, items, and charities" />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderSearch;