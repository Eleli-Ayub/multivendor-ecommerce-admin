import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes/Index';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </div>
    );
};

export default App;
