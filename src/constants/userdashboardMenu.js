import { DASHBOARD_ROUTE } from "./routes";

const dashboardMenu =[
    {
        auth:true,
        route:ALLJOBS_ROUTE,
        label:"All Jobs",
    },
    {
        auth:true,
        route:PENDING_ROUTE,
        label:"Pending",
    },
    {
        auth:true,
        route:INTERVIEW_ROUTE,
        label:"Job",
    },
     {
        auth:true,
        route:ACCEPT_ROUTE,
        label:"Job",
    }
]
export default dashboardMenu;