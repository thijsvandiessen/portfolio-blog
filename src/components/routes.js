import React, { lazy, Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import LazyLoad from './lazyLoad';

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
const Article = lazy(() => import(
  /* webpackChunkName: 'article' */ "./articlePage"));
const About = lazy(() => import(
  /* webpackChunkName: 'about' */ "./aboutPage"));
const Contact = lazy(() => import(
  /* webpackChunkName: 'contact' */ "./contactPage"));
const NoMatch = lazy(() => import(
  /* webpackChunkName: 'noMatch' */ "./noMatch"));

class RootRoutes extends Component {
  render() {
    return (
      <Routes>
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
        <Route
          path="/projects/lazy-loading-images-to-make-your-site-fast"
          exact
          component={LazyLoad(ProjectImageOptimizations)}
        />
        <Route
          path="/projects/my-react-calculator"
          exact
          component={LazyLoad(ProjectCalculator)}
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
      </Routes>
    );
  }
}

export default RootRoutes;
