import { isArray } from 'lodash';
import { Suspense } from 'react';
import {
    Route,
    Routes,
    useLocation,
    useNavigate,
    useParams,
    useSearchParams
} from 'react-router-dom';
import { routes } from '.';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

export function RouterView() {
    return (
        <Suspense fallback={<LoadingElement />}>
            <Routes>{createRoute(routes)}</Routes>
        </Suspense>
    );
}

function createRoute(routes) {
    return (
        <>
            {routes.map((item, idx) => {
                let { path, children } = item;
                return (
                    <Route key={idx} path={path} element={<Element {...item} />}>
                        {isArray(children) ? createRoute(children) : ''}
                    </Route>
                );
            })}
        </>
    );
}

function Element(props) {
    let { component: Component, meta } = props;
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const [query] = useSearchParams();
    return <Component navigate={navigate} location={location} params={params} query={query} />;
}

function LoadingElement() {
    return <Spin indicator={<LoadingOutlined />} spin fullscreen delay={1500} />;
}
