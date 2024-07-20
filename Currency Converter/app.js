const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (let select of dropdowns){
    for (let code in countryList){
       let newOption = document.createElement("option");
       newOption.innerText = code;
       newOption.value = code;
       if (select.name === "from" && code === "PKR" )
        {
            newOption.selected = "selected";
        }else if (select.name === "to" && code === "USD"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    

select.addEventListener("change", (evt)=> {
    updateFlag(evt.target);
});

}

const updateExchangeRate = async ()=>{
    let amount = document.querySelector(".amount ")
    let amtVal = amount.value;
    if( amtVal === "" || amtVal<1){
        amtVal = 1;
        amount.value = "1"
    }
     
   // const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    const URL = `${BASE_URL}/latest/v1/currencies/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}`;

    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
 
    
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

const updateFlag = (element)=>{
    let code = element.value;
    let countryCode = countryList[code];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};


btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
  updateExchangeRate();
});




document.addEventListener("DOMContentLoaded", ()=>{
    updateExchangeRate();
    });






// Code to learn API
// let URL = "https://meowfacts.herokuapp.com/";
// let Facts = document.querySelector("#facts");
// let btn = document.querySelector("#btn");

// let getFacts = async () => {
//     console.log("Getting data.....");

//     // Await the fetch operation
//     let response = await fetch(URL);
//     console.log(response);

//     // Await the conversion of the response to JSON
//     let data = await response.json();
//     console.log(data);

//     // Update the content of the Facts element with the fetched data
//     Facts.innerText = data.data;
// };

// // Add an event listener to the button to trigger getFacts on click
// btn.addEventListener("click", getFacts);


