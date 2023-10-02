// ** React Imports
import {Fragment, lazy, Suspense} from 'react'

// ** Utils
import {useLayout} from '@hooks/useLayout'
import {useRouterTransition} from '@hooks/useRouterTransition'

// ** Custom Components
import LayoutWrapper from '@layouts/components/layout-wrapper'

// ** Index Components
import {BrowserRouter as AppRouter, Redirect, Route, Switch} from 'react-router-dom'
// ** Routes & Default Routes
import {DefaultRoute, Routes} from './routes'

// ** Layouts
import BlankLayout from '@layouts/BlankLayout'
import VerticalLayout from '@src/layouts/VerticalLayout'
import HorizontalLayout from '@src/layouts/HorizontalLayout'

const Router = () => {
    // ** Hooks
    const {layout, setLayout, setLastLayout} = useLayout()
    const {transition, setTransition} = useRouterTransition()

    const DefaultLayout = layout === 'horizontal' ? 'HorizontalLayout' : 'VerticalLayout'

    // ** All of the available layouts
    const Layouts = {BlankLayout, VerticalLayout, HorizontalLayout}

    const currentActiveItem = null

    const LayoutRoutesAndPaths = layout => {
        const LayoutRoutes = []
        const LayoutPaths = []

        if (Routes) {
            Routes.filter(route => {
                // ** Checks if Route layout or Default layout matches current layout
                if (route.layout === layout || (route.layout === undefined && DefaultLayout === layout)) {
                    LayoutRoutes.push(route)
                    LayoutPaths.push(route.path)
                }
            })
        }

        return {LayoutRoutes, LayoutPaths}
    }

    const NotAuthorized = lazy(() => import('@src/views/NotAuthorized'))

    const Error = lazy(() => import('@src/views/Error'))

    const ResolveRoutes = () => {
        return Object.keys(Layouts).map((layout, index) => {

            const LayoutTag = Layouts[layout]

            const {LayoutRoutes, LayoutPaths} = LayoutRoutesAndPaths(layout)
            const routerProps = {}

            return (
                <Route path={LayoutPaths} key={index}>
                    <LayoutTag
                        layout={layout}
                        setLayout={setLayout}
                        transition={transition}
                        routerProps={routerProps}
                        setLastLayout={setLastLayout}
                        setTransition={setTransition}
                        currentActiveItem={currentActiveItem}
                    >
                        <Switch>
                            {LayoutRoutes.map(route => {
                                return (
                                    <Route
                                        key={route.path}
                                        path={route.path}
                                        exact={route.exact === true}
                                        render={props => {
                                            // ** Assign props to routerProps
                                            Object.assign(routerProps, {
                                                ...props,
                                                meta: route.meta
                                            })

                                            return (
                                                <Fragment>
                                                    {/* Layout Wrapper to add classes based on route's layout, appLayout and className */}

                                                    {route.layout === 'BlankLayout' ? (
                                                        <Fragment>
                                                            <route.component {...props} />
                                                        </Fragment>
                                                    ) : (
                                                        <LayoutWrapper
                                                            layout={DefaultLayout}
                                                            transition={transition}
                                                            setTransition={setTransition}
                                                            /* Conditional props */
                                                            /*eslint-disable */
                                                            {...(route.appLayout
                                                                ? {
                                                                    appLayout: route.appLayout
                                                                }
                                                                : {})}
                                                            {...(route.meta
                                                                ? {
                                                                    routeMeta: route.meta
                                                                }
                                                                : {})}
                                                            {...(route.className
                                                                ? {
                                                                    wrapperClass: route.className
                                                                }
                                                                : {})}
                                                            /*eslint-enable */
                                                        >
                                                            <Suspense fallback={null}>
                                                                <route.component {...props} />
                                                            </Suspense>
                                                        </LayoutWrapper>
                                                    )}
                                                </Fragment>
                                            )
                                        }}
                                    />
                                )
                            })}
                        </Switch>
                    </LayoutTag>
                </Route>
            )
        })
    }

    return (
        <AppRouter basename={process.env.REACT_APP_BASENAME}>
            <Switch>
                {/* If user is logged in Redirect user to DefaultRoute else to login */}
                <Route
                    exact
                    path='/login'
                    render={() => {
                        return <Redirect to={DefaultRoute}/>
                    }}
                />
                {/* Not Auth Route */}
                <Route
                    exact
                    path='/misc/not-authorized'
                    render={() => {
                        return <Redirect to={'/'}/>
                    }}
                />
                {ResolveRoutes()}

                {/* NotFound Error page */}
                <Route path='*' component={Error}/>
            </Switch>
        </AppRouter>
    )
}

export default Router
