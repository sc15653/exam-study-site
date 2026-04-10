const searchBtn = document.getElementById("searchBtn");
const topicInput = document.getElementById("topicInput");

const resultSection = document.getElementById("resultSection");
const emptyMessage = document.getElementById("emptyMessage");

const topicTitle = document.getElementById("topicTitle");
const explanationText = document.getElementById("explanationText");
const keyPointsList = document.getElementById("keyPointsList");
const questionsList = document.getElementById("questionsList");
const codingTasksList = document.getElementById("codingTasksList");

const studyData = {
  "python classes": {
    title: "Python Classes",
    explanation:
      "A class in Python is a blueprint for creating objects. It lets you group data and functions together in one structure. Classes are useful when you want to model real things such as students, cars, or bank accounts.",
    keyPoints: [
      "A class is created using the class keyword.",
      "Objects are created from classes.",
      "The __init__ method is used to initialize object data.",
      "self refers to the current object.",
      "Methods are functions inside a class."
    ],
    questions: [
      "What is a class in Python?",
      "What is the purpose of the __init__ method?",
      "What does self represent?",
      "What is the difference between a class and an object?"
    ],
    codingTasks: [
      "Create a class called Student with name and age attributes.",
      "Add a method that prints the student's details.",
      "Create two objects from your Student class.",
      "Create a class called Car with a method named start_engine."
    ]
  },

  "python loops": {
    title: "Python Loops",
    explanation:
      "Loops are used to repeat a block of code multiple times. Python mainly uses for loops and while loops. A for loop is often used when working through a sequence, while a while loop runs as long as a condition is true.",
    keyPoints: [
      "for loops repeat through sequences like lists or strings.",
      "while loops continue while a condition remains true.",
      "break stops a loop early.",
      "continue skips the current loop iteration.",
      "Nested loops are loops inside loops."
    ],
    questions: [
      "What is the difference between a for loop and a while loop?",
      "What does break do?",
      "What does continue do?",
      "When would you use a while loop?"
    ],
    codingTasks: [
      "Write a for loop that prints numbers from 1 to 10.",
      "Write a while loop that stops at 5.",
      "Loop through a list of names and print each one.",
      "Write a loop that prints only even numbers from 2 to 20."
    ]
  },

  "python functions": {
    title: "Python Functions",
    explanation:
      "Functions are reusable blocks of code that perform a specific task. They help organize programs, reduce repetition, and make code easier to understand.",
    keyPoints: [
      "Functions are created using the def keyword.",
      "They can take parameters as input.",
      "They can return values using return.",
      "Functions improve code reuse and readability.",
      "Local variables only exist inside the function."
    ],
    questions: [
      "Why are functions useful?",
      "What is the difference between a parameter and an argument?",
      "What does return do?",
      "What is a local variable?"
    ],
    codingTasks: [
      "Write a function that adds two numbers.",
      "Write a function that checks if a number is even.",
      "Write a function that returns the square of a number.",
      "Write a function that prints a greeting message."
    ]
  }
};

function displayList(element, items) {
  element.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    element.appendChild(li);
  });
}

function generateStudyGuide() {
  const userTopic = topicInput.value.trim().toLowerCase();

  if (userTopic === "") {
    alert("Please enter a topic.");
    return;
  }

  const topic = studyData[userTopic];

  if (!topic) {
    topicTitle.textContent = "Topic not found";
    explanationText.textContent =
      "Sorry, this topic is not in the current version yet. Try: python classes, python loops, or python functions.";
    keyPointsList.innerHTML = "";
    questionsList.innerHTML = "";
    codingTasksList.innerHTML = "";

    resultSection.classList.remove("hidden");
    emptyMessage.classList.add("hidden");
    return;
  }

  topicTitle.textContent = topic.title;
  explanationText.textContent = topic.explanation;

  displayList(keyPointsList, topic.keyPoints);
  displayList(questionsList, topic.questions);
  displayList(codingTasksList, topic.codingTasks);

  resultSection.classList.remove("hidden");
  emptyMessage.classList.add("hidden");
}

searchBtn.addEventListener("click", generateStudyGuide);

topicInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    generateStudyGuide();
  }
});