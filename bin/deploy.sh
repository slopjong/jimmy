#!/bin/bash

# one of your ssh hosts configured in your .ssh/config
server=myserver

# the installation path on the server
docroot=/var/www/mydomain/html

################################################################################

function create_index()
{
    local content="<html><body><a href=\"$1\">$1</a></body></html>"
    ssh "$server" "echo \"$content\" > $docroot/$2/index.html"
}

grunt build

# create the directories if it's the first deployment
ssh "$server" "mkdir -p $docroot/save/the"

# delete previous deployment
ssh "$server" "rm -rf $docroot/save/the/world"
ssh "$server" "rm -rf $docroot/ws"

# new deployment
scp -r dist "$server":"$docroot"/save/the/world
scp -r ws "$server":"$docroot"/..
ssh "$server" "ln -s $docroot/save/the/world $docroot/../app"
ssh "$server" "chown -R www-data:www-data $docroot"

create_index save
create_index the save
create_index world save/the
