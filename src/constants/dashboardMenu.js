import { DASHBOARD_ROUTE,JOBS_ROUTE,APPLICANTS_ROUTE, PROFILE_ROUTE, HOME_ROUTE } from "./routes";

const dashboardMenu =[
    {
        auth:true,
        route:DASHBOARD_ROUTE,
        label:"Dashboard",
    },
    {
        auth:true,
        route:JOBS_ROUTE,
        label:"About",
    },
    {
        auth:true,
        route:APPLICANTS_ROUTE,
        label:"Job",
    }
]
export default dashboardMenu;