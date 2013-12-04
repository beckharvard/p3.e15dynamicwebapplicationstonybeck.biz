$(function() {

	var clicks = 0;
	var picture_clicked = "";
	var first_shield = "";	
	var first_id = "";
	var second_id = "";
	var match = false;
	 
    $(window).load(function () {

		// alert("Window Loaded!");
		
	});
	
	$('.container').click(function () {
		// get the id of the shield that was clicked
		var shield_clicked = $(this).find('.shield').attr('id');
		//get the id of the div containing the picture
		var pictures = $(this).find(".pictures").attr("id");
		// display the picture by setting the shield display to none
		$("#" + shield_clicked).css( "display", "none" );	
		
       // for comparing 
		var last_picture_clicked = $(this).find(".pictures").find("img").attr("src");
		
		if (picture_clicked === "") {
		
			picture_clicked = last_picture_clicked;
			
		//	console.log("we set the picture clicked variable to " + picture_clicked);
			
			first_id = pictures;
			
			first_shield = shield_clicked;
			
			console.log("first_id is :" + first_id);
			
			match = false;
		}
		else {
			
			if ( picture_clicked === last_picture_clicked) {
				alert("they matched!");
				
				// reset the variable!
				picture_clicked = "";
				
				match = true;
				$("#" + first_shield).css( "display", "none" );
				$("#" + shield_clicked).css( "display", "none" );	
				
			}
			else if (picture_clicked != "") {
					
					picture_clicked = "";
					console.log("we reset the picture clicked to empty, coz it's the second.");
				//if match variable is set to false set the shield back
					if (!match) {
						match = false;
						setInterval(function(){$("#" + shield_clicked).css( "display", "inline" )},1500);	
						setInterval(function(){$("#" + first_shield).css( "display", "inline" )},1000);	
						//here we need the id of the last shield
						
						
						picture_clicked = "";
					}
					else {
					
					//	$("#" + shield_clicked).css( "display", "none" );	
					//	$("#" + first_shield).css( "display", "none" );
					//	setInterval(function(){$("#" + shield_clicked).delay(1500).css( "display", "inline" )},1000);
						
					}
				
			}	
		}

	});
	
	$('.shield').click(function () {


			clicks++;

		console.log("clicks is " + clicks);
		var num = clicks / 2;
		console.log("num is " + num);
		var score = ~~num;	
		$('#score').replaceWith("<strong>" + score + "</strong>");
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
		 	$('#' + (i+1)).html("<img src='images\\"+ pairs[i] + "' title=\"About\"/>");
		 //increment 	
		 	i++;
		 }			 
    });

});