/*----------------------------------------------------
		   ________          ____        ____           
		  / ____/ /_  ____ _/ __ \____ _/ __ \____ _    
		 / /   / __ \/ __ `/ /_/ / __ `/ / / / __ `/    
		/ /___/ / / / /_/ / ____/ /_/ / /_/ / /_/ /     
		\_______ /_/\__,_/_/_   \__,_/_____/\__,_/      
		   / __ \___  _____(_)___ _____                 
		  / / / / _ \/ ___/ / __ `/ __ \                
		 / /_/ /  __(__  ) / /_/ / / / /                
		/_____/\___/____/_/\__, /_/ /_/                 
		                  /____/         

	  Charlie Hou, Patrick Kim & Darren Fu 2015
----------------------------------------------------*/


window.addEventListener("load", init, false);

function init(){

	/*Variables & Initialisation*/
	window.popupOpen = false;
	window.links = document.getElementsByClassName('linkText');
	
	for (var i = 0 ; i < links.length; i++){
		links[i].addEventListener("mouseover", linkMouseOver, false);
		links[i].addEventListener("mouseout", linkMouseOut, false);
	}

	/*Event Listeners*/
	window.addEventListener("scroll", offsetParallaxBackgrounds, false);
	window.addEventListener("scroll", highlightCurrentSection, false);
	document.getElementById('echantillonSignButton').addEventListener("click", togglePopup, false);

}

/*Functions*/

	/*Parallax*/

	function offsetParallaxBackgrounds(){
		var parallaxDivs = document.getElementsByClassName('parallax');

		for (var i = 0; i < parallaxDivs.length; i++){
			var viewportPos = parallaxDivs[i].getBoundingClientRect().top;
			var neededOffset = -350 * (viewportPos/window.innerHeight);

			parallaxDivs[i].style.backgroundPosition = "0px " + String(neededOffset) + "px";
		}

	}


	/*Navbar highlighting*/
	function linkMouseOver(event){
		highlightCurrentSection();
		event.target.style.color = '#ff000f';
	}

	function linkMouseOut(event){
		event.target.style.color = 'white';
		highlightCurrentSection();
	}

	function highlightCurrentSection(event){
		window.sections = [];
		window.closestSection = ["", 100000];

		for (var i = 0; i < links.length; i++){
			var sectionID = links[i].getAttribute('href').substring(1);
			sections.push(document.getElementById(sectionID));
		}

		for (var i = 0; i < sections.length; i++){
			if (sections[i].getBoundingClientRect().top < 300 && sections[i].getBoundingClientRect().top < closestSection[1]){
				closestSection = [sections[i].id, Math.abs(sections[i].getBoundingClientRect().top)];
			}
		}

		for (var i = 0; i < links.length; i++){
			links[i].style.color = 'white';
		}

		document.getElementById(closestSection[0] + "Link").style.color = '#ff000f';
	}



	/*Popup Box*/
	function togglePopup(event){
		if (popupOpen){
			hidePopup();
			popupOpen = false;
		}else {
			showPopup();
			popupOpen = true;
		}
	}


	function showPopup(){
		var popup = document.getElementById("popup");
		var screen = document.getElementById("screen");

		screen.style.display = 'block';

		setTimeout(function(){
			screen.style.backgroundColor = 'rgba(0,0,0,0.75)';
			popup.style.top = '50%';
		}, 50);
		
		disableScrolling();

		screen.addEventListener("click", togglePopup, false);
	}

	function hidePopup(){
		var popup = document.getElementById("popup");
		var screen = document.getElementById("screen");
		
		popup.style.top = '-785px';
		screen.style.backgroundColor = 'rgba(0,0,0,0)'
		screen.style.display = 'none';

		enableScrolling();
	}

	function enableScrolling(){
		window.removeEventListener("DOMMouseScroll", scrollOff, false);
	}

	function disableScrolling(){
		window.addEventListener("DOMMouseScroll", scrollOff, false);

	}

	function scrollOff(event){
		event.preventDefault();
	}


/*Smooth Link Scrolling*/
	$(document).ready(function(){
		$('a').click(function(){
    		$('html, body').animate({
		        scrollTop: $( $(this).attr('href') ).offset().top + -60
	    	}, 500);
	    	return false;
		});
		
	})