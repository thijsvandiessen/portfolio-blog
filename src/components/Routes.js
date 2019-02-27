import React, { lazy, Suspense, Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loading from './Loading';

const Home = lazy(() => import(
  /* webpackChunkName: 'home' */ "./HomePage"));
const Projects = lazy(() => import(
  /* webpackChunkName: 'projects' */ "./ProjectsPage"));
const Blog = lazy(() => import(
  /* webpackChunkName: 'blog' */ "./BlogPage"));
const Article = lazy(() => import(
  /* webpackChunkName: 'article' */ "./ArticlePage"));
const About = lazy(() => import(
  /* webpackChunkName: 'about' */ "./AboutPage"));
const Contact = lazy(() => import(
  /* webpackChunkName: 'contact' */ "./ContactPage"));
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
        <Route exact path="/" component={LazyLoad(Home)} />
        <Route path="/projects" exact component={LazyLoad(Projects)} />
        <Route path="/my-writings" exact component={LazyLoad(Blog)} />
        <Route path="/my-writings/:article" component={LazyLoad(Article)} />
        <Route path="/about" component={LazyLoad(About)} />
        <Route path="/contact" component={LazyLoad(Contact)} />
        <Route component={LazyLoad(NoMatch)} />
      </Switch>
    );
  }
}

export default Routes;
