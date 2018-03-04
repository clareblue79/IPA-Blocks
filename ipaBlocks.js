/* IPA Blocks Application
*
* Fall 2016
* CS 320: Tangible User Interfaces - Final Project
* 
* Authors: Clare Frances Lee, Mai Li Goodman, Yuna Hahn, 
*
*/


var root = $.app.mainLayer();

var background = createBackground("Media/background.png");


root.addChild(background);

// Add a stylesheet to the app
$.app.addStyleFilename("styles.css");


// Create widget functions for text, image, video, book, and flow------------------------------
function createText(x,y,text) {
   var t = new MultiWidgets.TextWidget();
    t.setText(text);
    root.addChild(t);
    //t.setFixed();
    t.raiseToTop();
    t.setLocation(x,y)

    return t;
}//end createText

function createImage(x, y, sizeX, sizeY, image) {
	var img = new MultiWidgets.ImageWidget();
	img.addCSSClass("ImageW");

	if (img.load(image)) {

    	img.setLocation(x,y);
    	img.setWidth(sizeX);
	    img.setHeight(sizeY);
	}
	root.addChild(img);
	img.raiseToTop();

	return img;

}//end createImage

// Creates a VideoWidget and adds it to the application's main layer
function createVideo(x, y, width, height, video, fixed) {
	var vid = new MultiWidgets.VideoWidget();
	vid.setWidth(width);
	vid.setHeight(height);

	if (vid.load(video)) {
		vid.addOperator(new MultiWidgets.StayInsideParentOperator());
		vid.setLocation(x, y);
		vid.setAudioEnabled(true);
		vid.setPreviewPos(5, true); //sets preview image to 3 seond spot in video

		root.addChild(vid);
		vid.raiseToTop();
	}

	if (fixed == true){
		vid.setFixed();
	}
	return vid;
}//end create video

// Creates and returns a customized widget for the application background
function createBackground (background) {
	var w = new MultiWidgets.JavaScriptWidget();

	w.setWidth(1920);
	w.setHeight(1080);
	w.setFixed();
	w.setAutoRaiseToTop(false);

	w.image = new MultiWidgets.ImageWidget();

	if (w.image.load(background)) {
	    w.image.setWidth(w.width());
	    w.image.setHeight(w.height());
    	w.image.setFixed();
    	w.image.setAutoRaiseToTop(false);
    	w.addChild(w.image);
	   	w.image.raiseToTop();
	}
	

	return w;
} //end createBackgroound


function createFlow(x,y,size, path) {
	var flow = new MultiWidgets.ItemFlowWidget();
	flow.setLocation(x,y); 
	if (imgItem.load(path)) {
		imgItem.addOperator(new MultiWidgets.StayInsideParentOperator());
   	 	imgItem.resizeToFit(new Nimble.SizeF(size,size));
		flow.addItem(imgItem);

		}
	root.addChild(flow);
	flow.raiseToTop();

	return flow;

} //end createflow

function createBook(x,y,size, path) {
	var flow = new MultiWidgets.ItemFlowWidget();
	flow.setLocation(x,y); // readjust later
		if (imgItem.load(path)) {
		imgItem.addOperator(new MultiWidgets.StayInsideParentOperator());
   	 	imgItem.resizeToFit(new Nimble.SizeF(size,size));

		flow.addItem(imgItem);
		}
	root.addChild(flow);
	flow.raiseToTop();

	return flow;
	
}//end createBook

//end of widget functions--------------------------------------------------------------------------


function stringToWord(letters){
	//creates list of letters into a string
	var w = ""; 
	for (i = 0; i < letters.length; i++){
		w += letters[i];
	}		
	return w; 
} //end stringToWord()

function displayWord(word){
	//dipslays the video of the word based on the argument

	var vidname = "Media/words" + word + "/" + word + ".mov";
	var w = createVideo(600, 100, 480, 360, vidname, true);

	return w; 
}


function getLetter(markerNum){
    //return the IPA letter that each marker, the blocks, represent
    var dict = {
        1: "a", //
        2: "θ", //th 
        3: "p", //for testing
        4: "k",
        5: "eɪ",
        6: "eɪ",
        7: "θ",
        8: "b",
        9: "ə",
        10: "p",
        11: "ə",
        12: "k",
        20: "l",
        21: "b",
        22: "a",
        24: "l"

    };
    
    return dict[markerNum];
}//end getLetter

function getPhonetic(i){
	var dict = {
		1: "keɪk",
		2: "leɪk", 
		3: "beɪk", 
		4: "θə", 
		5: "kap", 
		6: "kab",
		7: "pal",
		8: "pak", 
		9: "bal",
		10: "keɪl",
		11: "lab", 
		12: "keɪp",
		13: "lap",
		14: "bak", 
		15: "peɪl",
		16: "bək",
		17: "lək",
		18: "pək",
		19: "pəb",
		20: "bakpak",
		21:"baθ", 
		22:"kəp"
	};

	return dict[i];

}

quiz();

var letters = [];

