let keys = document.querySelectorAll(".key");
keys = Array.from(keys);
let typeBar = document.querySelector(".type-bar input");
let controlKeys = document.querySelectorAll(".key.control");
let capslockKey = document.querySelector("#capslock");
let space = keys.find((item) => {
  return item.id === "space";
});
let capslock = false;
controlKeys = Array.from(controlKeys);
let cross = document.getElementById("cross");

keys.forEach((key) => {
  key.addEventListener("click", () => {
    if (controlKeys.indexOf(key) < 0) {
      if (!capslock) {
        if (key != space) typeBar.value = typeBar.value + key.innerText;
        else typeBar.value += " ";
      } else typeBar.value = typeBar.value + `${key.innerText}`.toUpperCase();
    }
    key.classList.add("active");
    setTimeout(() => {
      key.classList.remove("active");
    }, 150);
  });
});

capslockKey.addEventListener("click", () => {
  capslock = !capslock;
  if (capslock) {
    capslockKey.style.color = "red";
  } else {
    capslockKey.style.color = "white";
  }
});

cross.addEventListener("click", () => {
  typeBar.value = `${typeBar.value}`.slice(0, typeBar.value.length - 1);
});

let send = document.getElementById("send");
let phoneContainer = document.querySelector(".phone-container");
let screenContainer = document.querySelector('.screen-container')

send.addEventListener("click", () => {
    phoneContainer.classList.remove("active");
    if (typeBar.value!==''){
            screenContainer.appendChild(createMessage(typeBar.value))
            typeBar.value = ''
    }
});

typeBar.addEventListener("focus", () => {
  if (!phoneContainer.classList.contains("active")) {
    phoneContainer.classList.add("active");
  }
});

function createMessage(content){
    let html = `
				<div class="message right">${content}</div>
    `
    let res = document.createElement('div')
    res.classList.add('message-wrapper')
    res.innerHTML = html
    return res;
}

function type(letter){
    if (letter === ' '){
        letter = 'space'
    }
    let key = keys.find((item) => {
        return item.innerText === `${letter}`.toLowerCase();
    })
    if (letter==letter.toUpperCase()){
        capslockKey.click()
    }
    key.click()
    if (letter==letter.toUpperCase())
    capslockKey.click()
}

async function typeSentence(sentence){
    for (i in sentence){
        type(sentence[i])
        await wait(200)
    }
}
function wait(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(ms)
      }, ms )
    })
}  
async function sendMessage(message){
    await typeSentence(message)
    send.click()
}

screenContainer.addEventListener('click',()=>{
    phoneContainer.classList.remove("active");
})
sendMessage("Happy Birthday I hope you live well")
