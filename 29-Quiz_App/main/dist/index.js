const questions = [
    {
        question: "Q1) How can you access the length of an array in JavaScript?",
        options: ["array.count", "array.length", "array.size()", "array.size"],
        correctAnswer: "array.length"
    },
    {
        question: "Q2) How to write an IF statement in JavaScript?",
        options: ["if (i == 5) { }", "(i == 5)", "if i == 5 { }", "if (i = 5) { }"],
        correctAnswer: "if (i == 5) { }"
    },
    {
        question: "Q3) What is the result of the following nested loop?\n\nfor (let i = 1; i <= 3; i++) {\n    for (let j = 1; j <= 2; j++) {\n        console.log(i * j);\n    }\n}",
        options: ["1 2 3 4 5 6", "1 4 9", "1 2 2 4 3 6", "2 4 6"],
        correctAnswer: "1 2 2 4 3 6"
    },
    {
        question: "Q4) What is the correct syntax for referring to an external script called 'app.js'?",
        options: ['<script href="app.js">', '<script name="app.js">', '<script src="app.js">'],
        correctAnswer: '<script src="app.js">'
    },
    {
        question: "Q5) What will be the output of the following JavaScript code?\n\nvar string1 = '123';\nvar intvalue = 123;\nalert(string1 + intvalue);",
        options: ["Exception", "246", "123123", "123246"],
        correctAnswer: "123123"
    },
    {
        question: "Q6) What will be the output of the following JavaScript code?\n\nvar sum = 14;\nif (sum < 20) {\n  alert('under');\n} else {\n  alert('over');\n}",
        options: ["Over Under", "Under", "Over", "Under Over"],
        correctAnswer: "Under"
    },
    {
        question: "Q7) What will be the output of the following JavaScript code?\n\nvar name = 'John Appleseed';\nvar newName = name.slice(5, 10);\nconsole.log(newName);",
        options: ["Ohn A", "Ohn App", "Apple", "pples"],
        correctAnswer: "Apple"
    },
    {
        question: "Q8) How do you declare a JavaScript variable?",
        options: ["v carName;", "var carName;", "variable carName;", "var carName ()"],
        correctAnswer: "var carName;"
    },
    {
        question: "Q9) How to replace the fourth element in the array arr = [1,7,9] with the value 8?",
        options: ["arr.indexOf(1) = 8", "arr[4] = 8", "arr[3] = 8"],
        correctAnswer: "arr[3] = 8"
    },
    {
        question: "Q10) Which of the following methods removes the last element from an array and returns that element?",
        options: ["pop()", "push()", "unshift()", "shift()"],
        correctAnswer: "pop()"
    },
    {
        question: "Q11) How can you add a comment in JavaScript?",
        options: ["{(This is comment)}", "``", "\"\"This is comment", "//This is comment"],
        correctAnswer: "//This is comment"
    },
    {
        question: "Q12) What is the purpose of the condition part in a for loop?",
        options: ["It defines the loop counter.", "It specifies the code to be executed in each iteration.", "It determines the number of iterations the loop will run.", "It initializes loop variables."],
        correctAnswer: "It determines the number of iterations the loop will run."
    },
    {
        question: "Q13) Evaluate (true or false) each of the following expressions: 14 <= 14 14 < 14 -9 > -25",
        options: ["True false true", "False false false", "True true true", "False true false"],
        correctAnswer: "True true true"
    },
    {
        question: "Q14) What are the three important manipulations done in a for loop on a loop variable?",
        options: ["Condition, Updation, Testing", "Initialization, Condition, Updation.", "Updation, Incrementation, Initialization", "Initialization, Condition, Incrementation"],
        correctAnswer: "Initialization, Condition, Updation."
    },
    {
        question: "Q15) How do you terminate a for loop prematurely in JavaScript?",
        options: ["Using the break statement.", "Using the end keyword.", "Using the continue statement.", "By setting the condition to false."],
        correctAnswer: "Using the break statement."
    },
    {
        question: "Q16) How can you remove the last element from an array in JavaScript?",
        options: ["array.deleteLast()", "array.pop()", "array.removeLast()", "array.splice(-1, 1)"],
        correctAnswer: "array.pop()"
    },
    {
        question: "Q17) How to insert a comment that has more than one line?",
        options: ["/*This comment has More then one line*/", "//This comment has More then one line//", "``"],
        correctAnswer: "/*This comment has More then one line*/"
    },
    {
        question: "Q18) In JavaScript, which operator is used to combine multiple conditions within an if statement?",
        options: ["&& (logical AND)", "<> (comparison)", "! (logical NOT)", "|| (logical OR)"],
        correctAnswer: "&& (logical AND)"
    },
    {
        question: "Q19) What is JavaScript primarily used for in web development?",
        options: ["Creating databases", "Enhancing interactivity", "Styling web pages", "None of the above"],
        correctAnswer: "Enhancing interactivity"
    },
    {
        question: "Q20) Which of these is a valid variable name in Javascript?",
        options: ["Abc 124", "abc123", "abcGf", "12Ab"],
        correctAnswer: "abc123"
    },
    {
        question: "Q21) What will the following code return: Boolean(10 > 9)?",
        options: ["Non", "false", "true"],
        correctAnswer: "true"
    },
    {
        question: "Q22) What is the correct way to write a JavaScript array?",
        options: ["var colors = ['red', 'green', 'blue']", "var colors = 'red', 'green', 'blue'", "var colors = (1:'red', 2:'green', 3: 'blue')", "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')"],
        correctAnswer: "var colors = ['red', 'green', 'blue']"
    },
    {
        question: "Q23) What will be the output of the following JavaScript code?\n\nvar arr = [];\narr[0] = 'a';\narr[1] = 'b';\nalert(arr.length);",
        options: ["2", "Undefined", "1", "0"],
        correctAnswer: "2"
    },
    {
        question: "Q24) Which of this line show the correct way to reassign a variable a new value?",
        options: ["8 => numb", "numb = 10", "10 var numb", "var numb = 10"],
        correctAnswer: "numb = 10"
    },
    {
        question: "Q25) What is the function of an Array object that adds and/or removes elements from an array?",
        options: ["unshift()", "splice()", "sort()", "toSource()"],
        correctAnswer: "splice()"
    },
    {
        question: "Q26) What will be the output of the following JavaScript code?\n\nvar name = 'John Appleseed';\nconsole.log(name[3]);",
        options: ["A", "n", "undefined", "H"],
        correctAnswer: "n"
    },
    {
        question: "Q27) Code the first line of an if statement that avoids the nesting above by testing for multiple conditions.",
        options: ["if (a == 1) {", "if (a === 1 || c === 'Max') {", "if (a === 1 && c === 'Max') {", "if (c === 'Max') {"],
        correctAnswer: "if (a === 1 || c === 'Max') {"
    },
    {
        question: "Q28) How many times will the inner loop run in a nested loop with the following structure?\n\nfor (let i=0; i<5; i++) {\n  for (let j=0; j < 3; j++) {\n    // loop code\n  }\n}",
        options: ["8 times", "5 times", "3 times", "15 times"],
        correctAnswer: "15 times"
    },
    {
        question: "Q29) When, if either or both sides of an operator is (are) true, the test passes, what operator is it?",
        options: ["<<", "||", "&&"],
        correctAnswer: "||"
    },
    {
        question: "Q30) How does a for loop start?",
        options: ["for i = 1 to 5", "for(i=0; i <= 5)", "for(i <=5, i++)", "for(i = 0; i <= 5, i++)"],
        correctAnswer: "for(i=0; i <= 5)"
    },
    {
        question: "Q31) How to write an If statement for executing some code if 'i' is NOT equal to 5?",
        options: ["If i ==! 5 then", "If (i <> 5)", "If i < 5", "If (i !== 5)"],
        correctAnswer: "If (i !== 5)"
    },
    {
        question: "Q32) Is JavaScript case-sensitive?",
        options: ["Yes", "No"],
        correctAnswer: "Yes"
    },
    {
        question: "Q33) What will be the output of the following JavaScript code?\n\nvar sum = 14;\nif (sum !== 20) {\n  alert('win');\n} else {\n  alert('lose');\n}",
        options: ["lose", "win"],
        correctAnswer: "win"
    },
    {
        question: "Q34) How to access the second element of the array arr=[3, 7, 10]?",
        options: ["arr[1]", "arr.indexOf(1)", "arr.indexOf(2)", "arr[2]"],
        correctAnswer: "arr[1]"
    },
    {
        question: "Q35) What will be the output of the following JavaScript code?\n\nvar myArr = ['foo', 'bar', 'baz'];\nmyArr.length = 0;\nmyArr.push('bin');\nconsole.log(myArr);",
        options: ["['bin', 'foo', 'bar', 'baz']", "['foo', 'bar', 'baz', 'bin']", "['bin']", "['foo', 'bar', 'baz']"],
        correctAnswer: "['bin']"
    }
];

