function()
{var rg = /((http:\/\/(www\.)?)?\w+\.[\w-]+(\.[\w-]+)?\/[\w-]+\/([\w-]+)\/).*/;
	var win=window.open(rg.exec(document.location.href)[1]+'cmp/?s=1498929-204557','_blank');
	win.focus();}