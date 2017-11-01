import Dashboard from 'views/Dashboard/Dashboard';
import UserProfile from 'views/UserProfile/UserProfile';
import TableList from 'views/TableList/TableList';
import Typography from 'views/Typography/Typography';
import Icons from 'views/Icons/Icons';
import Maps from 'views/Maps/Maps';
import Notifications from 'views/Notifications/Notifications';
import Upgrade from 'views/Upgrade/Upgrade';
import Login from 'views/Login/Login.jsx';
import App from 'containers/App/App.jsx'

const appRoutes = [
    { path: "/app/dashboard", name: "Dashboard", icon: "pe-7s-graph", component: Dashboard },
    { path: "/app/user", name: "User Profile", icon: "pe-7s-user", component: UserProfile },
    { path: "/app/table", name: "Table List", icon: "pe-7s-note2", component: TableList },
    { path: "/app/typography", name: "Typography", icon: "pe-7s-news-paper", component: Typography },
    { path: "/app/icons", name: "Icons", icon: "pe-7s-science", component: Icons },
    { path: "/app/maps", name: "Maps", icon: "pe-7s-map-marker", component: Maps },
    { path: "/app/notifications", name: "Notifications", icon: "pe-7s-bell", component: Notifications },
    { upgrade: true, path: "/upgrade", name: "Upgrade to PRO", icon: "pe-7s-rocket", component: Upgrade },
    { path: "/", name: "Login", icon: "", component: Dashboard },
    { path:"/app", name: "App", component:App}
];

export default appRoutes;
