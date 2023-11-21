// import React from "react";
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes/Index';
import Loader from './components/constants/loader';
import { useSelector } from 'react-redux';
// import OtherRoutes from "./Routes/routes";

const App = () => {
    const { loading } = useSelector((state: any) => state.loaders);
    return (
        <div>
            <BrowserRouter>
                <Routes />
                {/* <OtherRoutes /> */}
            </BrowserRouter>
            {loading && <Loader />}
        </div>
    );
};

export default App;
