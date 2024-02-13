import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes/Index';

const App = () => {
    return (
        <div>
            <BrowserRouter basename={'/admin'}>
                {/* <BrowserRouter> */}
                <Routes />
            </BrowserRouter>
        </div>
    );
};

export default App;
