import React, { lazy, Suspense, Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loading from './Loading';

const Home = lazy(() => import(
  /* webpackChunkName: 'home' */ "./HomePage"));
const Projects = lazy(() => import(
  /* webpackChunkName: 'projects' */ "./ProjectsPage"));
const ProjectSound = lazy(() => import(
    /* webpackChunkName: 'projectSound' */ "./ProjectSound"));
const ProjectTodo = lazy(() => import(
  /* webpackChunkName: 'ProjectTodo' */ "./ProjectTodo"));
const ProjectCalculator = lazy(() => import(
    /* webpackChunkName: 'projectCalculator' */ "./ProjectCalculator"));
const ProjectImageOptimizations = lazy(() => import(
  /* webpackChunkName: 'ProjectImgOpt' */ "./ProjectImageOptimizations"));
const Blog = lazy(() => import(
  /* webpackChunkName: 'blog' */ "./BlogPage"));
const Article = lazy(() => import(
  /* webpackChunkName: 'article' */ "./ArticlePage"));
const About = lazy(() => import(
  /* webpackChunkName: 'about' */ "./AboutPage"));
const Contact = lazy(() => import(
  /* webpackChunkName: 'contact' */ "./ContactPage"));
const NoMatch = lazy(() => import(
  /* webpackChunkName: 'noMatch' */ "./NoMatch"));

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