function quiz(){
	var wordSelection = createText(450, 200, "Select word to quiz yourself");
	wordSelection.setFixed();
	wordSelection.addCSSClass("wordSelect");

	var wordList = ["cake", "lake", "bake", "the", "cap", "cab", "pal", "pack", "ball",
	"kale", "lab", "cape", "back", "pale", "buck", "luck", "puck", "pub", "backpack",
	"bath", "cup"];

	var cake = createText(550, 280, wordList[0]);
	cake.setFixed();
	cake.addCSSClass("quizWords");

	cake.onSingleTap(function(){
		var sub = createImage(1400, 750, 200, 120, "Media/submitbutton.png");
		sub.setFixed();
		var w = createVideo(960, 370, 480, 360, "Media/words/cake/cake.mov", true);
		var b1 = block1();
		var b2 = block2();
		var b3 = block3();

		/*var restart = createText(550, 450, "RESTART");

		console.log("RESTARTING....");
		restart.setFixed();
		restart.addCSSClass(submissionM2);

		restart.onSingleTap(function(){
			console.log("Restart button tapped")
			root.removeChild(w);
			root.removeChild(b1);
			root.removeChild(b2);
			root.removeChild(b3);
			root.removeChild(sub);	

		});*/

		//touch the sumbit button to see if the letters are spelled correct


		sub.onSingleTap(function(){	
		var submission = stringToWord(letters);

		if (submission == getPhonetic(1)){
			var correct = "The Submission is: " + submission + ", which is correct!"
			var m = createText(900, 500, correct);
			m.addCSSClass("submissionM");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);

			letters = [];

			root.removeChild(w);
			root.removeChild(b1);
			root.removeChild(b2);
			root.removeChild(b3);
			root.removeChild(sub);	

		} else {

			var incorrect = submission + " is incorrect. Try again."
			var m = createText(1000, 950, incorrect);
			m.addCSSClass("submissionM2");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);


		}
	    });

	});




	var lake = createText(655, 280, wordList[1]);
	lake.setFixed();
	lake.addCSSClass("quizWords");
	lake.onSingleTap(function(){
		var sub = createImage(1400, 750, 200, 120, "Media/submitbutton.png");
		sub.setFixed();
		var w = createVideo(960, 370, 480, 360, "Media/words/lake/lake.mov", true);
		var b1 = block1();
		var b2 = block2();
		var b3 = block3();

		//touch the sumbit button to see if the letters are spelled correct


		sub.onSingleTap(function(){	
		var submission = stringToWord(letters);

		if (submission == getPhonetic(2)){
			var correct = "The Submission is: " + submission + ", which is correct!"
			var m = createText(900, 500, correct);
			m.addCSSClass("submissionM");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);

			letters = [];

			root.removeChild(w);
			root.removeChild(b1);
			root.removeChild(b2);
			root.removeChild(b3);
			root.removeChild(sub);	

		} else {

			var incorrect = submission + " is incorrect. Try again."
			var m = createText(1000, 950, incorrect);
			m.addCSSClass("submissionM2");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);


		}
	    });

	});

	var bake = createText(760, 280, wordList[2]);
	bake.setFixed();
	bake.addCSSClass("quizWords");
	bake.onSingleTap(function(){
		var sub = createImage(1400, 750, 200, 120, "Media/submitbutton.png");
		sub.setFixed();
		var w = createVideo(960, 370, 480, 360, "Media/words/bake/bake.mov", true);
		var b1 = block1();
		var b2 = block2();
		var b3 = block3();

		//touch the sumbit button to see if the letters are spelled correct


		sub.onSingleTap(function(){	
		var submission = stringToWord(letters);

		if (submission == getPhonetic(3)){
			var correct = "The Submission is: " + submission + ", which is correct!"
			var m = createText(900, 500, correct);
			m.addCSSClass("submissionM");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);

			letters = [];

			root.removeChild(w);
			root.removeChild(b1);
			root.removeChild(b2);
			root.removeChild(b3);
			root.removeChild(sub);	

		} else {

			var incorrect = submission + " is incorrect. Try again."
			var m = createText(1000, 950, incorrect);
			m.addCSSClass("submissionM2");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);


		}
	    });

	});

	var the = createText(865, 280, wordList[3]);
	the.setFixed();
	the.addCSSClass("quizWords");
	the.onSingleTap(function(){
		var sub = createImage(1400, 750, 200, 120, "Media/submitbutton.png");
		sub.setFixed();
		var w = createVideo(960, 370, 480, 360, "Media/words/the/the.mov", true);
		var b2 = block1();
		var b3 = block2();

		//touch the sumbit button to see if the letters are spelled correct


		sub.onSingleTap(function(){	
		var submission = stringToWord(letters);

		if (submission == getPhonetic(4)){
			var correct = "The Submission is: " + submission + ", which is correct!"
			var m = createText(900, 500, correct);
			m.addCSSClass("submissionM");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);

			letters = [];

			root.removeChild(w);
			root.removeChild(b2);
			root.removeChild(b3);
			root.removeChild(sub);	

		} else {

			var incorrect = submission + " is incorrect. Try again."
			var m = createText(1000, 950, incorrect);
			m.addCSSClass("submissionM2");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);


		}
	    });

	});

	var cap = createText(970, 280, wordList[4]);
	cap.setFixed();
	cap.addCSSClass("quizWords");
	cap.onSingleTap(function(){
		var sub = createImage(1400, 750, 200, 120, "Media/submitbutton.png");
		sub.setFixed();
		var w = createVideo(960, 370, 480, 360, "Media/words/cap/cap.mov", true);
		var b1 = block1();
		var b2 = block2();
		var b3 = block3();

		//touch the sumbit button to see if the letters are spelled correct


		sub.onSingleTap(function(){	
		var submission = stringToWord(letters);

		if (submission == getPhonetic(5)){
			var correct = "The Submission is: " + submission + ", which is correct!"
			var m = createText(900, 500, correct);
			m.addCSSClass("submissionM");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);

			letters = [];

			root.removeChild(w);
			root.removeChild(b1);
			root.removeChild(b2);
			root.removeChild(b3);
			root.removeChild(sub);	

		} else {

			var incorrect = submission + " is incorrect. Try again."
			var m = createText(1000, 950, incorrect);
			m.addCSSClass("submissionM2");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);


		}
	    });

	});

	var cab = createText(1075, 280, wordList[5]);
	cab.setFixed();
	cab.addCSSClass("quizWords");
	cab.onSingleTap(function(){
		var sub = createImage(1400, 750, 200, 120, "Media/submitbutton.png");
		sub.setFixed();
		var w = createVideo(960, 370, 480, 360, "Media/words/cab/cab.mov", true);
		var b1 = block1();
		var b2 = block2();
		var b3 = block3();

		//touch the sumbit button to see if the letters are spelled correct


		sub.onSingleTap(function(){	
		var submission = stringToWord(letters);

		if (submission == getPhonetic(6)){
			var correct = "The Submission is: " + submission + ", which is correct!"
			var m = createText(900, 500, correct);
			m.addCSSClass("submissionM");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);

			letters = [];

			root.removeChild(w);
			root.removeChild(b1);
			root.removeChild(b2);
			root.removeChild(b3);
			root.removeChild(sub);	

		} else {

			var incorrect = submission + " is incorrect. Try again."
			var m = createText(1000, 950, incorrect);
			m.addCSSClass("submissionM2");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);


		}
	    });

	});


	var pal = createText(1180, 280, wordList[6]);
	pal.setFixed();
	pal.addCSSClass("quizWords");
	pal.onSingleTap(function(){
		var sub = createImage(1400, 750, 200, 120, "Media/submitbutton.png");
		sub.setFixed();
		var w = createVideo(960, 370, 480, 360, "Media/words/pal/pal.mov", true);
		var b1 = block1();
		var b2 = block2();
		var b3 = block3();

		//touch the sumbit button to see if the letters are spelled correct


		sub.onSingleTap(function(){	
		var submission = stringToWord(letters);

		if (submission == getPhonetic(7)){
			var correct = "The Submission is: " + submission + ", which is correct!"
			var m = createText(900, 500, correct);
			m.addCSSClass("submissionM");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);

			letters = [];

			root.removeChild(w);
			root.removeChild(b1);
			root.removeChild(b2);
			root.removeChild(b3);
			root.removeChild(sub);	

		} else {

			var incorrect = submission + " is incorrect. Try again."
			var m = createText(1000, 950, incorrect);
			m.addCSSClass("submissionM2");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);


		}
	    });

	});

	var pack = createText(1285, 280, wordList[7]);
	pack.setFixed();
	pack.addCSSClass("quizWords");
		pal.onSingleTap(function(){
		var sub = createImage(1400, 750, 200, 120, "Media/submitbutton.png");
		sub.setFixed();
		var w = createVideo(960, 370, 480, 360, "Media/words/pack/pack.mov", true);
		var b1 = block1();
		var b2 = block2();
		var b3 = block3();

		//touch the sumbit button to see if the letters are spelled correct


		sub.onSingleTap(function(){	
		var submission = stringToWord(letters);

		if (submission == getPhonetic(8)){
			var correct = "The Submission is: " + submission + ", which is correct!"
			var m = createText(900, 500, correct);
			m.addCSSClass("submissionM");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);

			letters = [];

			root.removeChild(w);
			root.removeChild(b1);
			root.removeChild(b2);
			root.removeChild(b3);
			root.removeChild(sub);	

		} else {

			var incorrect = submission + " is incorrect. Try again."
			var m = createText(1000, 950, incorrect);
			m.addCSSClass("submissionM2");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);


		}
	    });

	});

	var ball = createText(1390, 280, wordList[8]);
	ball.setFixed();
	ball.addCSSClass("quizWords");
	ball.onSingleTap(function(){
		var sub = createImage(1400, 750, 200, 120, "Media/submitbutton.png");
		sub.setFixed();
		var w = createVideo(960, 370, 480, 360, "Media/words/ball/ball.mov", true);
		var b1 = block1();
		var b2 = block2();
		var b3 = block3();

		//touch the sumbit button to see if the letters are spelled correct


		sub.onSingleTap(function(){	
		var submission = stringToWord(letters);

		if (submission == getPhonetic(9)){
			var correct = "The Submission is: " + submission + ", which is correct!"
			var m = createText(900, 500, correct);
			m.addCSSClass("submissionM");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);

			letters = [];

			root.removeChild(w);
			root.removeChild(b1);
			root.removeChild(b2);
			root.removeChild(b3);
			root.removeChild(sub);	

		} else {

			var incorrect = submission + " is incorrect. Try again."
			var m = createText(1000, 950, incorrect);
			m.addCSSClass("submissionM2");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);


		}
	    });

	});

	var kale = createText(1495, 280, wordList[9]);
	kale.setFixed();
	kale.addCSSClass("quizWords");
	kale.onSingleTap(function(){
		var sub = createImage(1400, 750, 200, 120, "Media/submitbutton.png");
		sub.setFixed();
		var w = createVideo(960, 370, 480, 360, "Media/words/kale/kale.mov", true);
		var b1 = block1();
		var b2 = block2();
		var b3 = block3();

		//touch the sumbit button to see if the letters are spelled correct


		sub.onSingleTap(function(){	
		var submission = stringToWord(letters);

		if (submission == getPhonetic(10)){
			var correct = "The Submission is: " + submission + ", which is correct!"
			var m = createText(900, 500, correct);
			m.addCSSClass("submissionM");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);

			letters = [];

			root.removeChild(w);
			root.removeChild(b1);
			root.removeChild(b2);
			root.removeChild(b3);
			root.removeChild(sub);	

		} else {

			var incorrect = submission + " is incorrect. Try again."
			var m = createText(1000, 950, incorrect);
			m.addCSSClass("submissionM2");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);


		}
	    });

	});

	var lab = createText(1600, 280, wordList[10]);
	lab.setFixed();
	lab.addCSSClass("quizWords");
	lab.onSingleTap(function(){
		var sub = createImage(1400, 750, 200, 120, "Media/submitbutton.png");
		sub.setFixed();
		var w = createVideo(960, 370, 480, 360, "Media/words/lab/lab.mov", true);
		var b1 = block1();
		var b2 = block2();
		var b3 = block3();

		//touch the sumbit button to see if the letters are spelled correct


		sub.onSingleTap(function(){	
		var submission = stringToWord(letters);

		if (submission == getPhonetic(11)){
			var correct = "The Submission is: " + submission + ", which is correct!"
			var m = createText(900, 500, correct);
			m.addCSSClass("submissionM");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);

			letters = [];

			root.removeChild(w);
			root.removeChild(b1);
			root.removeChild(b2);
			root.removeChild(b3);
			root.removeChild(sub);	

		} else {

			var incorrect = submission + " is incorrect. Try again."
			var m = createText(1000, 950, incorrect);
			m.addCSSClass("submissionM2");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);


		}
	    });

	});

	var cape = createText(1705, 280, wordList[11]);
	cape.setFixed();
	cape.addCSSClass("quizWords");
	cape.onSingleTap(function(){
		var sub = createImage(1400, 750, 200, 120, "Media/submitbutton.png");
		sub.setFixed();
		var w = createVideo(960, 370, 480, 360, "Media/words/cape/cape.mov", true);
		var b1 = block1();
		var b2 = block2();
		var b3 = block3();

		//touch the sumbit button to see if the letters are spelled correct


		sub.onSingleTap(function(){	
		var submission = stringToWord(letters);

		if (submission == getPhonetic(12)){
			var correct = "The Submission is: " + submission + ", which is correct!"
			var m = createText(900, 500, correct);
			m.addCSSClass("submissionM");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);

			letters = [];

			root.removeChild(w);
			root.removeChild(b1);
			root.removeChild(b2);
			root.removeChild(b3);
			root.removeChild(sub);	

		} else {

			var incorrect = submission + " is incorrect. Try again."
			var m = createText(1000, 950, incorrect);
			m.addCSSClass("submissionM2");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);


		}
	    });

	});

	var back = createText(550, 330, wordList[12]);
	back.setFixed();
	back.addCSSClass("quizWords");
		pal.onSingleTap(function(){
		var sub = createImage(1400, 750, 200, 120, "Media/submitbutton.png");
		sub.setFixed();
		var w = createVideo(960, 370, 480, 360, "Media/words/back/back.mov", true);
		var b1 = block1();
		var b2 = block2();
		var b3 = block3();

		//touch the sumbit button to see if the letters are spelled correct


		sub.onSingleTap(function(){	
		var submission = stringToWord(letters);

		if (submission == getPhonetic(14)){
			var correct = "The Submission is: " + submission + ", which is correct!"
			var m = createText(900, 500, correct);
			m.addCSSClass("submissionM");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);

			letters = [];

			root.removeChild(w);
			root.removeChild(b1);
			root.removeChild(b2);
			root.removeChild(b3);
			root.removeChild(sub);	

		} else {

			var incorrect = submission + " is incorrect. Try again."
			var m = createText(1000, 950, incorrect);
			m.addCSSClass("submissionM2");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);


		}
	    });

	});

	var pale = createText(655, 330, wordList[13]);
	pale.setFixed();
	pale.addCSSClass("quizWords");
	pale.onSingleTap(function(){
		var sub = createImage(1400, 750, 200, 120, "Media/submitbutton.png");
		sub.setFixed();
		var w = createVideo(960, 370, 480, 360, "Media/words/pale/pale.mov", true);
		var b1 = block1();
		var b2 = block2();
		var b3 = block3();

		//touch the sumbit button to see if the letters are spelled correct


		sub.onSingleTap(function(){	
		var submission = stringToWord(letters);

		if (submission == getPhonetic(15)){
			var correct = "The Submission is: " + submission + ", which is correct!"
			var m = createText(900, 500, correct);
			m.addCSSClass("submissionM");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);

			letters = [];

			root.removeChild(w);
			root.removeChild(b1);
			root.removeChild(b2);
			root.removeChild(b3);
			root.removeChild(sub);	

		} else {

			var incorrect = submission + " is incorrect. Try again."
			var m = createText(1000, 950, incorrect);
			m.addCSSClass("submissionM2");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);


		}
	    });

	});

	var buck = createText(760, 330, wordList[14]);
	buck.setFixed();
	buck.addCSSClass("quizWords");
	buck.onSingleTap(function(){
		var sub = createImage(1400, 750, 200, 120, "Media/submitbutton.png");
		sub.setFixed();
		var w = createVideo(960, 370, 480, 360, "Media/words/buck/buck.mov", true);
		var b1 = block1();
		var b2 = block2();
		var b3 = block3();

		//touch the sumbit button to see if the letters are spelled correct


		sub.onSingleTap(function(){	
		var submission = stringToWord(letters);

		if (submission == getPhonetic(16)){
			var correct = "The Submission is: " + submission + ", which is correct!"
			var m = createText(900, 500, correct);
			m.addCSSClass("submissionM");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);

			letters = [];

			root.removeChild(w);
			root.removeChild(b1);
			root.removeChild(b2);
			root.removeChild(b3);
			root.removeChild(sub);	

		} else {

			var incorrect = submission + " is incorrect. Try again."
			var m = createText(1000, 950, incorrect);
			m.addCSSClass("submissionM2");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);


		}
	    });

	});

	var luck = createText(865, 330, wordList[15]);
	luck.setFixed();
	luck.addCSSClass("quizWords");
	luck.onSingleTap(function(){
		var sub = createImage(1400, 750, 200, 120, "Media/submitbutton.png");
		sub.setFixed();
		var w = createVideo(960, 370, 480, 360, "Media/words/luck/luck.mov", true);
		var b1 = block1();
		var b2 = block2();
		var b3 = block3();

		//touch the sumbit button to see if the letters are spelled correct


		sub.onSingleTap(function(){	
		var submission = stringToWord(letters);

		if (submission == getPhonetic(17)){
			var correct = "The Submission is: " + submission + ", which is correct!"
			var m = createText(900, 500, correct);
			m.addCSSClass("submissionM");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);

			letters = [];

			root.removeChild(w);
			root.removeChild(b1);
			root.removeChild(b2);
			root.removeChild(b3);
			root.removeChild(sub);	

		} else {

			var incorrect = submission + " is incorrect. Try again."
			var m = createText(1000, 950, incorrect);
			m.addCSSClass("submissionM2");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);


		}
	    });

	});

	var puck = createText(970, 330, wordList[16]);
	puck.setFixed();
	puck.addCSSClass("quizWords");
	puck.onSingleTap(function(){
		var sub = createImage(1400, 750, 200, 120, "Media/submitbutton.png");
		sub.setFixed();
		var w = createVideo(960, 370, 480, 360, "Media/words/puck/puck.mov", true);
		var b1 = block1();
		var b2 = block2();
		var b3 = block3();

		//touch the sumbit button to see if the letters are spelled correct


		sub.onSingleTap(function(){	
		var submission = stringToWord(letters);

		if (submission == getPhonetic(18)){
			var correct = "The Submission is: " + submission + ", which is correct!"
			var m = createText(900, 500, correct);
			m.addCSSClass("submissionM");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);

			letters = [];

			root.removeChild(w);
			root.removeChild(b1);
			root.removeChild(b2);
			root.removeChild(b3);
			root.removeChild(sub);	

		} else {

			var incorrect = submission + " is incorrect. Try again."
			var m = createText(1000, 950, incorrect);
			m.addCSSClass("submissionM2");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);


		}
	    });

	});

	var pub = createText(1075, 330, wordList[17]);
	pub.setFixed();
	pub.addCSSClass("quizWords");
	pub.onSingleTap(function(){
		var sub = createImage(1400, 750, 200, 120, "Media/submitbutton.png");
		sub.setFixed();
		var w = createVideo(960, 370, 480, 360, "Media/words/pub/pub.mov", true);
		var b1 = block1();
		var b2 = block2();
		var b3 = block3();

		//touch the sumbit button to see if the letters are spelled correct


		sub.onSingleTap(function(){	
		var submission = stringToWord(letters);

		if (submission == getPhonetic(19)){
			var correct = "The Submission is: " + submission + ", which is correct!"
			var m = createText(900, 500, correct);
			m.addCSSClass("submissionM");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);

			letters = [];

			root.removeChild(w);
			root.removeChild(b1);
			root.removeChild(b2);
			root.removeChild(b3);
			root.removeChild(sub);	

		} else {

			var incorrect = submission + " is incorrect. Try again."
			var m = createText(1000, 950, incorrect);
			m.addCSSClass("submissionM2");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);


		}
	    });

	});

	var backpack = createText(1180, 330, wordList[18]);
	backpack.setFixed();
	backpack.addCSSClass("quizWord2");
	backpack.onSingleTap(function(){
		var sub = createImage(1630, 750, 200, 120, "Media/submitbutton.png");
		sub.setFixed();
		var w = createVideo(960, 370, 480, 360, "Media/words/backpack/backpack.mov", true);
		var b1 = block1();
		var b2 = block2();
		var b3 = block3();
		var b4 = block4();
		var b5 = block5();
		var b6 = block6();

		//touch the sumbit button to see if the letters are spelled correct


		sub.onSingleTap(function(){	
		var submission = stringToWord(letters);

		if (submission == getPhonetic(20)){
			var correct = "The Submission is: " + submission + ", which is correct!"
			var m = createText(900, 500, correct);
			m.addCSSClass("submissionM");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);

			letters = [];

			root.removeChild(w);
			root.removeChild(b1);
			root.removeChild(b2);
			root.removeChild(b3);
			root.removeChild(b4);
			root.removeChild(b5);
			root.removeChild(b6);
			root.removeChild(sub);	

		} else {

			var incorrect = submission + " is incorrect. Try again."
			var m = createText(1000, 950, incorrect);
			m.addCSSClass("submissionM2");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);


		}
	    });

	});

	var bath = createText(1301, 330, wordList[19]);
	bath.setFixed();
	bath.addCSSClass("quizWords");
	bath.onSingleTap(function(){
		var sub = createImage(1400, 750, 200, 120, "Media/submitbutton.png");
		sub.setFixed();
		var w = createVideo(960, 370, 480, 360, "Media/words/bath/bath.mov", true);
		var b1 = block1();
		var b2 = block2();
		var b3 = block3();

		//touch the sumbit button to see if the letters are spelled correct


		sub.onSingleTap(function(){	
		var submission = stringToWord(letters);

		if (submission == getPhonetic(21)){
			var correct = "The Submission is: " + submission + ", which is correct!"
			var m = createText(900, 500, correct);
			m.addCSSClass("submissionM");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);

			letters = [];

			root.removeChild(w);
			root.removeChild(b1);
			root.removeChild(b2);
			root.removeChild(b3);
			root.removeChild(sub);	

		} else {

			var incorrect = submission + " is incorrect. Try again."
			var m = createText(1000, 950, incorrect);
			m.addCSSClass("submissionM2");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);


		}
	    });

	});

	var cup = createText(1412, 330, wordList[20]);
	cup.setFixed();
	cup.addCSSClass("quizWords");
	cup.onSingleTap(function(){
		var sub = createImage(1400, 750, 200, 120, "Media/submitbutton.png");
		sub.setFixed();
		var w = createVideo(960, 370, 480, 360, "Media/words/cup/cup.mov", true);
		var b1 = block1();
		var b2 = block2();
		var b3 = block3();

		//touch the sumbit button to see if the letters are spelled correct


		sub.onSingleTap(function(){	
		var submission = stringToWord(letters);

		if (submission == getPhonetic(22)){
			var correct = "The Submission is: " + submission + ", which is correct!"
			var m = createText(900, 500, correct);
			m.addCSSClass("submissionM");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);

			letters = [];

			root.removeChild(w);
			root.removeChild(b1);
			root.removeChild(b2);
			root.removeChild(b3);
			root.removeChild(sub);	

		} else {

			var incorrect = submission + " is incorrect. Try again."
			var m = createText(1000, 950, incorrect);
			m.addCSSClass("submissionM2");
			m.setFixed();
			setTimeout(function(){root.removeChild(m)}, 2000);


		}
	    });

	});


	



	
}




