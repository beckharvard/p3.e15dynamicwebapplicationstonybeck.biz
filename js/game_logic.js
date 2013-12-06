$(function() {

	var clicks = 0;
	var prev_picture_clicked = "";
	var last_container = "";
	var first_shield = ""; 	
	var second_shield = "";
	var first_id = "";
	var second_id = "";
	var match = false;	
	var speed = 1000;
	var sentinel = false;
	var puzzleTime = '0.0';	
	var solvedPairs = new Array(); 	
	var completedContainers = new Array();
	var start = new Date().getTime(),
	elapsed = '0.0';

/* ----------------------------------------------------------------------
	The logic to setup the divs with a random matrix of images

-------------------------------------------------------------------------*/

	$(document).ready(function(){
    
	//alert("Document Ready!");	
		var i = 0;
	//create the array of pictures
		var mypix = new Array();
		
	//  fill it with image file names
		while (mypix.length < 10) {
		
	// set the min and max for the random assignment of values (image names are numeric)	
			var min = 0;
			var max = 9;
	// and the formula is:
			var random = Math.floor(Math.random() * (max - min + 1)) + min;
	// see if the randomly chosen number is in the array
			var redundant = mypix.indexOf("00" + random + ".jpg");
	// if it's not
			if (redundant === -1) {
	// insert the jpeg filename into the array
				mypix[i] = "00" + random + ".jpg";
	// increment the loop
				i++;
			}
		}

	// reset our variable
		i = 0;
		
	// generate an empty array to hole the pairs of images
		var pairs = new Array();
		
	// start a loop 
		while (i < 20 && pairs.length <= 20) {
	// need random  
			var min = 0;
			var max = 9;
	// and the formula is:
			var random = Math.floor(Math.random() * (max - min + 1)) + min;
	// set a variable to be the current item for insertion ingot the array	
			var found = mypix[random];
	// initially we won't find it in the array, but we need to check
			var inpairs = pairs.indexOf(found);
	// and we need to see if it's there more than once and will need to compare locations
			var twiceinpairs =  pairs.lastIndexOf(found);	
					
			if ((inpairs !== twiceinpairs) &&  twiceinpairs !== -1) {

	// don't do anything with it if it's already in the pairs array twice
			}
			else {
	//add the it to the pairs array & increment
				pairs[i] = found;
				i++;
			}
	// the pairs array is completed when we move outside this array
	// so we can then begin to place the images on the page	
		}
	// reset the variable
		 i = 0;
		 
	//now add the images from the array to the page
		 while (i < pairs.length) {
	//specifically to the divs of the class "pictures"
		 	$('#' + (i+1)).html("<img src='images\/"+ pairs[i] + "' title=\"About\"/>");
	//increment 	
		 	i++;
		 }			 
    });

/* ----------------------------------------------------------------------
	Game play - handles each click, checking for redundant clicks on the same container
	clicks on the same pair. Stores clicked containers throughout the game, stores
	shields in pairs, tests pairs for a match and when there is a match, they are added to
	an array solvedPairs. If the pair does not match, we hide the images behind a shield.

-------------------------------------------------------------------------*/


	// we start with the container and check to see if the container is among the set of 
	// completed containers (containers that were one of a matched pair)
	$('.container').click(function () {
	// set a variable to be the id of the container
		var idOfContainer = $(this).attr('id');
	// call the function that searches the array of completed containers
		if (checkCompletedContainers(idOfContainer)) {
	// if it is not already completed move on to the function for shield management
			manageShields(this);
		}
		else {
	// if it's completed, bail
			return;
		}
	});
	
	function manageShields(container) {
	// check if we even want to consider this a click
		
	// increment the click counter
		updateClicks();
	// get the container id
		var clicked_container = $(container).attr('id');
	// get the id of the shield that was clicked
		var shield_clicked = $(container).find('.shield').attr('id');
	//get the id of the div containing the picture
		var pictures_id = $(container).find(".pictures").attr("id");
	// display the picture by setting the shield display to none
		$("#" + shield_clicked).css( "display", "none" );
		
    // get the source of image for comparing 
		var last_picture_clicked = $(container).find(".pictures").find("img").attr("src");
		
	// first of a new round or first of a pair we check if the variable is currently an empty string
		if (prev_picture_clicked == "") {
	// if it is we set the variable for the picture as the string for the image in the div that was clicked
			prev_picture_clicked = last_picture_clicked;
	// the last container variable needs to be set.		
			last_container = clicked_container;
	// set the id of the div to a variable (outside the score of this function because we'll need it later)			
			first_id = pictures_id;
	// set the id of the shield div to a variable (outside the score of this function because we'll need it later)		
			first_shield = shield_clicked;		
	// set the flag	
			match = false;
	
			return;
		}
	// we will need to check if we have a second click of any pair
		if (prev_picture_clicked != "" && second_id == "") {
	// if so we set variables as we did above for shield and picture
			second_id = pictures_id;
			second_shield = shield_clicked;
	// send to our method for checking hand handling matches and mismatches	
			testformatch (clicked_container, last_picture_clicked);			
		}	
	};
	// this function determines what we will do with the the shields  	
	function testformatch (container, last_picture_clicked) {		
	// check if they have clicked on the same item twice
		if ( prev_picture_clicked === last_picture_clicked && prev_picture_clicked !== "" && last_picture_clicked !== "" && first_shield === second_shield){
	// both shields are the same and we need to reset the css
	// Asynchronous behavior needed: create a function with a new scope that holds on to these variable 
	// long enough to complete the setTimeout function. 	
			(
				function (first_shield, second_shield) {
				setTimeout(function(){$("#" + first_shield).css( "display", "inline" )},speed);	
				setTimeout(function(){$("#" + second_shield).css( "display", "inline" )},speed);	
				}
			)
			(first_shield, second_shield)
	// the user is penalized by having to dismiss the dialog.	
			alert("Clicking the same square won't help!");
	// reset the picture clicked variable 
			resetVariables ();
			consoleVariables();			
		}
		
		else if ( prev_picture_clicked === last_picture_clicked && prev_picture_clicked !== "" && last_picture_clicked !== "") {
		//console.log("A match!");
			
	//set this variable 			
			match = true;
	//	change the css on the variables so that the image remains displayed
			$("#" + first_shield).css( "display", "none" );
			$("#" + second_shield).css( "display", "none" );	
	// 	put these shields into the array		
			solvedPairs.push( first_shield + " " + second_shield);
	//	call the method to update the score
			updateScore();		
	// 	and reset the variables!
			resetVariables ();
	// add the containers to the ones that will be ignored when clicked
			completedContainers.push(last_container);
			completedContainers.push(container);
	//		console.log(completedContainers);
			
	//	once there are ten pairs in the array, we know we are done!	
			if (solvedPairs.length == 10 ) {
			 sentinel = false;
			 alert("Solved!");
			}
		}

		if (!match) {
	//	console.log("Evaluation NO Match");  
			match = false;
			
	// As above: Asynchronous behavior needed: create a function with a new 
	// scope that holds on to these variable 
	// long enough to complete the setTimeout function. 
			(
				function(first_shield, second_shield) {
					setTimeout(function(){$("#" + first_shield).css( "display", "inline" )},speed);	
					setTimeout(function(){$("#" + second_shield).css( "display", "inline" )},speed);	
				}
			)
			(first_shield, second_shield)
			
		//variables will be reset because DON'T we have a match
			resetVariables();
		}
	};
	
	function resetVariables () {
	
	//	console.log("Shown before we clear those variables...");
		consoleVariables();

		prev_picture_clicked = "";
		first_shield = "";
		second_shield = ""; 	
		first_id = "";
		second_id = "";
		match = false;

		console.log("The variables are now...prev picture clicked "		
												+ prev_picture_clicked + " " +
			"first shield " 					+ first_shield + " " +
			"second shield " 					+ second_shield + " " +
			"first id "							+ first_id + " " +
			"second id "						+ second_id + " " +
			"match " 							+  match +
			"last container "					+ last_container);
	};
	
	// use this for debugging - uncomment it 
	function consoleVariables() {
	/*	console.log("The variables are now...clicks" 	+ clicks + " " +
			"prev_picture clicked "						+ prev_picture_clicked + " " +
			"first shield " 							+ first_shield + " " +
			"second shield " 							+ second_shield + " " +
			"first id "									+ first_id + " " +
			"second id "								+ second_id + " " +
			"match " 									+  match);
		console.log( "the length of the solved pairs array is: " + solvedPairs.length);		
	*/

	};
	
	// function to disable clicking for the matched items once each has been revealed	
	function checkCompletedContainers(container_clicked) {
	// set a variable to be the index of locations where the container was found in the array
		var index = completedContainers.indexOf(container_clicked);
	//	console.log("completed containers is " + completedContainers);
		
		if (index > -1) {
			return false;
		}
		else {
			return true;
		}
	};
	
	// updating the click counter
	function updateClicks() {
	
		clicks++;
		var num = clicks / 2;
		var tries = ~~num;	
		$('#tries').replaceWith("<strong id=\"tries\" >" + tries + "</strong>");
		
		if (clicks == 1 ) {
			sentinel = true;			
		}
	};
	// updating the score of matches
	function updateScore() {
		
		if (solvedPairs.length > 0) {
			var matches = solvedPairs.length;
			$('#matches').replaceWith("<strong id=\"matches\" >" + matches + "</strong>");
		
		}
		else {

			$('#matches').replaceWith("<strong id=\"matches\" >0</strong>");
		}
		
	};
	// updating the speed value for how long the images are displayed
	$("#speed").change(function() {
	
		speed = $(this).val();
	
	});
	
	// setting the interval for the timer
	setInterval(function() {
	// once we have a click, the sentinel has been set and we begin timing
		if (sentinel) {
	// in this case -start is necessary to get a meaningful number
		var time = new Date().getTime() - start;
	//  variable elapsed and the divisors
		elapsed = Math.floor(time / 100) / 10;
	// keeping the time within tenths of seconds
		if(Math.round(elapsed) == elapsed) { elapsed += '.0'; }
	// setting the scoped var
		puzzleTime = elapsed;
	// writing it to the page 
		$('#ptime').replaceWith("<strong id=\"ptime\" >" + puzzleTime + "</strong>");
		}
	}, 100);
	
	// a button for a new game
	$('#restart').click(function () {
	
		location.reload();
	});
    
    $(window).load(function () {

		// alert("Window Loaded!");	
		// who knows, maybe I'll use this if I extend this game somehow.
		
	});
	

});