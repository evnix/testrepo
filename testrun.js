require("./concordance.js");

testInput = "Given an arbitrary text document written in English, write a program that will generate a\n\
concordance, i.e. an alphabetical list of all word occurrences, labeled with word frequencies. \n\
Bonus: label each word with the sentence numbers in which each occurrence appeared.";
			
objConcordance = new Concordance(testInput);
objConcordance.prettyPrint();
