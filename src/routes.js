
// import Dash from "views/Dash";
// import Icons from "views/Icons.js";
// import UserPage from "views/User.js";



import Dashboard from "views/Dashboard/Dashboard";
import UserManagement from "views/UserManagement/UserManagement";
import Recording from "views/Recording/Recording";
import Analytics from "views/Analytics/Analytics";
import Sales from "views/SalesLoginUser/SalesLoginUser";
import Setting from "views/Setting/Setting";
import DealerShipList from "views/DealerShipList/DealerShipList";
import Schedule from "views/Schedule/Schedule";




var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    icon: "nc-icon nc-bank",
    layout: "/admin",
  },
  {
    path: "/user-management",
    name: "user-management",
    component: UserManagement,
    icon: "nc-icon nc-single-02",
    layout: "/admin",
  },
  {
    path: "/analytics",
    name: "Analytics",
    icon: "nc-icon nc-image",
    component: Analytics,
    layout: "/admin",
  },
  {
    path: "/recording",
    name: "Recording",
    icon: "nc-icon nc-tv-2",
    component: Recording,
    layout: "/admin",
  },
  {
    path: "/sales",
    name: "Sales",
    icon: "nc-icon nc-badge",
    component: Sales,
    layout: "/admin",
  },
  {
    path: "/dealership",
    name: "Dealership",
    icon: "nc-icon nc-box-2",
    component: DealerShipList,
    layout: "/admin",
  },
  {
    path: "/schedule",
    name: "Schedule",
    icon: "nc-icon nc-single-copy-04",
    component: Schedule,
    layout: "/admin",
  },
  {
    path: "/settings",
    name: "Settings",
    icon: "nc-icon nc-settings",
    component: Setting,
    layout: "/admin",
  },

  


  // {
  //   path: "/dash",
  //   name: "Dash",
  //   icon: "nc-icon nc-bank",
  //   component: Dash,
  //   layout: "/admin",
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-diamond",
  //   component: Icons,
  //   layout: "/admin",
  // },
  
];

export default routes;
