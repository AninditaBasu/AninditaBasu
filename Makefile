publish:
	git pull
	./download-external-docs.sh
	rm -rf /var/tmp/html
	rm -rf /var/tmp/doctrees
	cd docs; \
	  make html
	rsync --recursive --delete /var/tmp/html/ /var/www/html/
	rsync --recursive --delete /var/tmp/doctrees/ /var/www/doctrees/

