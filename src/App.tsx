// import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes/Index";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes />
        {/* <OtherRoutes /> */}
      </BrowserRouter>
    </div>
  );
};

export default App;