var practiceMessage = createText(100, 350, "Tap your letter in the box to hear the sound");
practiceMessage.setFixed();

practice();

function practice() {
	//When the user taps the letter block on the marker, the video of the letter 
	//sound will play

	console.log("Function called....")
	var markerSensor = new MultiWidgets.JavaScriptWidget();
	markerSensor.setLocation(200,470);
	markerSensor.setHeight(100);
	markerSensor.setWidth(100);
	markerSensor.setFixed();
	markerSensor.setBackgroundColor(0,0,100,0.1);

	markerSensor.onMarkerDown(function(id_as_string) {
		var idAsInt = parseInt(id_as_string);
		var gm = $.app.grabManager();
		var marker = gm.findMarker(idAsInt);
		if(marker.code()== 1) 
		{
        	vid1 = createVideo(120, 600, 240, 180, "Media/letters/vowels/a.mov", true); 
        	setTimeout(function(){root.removeChild(vid1)}, 3500);
        	vid1.onSingleTap(function(){root.removeChild(vid1);});
        }

        if(marker.code() == 2){
        	vid1 = createVideo(100, 600, 240, 180, "Media/letters/consonants/th.mov", true); 
        	setTimeout(function(){root.removeChild(vid1)}, 3500);
        	vid1.onSingleTap(function(){root.removeChild(vid1);});
        }

        if(marker.code() == 3){
        	vid1 = createVideo(100, 600, 240, 180, "Media/letters/consonants/p.mov", true); 
        	setTimeout(function(){root.removeChild(vid1)}, 3500);
        	vid1.onSingleTap(function(){root.removeChild(vid1);});
        }

        if(marker.code() == 4){
        	vid1 = createVideo(100, 600, 240, 180, "Media/letters/consonants/k.mov", true); 
        	setTimeout(function(){root.removeChild(vid1)}, 3500);
        	vid1.onSingleTap(function(){root.removeChild(vid1);});
        }

        if(marker.code() == 5){
        	vid1 = createVideo(100, 600, 240, 180, "Media/letters/vowels/ei.mov", true); 
        	setTimeout(function(){root.removeChild(vid1)}, 3500);
        	vid1.onSingleTap(function(){root.removeChild(vid1);});
        }

        if(marker.code() == 6){
        	vid1 = createVideo(100, 600, 240, 180, "Media/letters/vowels/ei.mov", true); 
        	setTimeout(function(){root.removeChild(vid1)}, 3500);
        	vid1.onSingleTap(function(){root.removeChild(vid1);});
        }

        if(marker.code() == 7){
        	vid1 = createVideo(100, 600, 240, 180, "Media/letters/consonants/th.mov", true); 
        	setTimeout(function(){root.removeChild(vid1)}, 3500);
        	vid1.onSingleTap(function(){root.removeChild(vid1);});
        }

        if(marker.code() == 8){
        	vid1 = createVideo(100, 600, 240, 180, "Media/letters/consonants/b.mov", true); 
        	setTimeout(function(){root.removeChild(vid1)}, 3500);
        	vid1.onSingleTap(function(){root.removeChild(vid1);});
        }

        if(marker.code() == 9){
        	vid1 = createVideo(100, 600, 240, 180, "Media/letters/vowels/e.mov", true); 
        	setTimeout(function(){root.removeChild(vid1)}, 3500);
        	vid1.onSingleTap(function(){root.removeChild(vid1);});
        }

        if(marker.code() == 10){
        	vid1 = createVideo(100, 600, 240, 180, "Media/letters/consonants/p.mov", true); 
        	setTimeout(function(){root.removeChild(vid1)}, 3500);
        	vid1.onSingleTap(function(){root.removeChild(vid1);});
        }

        if(marker.code() == 11){
        	vid1 = createVideo(100, 600, 240, 180, "Media/letters/vowels/e.mov", true); 
        	setTimeout(function(){root.removeChild(vid1)}, 3500);
        	vid1.onSingleTap(function(){root.removeChild(vid1);});
        }

        if(marker.code() == 12){
        	vid1 = createVideo(100, 600, 240, 180, "Media/letters/consonants/k.mov", true); 
        	setTimeout(function(){root.removeChild(vid1)}, 3500);
        	vid1.onSingleTap(function(){root.removeChild(vid1);});
        }

        if(marker.code() == 20){
        	vid1 = createVideo(100, 600, 240, 180, "Media/letters/consonants/l.mov", true); 
        	setTimeout(function(){root.removeChild(vid1)}, 3500);
        	vid1.onSingleTap(function(){root.removeChild(vid1);});
        }

        if(marker.code() == 21){
        	vid1 = createVideo(100, 600, 240, 180, "Media/letters/consonants/b.mov", true); 
        	setTimeout(function(){root.removeChild(vid1)}, 3500);
        	vid1.onSingleTap(function(){root.removeChild(vid1);});
        }

        if(marker.code() == 22){
        	vid1 = createVideo(100, 600, 240, 180, "Media/letters/vowels/a.mov", true); 
        	setTimeout(function(){root.removeChild(vid1)}, 3500);
        	vid1.onSingleTap(function(){root.removeChild(vid1);});
        }

        if(marker.code() == 24){
        	vid1 = createVideo(100, 600, 240, 180, "Media/letters/consonants/l.mov", true); 
        	setTimeout(function(){root.removeChild(vid1)}, 3500);
        	vid1.onSingleTap(function(){root.removeChild(vid1);});
        }

            
    });
	root.addChild(markerSensor);
	markerSensor.raiseToTop();
	console.log("marker sensor added...")
} //end of practice function


