import React, {Component} from 'react';
import ReactMarkdown from 'react-markdown';
import Loading from './loading-tmp';
import GradientHeader from './gradientHeader-tmp';
import Blog from '../utils/blog-tmp';

class ArticlePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: null,
      article: null,
      error: null,
      loading: true,
    };
  }

  componentDidMount() {
    // We need to load this article if we don't have it yet
    if (!this.props.history.location.state) {
      const blog = new Blog('blogArticles');

      blog.metadata.then((data) => {
        const pathname = window.location.pathname.slice(13);

        for (const i in data) {
          data[i].url = data[i].name.slice(14, -3).toLowerCase();

          if (data[i].url === pathname) {
            // we need to download this article

            blog.getArticles(data[i]).then((article) => {
              this.setState({article: article, loading: false});
            });
          } else {
            this.setState({loading: false});
          }
        }
      })
          .catch((error) => this.setState({error: true}));
    }


    // Get the article from the previous page
    else if (this.props.history.location.state) {
      this.setState({
        article: this.props.history.location.state.article,
        loading: false,
      });
    }
  }

  render() {
    const heading = {
      title: 'This article does not exist',
      subTitle: 'I am sorry',
      huge: true,
    };

    if (this.state.loading === true) {
      return (<main><Loading /></main>);
    } else if (this.state.article === null) {
      return (
        <main><GradientHeader heading={heading} /></main>
      );
    } else if (this.state.article !== null) {
      return (
        <main>
          <article className="content-container"><ReactMarkdown source={this.state.article} /></article>
        </main>
      );
    }
  }
}

export default ArticlePage;
