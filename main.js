/*

	window.onload()
	
	This function is called when the document loads.

*/

window.onload = function() {
	var html_input = document.getElementById('html');
	var css_input = document.getElementById('css');
	var js_input = document.getElementById('js');
	var output = document.getElementById('output');
	var alt = false;
	
	/*
	
		.title.onclick(ev)
		
		This function is called when any element with the title class is clicked on.
		
		@param ev An event object containing useful information, including the position of the mouse.
	
	*/
	
	[...document.getElementsByClassName('title')].forEach(function(v) {
		v.onclick = function(ev) {
			var activeElements = [...document.getElementsByClassName('active')];
			if(activeElements.length > 0) { activeElements[0].classList.remove('active'); }
			this.parentElement.classList.add('active');
		};
	});
	
	/*
	
		textarea.onkeydown(ev)
		
		This function is called whenever the user presses any key in any textarea element.
		
		@param ev An event object containing useful information, including the ID of the key that was pressed.
	
	*/
	
	[...document.getElementsByTagName('textarea')].forEach(function(v) {
		v.onkeydown = function(ev) {
			if(ev.keyCode === 9) {
				ev.preventDefault();
				var start = this.selectionStart;
				var end = this.selectionEnd;
				this.value = this.value.substring(0, start) + '  ' + this.value.substring(end);
				this.selectionStart = this.selectionEnd = start + 2;
			}
		};
	});
	
	/*
	
		#file_input.onchange(ev)
		
		This function is called when the user uploads a file or multiple files to the input element with an id of "file_input".
		
		@param ev An event object containing useful information, including the file(s) that was/were uploaded.
	
	*/
	
	document.getElementById('file_input').onchange = function(ev) {
		var fr = new FileReader();
		fr.onload = function() {
			var json = JSON.parse(fr.result);
			html_input.value = json.html || '';
			css_input.value = json.css || '';
			js_input.value = json.js || '';
		}
		fr.readAsText(ev.target.files[0]);
	};
	
	/*
	
		window.onkeydown(ev)
		
		This function is called whenever the user presses a key.
		
		@param ev An event object containing useful information, including the ID of the key that was pressed.
	
	*/
	
	window.onkeydown = function(ev) {
		if(ev.keyCode === 18) { alt = true; }
		else if(ev.keyCode === 13 && alt) {
			ev.preventDefault();
			var doc = output.contentDocument || output.contentWindow.document;
			doc.open();
			doc.write(html_input.value);
			doc.body.innerHTML += '<style type=\'text/css\'>' + css_input.value + '</style>';
			doc.body.innerHTML += '<script type=\'text/javascript\'>' + js_input.value + '<\/script>';
			doc.close();
		}
		else if(ev.keyCode === 83 && alt) {
			// https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
			ev.preventDefault();
			var el = document.createElement('a');
			var json = {
				'html':html_input.value,
				'css':css_input.value,
				'js':js_input.value
			};
			el.setAttribute('href', 'data:text/plain;charset=utf-8,' + JSON.stringify(json));
			el.setAttribute('download', 'untitled.json');
			el.style.display = 'none';
			document.body.appendChild(el);
			el.click();
			document.body.removeChild(el);
		}
		else if(ev.keyCode === 79 && alt) {
			ev.preventDefault();
			document.getElementById('file_input').click();
		}
	};
	
	/*
	
		window.onkeydown(ev)
		
		This function is called whenever the user releases a key.
		
		@param ev An event object containing useful information, including the ID of the key that was released.
	
	*/
	
	window.onkeyup = function(ev) {
		if(ev.keyCode === 18) { alt = false; }
	};
};