function block1() {
	//second block 
	var markerSensor = new MultiWidgets.JavaScriptWidget();
	markerSensor.setLocation(950,750);
	markerSensor.setHeight(100);
	markerSensor.setWidth(100);
	markerSensor.setFixed();
	markerSensor.setBackgroundColor(100,0,0,0.3);

	markerSensor.onMarkerDown(function(id_as_string) {
		var idAsInt = parseInt(id_as_string);
		var gm = $.app.grabManager();
		var marker = gm.findMarker(idAsInt);
		if(marker.code()== 1) // winebottle key
		{
        	letters[0] = getLetter(1)
        	
        }

        if(marker.code()== 2) // winebottle key
		{
        	letters[0] = getLetter(2)

        }

        if(marker.code()== 3) // winebottle key
		{
        	letters[0] = getLetter(3)
        	

        }

        if(marker.code()== 4) // winebottle key
		{
        	letters[0] = getLetter(4)
        	
        }

        if(marker.code()== 5) // winebottle key
		{
        	letters[0] = getLetter(5)
        }

        if(marker.code()== 6) // winebottle key
		{
        	letters[0] = getLetter(6)

        }

        if(marker.code()== 7) // winebottle key
		{
        	letters[0] = getLetter(7)

        }

        if(marker.code()== 8) // winebottle key
		{
        	letters[0] = getLetter(8)

        }

        if(marker.code()== 9) // winebottle key
		{
        	letters[0] = getLetter(9)

        }

        if(marker.code()== 10) // winebottle key
		{
        	letters[0] = getLetter(10)

        }

        if(marker.code()== 11) // winebottle key
		{
        	letters[0] = getLetter(11)

        }

        if(marker.code()== 12) // winebottle key
		{
        	letters[0] = getLetter(12)

        }

        if(marker.code()== 20) // winebottle key
		{
        	letters[0] = getLetter(20)

        }

        if(marker.code()== 21) // winebottle key
		{
        	letters[0] = getLetter(21)

        }

        if(marker.code()== 22) // winebottle key
		{
        	letters[0] = getLetter(22)
        }

        if(marker.code()== 24) // winebottle key
		{
        	letters[0] = getLetter(24)
        }


            
    });
	root.addChild(markerSensor);
	markerSensor.raiseToTop();
	return markerSensor;
}

