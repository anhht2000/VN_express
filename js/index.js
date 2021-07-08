window.onload = function(){
    var api = 'b7ef181bb0f3b3da54eb8b618c7ae544';
var api2 = 'bfe692d5d322ff7c2eaec64cac9b705a';
var api3 = 'ab6390b400dc18ff693a1b964ac3630a';

let listPost = document.querySelector("#post_item");
let loading = document.querySelector("#loading");
let btnSearch = document.querySelector("#btnSearch");
let formSearch = document.querySelector("#form_search");
let select_post = document.querySelectorAll(".select_post");
let title = document.querySelector("#title");

//load heading post
async function getData () {
    try {
        loading.style.display = 'block';
        let data = await fetch("https://gnews.io/api/v4/top-headlines?token="+ api +"&lang=en%27");
        let dataJson = await data.json();
        console.log(dataJson)
        loading.style.display = 'none';
        var htmls =` 
                <div class="row row-cols-1 row-cols-md-3 g-4">
        `;
        dataJson["articles"].slice(0, 9).forEach(function(element, index) {
            htmls += `<div class="col ">
                        <a href=${element.url} class="wow bounceInUp" data-wow-delay="3s">
                            <div class="card h-100">
                              <img src=${element.image} class="card-img-top" alt="..." id="card_image">
                              <div class="card-body">
                                <h2 class="card-title" id="card_title">${element.title}</h2>
                                <p class="card-text" id="card_decript">${element.description}</p>
                              </div>
                            </div>
                        </a>
                  </div>`

        });
        htmls+`</div>`
        //load all
        listPost.innerHTML = htmls;
        
    } catch(e) {
        console.log(e);
    }
}
getData();

//load post with keyword
formSearch.onsubmit = function(e){
    e.preventDefault();
}
btnSearch.addEventListener("click", function(e){
    let searchInput = document.querySelector("#nav_search");
    console.log(searchInput.value);
    loadWithKey(searchInput.value.toLowerCase())
    searchInput.value = '';
})
async function loadWithKey(key){
    loading.style.display = 'block';
    let data = await fetch("https://gnews.io/api/v4/search?q=" + key + '&token='+ api3 +"&lang=en");
    let dataJson = await data.json();
    console.log(dataJson)
    loading.style.display = 'none';

    title.innerText = `Từ khóa của bạn: ${key}`

    var htmls =` 
            <div class="row row-cols-1 row-cols-md-3 g-4">
    `;
    dataJson["articles"].forEach(function(element, index) {
        htmls += `<div class="col">
                <a href=${element.url}>
                    <div class="card h-100">
                      <img src=${element.image} class="card-img-top" alt="..." id="card_image">
                      <div class="card-body">
                        <h2 class="card-title" id="card_title">${element.title}</h2>
                        <p class="card-text" id="card_decript">${element.description}</p>
                      </div>
                    </div>
                </a>
              </div>`

    });
    htmls+`</div>`
    //load with key
    listPost.innerHTML = htmls;
}
//load with category
for(let i = 0; i < select_post.length; i++){
    select_post[i].onclick = function(e){
        console.log(e.target.getAttribute("data-search"))
        loadWithSelect(e.target.getAttribute("data-search"),e.target.textContent)
    }
}
async function loadWithSelect(topic,text){
    loading.style.display = 'block';
    let data = await fetch("https://gnews.io/api/v4/top-headlines?topic=" + topic + '&token=' + api2 + "&lang=en");
    let dataJson = await data.json();
    console.log(dataJson)
    loading.style.display = 'none';

    title.innerText = `${text}`
    var htmls =` 
            <div class="row row-cols-1 row-cols-md-3 g-4">
    `;
    dataJson["articles"].forEach(function(element, index) {
        htmls += `<div class="col">
                <a href=${element.url}>
                    <div class="card h-100">
                      <img src=${element.image} class="card-img-top" alt="..." id="card_image">
                      <div class="card-body">
                        <h2 class="card-title" id="card_title">${element.title}</h2>
                        <p class="card-text" id="card_decript">${element.description}</p>
                      </div>
                    </div>
                </a>
              </div>`

    });
    htmls+`</div>`
    //load with key
    listPost.innerHTML = htmls;
}

}