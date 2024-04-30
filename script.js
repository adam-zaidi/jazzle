let guesses = 0;

const start_date = new Date("2024", "3", "28");
const date = new Date();
let jazzle_day = Math.round((date - start_date) / (1000 * 60 * 60 * 24));

let order = [18, 50, 181, 83, 293, 360, 132, 273, 14, 148, 169, 234, 224, 345, 321, 344, 362, 218, 176, 356, 245, 330, 223, 359, 385, 195, 128, 152, 379, 296, 92, 6, 24, 269, 43, 291, 135, 90, 320, 338, 261, 158, 180, 236, 82, 45, 375, 332, 122, 335, 91, 65, 219, 197, 299, 211, 240, 70, 342, 364, 289, 51, 346, 312, 55, 193, 221, 89, 200, 381, 113, 57, 114, 279, 390, 9, 202, 127, 76, 361, 283, 171, 205, 274, 358, 276, 242, 40, 101, 53, 284, 288, 222, 277, 103, 309, 343, 167, 110, 121, 370, 398, 109, 27, 216, 329, 340, 102, 41, 325, 366, 341, 324, 189, 255, 254, 243, 117, 347, 382, 85, 136, 264, 64, 191, 227, 237, 133, 210, 93, 163, 192, 327, 226, 156, 188, 396, 84, 348, 175, 77, 168, 111, 357, 56, 46, 28, 140, 212, 74, 142, 215, 106, 371, 297, 281, 258, 300, 377, 157, 397, 278, 204, 105, 123, 184, 80, 287, 149, 48, 30, 270, 34, 285, 295, 161, 33, 333, 160, 54, 319, 183, 60, 35, 376, 372, 5, 88, 232, 10, 256, 251, 378, 198, 323, 306, 220, 39, 303, 29, 248, 301, 259, 353, 62, 380, 354, 305, 66, 2, 350, 250, 399, 314, 151, 119, 228, 137, 337, 16, 355, 125, 388, 58, 166, 266, 21, 280, 352, 23, 363, 373, 328, 178, 17, 147, 308, 15, 12, 393, 108, 143, 112, 120, 322, 231, 36, 207, 154, 374, 302, 162, 150, 165, 173, 190, 307, 246, 38, 86, 316, 49, 201, 172, 230, 239, 229, 118, 318, 247, 3, 213, 182, 98, 107, 26, 31, 235, 334, 249, 187, 186, 129, 238, 61, 75, 7, 331, 78, 257, 384, 203, 394, 271, 315, 124, 185, 81, 177, 68, 336, 214, 4, 130, 241, 22, 170, 265, 138, 144, 145, 11, 97, 217, 164, 392, 326, 272, 87, 387, 42, 252, 100, 8, 244, 63, 146, 131, 383, 260, 99, 313, 72, 134, 44, 286, 71, 351, 395, 294, 96, 20, 141, 225, 69, 290, 206, 159, 263, 79, 310, 368, 233, 73, 153, 365, 208, 304, 275, 19, 386, 292, 52, 67, 282, 339, 179, 139, 37, 13, 115, 311, 155, 369, 174, 32, 196, 367, 389, 116, 400, 298, 267, 47, 59, 199, 25, 268, 95, 391, 126, 194, 317, 104, 262, 253, 349, 209, 94, 1]

let piecess = pieces.sort()
let correct_name = piecess[order[jazzle_day]];

for (var i = 0; i < 6; i++) {
  let img = document.getElementById("img" + (i + 1).toString());
  name_processed = correct_name.replace(/ /g, "%20");
  img.src =
    "https://storage.googleapis.com/jazzle-files/by-hand/" +
    name_processed +
    "/" +
    (i + 1).toString() +
    ".png";
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
  console.log("win")
  let overlay = document.getElementById("overlay");
  let title = document.getElementById("popup-title");
  // document.getElementById("spotify-frame").src = link;
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
  // document.getElementById("spotify-frame").src = link;
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
  text += "\n\n https://adam-zaidi.github.io/jazzle/";
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
