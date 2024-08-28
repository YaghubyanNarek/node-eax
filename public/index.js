const getInfo = [];

const click = document.querySelector(".click");
const get = document.querySelector(".get");
const names = document.querySelector(".name");
const price = document.querySelector(".price");
const main_div = document.querySelector(".main_div");
let data = {
    name: names.value,
    price: price.value,
};

function render() {
    main_div.innerHTML = '';
    
    getInfo.forEach(item => {
        const elem = document.createElement("h1");
        elem.textContent = `Name: ${item.name}, Price: ${item.price}`;
        main_div.appendChild(elem);
    });
}

get.addEventListener("click", () => {
    fetch("http://localhost:3000/products")
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

click.addEventListener("click", () => {
    data.name = names.value;
    data.price = price.value;
    fetch("http://localhost:3000/addProduct", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json"  
        },
        body: JSON.stringify(data)
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network issue");
        }
        return response.text();
    })
    .then((data) => {
        console.log(data);
    })
    .catch((e) => {
        console.log(e);
    });
});
