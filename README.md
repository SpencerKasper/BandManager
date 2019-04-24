# Band Manager
To run, from the command line, enter the band-manager directory and run `npm start`.
	
You may have to instal nodejs into the directory if it is your first run.

To run the back end, from the command line, open a second prompt and enter the band-manager-api
directory and run `nodemon`.
	
If you haven't installed nodemon yet, run `npm install -g nodemon`. You also need to make sure you
have node.js installed into this directory as well.  Just follow internet instructions to do that.
You can tell if node.js is installed if the node_modules folder is in the directory.

You also need to start the mongodb server on your computer and put it on `localhost:27017`.
Name the db <strong>band-manager-db</strong>.  To start the mongodb server, just run `mongod`.
	
If there are any errors about installing dependencies while running any of the commands
above, install those depndencies with `npm install`.
