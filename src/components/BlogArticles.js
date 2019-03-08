import React, { lazy, Suspense, Component } from 'react';
import Loading from './Loading';
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown';

import Blog from '../utils/Blog';

class BlogArticles extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      blog: null,
      error: null,
    }
  }

  componentDidMount() {

    // new blog object that gets articles from the folder blogArticles
    const blog = new Blog('blogArticles');

    blog.metadata.then(data => {

      blog.getArticles(data)
        .then(articles => {

          for (let i in data) {
            data[i].article = articles[i];

            // add a pretty url to the metadata
            data[i].url = window.location.pathname + data[i].name.slice(13, -3).toLowerCase();
          };

        this.setState({ blog: data, loading: false });

      })
    })
    .catch(error => this.setState({error: error}));
  };

  render() {

    // check state and display the appropriate element
    if (this.state.error !== null ) {
      return (
        <main>
          <p>Sorry, I'm not able to load my blog posts</p>
        </main>
      );
    }

    else if (this.state.loading === true) {
      return (
        <main><Loading/></main>
      );
    }

    else if (this.state.loading === false) {

      return (
        <main>
        {this.state.blog.map((item,idx) => (
          <article key={idx}>
          <ReactMarkdown source={item.article.substring(0,180) + '...'}/>
          <Link to={{pathname: item.url, state: { article: item.article },}}>
            Read more...
          </Link>
          </article>
        ))}
        </main>
      );
    }
  }
}

export default BlogArticles;
