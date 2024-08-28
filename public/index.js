let data = {
    name:"hello",
    price : 15,
}

const getInfo = [];

const click = document.querySelector(".click");
const get = document.querySelector(".get");

get.addEventListener("click", () => {
    fetch("http://localhost:3000/getInfo")
    .then((response) => {
        if(!response.ok) {
            throw new Error("the network is not okay");
        } else {
            return response.json();
        }
    }).then((data) => {
        data.forEach(element => {
            getInfo.push(element);
        });
        console.log(getInfo);
    }).catch((e) => {
        console.log(e);
    })
})



click.addEventListener("click", () => {
    fetch("http://localhost:3000/test", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json"  
        },
        body: JSON.stringify(data)
    })
    .then((response) => {
        if(!response.ok) {
            throw new Error("netword issue");
        } else {
            return response.text();
        }
    })
    .then((data) => {
        console.log(data);
    })
    .catch((e) => {
        console.log(e);
    })
}) 
