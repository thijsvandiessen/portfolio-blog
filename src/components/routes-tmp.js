import React, { lazy, Suspense, Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loading from './loading-tmp';

const Home = lazy(() => import(
  /* webpackChunkName: 'home' */ "./homePage-tmp"));
const Projects = lazy(() => import(
  /* webpackChunkName: 'projects' */ "./projectsPage-tmp"));
const ProjectSound = lazy(() => import(
    /* webpackChunkName: 'projectSound' */ "./projectSound-tmp"));
const ProjectTodo = lazy(() => import(
  /* webpackChunkName: 'ProjectTodo' */ "./projectTodo-tmp"));
const ProjectCalculator = lazy(() => import(
    /* webpackChunkName: 'projectCalculator' */ "./projectCalculator-tmp"));
const ProjectImageOptimizations = lazy(() => import(
  /* webpackChunkName: 'ProjectImgOpt' */ "./projectImageOptimizations-tmp"));
const Blog = lazy(() => import(
  /* webpackChunkName: 'blog' */ "./blogPage-tmp"));
const Article = lazy(() => import(
  /* webpackChunkName: 'article' */ "./articlePage-tmp"));
const About = lazy(() => import(
  /* webpackChunkName: 'about' */ "./aboutPage-tmp"));
const Contact = lazy(() => import(
  /* webpackChunkName: 'contact' */ "./contactPage-tmp"));
const NoMatch = lazy(() => import(
  /* webpackChunkName: 'noMatch' */ "./noMatch-tmp"));

function LazyLoad(Component) {
  return props => (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );
}

class Routes extends Component {

  render() {
    return (
      <Switch>
        <Route
          path="/"
          exact
          component={LazyLoad(Home)}
        />
        <Route
          path="/projects"
          exact
          component={LazyLoad(Projects)}
        />
        <Route
          path="/projects/sound-project"
          exact
          component={LazyLoad(ProjectSound)}
        />
        <Route
          path="/projects/my-to-do-app"
          exact
          component={LazyLoad(ProjectTodo)}
        />
        <Redirect
          from="/projects/image-optimizations-to-improve-seo"
          to="/projects/lazy-loading-images-to-improve-seo"
        />
        <Route
          path="/projects/lazy-loading-images-to-improve-seo"
          exact
          component={LazyLoad(ProjectImageOptimizations)}
        />
        <Route
          path="/projects/my-react-calculator"
          exact
          component={LazyLoad(ProjectCalculator)}
        />
        <Route
          path="/my-writings"
          exact
          component={LazyLoad(Blog)}
        />
        <Route
          path="/my-writings/:article"
          component={LazyLoad(Article)}
        />
        <Route
          path="/about"
          exact
          component={LazyLoad(About)}
        />
        <Route
          path="/contact"
          exact
          component={LazyLoad(Contact)}
        />
        <Route component={LazyLoad(NoMatch)}
        />
      </Switch>
    );
  }
}

export default Routes;
