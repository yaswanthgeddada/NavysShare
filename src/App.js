import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NShareHeader from "./_components/NShareHeader";

import { useUser } from "./_context/UserContext";

const Dashboard = lazy(() => import("./_pages/AdminDashboard"));
const NavyaShare = lazy(() => import("./_pages/NavyaShare"));
const SelectedImages = lazy(() => import("./_pages/SelectedImages"));
const Login = lazy(() => import("./_pages/Login"));
const About = lazy(() => import("./_pages/About"));

const NotFound = lazy(() => import("./_pages/NotFound"));

function App() {
  const { currentUser } = useUser();

  return (
    <div className="overflow-x-hidden">
      <Router>
        <NShareHeader />
        <Suspense fallback={<p>Loading ....</p>}>
          <Switch>
            <Route
              path="/navyashare"
              exact
              component={currentUser ? Dashboard : Login}
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
