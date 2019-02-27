import React, { Component } from 'react';
import BlogArticles from './BlogArticles';
import GradientHeader from './GradientHeader';

class BlogPage extends Component {

  render() {

    const heading = {
      title: "My writings",
    }

    return (
      <main>
        <GradientHeader heading={heading}/>
        <BlogArticles/>
      </main>
    );
  }
}

export default BlogPage;
