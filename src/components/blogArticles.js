import React, {lazy, Suspense, Component} from 'react';
import Loading from './loading';
import {Link} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import Blog from '../utils/blog';

class BlogArticles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      blog: null,
      error: null,
    };
  }

  componentDidMount() {
    // new blog object that gets articles from the folder blogArticles
    const blog = new Blog('blogArticles');

    blog.metadata.then((data) => {
      blog.getArticles(data)
          .then((articles) => {
            for (const i in data) {
              data[i].article = articles[i];

              // add a pretty url to the metadata
              data[i].url = window.location.pathname + data[i].name.slice(13, -3).toLowerCase();
            };

            this.setState({blog: data, loading: false});
          });
    })
        .catch((error) => this.setState({error: error}));
  };

  render() {
    // check state and display the appropriate element
    if (this.state.error !== null) {
      return (
        <section>
          <p>Sorry, I'm not able to load my blog posts</p>
        </section>
      );
    } else if (this.state.loading === true) {
      return (
        <section><Loading /></section>
      );
    } else if (this.state.loading === false) {
      return (
        <section>
          {this.state.blog.map((item, idx) => (
            <article className="content-container" key={idx}>
              <ReactMarkdown source={item.article.substring(0, 180) + '...'} />
              <Link to={{pathname: item.url, state: {article: item.article}}}>
                Read more...
              </Link>
            </article>
          ))}
        </section>
      );
    }
  }
}

export default BlogArticles;
