
// import Dash from "views/Dash";
// import Notifications from "views/Notifications.js";
// import Icons from "views/Icons.js";
// import Typography from "views/Typography.js";
// // import TableList from "views/Tables.js";
// import Maps from "views/Map.js";
// import UserPage from "views/User.js";
// import UpgradeToPro from "views/Upgrade.js";


import Dashboard from "views/Dashboard/Dashboard";
import UserManagement from "views/UserManagement/UserManagement";
import Recording from "views/Recording/Recording";
import Analytics from "views/Analytics/Analytics";
import SalesLoginUser from "views/SalesLoginUser/SalesLoginUser";
import Setting from "views/Setting/Setting";
// import Logout from "views/Logout/Logout";


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
    name: "Sales Login User",
    icon: "nc-icon nc-badge",
    component: SalesLoginUser,
    layout: "/admin",
  },
  {
    path: "/setting",
    name: "Setting",
    icon: "nc-icon nc-settings",
    component: Setting,
    layout: "/admin",
    // routes:[
    //   {
    //     path:"/setting/pass",
    //     component:Recording
    //   },
    //   {
    //     exact:true,
    //     path:"/setting/sign",
    //     component:Recording
    //   },
    // ]
  },
  // {
  //   path: "/logout",
  //   icon: "nc-icon nc-button-power",
  //   name: "Logout",
  //   layout: "/admin",
  //   component: Logout,
  // },
  
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
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: Maps,
  //   layout: "/admin",
  // },

  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notifications,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user-page",
  //   name: "User Profile",
  //   icon: "nc-icon nc-single-02",
  //   component: UserPage,
  //   layout: "/admin",
  // },
  
 
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-caps-small",
  //   component: Typography,
  //   layout: "/admin",
  // },
 
  //   { path: "/tables",
  //   name: "Table List",
  //   icon: "nc-icon nc-tile-56",
  //   component: TableList,
  //   layout: "/admin",
  // },
  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-spaceship",
  //   component: UpgradeToPro,
  //   layout: "/admin",
  // },
  
];
export default routes;
