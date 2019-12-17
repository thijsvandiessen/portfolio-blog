import React, { lazy, Suspense, Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loading from './loading';

const Home = lazy(() => import(
  /* webpackChunkName: 'home' */ "./homePage"));
const Projects = lazy(() => import(
  /* webpackChunkName: 'projects' */ "./projectsPage"));
const ProjectSound = lazy(() => import(
    /* webpackChunkName: 'projectSound' */ "./projectSound"));
const ProjectTodo = lazy(() => import(
  /* webpackChunkName: 'ProjectTodo' */ "./projectTodo"));
const ProjectCalculator = lazy(() => import(
    /* webpackChunkName: 'projectCalculator' */ "./projectCalculator"));
const ProjectImageOptimizations = lazy(() => import(
  /* webpackChunkName: 'ProjectImgOpt' */ "./projectImageOptimizations"));
const Blog = lazy(() => import(
  /* webpackChunkName: 'blog' */ "./blogPage"));
const Article = lazy(() => import(
  /* webpackChunkName: 'article' */ "./articlePage"));
const About = lazy(() => import(
  /* webpackChunkName: 'about' */ "./aboutPage"));
const Contact = lazy(() => import(
  /* webpackChunkName: 'contact' */ "./contactPage"));
const NoMatch = lazy(() => import(
  /* webpackChunkName: 'noMatch' */ "./noMatch"));

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