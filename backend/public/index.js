const click = document.querySelector(".click");
const get = document.querySelector(".get");
const names = document.querySelector(".name");
const price = document.querySelector(".price");
const desc = document.querySelector(".desc");
const category = document.querySelector(".category");
const image = document.querySelector(".image");
const main_div = document.querySelector(".main_div");
const form = document.querySelector('.form');
let getInfo = [];

click.addEventListener("click", (e) => {
    e.preventDefault();
        const formData = new FormData(form);
        console.log(formData);
        fetch("http://135.181.37.152:3015/addProduct", {
            method: "POST",
            body: formData
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error("Error uploading image:", error);
        });
    form.reset();
});


get.addEventListener("click", () => {
    fetch("http://135.181.37.152:3015/products")
        .then((response) => {
            if (!response.ok) {
                throw new Error("The network is not okay");
            }
            return response.json();
        })
        .then((data) => {
            getInfo.length = 0; 
            data.forEach(element => {
                getInfo.push(element); 
            });
            render(); 
        })
        .catch((e) => {
            console.log(e);
        });
});

function render() {
    main_div.innerHTML = ''; 

    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");

    getInfo.forEach(item => {
        const colDiv = document.createElement("div");
        colDiv.classList.add("col-md-4", "mb-4"); 

        const card = document.createElement("div");
        card.classList.add("card", "h-100", "shadow-sm");

        const imgElem = document.createElement("img");
        imgElem.src = `${item.image}`; 
        imgElem.alt = item.title;
        imgElem.classList.add("card-img-top");
        imgElem.style.width = "200px";
        imgElem.style.height = "200px";
        imgElem.style.objectFit = "cover"; 
        card.appendChild(imgElem);

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const titleElem = document.createElement("h5");
        titleElem.classList.add("card-title");
        titleElem.textContent = item.title;
        cardBody.appendChild(titleElem);

        const descElem = document.createElement("p");
        descElem.classList.add("card-text");
        descElem.textContent = item.desc;
        cardBody.appendChild(descElem);

        const categoryElem = document.createElement("p");
        categoryElem.classList.add("card-text");
        categoryElem.textContent = `Category: ${item.category}`;
        cardBody.appendChild(categoryElem);

        const priceElem = document.createElement("p");
        priceElem.classList.add("card-text", "fw-bold");
        priceElem.textContent = `Price: $${item.price}`;
        cardBody.appendChild(priceElem);

        card.appendChild(cardBody);
        colDiv.appendChild(card);
        rowDiv.appendChild(colDiv);
    });

    main_div.appendChild(rowDiv);
}
