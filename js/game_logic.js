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
	
	var solvedpairs = new Array(); 

	$('.container').click(function () {
		// increment the click counter
		updateClicks() 
		// get the id of the shield that was clicked
		var shield_clicked = $(this).find('.shield').attr('id');
		//get the id of the div containing the picture
		var pictures_id = $(this).find(".pictures").attr("id");
		// display the picture by setting the shield display to none
		$("#" + shield_clicked).css( "display", "none" );
		
		console.log("shield clicked is " + shield_clicked);
		console.log("picture id is " + pictures_id);
		
       // get the image for comparing 
		var last_picture_clicked = $(this).find(".pictures").find("img").attr("src");
		
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
				console.log("C");  

				second_id = pictures_id;
				second_shield = shield_clicked;
 
		//		consoleVariables();
				
				testformatch (last_picture_clicked);			
		}	

	});
	
	function testformatch (last_picture_clicked) {
		//if match variable is set to false set the shield back in place
		
				console.log( "comparing: " + prev_picture_clicked + " " + first_shield  + " " + last_picture_clicked  +" "  + second_shield);
		
				if ( prev_picture_clicked === last_picture_clicked && prev_picture_clicked !== "" && last_picture_clicked !== "" && first_shield === second_shield){
				
				//	consoleVariables();
					
					(
						function (first_shield, second_shield) {
						setTimeout(function(){$("#" + first_shield).css( "display", "inline" )},speed);	
						setTimeout(function(){$("#" + second_shield).css( "display", "inline" )},speed);	
						}
					)
					(first_shield, second_shield)
					
					alert("Dude, you just clicked that twice in a row...now I have work to do clean that up!");
					// reset the picture clicked variable 
					resetVariables ();
					consoleVariables();
					
				}
				
				else if ( prev_picture_clicked === last_picture_clicked && prev_picture_clicked !== "" && last_picture_clicked !== "") {
					alert("A match!");
			
			//		console.log("Match");  
			//		consoleVariables();
			
					match = true;
					$("#" + first_shield).css( "display", "none" );
					$("#" + second_shield).css( "display", "none" );	
						
					solvedpairs.push( first_shield + " " + second_shield);
			//		console.log(solvedpairs);
					updateScore();
			
				// reset the variables!
					resetVariables ();
				//	console.log("variables reset because we have a match." );
					
						if (solvedpairs.length == 10 ) {
						 alert("Solved!");
						}
				}
				if (!match) {
				//	console.log("Evaluation NO Match");  
					match = false;
					
					// Asynchronous behavior needed: create a function with a new scope that holds on to these variable 
					// long enough to complete the setTimeout function. 
					(
						function(first_shield, second_shield) {
							setTimeout(function(){$("#" + first_shield).css( "display", "inline" )},speed);	
						//	alert("first shield is " + first_shield);
							setTimeout(function(){$("#" + second_shield).css( "display", "inline" )},speed);	
						}
					)
					(first_shield, second_shield)
					

					// reset the picture clicked variable 
					
					
					//console.log("variables will be reset because DON'T we have a match." );
					resetVariables();

				}
			
		//Pretty sure
	};
	
	// need a function to disable clicking for the matched items once each has been revealed
	
	function resetVariables () {
	
				console.log("Shown before we clear those variables...");
				consoleVariables();
	
				prev_picture_clicked = "";
				first_shield = "";
				second_shield = ""; 	
				first_id = "";
				second_id = "";
				match = false;

				console.log("variables are now...prev picture clicked "		
											+ prev_picture_clicked + " " +
					"first shield " 		+ first_shield + " " +
					"second shield " 		+ second_shield + " " +
					"first id "				+ first_id + " " +
					"second id "			+ second_id + " " +
					"match " 				+  match);
	
	};
	
	function consoleVariables() {
		// use this for debugging

		console.log("The variables are now....clicks "+ clicks + " " +
				"prev_picture clicked "		+ prev_picture_clicked + " " +
				"first shield " 			+ first_shield + " " +
				"second shield " 			+ second_shield + " " +
				"first id "					+ first_id + " " +
				"second id "				+ second_id + " " +
				"match " 					+  match);
	
	};
	
	function updateClicks() {
	
		clicks++;
		var num = clicks / 2;
		var tries = ~~num;	
		$('#tries').replaceWith("<strong id=\"tries\" >" + tries + "</strong>");
	};
	
	function updateScore() {
		
		
		if (solvedpairs.length > 0) {
			var matches = solvedpairs.length;
			$('#matches').replaceWith("<strong id=\"matches\" >" + matches + "</strong>");
			console.log( "the length of the solved pairs array is: " + solvedpairs.length);
		}
		else {

			$('#matches').replaceWith("<strong id=\"matches\" >0</strong>");
		}
	};
	
	$("#speed").change(function() {
	
		speed = $(this).val();
	
	});

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