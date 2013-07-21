html:
	xsltproc --xinclude html.xsl gnu.xml
	./domp.py
pdf:
	dblatex gnu.xml
