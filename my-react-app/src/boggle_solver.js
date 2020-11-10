/**
 * Alexander Weinberg
 * SID: @02876360
 */
/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */
exports.findAllSolutions = function (grid, dictionary) {
    let solutions_Set = new Array();
    let solutions = [];

    if (grid == null || dictionary == null) { //checks of grid or dict is empty
        return solutions;
    }

    for (let i = 0; i < grid.length; i++) {
        if (grid[i].length != grid.length) {
            return solutions;
        }
    }

    convertToLowerCase(grid, dictionary)
    let trie = new Set(dictionary);

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid.length; x++) {
            let visited = new Array(grid.length).fill(false).map(() => new Array(grid.length).fill(false));
            let word = [];//is empty to start
            findWords(word, grid, trie, x, y, visited, solutions_Set);
        }
    }
    solutions = Array.from(solutions_Set);
    return solutions;
}

function findWords(word, grid, trie, y, x, visited, solutions_Set) { //this is the recursive call
    const adjacent_lookup = [[-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1]];

    //given a wor and grid[y][x] and visited[y][x]
    //Base cases:
    // y/x out of bounds
    // it already visited grid [y][x] 

    if (y < 0 || y >= grid.length || x < 0 || x >= grid.length || visited[y][x] == true)
        return;

    //1. append grid [y][x] to the word
    word += grid[y][x]; //word = word + grid


    //2. check if word is a prefix
    if (isPrefix(trie, word)) {
        visited[y][x] = true;

        //2a. check if prefix is marked as visited
        //2b. test if word is valid

        if (isWord(trie, word)) {
            //2b. if word is valid: word is added to solution_Set
            solutions_Set.push(word);
        }

        //2c. call findWords, and call each adjacent grid[y][x]
        for (let i = 0; i < 8; i++) {
            findWords(word, grid, trie, y + adjacent_lookup[i][0], x + adjacent_lookup[i][1], visited, solutions_Set);

            //3. unmark visited[y][x]
        }
    }

    visited[y][x] = false;

}

//will return true if prefix is found in the trie
function isPrefix(trie, word) { //O(N) operation

    for (let tword of trie) {

        if (tword.substr(0, word.length) == word) {
            return true;
        }
    }
    return false;
}

//returns true if word is found in the trie
function isWord(trie, word) {
    for (let tword of trie) {

        if (tword == word && word.length >= 3) {
            return true;
        }
    }
    return false;
}
function convertToLowerCase(grid, dictionary) {
    for (let x = 0; x < grid.length; x++) {
        for (let i = 0; i < grid[x].length; i++) {
            grid[x][i] = grid[x][i].toLowerCase();
        }
    }
    for (let x = 0; x < dictionary.length; x++) {
        dictionary[x] = dictionary[x].toLowerCase();
    }

}

// /////////TEST_#1////////

// var grid1 = [['A', 'B'], ['C', 'D']];
// var dictionary = ['A', 'B', 'AC', 'ACA', 'ACB', 'DE'];

// /**
//  * answer: ['ACB']
//  */
// console.log('Test #1: ');
// console.log(exports.findAllSolutions(grid1, dictionary));



// // /////////TEST_#2////////

// var grid2 = [['A', 'B', 'C', 'D'], ['E', 'F', 'G', 'H'], ['I', 'J', 'K', 'L'], ['A', 'B', 'C', 'D']];
// var dictionary = ['ABEF', 'AFJIEB', 'DGKD', 'DGKA'];

// /**
//  * answer: ['ABEF','AFJIEB','DGKD']
//  */
// console.log('Test #2: ');
// console.log(exports.findAllSolutions(grid2, dictionary));



// /////////TEST_#3////////

// var grid3 = [['T', 'W', 'Y', 'R'],
// ['E', 'N', 'P', 'H'],
// ['G', 'Z', 'Qu', 'R'],
// ['O', 'N', 'T', 'A']];
// var dictionary = ['art', 'ego', 'gent', 'get', 'net', 'new', 'newt', 'prat',
//     'pry', 'qua', 'quart', 'quartz', 'rat', 'tar', 'tarp',
//     'ten', 'went', 'wet', 'arty', 'egg', 'not', 'quar'];

// /**
//  * answer: ['art', 'ego', 'gent', 'get', 'net', 'new','newt', 'prat','pry', 'qua', 'quart', 'quartz', 'rat', 'tar', 'tarp','ten', 'went', 'wet', 'quar']
//  */
// console.log('Test #3: ');
// console.log(exports.findAllSolutions(grid3, dictionary));



// //         /////////TEST_#4////////

// var grid = [];
// var dictionary = [];

// /**
//  * answer: []
//  */
// console.log('Test #4: (empty) ');
// console.log(exports.findAllSolutions(grid, dictionary));


// // ///////////////////////////////////////////////////




// // creats a new Boggle board and calls getSolutions 
// exports.findAllSolutions = function (grid, dictionary) {
//     return []
// }

// var grid = [
//     ["T", "W", "Y", "R"],
//     ["E", "N", "P", "H"],
//     ["G", "Z", "Qu", "R"],
//     ["O", "N", "T", "A"]
// ];
// var dictionary = ["art", "ego", "gent", "get", "net", "new", "newt", "prat", "pry", "qua", "quart", "quartz", "rat", "tar", "tarp", "ten", "went", "wet", "arty", "egg", "not", "quar"];
// console.log(exports.findAllSolutions(grid, dictionary));




