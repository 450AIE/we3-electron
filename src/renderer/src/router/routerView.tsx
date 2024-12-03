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
import SearchBooksList from '@renderer/pages/searchBooks/searchBooksList';

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

// 一级路由要保证都要展示
export function FirstRouterView() {
    const location = useLocation();
    const { pathname } = location;
    console.log(location);
    return (
        <Suspense fallback={<LoadingElement />}>
            <Routes>
                {routes.map((route) => {
                    let { path } = route;
                    // 将一级路由改为二级路由的path，保证有二级路由的时候用来展示数据
                    path = pathname.startsWith(path) ? pathname : path;
                    return <Route key={path} path={path} element={<Element {...route} />}></Route>;
                })}
            </Routes>
        </Suspense>
    );
}

export function SecondaryRoutes() {
    const allSecondaryRoutes = extractRoutesWithChildren(routes);
    console.log(allSecondaryRoutes);
    // allSecondaryRoutes.flat().map((path) => {
    //     console.log(path);
    //     path.includes('null') ? '' : console.log('无', path);
    // });
    return (
        <Suspense fallback={<LoadingElement />}>
            <Routes>
                {allSecondaryRoutes.map((path, index) => {
                    let Component;
                    const hasChildrenCompoent = Array.isArray(path);
                    console.log(path);
                    if (hasChildrenCompoent) {
                        Component = path[1];
                    }
                    return !hasChildrenCompoent ? (
                        <Route
                            key={index}
                            // 这里保证和一级路由同时展示，并且显示默认组件
                            path={path.replace('null', '')}
                            element={<DefaultRouterViewComponent />}
                        />
                    ) : (
                        // 展示二级路由部分
                        <Route key={index} path={path[0]} element={<Component />} />
                    );
                })}
            </Routes>
        </Suspense>
    );
}
