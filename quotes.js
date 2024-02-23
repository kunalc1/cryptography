var quoteContent, charNum;

document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const button = document.querySelector("button");
  const quote = document.querySelector("blockquote p");
  const cite = document.querySelector("blockquote cite");
  const input = document.getElementById("inputloc");

  async function updateQuote() {
    // Fetch a random quote from the Quotable API
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    if (response.ok) {
      // Update DOM elements
      quote.textContent = data.content;
      cite.textContent = data.author;

      input.innerHTML = "";
      var word = document.createElement("div");
      charNum = 0;
      quoteContent = quote.textContent+" ";
      word.classList = "word";
      
      for (let i = 0; i < quoteContent.length; i++){
        var currentChar = quoteContent[i];
        if (currentChar.match(/[a-z]/i)){
          addChar(currentChar, charNum, word);
          charNum+=1;
        }
        else if (currentChar == ' '){
          input.appendChild(word);
          var word = document.createElement("div");
          word.classList = "word";
        }
        else {
          addNonChar(currentChar, word);
        }
      }


      setActive();
    }
    else {
      quote.textContent = "An error occured";
      console.log(data);
    }
  }

  // Attach an event listener to the `button`
  button.addEventListener("click", updateQuote);

  // call updateQuote once when page loads
  updateQuote();
});


let addChar = function(char, charNum, word){
  var textInput = document.createElement("input");
  textInput.setAttribute("type", "text");
  textInput.setAttribute("maxlength", 1);
  textInput.setAttribute("id", char.toUpperCase()+"-"+charNum);
  textInput.classList = "textinp";
  textInput.classList.add("letter"+char.toUpperCase());
  textInput.classList.add("count"+charNum);
  word.appendChild(textInput);
}

let addNonChar = function(char, word){
  var nonchar = document.createElement("p");
  nonchar.classList = "nonchar";
  nonchar.textContent = char;
  word.appendChild(nonchar);
}

let setAttributes = function(element, attrs) {
  for(var key in attrs) {
    element.setAttribute(key, attrs[key]);
  }
}

let setActive = function() {
  var current = document.getElementsByClassName("count0")[0];
  current.classList.add("active");
  current.focus();
  console.log("done");
}

let moveToNextBox = function(index) {
  var nextIndex = index+1;
  var current = document.getElementsByClassName("count"+index)[0];
  if (nextIndex >= charNum){
    nextIndex = 0;
  }
  var next = document.getElementsByClassName("count"+nextIndex)[0];
  current.classList.remove("active");
  next.classList.add("active");
  next.focus();
}

addEventListener('keydown',function(e){
	var thislet = e.key.toUpperCase();
	var selected = document.getElementsByClassName("active")[0];
  // console.log(e.key.toUpperCase().charCodeAt(0));
  // console.log(e.keyCode);
  if(e.keyCode>64 && e.keyCode<91) {
		if(e.ctrlKey || e.metaKey) { } else {
			// var thislet = e.key.toUpperCase();
			// var selected = document.getElementsByClassName("active")[0];
      // console.log(selected.classList);
      moveToNextBox(selected.id.substring(2,)-'0');
      selected.value = thislet;
      e.preventDefault();
    }
  }
  else if (e.keyCode == 37 || e.keyCode == 8){
	// backspace or left arrow
    moveToPreviousBox(selected.id.substring(2,)-'0');
    selected.value = "";
    e.preventDefault();
  }
})
