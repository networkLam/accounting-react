import {createBrowserRouter} from "react-router-dom"
import Layout from "@/pages/Layout"
import Month from "@/pages/Month"
import Year from "@/pages/Year"
import New from "@/pages/New"
const router = createBrowserRouter([
    {
        path:"/",
        element: <Layout></Layout>,
        children:[
            {
                // path:"month",
                index:true,
                element:<Month></Month>
            },
            {
                path:"year",
                element:<Year></Year>
            }
        ]
    },
    {
        path:"/new",
        element:<New></New>
    }
])
export default router