html:
	xsltproc --xinclude --stringparam html.stylesheet "css/bootstrap.css css/style.css" html.xsl gnu.xml
	./domp.py
pdf:
	dblatex gnu.xml