function block2() {
	//second block 
	var markerSensor = new MultiWidgets.JavaScriptWidget();
	markerSensor.setLocation(1055,750);
	markerSensor.setHeight(100);
	markerSensor.setWidth(100);
	markerSensor.setFixed();
	markerSensor.setBackgroundColor(100,0,0,0.3);

	markerSensor.onMarkerDown(function(id_as_string) {
		var idAsInt = parseInt(id_as_string);
		var gm = $.app.grabManager();
		var marker = gm.findMarker(idAsInt);
		if(marker.code()== 1) // winebottle key
		{
        	letters[1] = getLetter(1)
        	
        }

        if(marker.code()== 2) // winebottle key
		{
        	letters[1] = getLetter(2)

        }

        if(marker.code()== 3) // winebottle key
		{
        	letters[1] = getLetter(3)
        	

        }

        if(marker.code()== 4) // winebottle key
		{
        	letters[1] = getLetter(4)
        	
        }

        if(marker.code()== 5) // winebottle key
		{
        	letters[1] = getLetter(5)
        }

        if(marker.code()== 6) // winebottle key
		{
        	letters[1] = getLetter(6)
        	

        }

        if(marker.code()== 7) // winebottle key
		{
        	letters[1] = getLetter(7)
        	

        }

        if(marker.code()== 8) // winebottle key
		{
        	letters[1] = getLetter(8)

        }

        if(marker.code()== 9) // winebottle key
		{
        	letters[1] = getLetter(9)
        	

        }

        if(marker.code()== 10) // winebottle key
		{
        	letters[1] = getLetter(10)

        }

        if(marker.code()== 11) // winebottle key
		{
        	letters[1] = getLetter(11)

        }

        if(marker.code()== 12) // winebottle key
		{
        	letters[1] = getLetter(12)

        }

        if(marker.code()== 20) // winebottle key
		{
        	letters[1] = getLetter(20)

        }

        if(marker.code()== 21) // winebottle key
		{
        	letters[1] = getLetter(21)

        }

        if(marker.code()== 22) // winebottle key
		{
        	letters[1] = getLetter(22)
        }

        if(marker.code()== 24) // winebottle key
		{
        	letters[1] = getLetter(24)
        }
            
    });
	root.addChild(markerSensor);
	markerSensor.raiseToTop();
	return markerSensor;
}

