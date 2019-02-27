import React, { Component } from 'react';
import Loading from './Loading';
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown';

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

    // lazyload articles from blog.js
    import(/* webpackChunkName: "blog" */ "../utils/Blog")
    .then(module => {

      // get data from the folder named blogArticles
      const directory = 'blogArticles'

      module.GetMetadata(directory)
      .then(metadata => {

        // get the correct blogarticles
        module.GetBlogArticles(metadata)
        .then(article => {

          for (let i in metadata) {

            // add article to metadata
            metadata[i].article = article[i]

            // add pretty url to metadata
            metadata[i].url = window.location.pathname + metadata[i].name.slice(13, -3).toLowerCase()

          }

          this.setState({ blog: metadata, loading: false })

        })
      })
    })
    .catch(error => this.setState({error: true}))




  }

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
