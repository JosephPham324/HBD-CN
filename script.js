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

send.addEventListener("click", () => {
  if (phoneContainer.classList.contains("active")) {
    phoneContainer.classList.remove("active");
  } else {
    phoneContainer.classList.add("active");
  }
});

typeBar.addEventListener("focus", () => {
  if (!phoneContainer.classList.contains("active")) {
    phoneContainer.classList.add("active");
  }
});