function block3() {
	//second block 
	var markerSensor = new MultiWidgets.JavaScriptWidget();
	markerSensor.setLocation(1160,750);
	markerSensor.setHeight(100);
	markerSensor.setWidth(100);
	markerSensor.setFixed();
	markerSensor.setBackgroundColor(100,0,0,0.3);

	markerSensor.onMarkerDown(function(id_as_string) {
		var idAsInt = parseInt(id_as_string);
		var gm = $.app.grabManager();
		var marker = gm.findMarker(idAsInt);
		if(marker.code()== 1) 
		{
        	letters[2] = getLetter(1)
        	
        }

        if(marker.code()== 2) 
		{
        	letters[2] = getLetter(2)

        }

        if(marker.code()== 3) 
		{
        	letters[2] = getLetter(3)
        	

        }

        if(marker.code()== 4) {
        	letters[2] = getLetter(4)
        }
        	

        if(marker.code()== 5) 
		{
        	letters[2] = getLetter(5)
        }

        if(marker.code()== 6) 
		{
        	letters[2] = getLetter(6)
        	

        }

        if(marker.code()== 7) 
		{
        	letters[2] = getLetter(7)
        	

        }

        if(marker.code()== 8) // winebottle key
		{
        	letters[2] = getLetter(8)

        }

        if(marker.code()== 9) // winebottle key
		{
        	letters[2] = getLetter(9)
        	

        }

        if(marker.code()== 10) // winebottle key
		{
        	letters[2] = getLetter(10)

        }

        if(marker.code()== 11) // winebottle key
		{
        	letters[2] = getLetter(11)

        }

        if(marker.code()== 12) // winebottle key
		{
        	letters[2] = getLetter(12)

        }

        if(marker.code()== 20) // winebottle key
		{
        	letters[2] = getLetter(20)

        }

        if(marker.code()== 21) // winebottle key
		{
        	letters[2] = getLetter(21)

        }

        if(marker.code()== 22) // winebottle key
		{
        	letters[2] = getLetter(22)
        }

        if(marker.code()== 24) // winebottle key
		{
        	letters[2] = getLetter(24)
        }
            
    });
	root.addChild(markerSensor);
	markerSensor.raiseToTop();
	return markerSensor;
}

