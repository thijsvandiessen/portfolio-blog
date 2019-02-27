// 
// class Blog {
//   constructor() {
//     this.cdn = null,
//     this.directory = null,
//     this.blogArticles = null,
//     this.metadata = null
//   }
//
//   set directory(dir) {
//     this.directory = dir
//   }
//
//   // get metadata() {
//   //
//   //   const directory = this.directory
//   //   // blog meta data
//   //   const blogMetaData = 'https://data.jsdelivr.com/v1/package/gh/thijsvandiessen/blog@1.0/flat';
//   //
//   //   return fetch(blogMetaData)
//   //     .then(response => response.json())
//   //
//   //     // sort the files chronologically
//   //     .then(data => data.files.sort().reverse())
//   //
//   //     // get the files in the right directory
//   //     .then(file => file.filter(element => element.name.startsWith(directory,1)))
//   //
//   //   // todo, return a better error
//   //   .catch(error => {
//   //     console.error('GetBlogMetadata error')
//   //   })
//   // }
//
//   // get blogArticle() {
//   //   return '1 article'
//   // }
//   //
//   // get blogArticles(){
//   //   return 'all articles'
//   // }
// }
//
// export default Blog;



export function GetMetadata(directory) {

  // blog meta data
  const blogMetaData = 'https://data.jsdelivr.com/v1/package/gh/thijsvandiessen/blog@1.0/flat';

  return fetch(blogMetaData)
    .then(response => response.json())

    // sort the files chronologically
    .then(data => data.files.sort().reverse())

    // get the files in the right directory
    .then(file => file.filter(element => element.name.startsWith(directory,1)))

  // todo, return a better error
  .catch(error => {
    console.error('GetBlogMetadata error')
  })
}

export function GetBlogArticles(metadata) {

  // CDN endpoint
  const blogCDN = 'https://cdn.jsdelivr.net/gh/thijsvandiessen/blog@master';

  // if only one object
  if (!Array.isArray(metadata)) {
    return fetch(blogCDN + metadata.name).then(response => response.text())
  }

  else {
    // fetch all the markdown blogArticles
    return Promise.all(metadata.map(file => fetch(blogCDN + file.name)
      .then(response => response.text()))
    )

    // todo: return better error state
    .catch(error => {
      console.error('blogCDN error')
    })
  }
}
