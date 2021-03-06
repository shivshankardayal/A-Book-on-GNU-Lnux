var work = 1;
var name_c = window.location.hostname + '-publican';
var num_days = 7;
var name_cp = window.location.hostname + '-publican-current_page';
var name_menu = window.location.hostname + '-publican-menu';
var style = 1;
var toc_path = '';
site_title = 'Documentation';

function setCookie(name, value, expires, path, domain, secure) { 
	var curCookie = name + "=" + value + 
		((expires) ? ";expires=" + expires.toGMTString() : "") + 
		((path) ? ";path=" + path : "");
// + 
//		((domain) ? ";domain=" + domain : "") + 
//		((secure) ? ";secure" : ""); 

	document.cookie = curCookie; 
}

function addID(id) {
	var current_val = "";
	var expDate = new Date();
	expDate.setDate(expDate.getDate() + num_days);

	if(document.cookie) {
		var cookies = document.cookie.split(/ *; */);
		for(var i=0; i < cookies.length; i++) {
			var current_c = cookies[i].split("=");
			if(current_c[0] == name_c) {
				if(typeof(current_c[1]) !== 'undefined') {
					current_val = current_c[1];
				}
				break;
			}
		}
	}

	if(id != 'test_nocookie') {
		setCookie(name_cp, id, expDate, '/', false, false);
	}

// try to avoid having duplicate id's in the list
	if(current_val == id) {
		return;
	}

	if(current_val.match("," + id + ",")) {
		return;
	}

	var rg = new RegExp("^" + id + ",");
	if(current_val.match(rg)) {
		return;
	}

	rg = new RegExp("," + id + "\$");
	if(current_val.match(rg)) {
		return;
	}

	if(current_val) {
		current_val += "," + id;
	} else {
		current_val = id;
	}

	setCookie(name_c, current_val, expDate, '/', false, false);
}

function removeID(id) {
	var current_val = "";

	if(document.cookie) {
		var cookies = document.cookie.split(/ *; */);
		for(var i=0; i < cookies.length; i++) {
			var current_c = cookies[i].split("=");
			if(current_c[0] == name_c) {
				current_val = current_c[1];
				break;
			}
		}
	}


	if(current_val == id) {
		current_val = "";
	}

	if(current_val.match("," + id + ",") != -1) {
		current_val = current_val.replace("," + id + ",", ",");
	}

	var rg = new RegExp("^" + id + ",");
	if(current_val.match(rg) != -1) {
		current_val = current_val.replace(rg, "");
	}

	rg = new RegExp("," + id + "\$");
	if(current_val.match(rg) != -1) {
		current_val = current_val.replace(rg, "");
	}

	var expDate = new Date();
	expDate.setDate(expDate.getDate() + num_days);
	setCookie(name_c, current_val, expDate, '/', false, false);
}

// TODO: Should really removeID all ID
function clearCookie(id) {
	// TODO: split and toggle
	var current_val = "";

	if(document.cookie) {
		var cookies = document.cookie.split(/ *; */);
		for(var i=0; i < cookies.length; i++) {
			var current_c = cookies[i].split("=");
			if(current_c[0] == name_c) {
				current_val = current_c[1];
				break;
			}
		}
	}

	var ids = current_val.split(',');
	for(var j = 0; j < ids.length; j++) {
		work = 1;
		toggle("", ids[j]);
	}
	
	work = 1;
	current_val = "";

	var expDate = new Date();
	expDate.setDate(expDate.getDate() + num_days);
	setCookie(name_c, current_val, expDate, '/', false, false);
}

function getCookie() {
	var current_val = "";

	if(document.cookie.length <= 0) { return;}

	var cookies = document.cookie.split(/ *; */);
	for(var i=0; i < cookies.length; i++) {
		var current_c = cookies[i].split("=");
		if(current_c[0] == name_c) {
			if(typeof(current_c[1]) !== 'undefined') {
				current_val = current_c[1];
			}
			break;
		}
		else if(current_c[0] == name_c + '-lang') {
			var lang = current_c[1];
	   		var loc = location.href;
			var rg = new RegExp("/" + lang + "/");
			if(loc.match(rg) == null) {
				location.href="../" + lang + "/toc.html";
			}			
		}
	}

	if(current_val.length <= 0) { return;}

	var ids = current_val.split(",");

	for(var i=0; i < ids.length; i++) {
		var entity = document.getElementById(ids[i]);
		if(entity) {
			var my_class = entity.className;
			var my_parent = entity.parentNode;
			if(my_class.indexOf("hidden") != -1) {
				entity.className = my_class.replace(/hidden/,"visible");
				my_parent.className = my_parent.className.replace(/collapsed/,"expanded");
			}
			entity.className = entity.className.replace(/current/,"");
		}
	}

// Scroll nav iframe to current doc
	if(document.cookie) {
		var cookies = document.cookie.split(/ *; */);
		for(var i=0; i < cookies.length; i++) {
			var current_c = cookies[i].split("=");
			if(current_c[0] == name_cp) {
				current_page = current_c[1];
				var entity = document.getElementById(current_page);
				if(entity) {
					var anchorPos = entity.offsetTop;
					document.body.scrollTop = anchorPos; // IE
					document.documentElement.scrollTop = anchorPos; // FF
					entity.className = entity.className + " current";
				}
				break;
			}
		}

	}
}

