####Included:
	concordance.js			The Class File
	testrun.js				File to run.
	this README.txt


####Requirements:

	1. nodejs
	
	Download & Install nodejs: https://nodejs.org/en/download/
	
	make sure the PATH is set properly.
	
	NodeJS Installation Tutorial/Resources:
		[Mac OSX Tutorial](http://coolestguidesontheplanet.com/installing-node-js-on-osx-10-10-yosemite/)
		[Ubuntu Intallation]Tutorial(https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-an-ubuntu-14-04-server)
		[Windows tutorial](http://blog.teamtreehouse.com/install-node-js-npm-windows)
	
	
####Execution:

	- unzip the archive.
	- Open Terminal or Command Prompt
	- cd to the `concordance` directory.
	
	Type the following command:
	
	node testrun.js
	
	The above should execute the program and give the expected output.
	
Amount of Time Spent: 2 hours* (1 hour for the planning & prototype and the rest for fixing bugs and documentation.)


**How it all works:**

The text is intitially iterated character by character.

A space/new_line/tab is used for separating words.

Slash(/) is also used as a separator as we can have words: His/Her, Male/Female etc.

But when separating using a slash(/), we have to take care of exceptions such as "i/o", "r/w", "b/w" etc.

Words are lower cased to avoid duplicates

The special characters :\;~`)([]{}!?.,"'* will be discarded.

 **Exceptions:**
 
	 The words containing dot(.) such as e.g. and i.e. mr. etc, will not be discarded.
	 The words such as let's , John's etc, where a single qoute is used will not be discarded.
 
**Limitations:**
 
 - Isn't tested for different encodings.
 - no consideration for windows(\r\n)
 - doesn't work for complex scenarios like: 'let's go to school'
 - All exceptions haven't been covered(only a few are listed for the test run).
  

