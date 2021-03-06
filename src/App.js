import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NShareHeader from "./_components/NShareHeader";

import { useAuth } from "./_context/AuthContext";

const Dashboard = lazy(() => import("./_pages/AdminDashboard"));
const NavyaShare = lazy(() => import("./_pages/NavyaShare"));
const SelectedImages = lazy(() => import("./_pages/SelectedImages"));
const Login = lazy(() => import("./_pages/Login"));
const About = lazy(() => import("./_pages/About"));
const ShareLink = lazy(() => import("./_pages/ShareLink"));
const CreateLink = lazy(() => import("./_pages/CreateNewLink"));

const NotFound = lazy(() => import("./_pages/NotFound"));

function App() {
  const { currentUser } = useAuth();

  return (
    <div className="overflow-x-hidden">
      <Router>
        <NShareHeader />
        <Suspense
          fallback={
            <p className="flex justify-center items-center w-screen h-screen bg-gray-400">
              Loading ....
            </p>
          }
        >
          <Switch>
            <Route
              path="/navyashare"
              exact
              component={currentUser ? Dashboard : Login}
            />
            <Route
              path="/sharelink"
              exact
              component={currentUser ? ShareLink : Login}
            />
            <Route
              path="/CreateLink"
              exact
              component={currentUser ? CreateLink : Login}
            />
            <Route path="/" exact component={NavyaShare} />
            <Route
              path="/selected/:id"
              exact
              component={currentUser ? SelectedImages : Login}
            />
            <Route
              path="/login"
              exact
              component={currentUser ? Login : Dashboard}
            />

            <Route path="/about" exact component={About} />

            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
