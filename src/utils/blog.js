
class Blog {
  constructor(directory) {
    this.directory = directory;
  };

  get metadata() {
    // endpoint
    const blogMetaData = 'https://data.jsdelivr.com/v1/package/gh/thijsvandiessen/blog@1.0/flat';

    return fetch(blogMetaData)
        .then((response) => response.json())

    // sort the files chronologically
        .then((data) => data.files.sort().reverse())

    // get the files in the right directory
        .then((file) => file.filter((element) => element.name.startsWith(this.directory, 1)))

    // todo, return a better error
        .catch((error) => {
          console.error('GetBlogMetadata error');
        });
  };

  getArticles(metadata) {
    // CDN endpoint
    const blogCDN = 'https://cdn.jsdelivr.net/gh/thijsvandiessen/blog@master';

    // if no object
    if (this.metadata == null) {
      return 'no metadata found';
    }

    // if only one object
    else if (!Array.isArray(metadata)) {
      return fetch(blogCDN + metadata.name).then((response) => response.text());
    }

    // is an array
    else if (Array.isArray(metadata)) {
      // fetch all the markdown blogArticles
      return Promise.all(metadata.map((file) => fetch(blogCDN + file.name)
          .then((response) => response.text())),
      )
      // todo: return better error state
          .catch((error) => {
            console.error('blogCDN error');
          });
    }
  }
};

export default Blog;
