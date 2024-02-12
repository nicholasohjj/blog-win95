import { Refine, Authenticated } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import routerBindings, {
    UnsavedChangesNotifier,
    DocumentTitleHandler,
    NavigateToResource,
    CatchAllNavigate,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import original from "react95/dist/themes/original";
import { ThemeProvider } from "styled-components";

import { supabaseClient } from "./utility";
import authProvider from "./authProvider";
import { LoginPage } from "./pages/login";
import { HouseList } from "./pages/houses/list";
import { HouseCreate } from "./pages/houses/create";
import { HouseEdit } from "./pages/houses/edit";
import { ActivityCreate } from "./pages/activities/create";
import { ActivityEdit } from "./pages/activities/edit";
import { ActivityList } from "./pages/activities/list";
import { Layout } from "./components/layout";

import "./app.css";

function App() {
    return (
        <BrowserRouter>
            <RefineKbarProvider>
                <ThemeProvider theme={original}>
                    <Refine
                        dataProvider={dataProvider(supabaseClient)}
                        liveProvider={liveProvider(supabaseClient)}
                        authProvider={authProvider}
                        routerProvider={routerBindings}
                        resources={[
                            {
                                name: "houses",
                                list: "/houses",
                                edit: "/houses/edit/:id",
                                create: "/houses/create",
                            },
                            {
                                name: "groupactivities",
                                list: "/activities",
                                create: "/activities/create",
                                edit: "/activities/edit/:id",
                            },
                        ]}
                        options={{
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                        }}
                    >
                        <Routes>
                            <Route
                                element={
                                    <Authenticated
                                        key="authenticated-routes"
                                        fallback={
                                            <CatchAllNavigate to="/login" />
                                        }
                                    >
                                        <Layout>
                                            <Outlet />
                                        </Layout>
                                    </Authenticated>
                                }
                            >
                                <Route
                                    index
                                    element={
                                        <NavigateToResource resource="houses" />
                                    }
                                />

                                <Route path="/houses">
                                    <Route index element={<HouseList />} />
                                    <Route
                                        path="create"
                                        element={<HouseCreate />}
                                    />
                                    <Route
                                        path="edit/:id"
                                        element={<HouseEdit />}
                                    />
                                </Route>

                                <Route path="/activities">
                                    <Route index element={<ActivityList />} />
                                    <Route
                                        path="create"
                                        element={<ActivityCreate />}
                                    />
                                    <Route
                                        path="edit/:id"
                                        element={<ActivityEdit />}
                                    />
                                </Route>
                            </Route>
                            <Route
                                element={
                                    <Authenticated
                                        key="auth-pages"
                                        fallback={<Outlet />}
                                    >
                                        <NavigateToResource />
                                    </Authenticated>
                                }
                            >
                                <Route path="/login" element={<LoginPage />} />
                            </Route>
                        </Routes>
                        <RefineKbar />
                        <UnsavedChangesNotifier />
                        <DocumentTitleHandler />
                    </Refine>
                </ThemeProvider>
            </RefineKbarProvider>
        </BrowserRouter>
    );
}

export default App;