let quest   = document.querySelector('#question');
let options = document.querySelectorAll('.radio-label');
let next    = document.querySelector('#next');  

let currentQuestionIndex = 0;


function displayQuestion() {
    const { question, options: opts,  correctAnswer } = questions[currentQuestionIndex];
    
    quest.innerHTML = question;
    
    // Ensure that we have the right number of options to display
    options.forEach((label, index) => {
        if (opts[index]) {
            label.querySelector('span').innerHTML = `${index + 1}: ${opts[index]}`;
            // Set value or additional attributes if needed
            label.querySelector('input').setAttribute('value', opts[index]);
        }
    });
}

// Initial display of the first question
displayQuestion();

next.addEventListener('click', function () {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        // Optionally reset the quiz or hide questions after completing all questions
        currentQuestionIndex = 0;
        displayResult();
        displayQuestion();
    }
});

   
document.addEventListener('DOMContentLoaded', function () {
    // Get all the labels
    let labels = document.querySelectorAll('.radio-label');

    // Attach click event listeners to all labels
    labels.forEach(label => {
        label.addEventListener('click', function () {
            // Remove the 'selected' class from all labels
            labels.forEach(l => l.classList.remove('selected'));

            // Add the 'selected' class to the clicked label
            this.classList.add('selected');
        });
    });
});




//counter for timer
let count           = 10;
let times           = document.querySelector('#timer');
    times.innerText = count;
function startQuiz() {
    displayQuestion();

          // Timer countdown logic
    setInterval(function () {
        count--;
        times.innerHTML = count;

        if (count < 10) {
            times.innerHTML = "0" + count;
            times.style.color = "red";
        } else {
            times.style.color = "green";
        }

        
        if (count <= 0) {
            count           = 10;     // Reset the countdown
            times.innerHTML = count;
            
                  // Move to the next question
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                displayQuestion();
            } else {
                alert("Quiz complete!");
                currentQuestionIndex = 0;  // Reset for replay or additional handling
                displayQuestion      ();   // Optionally display the first question again
            }
        }
    }, 1000);
}
  document.addEventListener('DOMContentLoaded', startQuiz);
