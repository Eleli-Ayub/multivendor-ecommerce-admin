import { Routes, Route } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const routes = () => {
    return (
        <div>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
            </Routes>
        </div>
    );
};

export default routes;
