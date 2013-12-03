$(function() {
	
	$(document).ready(function(){
    
		//alert("Document Ready!");	
		var i = 0;
		
		var mypix = new Array();
		
		// create an array and fill it with image file names
		while (mypix.length < 10) {
			// set the min and max for the random		
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
		
		console.log(mypix);
		 
    });
    
    $(window).load(function () {

		alert("Window Loaded!");
		

	});
	

});