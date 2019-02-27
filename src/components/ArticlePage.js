import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import Loading from './Loading';
import GradientHeader from './GradientHeader';


class ArticlePage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      url: null,
      article: null,
      loading: true,
    }
  }

  componentDidMount(){

    // get the end of the url
    let pathname = window.location.pathname.slice(13)


    // Do we need to load this article
    if (!this.props.history.location.state) {

      // lazyload from blog.js
      import(/* webpackChunkName: "blog" */ "../utils/Blog")
      .then(module => {

        // get data from the folder named blogArticles
        const directory = 'blogArticles'

        module.GetMetadata(directory)
        .then(metadata => {

          for (let i in metadata) {

            // add a pretty url to our metadata
            metadata[i].url = metadata[i].name.slice(14, -3).toLowerCase()

            // check if the pathname equals to an article url
            if (pathname === metadata[i].url) {

              // get the aricle
              module.GetBlogArticles(metadata[i])
              .then(article => {
                this.setState({article: article, loading: false})
              })
            } else {
              this.setState({loading: false})
            }
          }

        })
      })
      .catch(error => this.setState({error: true}))

    }


    // Get the article from the previous page
    if (this.props.history.location.state) {
      this.setState({
        article: this.props.history.location.state.article,
        loading: false,
      })
    }
  }

  render() {

    const heading = {
      title: 'This article does not exist',
      subTitle: 'I am sorry',
      huge: true,
    }

    if (this.state.loading === true) {
      return (<main><Loading/></main>)
    }

    else if (this.state.article === null) {
      return(
        <main>
          <GradientHeader heading={heading} />
        </main>
      )
    }

    else if (this.state.article !== null) {
      return (
        <main>
          <article>
            <ReactMarkdown source={this.state.article}/>
          </article>
        </main>
      )
    }
  }
}


export default ArticlePage;
