export default {
  search: function(searchTerm, searchLimit, sortBy) {

    const url = "https://bypasscors.herokuapp.com/api/?url=" + encodeURIComponent("http://www.reddit.com/search.json?q="); 
    
    return fetch(`${url}${searchTerm}&sort=${sortBy}&limit=${searchLimit}`)
    .then(res => res.json())
    .then(data => data.data.children.map(data => data.data))
    .catch(err => console.log(err));
  }
};