import React from "react";

export const Header = React.memo(({ onOpenForm }) => {
  return (
    <nav className="px1 indigo">
      <div className="nav-wrapper">
        <div className="row">
          <div className="col m6">
            <a href="/" className="brand-logo">
              <i className="material-icons small">person_outline</i>
              Users
            </a>
          </div>
          <div className="col m6">
            <ul className="right">
              <li>
                <div className="menu-item pointer px1" onClick={onOpenForm}>
                  Add user
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
});
