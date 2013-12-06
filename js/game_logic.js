$(function() {

	var clicks = 0;
	var prev_picture_clicked = "";
	var first_shield = ""; 	
	var second_shield = "";
	var first_id = "";
	var second_id = "";
	var match = false;	
	var speed = 1000;
	var sentinel = false;
	var puzzleTime = '0.0';	
	var solvedpairs = new Array(); 	
	var completedContainers = new Array();
	var start = new Date().getTime(),
	elapsed = '0.0';


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
		
       // get the image for comparing 
		var last_picture_clicked = $(container).find(".pictures").find("img").attr("src");
		
	//	console.log("A");  
	//	consoleVariables();
		
		// first of a new round or first of a pair
		if (prev_picture_clicked == "") {
		
			prev_picture_clicked = last_picture_clicked;			
			first_id = pictures_id;		
			first_shield = shield_clicked;			
			match = false;
			
		//	console.log("B");  
		//	consoleVariables();
			return;
		}
	
		if (prev_picture_clicked != "" && second_id == "") {

				second_id = pictures_id;
				second_shield = shield_clicked;
		// send to our method for checking hand handling matches and mismatches	
				testformatch (clicked_container, last_picture_clicked);			
		}	

	};
	
	function testformatch (container, last_picture_clicked) {
		//if match variable is set to false set the shield back in place
		
		// if they have clicked on the same item twice
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
			alert("Dude, you just clicked that twice in a row...now I have work to do clean that up!");
		// reset the picture clicked variable 
			resetVariables ();
			consoleVariables();
			
		}
		
		else if ( prev_picture_clicked === last_picture_clicked && prev_picture_clicked !== "" && last_picture_clicked !== "") {
		//alert("A match!");

			$('#matched').replaceWith("<h4 id=\"matched\" >Matched</h4>");
		//set this variable 			
			match = true;
		//	change the css on the variables so that the image remains displayed
			$("#" + first_shield).css( "display", "none" );
			$("#" + second_shield).css( "display", "none" );	
		// 	put these shields into the array		
			solvedpairs.push( first_shield + " " + second_shield);
		//	call the method to update the score
			updateScore();		
		// 	and reset the variables!
			resetVariables ();
			
			console.log("this pushed " + container);
			completedContainers.push(container);
			console.log(completedContainers);
			
		//	once there are ten pairs in the array, we know we are done!	
			if (solvedpairs.length == 10 ) {
			 sentinel = false;
			 alert("Solved!");
			}
		}

		if (!match) {
		//	console.log("Evaluation NO Match");  
			match = false;
			$('#matched').replaceWith("<h4 id=\"matched\" >Nope!</h4>");
			
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
	
		console.log("Shown before we clear those variables...");
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
			"match " 							+  match);
	
	};
	
	function consoleVariables() {
		// use this for debugging

	/*	console.log("The variables are now...clicks" 	+ clicks + " " +
			"prev_picture clicked "						+ prev_picture_clicked + " " +
			"first shield " 							+ first_shield + " " +
			"second shield " 							+ second_shield + " " +
			"first id "									+ first_id + " " +
			"second id "								+ second_id + " " +
			"match " 									+  match);
				
	*/
	//	console.log( "the length of the solved pairs array is: " + solvedpairs.length);
	};
	
	// still need a function to disable clicking for the matched items once each has been revealed
	
	function checkCompletedContainers(foo) {
	
		console.log("foo is" +foo);
		var index = completedContainers.indexOf(foo);
		console.log("completed containers is " + completedContainers);
		
		if (index > -1) {
			return false;
		}
		else {
			return true;
		}
	};
	
	function updateClicks() {
	
		clicks++;
		var num = clicks / 2;
		var tries = ~~num;	
		$('#tries').replaceWith("<strong id=\"tries\" >" + tries + "</strong>");
		
		if (clicks == 1 ) {
			sentinel = true;			
		}
	};
	
	function updateScore() {
		
		if (solvedpairs.length > 0) {
			var matches = solvedpairs.length;
			$('#matches').replaceWith("<strong id=\"matches\" >" + matches + "</strong>");
		
		}
		else {

			$('#matches').replaceWith("<strong id=\"matches\" >0</strong>");
		}
		
	};
	
	$("#speed").change(function() {
	
		speed = $(this).val();
	
	});

	setInterval(function() {
		
		if (sentinel) {
		var time = new Date().getTime() - start;

		elapsed = Math.floor(time / 100) / 10;
		if(Math.round(elapsed) == elapsed) { elapsed += '.0'; }

		puzzleTime = elapsed;
		$('#ptime').replaceWith("<strong id=\"ptime\" >" + puzzleTime + "</strong>");
		}
	}, 100);
	
	$('#restart').click(function () {
	
		location.reload();
	});

/* ----------------------------------------------------------------------
	The logic to setup the divs with a random matrix of images

-------------------------------------------------------------------------*/

	$(document).ready(function(){
    
		//alert("Document Ready!");	
		var i = 0;
		
		var mypix = new Array();
		
		// create an array and fill it with image file names
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
    
    $(window).load(function () {

		// alert("Window Loaded!");	
		
	});
	

});