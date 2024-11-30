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
import { extractRoutesWithChildren, routes } from '.';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import DefaultRouterViewComponent from './DefaultRouterViewComponent';

// 嵌套路由
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

export function FirstRouterView() {
    return (
        <Suspense fallback={<LoadingElement />}>
            <Routes>
                {routes.map((route) => {
                    let { path } = route;
                    return <Route key={path} path={path} element={<Element {...route} />}></Route>;
                })}
            </Routes>
        </Suspense>
    );
}

export function SecondaryRoutes() {
    const allSecondaryRoutes = extractRoutesWithChildren(routes);
    return (
        <Suspense fallback={<LoadingElement />}>
            <Routes>
                {allSecondaryRoutes.flat().map((path, index) =>
                    path.includes('null') ? (
                        <Route
                            key={index}
                            // 这里保证和一级路由同时展示，并且显示默认组件
                            path={path.replace('null', '')}
                            element={<DefaultRouterViewComponent />}
                        />
                    ) : (
                        <Route key={index} path={path} />
                    )
                )}
            </Routes>
        </Suspense>
    );
}