function block4() {
	//second block 
	var markerSensor = new MultiWidgets.JavaScriptWidget();
	markerSensor.setLocation(1265,750);
	markerSensor.setHeight(100);
	markerSensor.setWidth(100);
	markerSensor.setFixed();
	markerSensor.setBackgroundColor(100,0,0,0.3);

	markerSensor.onMarkerDown(function(id_as_string) {
		var idAsInt = parseInt(id_as_string);
		var gm = $.app.grabManager();
		var marker = gm.findMarker(idAsInt);
		if(marker.code()== 1) // winebottle key
		{
        	letters[3] = getLetter(1)
        	
        }

        if(marker.code()== 2) // winebottle key
		{
        	letters[3] = getLetter(2)

        }

        if(marker.code()== 3) // winebottle key
		{
        	letters[3] = getLetter(3)
        	

        }

        if(marker.code()== 4) // winebottle key
		{
        	letters[3] = getLetter(4)
        	
        }

        if(marker.code()== 5) // winebottle key
		{
        	letters[3] = getLetter(5)
        }

        if(marker.code()== 6) // winebottle key
		{
        	letters[3] = getLetter(6)
        	

        }

        if(marker.code()== 7) // winebottle key
		{
        	letters[3] = getLetter(7)
        	

        }

        if(marker.code()== 8) // winebottle key
		{
        	letters[3] = getLetter(8)

        }

        if(marker.code()== 9) // winebottle key
		{
        	letters[3] = getLetter(9)
        	

        }

        if(marker.code()== 10) // winebottle key
		{
        	letters[3] = getLetter(10)

        }

        if(marker.code()== 11) // winebottle key
		{
        	letters[3] = getLetter(11)

        }

        if(marker.code()== 12) // winebottle key
		{
        	letters[3] = getLetter(12)

        }

        if(marker.code()== 20) // winebottle key
		{
        	letters[3] = getLetter(20)

        }

        if(marker.code()== 21) // winebottle key
		{
        	letters[3] = getLetter(21)

        }

        if(marker.code()== 22) // winebottle key
		{
        	letters[3] = getLetter(22)
        }

        if(marker.code()== 24) // winebottle key
		{
        	letters[3] = getLetter(24)
        }
            
    });
	root.addChild(markerSensor);
	markerSensor.raiseToTop();
	return markerSensor;
}


function block5() {
	//second block 
	var markerSensor = new MultiWidgets.JavaScriptWidget();
	markerSensor.setLocation(1370,750);
	markerSensor.setHeight(100);
	markerSensor.setWidth(100);
	markerSensor.setFixed();
	markerSensor.setBackgroundColor(100,0,0,0.3);

	markerSensor.onMarkerDown(function(id_as_string) {
		var idAsInt = parseInt(id_as_string);
		var gm = $.app.grabManager();
		var marker = gm.findMarker(idAsInt);
		if(marker.code()== 1) // winebottle key
		{
        	letters[4] = getLetter(1)
        	
        }

        if(marker.code()== 2) // winebottle key
		{
        	letters[4] = getLetter(2)

        }

        if(marker.code()== 3) // winebottle key
		{
        	letters[4] = getLetter(3)
        	

        }

        if(marker.code()== 4) // winebottle key
		{
        	letters[4] = getLetter(4)
        	
        }

        if(marker.code()== 5) // winebottle key
		{
        	letters[4] = getLetter(5)
        }

        if(marker.code()== 6) // winebottle key
		{
        	letters[4] = getLetter(6)
        	

        }

        if(marker.code()== 7) // winebottle key
		{
        	letters[4] = getLetter(7)
        	

        }

        if(marker.code()== 8) // winebottle key
		{
        	letters[4] = getLetter(8)

        }

        if(marker.code()== 9) // winebottle key
		{
        	letters[4] = getLetter(9)
        	

        }

        if(marker.code()== 10) // winebottle key
		{
        	letters[4] = getLetter(10)

        }

        if(marker.code()== 11) // winebottle key
		{
        	letters[4] = getLetter(11)

        }

        if(marker.code()== 12) // winebottle key
		{
        	letters[4] = getLetter(12)

        }

        if(marker.code()== 20) // winebottle key
		{
        	letters[4] = getLetter(20)

        }

        if(marker.code()== 21) // winebottle key
		{
        	letters[4] = getLetter(21)

        }

        if(marker.code()== 22) // winebottle key
		{
        	letters[4] = getLetter(22)
        }

        if(marker.code()== 24) // winebottle key
		{
        	letters[4] = getLetter(24)
        }
            
    });
	root.addChild(markerSensor);
	markerSensor.raiseToTop();
	return markerSensor;
}

