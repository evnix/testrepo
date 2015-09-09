/*
 
 Assumptions: 
 we assume the text is very long.
 Hence we wont just split/explode the text into words using an inbuilt function.
 Instead, we will go word by word, hence saving memory.
 
 The words may either be separated by a space,tab or a (\n)new line character.
 
 The slash(/) will also be used as a separator for instances such as Male/Female, His/Her
 There may be Exceptions such as: i/o(input/output) r/w(Read/Write) b/w(Black/White) etc.
 
 All words will be lowercased to avoid duplicates.
 
 The special characters :;~`)([]{}!?.,"' will be discarded
 
 Exceptions:
 The words containing dot(.) such as e.g. and i.e. will not be discarded
 The words such as let's , John's etc
 
 
 Limitations:
 Isn't tested for different encodings.
 no consideration for windows(\r\n)
 doesn't work for things like: 'let's go to school'
 All exceptions haven't been covered.
 
 */


/**
 * 
 * @param {type} Input
 * @returns {Concordance}
 */
Concordance = function (Input) {

    this.wordCount = {};
    this.wordExceptions = ["i/o", "r/w", "b/w", "e.g.", "i.e.", "mr.", "dr.", "mrs.", "ms."];
    this.symbolDiscards = ["\\", "?", ":", ";", "(", ")", ",", "\"","!","*"];
    this.printCount = 0;
    this.line = 1;
    this.sortedKeys = [];

    this.consume(Input);
    this.sortKeys();

};

/**
 * 
 * @returns {undefined}
 */
Concordance.prototype.sortKeys = function () {

    var keys = [];

    for (var k in this.wordCount) {

        keys.push(k);

    }

    this.sortedKeys = keys.sort();


}

/**
 * 
 * @param {string} word
 * @returns {undefined}
 */
Concordance.prototype.addWord = function (word) {

    if (word === "")
        return;
    
    if (typeof this.wordCount[word] === 'undefined')
        this.wordCount[word] = {};

    if (typeof this.wordCount[word]["count"] === 'undefined') {

        this.wordCount[word]["count"] = 1;
        
    } else {
        this.wordCount[word]["count"]++;

    }

    if (typeof this.wordCount[word]["lines"] === 'undefined')
        this.wordCount[word]["lines"] = [];

    this.wordCount[word]["lines"].push([this.line]);

};

/**
 * 
 * @param {string} word
 * @returns {undefined}
 */
Concordance.prototype.processWord = function (word) {

    //console.log(word);
    word = word.toLowerCase();

    if (this.wordExceptions.indexOf(word) >= 0) {

        this.addWord(word);

    } else {

        wordlist = word.split("/");


        for (var i = 0; i < wordlist.length; i++) {



            if (wordlist[i].charAt(wordlist[i].length - 1) === ".") {

                wordlist[i] = wordlist[i].replace(".", "");
                this.line++;

            }

            if (wordlist[i].charAt(wordlist[i].length - 1) === "'" && wordlist[i].charAt(0) === "'") {

                wordlist[i] = wordlist[i].replace("'", "");


            }


            this.addWord(wordlist[i]);

        }


    }



};


/**
 * 
 * @param {string} text
 * @returns {undefined}
 */
Concordance.prototype.consume = function (text) {

    var word = "";
    var char = "";

    for (var i = 0; i < text.length; i++) {

        if (text.charAt(i) !== " " && text.charAt(i) !== "\n" && text.charAt(i) !== "\t") {

            char = text.charAt(i);

            if (this.symbolDiscards.indexOf(char) < 0) {

                word += char;

            }
        }
        else {

            this.processWord(word);
            word = "";

        }

    }

    this.processWord(word);


};


/**
 * generate sequence alphabet a,b,c,..z,aa,bb,,cc..zz,aaa,bbb...zzz ...
 * @param {int} num
 * @returns {String}
 */
Concordance.prototype.generateAlphabet = function (num) {

    n = (num + 1) % 26;

    if (n === 0) {


        n = 26;
    }

    var char = String.fromCharCode(96 + n);

    var retWord = char;

    for (var i = 0; i < this.printCount; i++) {

        retWord += char;
    }


    if (n === 26) {

        this.printCount++;

    }
    return retWord;

};

/**
 * Print the result.
 * @returns {undefined}
 */
Concordance.prototype.prettyPrint = function () {

    var len = 30; //amount of spaces for text, rest will be padded with space
    var ordering = "";

    for (var i = 0; i < this.sortedKeys.length; i++) {


        ordering = this.generateAlphabet(i);
        spaces = Math.abs(len - this.sortedKeys[i].length);


        space = Array(spaces - (ordering.length - 1)).join(" ");

        console.log(ordering + ". "
                + this.sortedKeys[i] + space
                + "{" + this.wordCount[this.sortedKeys[i]]["count"] + ":"
                + this.wordCount[this.sortedKeys[i]]["lines"].join(",") + "}");

    }

};
