"use strict";
// SgLOjHrJy9wMCRR80G_gjE869Rmh4a2wKC46kpuiIHk
const form = document.forms['form'],
      input = form.elements['input'],
      columns = document.querySelectorAll(".column");

const key = "SgLOjHrJy9wMCRR80G_gjE869Rmh4a2wKC46kpuiIHk";

async function getResponse() {
    if (input.value) {
        return await fetch(
            `https://api.unsplash.com/search/photos/?client_id=${key}&per_page=25&query=${input.value}`,
            {
                "Content-type": "application/json"
            }
        );
    }
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    getResponse()
    .then(res => res.json())
    .then(res => renderPost(res))
    .catch(err => console.log(err));
})

function renderPost(obj) {
    const {results} = obj;
    results.forEach((item, i) => {
        renderCard(item, i);
    })
}
let i = 0;
async function renderCard(item, index) {
    const indexArr = [];
    const {urls: {small}} = item;
    indexArr.push(index);
    await clearColumns();
    const post = document.createElement("a");
    post.classList.add("post");
    post.href = small;
    post.innerHTML = `
        <img src="${small}" alt="">
    `;
    
    if (i == 2) {
        addToColumn(post, i);
        i = 0;
    } else {
        addToColumn(post, i);
        i += 1;
    }
    // addToColumn(post)
}

function clearColumns() {
    columns.forEach(col => {
        col.innerHTML = "";
    })
}


function addToColumn(post, i) {
    columns[i].append(post);
}