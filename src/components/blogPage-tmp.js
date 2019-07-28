import React, { Component } from 'react';
import BlogArticles from './blogArticles-tmp';
import GradientHeader from './gradientHeader-tmp';

class BlogPage extends Component {

  render() {

    const heading = {
      title: "My writings",
    }

    return (
      <main>
        <GradientHeader heading={heading} />
        <BlogArticles />
      </main>
    );
  }
}

export default BlogPage;
