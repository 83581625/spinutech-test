var row1Circles = document.querySelectorAll("button"); //get all circle elements

//Loop through all circle/square elements and attach the necessary functions to them
var i;
for (i = 0; i < row1Circles.length; i++) { 
	row1Circles[i].addEventListener("mouseover", onMouseOver);
	row1Circles[i].addEventListener("mouseout", onMouseOut);
	row1Circles[i].addEventListener("click", click);

}

var color; //declare global variable color, which will be used and changed in functions below this line

function opacity50() { //function that loops through all of the circles/squares and adds a class that drops opacity to 50% if the circle/square is not the currently selected one
	let x;
	for (x = 0; x < row1Circles.length; x++) { 
		if (!row1Circles[x].classList.contains("current")) { //current is a class added to the currently selected element
			row1Circles[x].classList.add("opacity-50");
		}
	}
}

function getCurrentColor(currentButton) { //function that uses the element's data-color attribute to get the currently selected color
	color = currentButton.getAttribute("data-color");
}

function opacity100() { //function that loops through all of the circles/squares and brings the opacity back to 100% by removing the class that drops the opacity to 50%.
	let x;
	for (x = 0; x < row1Circles.length; x++) { 
		row1Circles[x].classList.remove("opacity-50");
	}
}

function onMouseOver() { //function that runs when the mouseover event is triggered for the circle/square elements
	this.classList.add("current"); //adds a class named current to denote the currently selected element
	getCurrentColor(this); //get the currently selected color
	thisLabel = document.querySelector("[data-label=" + color +"-label]"); //get the label of the currently selected color
	thisLabel.classList.remove("is-hidden"); //make this color's label visible by removing the is-hidden class
	opacity50(); //drop opacity for all other circles/squares to 50%
}

function onMouseOut() { //function that runs when the mouseout event is triggered for the circle/square elements
	this.classList.remove("current"); //remove the current class from the currently selected element
	getCurrentColor(this); //get the currently selected color
	thisLabel = document.querySelector("[data-label=" + color +"-label]"); //get the label of the current selected color
	thisLabel.classList.add("is-hidden"); //make this color's label invisible by adding the is-hidden class
	opacity100(); //return opacity to all circles/squares to 100%
}

function click() { //function that runs when the click event is triggered for the circle/square elements

	/*Define variables to be used later in the function*/
	let row1 = document.querySelector(".row-1[data-color="+color+"]"); //refers to the div that contains both the circle/square and label
	let row2 = document.querySelector(".row-2[data-color="+color+"]"); //refers to the empty div that the circle/square gets moved to, in order to make it appear it went into a second row
	let container = document.querySelector(".grid"); //refers to the container for this entire section (section class=grid)

	if (this.classList.contains("square")) { //detect whether this element is a square. If the element is a square, it will have the square class
		this.classList.remove("square"); //remove the square class
		container.prepend(row1); //move the div containing the circle/square and label to the beginning of the container (section class=grid)
		row1.prepend(this); //move the circle/square element to the beginning of its containing div
		row1.classList.remove("mt-40"); //remove the class that causes the element to appear on a second row
	}
	else { //if this element lacks the square class, it's a circle and should execute the following lines
		row2.appendChild(this); //move the circle/square element to the end of its containing div, so that it appears beneath the label
		this.classList.add("square"); //add the square class
		row1.classList.add("mt-40"); //add the class that causes the element to appear on a second row
	}
}