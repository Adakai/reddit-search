import reddit from './redditapi.js';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// form event listener
searchForm.addEventListener('submit', e => {
  // get search term
  const searchTerm = searchInput.value;
  // get sort
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  // get limit
  const searchLimit = document.getElementById('limit').value;
  // check input
  if(searchTerm === '') {
    showMessage('Please add a search term.', 'alert-danger');
  }

  // clear input
  searchInput.value = '';

  // search reddit
  reddit.search(searchTerm, searchLimit, sortBy)
  .then(results => {
    console.log(results);
    let output = '<div class="card-columns">'
    results.forEach(post => {
      // check for img
      const permalink = 'https://www.reddit.com';
      const image = post.preview ? post.preview.images[0].source.url : 'http://www.siliconbeat.com/wp-content/uploads/2014/11/reddit-logo-01-674x501.jpg'; 
      output += `
        <div class="card">
          <img class="card-img-top" src="${image}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">.${truncateText(post.selftext, 100)}</p>
            <a href="${post.url}" target="_blank" class="btn btn-primary">Read More</a>
            <a href="${permalink}${post.permalink}" target="_blank" class="btn btn-secondary">Comments ${post.num_comments}</a>
            <hr>
            <span class="badge badge-info">Subreddit: ${post.subreddit}</span>
            <span class="badge badge-success">Score: ${post.score}</span>
          </div>
        </div>
      `;
    });
    output += '</div>';
    document.getElementById('results').innerHTML = output;
  });

  e.preventDefault();
});

// show message
function showMessage(message, className) {
  // creat div
  const div = document.createElement('div');
  // add classes
  div.className = `alert ${className}`;
  // add text
  div.appendChild(document.createTextNode(message));
  // get parent container
  const searchContainer = document.getElementById('search-container');
  // get search
  const search = document.getElementById('search');

  //insert message
  searchContainer.insertBefore(div, search);

  // timeout alert
  setTimeout(() => {
    document.querySelector('.alert').remove();
  }, 3000);
};

// truncate text
function truncateText(text, limit) {
  const shortened = text.indexOf(' ', limit);
  if(shortened == -1) return text;
  return text .substring(0, shortened);
}