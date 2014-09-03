Jimmy
=====

The year is 2048. A world-wide corporations and concerns increased their power and slowly took over the control of the world order. Militantly anti-globalists try to stop the system by any possible means, including a new world war. Last resistence, the only peaceful anti-system movement built a powerful device that protects world from a possible nuclear destruction located in a secret base. Jimmy, the last of them, is the only one who can stop an incoming nuclear catastrophe. But something went wrong and he needs your help. Invite your friends and [help Jimmy save the world](http://helpjim.me/save/the/world).

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