function toggle(e, id) {
	if(work) {
		work = 0;
		var entity = document.getElementById(id);
		if(entity) {
			var my_class = entity.className;
			var my_parent = entity.parentNode;
			if(my_class.indexOf("hidden") != -1) {
				entity.className = my_class.replace(/hidden/,"visible");
				my_parent.className = my_parent.className.replace(/collapsed/,"expanded");
				addID(id);
			}
			else if(my_class.indexOf("visible") != -1) {
				entity.className = my_class.replace(/visible/,"hidden");
				my_parent.className = my_parent.className.replace(/expanded/,"collapsed");
				removeID(id);
			}
			else {

			}
		}
	}
}

function expand_menu(id) {
	if(work) {
		work = 0;
		var entity = document.getElementById(id);
		if(entity) {
			var my_class = entity.className;
			var my_parent = entity.parentNode;
			if(my_class.indexOf("hidden") != -1) {
				entity.className = my_class.replace(/hidden/,"visible");
				my_parent.className = my_parent.className.replace(/collapsed/,"expanded");
				addID(id);
			}
		}
	}
}

function retract_menu(id) {
	if(work) {
		work = 0;
		var entity = document.getElementById(id);
		if(entity) {
			var my_class = entity.className;
			var my_parent = entity.parentNode;
			if(my_class.indexOf("visible") != -1) {
				entity.className = my_class.replace(/visible/,"hidden");
				my_parent.className = my_parent.className.replace(/expanded/,"collapsed");
				removeID(id);
			}
		}
	}
}

function loadToc() {
	var my_select = document.getElementById('langselect');
	if (my_select.selectedIndex > 0) {
		var expDate = new Date();
		expDate.setDate(expDate.getDate() + num_days);
		setCookie(name_c + '-lang', my_select.options[my_select.selectedIndex].value, expDate, '/', false, false);	    
		location.href="../" + my_select.options[my_select.selectedIndex].value + "/toc.html";
//		parent.frames.main.location.replace("../" + my_select.options[my_select.selectedIndex].value + "/index.html");
	}
}

function checkCookie() {
	var found = false;
	var testCookie = 'test_nocookie';

	addID(testCookie);

	if(document.cookie) {
		var cookies = document.cookie.split(/ *; */);
		for(var i=0; i < cookies.length; i++) {
			var current_c = cookies[i].split("=");
			if(current_c[0] == name_c) {
				var ids = current_c[1].split(',');
				for( var j=0; j < ids.length; j++) {
					if(ids[j] == testCookie) {
						found = true;
						break;
					}
				}
				break;
			}
		}
	}

	if (found) {
		removeID(testCookie);
	} else {
		var entity = document.getElementById('nocookie');
		var my_class = entity.className;
		entity.className = my_class.replace(/hidden/, "nocookie");
//		alert("DEBUG: The Navigation Menu requires cookies to be enabled to function correctly.");
	}
}

function hideNoJS() {
	var entity = document.getElementById('nojs');
	entity.className = 'hidden';
}

function checkMenu() {
	if(document.cookie) {
		var cookies = document.cookie.split(/ *; */);
		for(var i=0; i < cookies.length; i++) {
			var current_c = cookies[i].split("=");
			if(current_c[0] == name_menu) {
				var menu_status = current_c[1];
				if(menu_status == "closed") {
					hideMenu();				}
				break;
			}
		}

	}
}

function hideMenu() {
	parent.document.body.className = parent.document.body.className = "toc_embeded notoc";
	var entity = parent.document.getElementById('tocframe');
	if(entity) {
		entity.className = "notoc";
	}

	document.body.className = "toc_embeded notocnav";

	entity = document.getElementById('closemenu');
	if(entity) {
		entity.className = entity.className.replace(/visible/,"hidden");
	}
	entity = document.getElementById('outer');
	if(entity) {
		entity.className = entity.className.replace(/visible/,"hidden");
	}
	entity = document.getElementById('openmenu');
	if(entity) {
		entity.className = entity.className.replace(/hidden/,"visible");
	}

	var expDate = new Date();
	expDate.setDate(expDate.getDate() + num_days);
	setCookie(name_menu, 'closed', expDate, '/', false, false);
}

