import { useNavigate, NavigateFunction, useLocation }  from "react-router-dom"

export interface RouteComponetProps {
    navigate: NavigateFunction;
}

export const withRouter = (Component) => {
    const Wrapper = (props) => {
        const navigate = useNavigate();
        const location = useLocation();
        return <Component navigate={navigate} location = {location} {...props}></Component>;
    };
    return Wrapper;
}