const post = {
    postPerPage : 10,
    currentPage : 1,
    results : null
}


const output= document.querySelector(".output");
const pages = document.querySelector(".pages");

const init = function(){
    console.log("ready");

    const url = "https://randomuser.me/api/?results=95";

    fetch(url)
    .then(function(res){
        return res.json()
    })
    .then(function(data){
        post.results = data.results;
        loadPage(1);
    })
    .catch(function(error){
        console.log(error);
    })
}

const loadPage = function(pg){
    post.currentPage = pg;
    pages.innerHTML = "";
    let startIndex = (post.currentPage-1) * post.postPerPage;
    let totalPages = Math.ceil(post.results.length / post.postPerPage);
    let endIndex = startIndex + post.postPerPage > post.results.length ? post.results.length : startIndex + post.postPerPage;
    console.log(totalPages);
    console.log(startIndex);
    console.log(endIndex);
    output.innerHTML = `<h2>Page ${post.currentPage}</h2>`;

    let pageOutput = document.createElement("div");
    for (let x = 0; x < totalPages; x++){
        let span = document.createElement("span");
        span.textContent = x+1;
        span.addEventListener("click",function(){
            loadPage(x+1);
        })

        if( x+1 === post.currentPage){
            span.classList.add("active");
        }
        pageOutput.appendChild(span);
    }

    for( let x = startIndex; x < endIndex; x++){
        console.log(post.results[x]);
        let div = document.createElement("div");
        let person = post.results[x].name;
        div.innerHTML = `${x+1}  ${capitalism(person.first)}  ${capitalism(person.last)}<br>`;
        output.appendChild(div);
    }

    pages.appendChild(pageOutput);
}

const capitalism = function(str){
    return str.toUpperCase();
}
window.addEventListener("load",function(){init();})