function showMenu() {
	parent.document.body.className = parent.document.body.className = "toc_embeded";
	var entity = parent.document.getElementById('tocframe');
	if(entity) {
		entity.className = "toc";
	}

	document.body.className = "tocnav";

	entity = document.getElementById('closemenu');
	if(entity) {
		entity.className = entity.className.replace(/hidden/,"visible");
	}
	entity = document.getElementById('outer');
	if(entity) {
		entity.className = entity.className.replace(/hidden/,"visible");
	}
	entity = document.getElementById('openmenu');
	if(entity) {
		entity.className = entity.className.replace(/visible/,"hidden");
	}
	var expDate = new Date();
	expDate.setDate(expDate.getDate() + num_days);
	setCookie(name_menu, 'open', expDate, '/', false, false);
}

function loadMenu(){
	$.ajax({
		url:toc_path + '/toc.html',
		type:'HEAD',
		success:
			function(){
				style = 1;
				addID(current_product);
				addID(current_product + '.' + current_version);
				addID(current_product + '.' + current_version + '.books');
				addID(current_product + '.' + current_version + '.' + current_book);
				var html =  '<div id="tocdiv"><iframe id="tocframe" class="toc" src="' + toc_path + '/toc.html">This is an iframe, to view it upgrade your browser or enable iframe display.</iframe></div>';
				$("#navigation").html(html);
			},
		error:
			function(){
				style = 2;
                                var prod_label;
				if(current_product != 'Products') {
					prod_label = labels[current_product]["label"];
				} else {
					prod_label = labels["trans_strings"]["Products"];
				}
                                
				var html = '<div id="menu">';
				html = 	html +	'<div id="lang_menu" class="breadcrumb"><a href="' + toc_path + '/index.html">' + labels["site"]["title"] + '</a></div>';
				html = 	html +	'<div id="product_menu" class="breadcrumb" onmouseover="work=1; expand_menu(\'product_menu_list\');" onmouseout="work=1; retract_menu(\'product_menu_list\');">' + prod_label + '</div>';
				if(typeof current_version != "undefined" && current_version != '') {
					html = 	html +	'<div id="version_menu" class="breadcrumb" onmouseover="work=1; expand_menu(\'version_menu_list\');" onmouseout="work=1; retract_menu(\'version_menu_list\');">' + current_version + '</div>';
					if(typeof current_book != "undefined" && current_book != '') {
						html = 	html +	'<div id="book_menu" class="breadcrumb" onmouseover="work=1; expand_menu(\'book_menu_list\');" onmouseout="work=1; retract_menu(\'book_menu_list\');">' + current_book + '</div>';
						html = 	html +	'<div id="book_format_menu" onmouseover="work=1; expand_menu(\'book_format_menu_list\');" onmouseout="work=1; retract_menu(\'book_format_menu_list\');"></div>';
						html = 	html +	'<div id="book_lang_menu" onmouseover="work=1; expand_menu(\'book_lang_menu_list\');" onmouseout="work=1; retract_menu(\'book_lang_menu_list\');"></div>';
					}
				}
				html = 	html +	'<div id="search_box"></div>';
				html = 	html +	'</div>';
				$("#navigation").html(html);
				$("#search_box").load(toc_path + "/../search.html");
				$("#product_menu").load(toc_path + "/products_menu.html");
				if(typeof current_product != "undefined" && current_product != '') {
					$("#version_menu").load(toc_path +  '/' + current_product + "/versions_menu.html");
					if(typeof current_version != "undefined" && current_version != '') {
						$("#book_menu").load(toc_path + '/' + current_product + '/' +  current_version + '/' +  "/books_menu.html");
						if(typeof current_book != "undefined" && current_book != '') {
							$("#book_lang_menu").load(toc_path + '/' +  current_product + '/' +  current_version +  '/' + current_book + "/lang_menu.html");
							$("#book_format_menu").load(toc_path + '/' +  current_product + '/' +  current_version +  '/' + current_book + "/format_menu.html");
						}
					}
				}
				$('body').removeClass('toc_embeded');
				$('body').addClass('menu_embeded');
			}
	});
	$(document).ready(function() {
		$("#floatingtoc").load('index.html .toc:eq(0)');
		$("body").click(function(){
			work = 1;
			retract_menu('floatingtoc');
		});
		$(".docnav li.home").click(function(e){
			work = 1;
			toggle(e, 'floatingtoc');
			return false;
		});
	});

}

