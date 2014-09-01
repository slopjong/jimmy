Jimmy
=====

Jimmy has to save the world. You can help him [here](http://helpjim.me/save/the/world).

Server configuration
--------------------

Let's assume you have the following apache configuration.

```
<VirtualHost *:80>
	ServerAdmin webmaster@localhost

	DocumentRoot /var/www/some/folder/save

	ServerName helpjim.me
	ServerAlias www.helpjim.me
	Options -Indexes

	<Directory /var/www/some/folder/html>
		Options FollowSymLinks
		AllowOverride None
	</Directory>

	ErrorLog ${APACHE_LOG_DIR}/error.log

	# Possible values include: debug, info, notice, warn, error, crit,
	# alert, emerg.
	LogLevel warn

	CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

The folder `/var/www/some/folder/save` would be your DocumentRoot, the path `/var/www/some/folder` has then to be set in the path variable in the deployment script `bin/deploy.sh`. Open this file in a text editor and set this variable.

It's important to that the last path segment is `save` because the node script will reference it.

Deploy the game
---------------

Execute `bin/deploy.sh`.