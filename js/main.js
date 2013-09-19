/*
Jesse Read
1309 - VFW
VFW Project 3
2013-09-19
*/

/* Wait until the DOM is ready */
window.addEventListener("DOMContentLoaded", function(){

	// Retrieve element
	function el(x) {
		var element = document.getElementById(x);
		return element;
	}
	
	function createReleaseSelector() {
		var label = document.createElement('label');
		label.setAttribute("for", "releaseType");
		label.innerHTML = "Release Type:";
		el('releaseArtistLi').appendChild(label);
		var select = document.createElement('select');
		select.setAttribute("id", "releaseType");
		var options = ["Album", "Soundtrack", "EP", "Compilation", "DJ Mix", "Single", "Live album", "Remix", "Bootleg", "Interview", "Mixtape", "Guest Appearance", "Composition"];
		for (i = 0; i < options.length; i++) {
			var option = document.createElement('option');
			option.setAttribute("value", options[i]);
			option.innerHTML = options[i];
			select.appendChild(option);
		}
		el('releaseArtistLi').appendChild(select);
	}
	
	function changeFormat() {
		if (el('addEntry').style.display === "none") {
			el('addEntry').style.display = "inline";
			el('displayLink').style.display = "none";
			document.forms[0].style.display = "none";
		} else {
			el('addEntry').style.display = "none";
			el('displayLink').style.display = "inline";			
			el('frame').removeChild(el('entities'));
			document.forms[0].style.display = "block";
		}
	}
	
	function removeAllEntities() {
		if (localStorage.length > 0) {
			localStorage.clear();
			alert('All stored data has been removed.');
		} else {
			alert('There are no entries to be removed.');
		}
		if (document.forms[0].style.display === "none") {
			changeFormat();	
		}
	}
	
	function getReleaseArtistValue() {
		var options = document.forms[0].releaseArtists;
		for (var i = 0; i < options.length; i++) {
			if (options[i].checked) {
				return options[i].value;
			}
		}
	}
	
	function isFavorite() {
		if (el('favorite').checked) {
			return "Yes";
		} else {
			return "No";
		}
	}
	
	function addEntity(){
		var key = Math.floor(Math.random()*20131104);
		var entity = {};
			entity.artistName = ["Album Artist: ", el('artistName').value];
			entity.albumName = ["Album Name: ", el('albumName').value];
			entity.releaseDate = ["Release Date: ", el('releaseDate').value];
			entity.releaseType = ["Release Type: ", el('releaseType').value];
			entity.releaseArtist = ["Release Artists: ", getReleaseArtistValue()];
			entity.songCount = ["Number of songs: ", el('songCount').value];
			entity.opinion = ["Opinion: ", el('opinion').value];
			entity.favorite = ["Favorite: ", isFavorite()];
		localStorage.setItem(key, JSON.stringify(entity))
	}

	function retrieveEntities() {
		changeFormat();
		var listingDiv = document.createElement('div');
		listingDiv.setAttribute("id", "entities");
		var entityList = document.createElement('ul');
		entityList.setAttribute("class", "entityList");
		listingDiv.appendChild(entityList);
		el('frame').appendChild(listingDiv);
		for (i = 0; i < localStorage.length; i++) {
			var entityLi = document.createElement('li');
			entityLi.setAttribute("class", "entityList");
			entityLi.setAttribute("id", "listEntry");
			entityList.appendChild(entityLi);
			var entity = JSON.parse(localStorage.getItem(localStorage.key(i)));
			var entityDetails = document.createElement('ul');
			entityDetails.setAttribute("class", "entityList");
			entityLi.appendChild(entityDetails);
			for (var property in entity) {
				var detailLi = document.createElement('li');
				detailLi.setAttribute("class", "entityList");
				detailLi.innerHTML = entity[property][0] + entity[property][1];
				entityDetails.appendChild(detailLi);
			}
			var editLi = document.createElement('li');
			var editLink = document.createElement('a');
			editLink.innerHTML = "Edit Release Details";
			editLink.key = localStorage.key(i);
			editLink.href = "#";
/* 			editLink.addEventListener('click', editRelease); */
			editLi.appendChild(editLink);
			entityDetails.appendChild(editLi);
			var deleteLi = document.createElement('li');
			var deleteLink = document.createElement('a');
			deleteLink.innerHTML = "Delete Release";
			deleteLink.key = localStorage.key(i);
			deleteLink.href = "#";
/* 			deleteLink.addEventListener('click', deleteRelease); */
			deleteLi.appendChild(deleteLink);
			entityDetails.appendChild(deleteLi);
		}
	}
	
	// Add dropdown menu
	createReleaseSelector();
	
	// Click events
	el('displayLink').addEventListener("click", retrieveEntities);
	el('clearData').addEventListener("click", removeAllEntities);
	el('submit').addEventListener("click", addEntity);
	el('addEntry').addEventListener("click", changeFormat);
	
});