function block6() {
	//second block 
	var markerSensor = new MultiWidgets.JavaScriptWidget();
	markerSensor.setLocation(1475,750);
	markerSensor.setHeight(100);
	markerSensor.setWidth(100);
	markerSensor.setFixed();
	markerSensor.setBackgroundColor(100,0,0,0.3);

	markerSensor.onMarkerDown(function(id_as_string) {
		var idAsInt = parseInt(id_as_string);
		var gm = $.app.grabManager();
		var marker = gm.findMarker(idAsInt);
		if(marker.code()== 1) // winebottle key
		{
        	letters[5] = getLetter(1)
        	
        }

        if(marker.code()== 2) // winebottle key
		{
        	letters[5] = getLetter(2)

        }

        if(marker.code()== 3) // winebottle key
		{
        	letters[5] = getLetter(3)
        	

        }

        if(marker.code()== 4) // winebottle key
		{
        	letters[5] = getLetter(4)
        	
        }

        if(marker.code()== 5) // winebottle key
		{
        	letters[5] = getLetter(5)
        }

        if(marker.code()== 6) // winebottle key
		{
        	letters[5] = getLetter(6)
        	

        }

        if(marker.code()== 7) // winebottle key
		{
        	letters[5] = getLetter(7)
        	

        }

        if(marker.code()== 8) // winebottle key
		{
        	letters[5] = getLetter(8)

        }

        if(marker.code()== 9) // winebottle key
		{
        	letters[5] = getLetter(9)
        	

        }

        if(marker.code()== 10) // winebottle key
		{
        	letters[5] = getLetter(10)

        }

        if(marker.code()== 11) // winebottle key
		{
        	letters[5] = getLetter(11)

        }

        if(marker.code()== 12) // winebottle key
		{
        	letters[5] = getLetter(12)

        }

        if(marker.code()== 20) // winebottle key
		{
        	letters[5] = getLetter(20)

        }

        if(marker.code()== 21) // winebottle key
		{
        	letters[5] = getLetter(21)

        }

        if(marker.code()== 22) // winebottle key
		{
        	letters[5] = getLetter(22)
        }

        if(marker.code()== 24) // winebottle key
		{
        	letters[5] = getLetter(24)
        }
            
    });
	root.addChild(markerSensor);
	markerSensor.raiseToTop();
	return markerSensor;
}

//submit();

/*function submit(word){
	//touch the sumbit button to see if the letters are spelled correctly
	var sub = createImage(1400, 750, 200, 120, "Media/submitbutton.png");
	sub.setFixed();
	
	sub.onSingleTap(function(){
		var message = "Letters: " + letters;
		
		var submission = stringToWord(letters);

		if (submission == getPhonetic(word)){
			var correct = "The Submission is: " + submission + ", which is correct!"
			createText(1200, 800, correct);

			wordVid = null;//for testing
			

		} else {

			var incorrect = submission + " is incorrect. Try again."
			createText(100, 800, incorrect);

		}
		createText(1200, 600, message);
		console.log(message);




	});
}   */

//markertesting(); a testing function that checks the marker's functionality

/*function markertesting() {
	//second block 
	var markerSensor = new MultiWidgets.JavaScriptWidget();
	markerSensor.setLocation(920,600);
	markerSensor.setHeight(100);
	markerSensor.setWidth(100);
	markerSensor.setFixed();
	markerSensor.setBackgroundColor(100,0,0,0.5);

	markerSensor.onMarkerDown(function(id_as_string) {
		var idAsInt = parseInt(id_as_string);
		var gm = $.app.grabManager();
		var marker = gm.findMarker(idAsInt);
		if(marker.code()== 1) // winebottle key
		{
        	console.log("Marker 1 is working");
        	var correct = "Marker 1 is working";
			createText(1200, 800, correct );
        }

        if(marker.code() == 2){
        	console.log("Marker 2 is working");
        	var correct = "Marker 2 is working";
			createText(1200, 800, correct );
        }

        if(marker.code() == 3){
        	console.log("Marker 3 is working");
        	var correct = "Marker 3 is working";
			createText(1200, 800, correct );
        }

        if(marker.code() == 4){
        	console.log("Marker 4 is working");
        	var correct = "Marker 4 is working";
			createText(1200, 800, correct );
        }

        if(marker.code() == 5){
        	console.log("Marker 5 is working");
        	var correct = "Marker 5 is working";
			createText(1200, 800, correct );
        }

        if(marker.code() == 6){
        	console.log("Marker 6 is working");
        	var correct = "Marker 6 is working";
			createText(1200, 800, correct );
        }

        if(marker.code() == 7){
        	console.log("Marker 7 is working");
        	var correct = "Marker 7 is working";
			createText(1200, 800, correct );
        }

        if(marker.code() == 8){
        	console.log("Marker 8 is working");
        	var correct = "Marker 8 is working";
			createText(1200, 800, correct );
        }

        if(marker.code() == 9){
        	console.log("Marker 9 is working");
        	var correct = "Marker 9 is working";
			createText(1200, 800, correct );
        }

        if(marker.code() == 10){
        	console.log("Marker 10 is working");
        	var correct = "Marker 10 is working";
			createText(1200, 800, correct );
        }

        if(marker.code() == 11){
        	console.log("Marker 11 is working");
        	var correct = "Marker 11 is working";
			createText(1200, 800, correct );
        }


        if(marker.code() == 12){
        	console.log("Marker 12 is working");
        	var correct = "Marker 12 is working";
			createText(1200, 800, correct );
        }

        if(marker.code() == 21){
        	console.log("Marker 21 is working");
        	var correct = "Marker 21 is working";
			createText(1200, 800, correct );
        }

        if(marker.code() == 22){
        	console.log("Marker 22 is working");
        	var correct = "Marker 22 is working";
			createText(1200, 800, correct );
        }

        if(marker.code() == 20){
        	console.log("Marker 20 is working");
        	var correct = "Marker 20 is working";
			createText(1200, 800, correct );
        }

        if(marker.code() == 24){
        	console.log("Marker 24 is working");
        	var correct = "Marker 24 is working";
			createText(1200, 800, correct );ge
        }
            
    });
	root.addChild(markerSensor);
	markerSensor.raiseToTop();
} */

//This function simulates a language selection page

practice();

function selectLanguage(){
	var language = createImage(0, 0, 1920, 1080,"Media/language.png");
	root.addChild(language);
	language.raiseToTop();
	language.setFixed();
	language.onSingleTap(function(){
	root.removeChild(language);
});

}

selectLanguage();