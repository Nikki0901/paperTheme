import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
// import logo from "logo.svg";
import "../../assets/css/sidebar.css";

//user name
// const userName = JSON.parse(localStorage.getItem("userName"));

var ps;
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.activeRoute.bind(this);
    this.sidebar = React.createRef();
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }

  openDropDown = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  render() {
    return (
      <div
        className="sidebar"
        data-color={this.props.bgColor}
        data-active-color={this.props.activeColor}
      >
        <div className="logo">
          {/* <a
            href="http://multitvsolution.com/"
            className="simple-text logo-mini"
          >
            <div className="logo-img">
              <img src="" alt="react-logo" />
            </div>
          </a> */}
          <a
            href="http://vride.multitvsolution.com/"
            className="simple-text logo-normal"
            style={{ textAlign: "center" }}
          >
            Vride
          </a>
        </div>

        <div className="sidebar-wrapper" ref={this.sidebar}>
          <Nav>
            <li>
              <NavLink
                to="/admin/dashboard"
                activeClassName="navbar__link--active"
                className="navbar__link"
              >
                <i className="nc-icon nc-bank" />
                <p>Dashboard</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/sales"
                activeClassName="navbar__link--active"
                className="navbar__link"
              >
                {/* <i className="nc-icon nc-badge" /> */}
                <i class="far fa-address-card"></i>
                <p>Sales</p>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/dealership"
                activeClassName="navbar__link--active"
                className="navbar__link"
              >
                <i className="nc-icon nc-single-copy-04" />

                <p>Dealership</p>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/schedule"
                activeClassName="navbar__link--active"
                className="navbar__link"
              >
                {/* <i class="fas fa-calendar-alt"></i>   */}
                <i className="nc-icon nc-calendar-60" />
                <p>Schedule</p>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/rating-list"
                activeClassName="navbar__link--active"
                className="navbar__link"
              >
                <i class="fas fa-star-half-alt"></i>
                <p>Rating List</p>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/analytics"
                activeClassName="navbar__link--active"
                className="navbar__link"
              >
                <i className="nc-icon nc-image" />
                <p>Analytics</p>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/user-management"
                activeClassName="navbar__link--active"
                className="navbar__link"
              >
                <i className="nc-icon nc-single-02" />
                <p>User Management</p>
              </NavLink>
            </li>

           

            <li>
              <NavLink
                to="/admin/recording"
                activeClassName="navbar__link--active"
                className="navbar__link"
              >
                <i className="nc-icon nc-tv-2" />
                <p>Recording</p>
              </NavLink>
            </li>

            <li>
              <div className="navbar__link" onClick={this.openDropDown}>
                <i className="nc-icon nc-settings" />
                <span className="setting_icon">
                  Settings
                  <i class="fa fa-caret-down" />
                </span>
              </div>

              {this.state.show && (
                <ul style={{ listStyle: "none" }}>
                  <li>
                    <NavLink
                      to="/admin/settings"
                      activeClassName="navbar__link--active"
                      className="navbar__link"
                    >
                      <p>Product Settings</p>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/admin/apk-settings"
                      activeClassName="navbar__link--active"
                      className="navbar__link"
                    >
                      <p>Apk Settings</p>
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
          </Nav>
        </div>
      </div>
    );
  }
}

export default Sidebar;


  /* <Nav>
            {this.props.routes.map((prop, key) => {
              return (
                <li
                  className={
                    this.activeRoute(prop.path) +
                    (prop.pro ? " active-pro" : "")
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            })}
          </Nav> */

