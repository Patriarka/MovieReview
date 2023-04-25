import {
    Route,
    BrowserRouter,
    Routes,
    Navigate
} from 'react-router-dom';

import SignUp from './pages/sign-up'
import Login from './pages/login'
import Profile from './pages/profile'
import EditProfile from './pages/edit-profile'
import Home from './pages/home'

const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('token');

    if (isAuthenticated) {
        return children
    }

    return <Navigate to="/login" />
}

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<PrivateRoute> <Home /> </PrivateRoute>}
                />
                <Route 
                    path="/login" 
                    element={<Login />} 
                />
                <Route 
                    path="/sign-up" 
                    element={<SignUp />} 
                />
                <Route 
                    path="/profile" 
                    element={<PrivateRoute> <Profile /> </PrivateRoute>}
                />
                <Route 
                    path="/edit-profile" 
                    element={<PrivateRoute> <EditProfile /> </PrivateRoute>}
                />
            </Routes>
        </BrowserRouter>
    )
}