$(function() {

	var clicks = 0;
	
	var picture_clicked = "";
	
	var first_shield = "";
	
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
		//add the it to the pairs array
				pairs[i] = found;
		// increment i
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
    
    $(window).load(function () {

		// alert("Window Loaded!");
		
	});
	
	$('.container').click(function () {
	
		var container_clicked = $(this).attr('id');
		//picture_clicked = $("#" + container_clicked ).children().attr('id');
		
		//picture_clicked = $(this).next().find("img").attr('src');
		
		var pictures = $(this).find(".pictures").attr("id");
		picture_clicked = $(pictures).attr('src');
		
		console.log("the id of the thing is " + pictures);
	});
	
	$('.shield').click(function () {

		//$(this).detach();
		// move the shield back on the z-index
		//	$(this).css( "z-index", "0" );
		// change the display to none
			$(this).css( "display", "none" );	
		// increment the clicks variable	
			clicks++;
			
	//		var parent_container = this.prev();
			
	//		console.log("the parent container is" + parent_container);
			
			//.find()
			
	//		console.log("Clicks is now " + clicks);
	
		// logic to check for a match
	//	picture_clicked = $();
		
		if (picture_clicked !== "") {
		
			picture_clicked = "foo!";
		} // restore
		else {
			alert("once we click this it should come back");
	//		$(this).css( "display", "inline" );	
		}
			
	});
	
	// we're going to need setTimeout( what_ever_happensnext, 500); or setInterval

});