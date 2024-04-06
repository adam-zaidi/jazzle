let guesses = 0;

const start_date = new Date("2024", "3", "5");
const date = new Date();
let jazzle_day = Math.round((date - start_date) / (1000 * 60 * 60 * 24));

let order = fetch('order.txt')
    .then((res) => res.text())
  .then((text) => {
    return text.split(", ")
   })

let correct_name = pieces.sort()[order[jazzle_day]]

for (var i = 0; i < 6; i++) {
  let img = document.getElementById("img"+(i+1).toString())
  img.src = "by-hand/502 Blues/"+(i+1).toString()
}

let input = document.querySelector("input");

let close_btn = document.getElementById("closebtn");
let info_btn = document.getElementById("info-button-box");
let share_btn = document.getElementById("share-button");
let submit_btn = document.getElementById("submit-button");

input.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    guessing();
  }
});

submit_btn.onclick = function () {
  guessing();
};

function guessing() {
  input = document.getElementById("input-thingy");
  input_value = input.value;
  input.value = "";
  if (input_value == correct_name) {
    info_btn.style.display = "inline-block";
    guesses += 1;
    win();
  } else if (input_value !== correct_name && pieces.includes(input_value)) {
    guesses += 1;
    if (guesses == 6) {
      info_btn.style.display = "inline-block";
      lost();
      input.disabled = true;
    }
    document.getElementById("img" + (guesses + 1).toString()).style.opacity = 1;

    document.getElementById(
      "img" + guesses.toString(),
    ).parentElement.style.outline = "3px solid #22262d";
    document.getElementById(
      "img" + (guesses + 1).toString(),
    ).parentElement.style.outline = "3px solid #f44336";
    // fading_border(guesses);
  } else {
    alert("Invalid Guess!");
  }
}

function fading_border(guesses) {
  let div = document.getElementById("img" + (guesses + 1).toString());
  let length = 9;
  const colors = [
    [244, 67, 54],
    [34, 38, 45],
  ];
  let newy = [244, 67, 54];
  for (var i = 0; i < length; i++) {
    let hex =
      "#" + colorToHex(newy[0]) + colorToHex(newy[1]) + colorToHex(newy[2]);
    div.parentElement.style.outline = "3px solid " + hex;

    newy[0] -= (colors[0][0] - colors[1][0]) / length;
    newy[1] -= (colors[0][1] - colors[1][1]) / length;
    newy[2] -= (colors[0][2] - colors[1][2]) / length;
  }
}

function win() {
  let overlay = document.getElementById("overlay");
  let title = document.getElementById("popup-title");
  document.getElementById("spotify-frame").src = link;
  title.innerHTML = "You Win!";

  overlay.style.display = "block";
  overlay.style.animation = "fadeInAnimation ease 0.5s";
  document.getElementById("guesses-p").innerHTML =
    "Guesses: " + guesses.toString() + "/6";
  document.getElementById("name-p").innerHTML = correct_name;
  document.getElementById(
    "img" + guesses.toString(),
  ).parentElement.style.outline = "3px solid #00ba4d";

  input.disabled = true;
  input.style.backgroundColor = "#a5a5a5";
  input.classList.add("custom-placeholder");

  submit_btn.style.display = "none";
  document.getElementById("piece-name").innerHTML = correct_name;
  document.getElementById("piece-name").style.display = "block";
}

function lost() {
  let overlay = document.getElementById("overlay");
  let title = document.getElementById("popup-title");
  document.getElementById("spotify-frame").src = link;
  title.innerHTML = "You Lose!";

  overlay.style.display = "block";
  overlay.style.animation = "fadeInAnimation ease 0.5s";
  document.getElementById("guesses-p").innerHTML =
    "Guesses: " + guesses.toString() + "/6";
  document.getElementById("name-p").innerHTML = correct_name;
  document.getElementById(
    "img" + guesses.toString(),
  ).parentElement.style.outline = "3px solid #f44336";

  input.disabled = true;
  input.style.backgroundColor = "#a5a5a5";
  input.classList.add("custom-placeholder");
}

close_btn.addEventListener("click", function handleClick() {
  let divy = document.getElementById("overlay");
  divy.style.animation = "fadeOutAnimation ease 0.5s";
  setTimeout(() => (overlay.style.display = "none"), 500);
  document.getElementById("has-copied").style.display = "none";
});

info_btn.addEventListener("click", function handleClick() {
  let divy = document.getElementById("overlay");
  overlay.style.display = "block";
  divy.style.animation = "fadeInAnimation ease 0.5s";
});

share_btn.addEventListener("click", function handleClick() {
  let text = "";
  text += "Classicle #1\n\n 🎼";
  for (var i = 1; i < 7; i++) {
    if (i < guesses) {
      text += "⬛";
    } else if (i == guesses) {
      text += "🟩";
    } else if (i > guesses) {
      text += "⬜️";
    }
  }
  text += "\n\n https://classicle.sfdcoderaz.repl.co";
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Text has been copied!");
    })
    .catch((err) => {
      console.log("Something is not right, Oops!");
    });
  document.getElementById("has-copied").style.display = "block";
});

const colorToHex = (color) => {
  const hexadecimal = color.toString(16);
  return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
};
