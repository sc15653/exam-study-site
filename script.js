const searchBtn = document.getElementById("searchBtn");
const topicInput = document.getElementById("topicInput");

const resultSection = document.getElementById("resultSection");
const emptyMessage = document.getElementById("emptyMessage");

const topicTitle = document.getElementById("topicTitle");
const explanationText = document.getElementById("explanationText");
const keyPointsList = document.getElementById("keyPointsList");
const questionsList = document.getElementById("questionsList");
const codingTasksList = document.getElementById("codingTasksList");

function displayList(element, items) {
  element.innerHTML = "";

  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    element.appendChild(li);
  });
}

async function generateStudyGuide() {
  const userTopic = topicInput.value.trim();

  if (userTopic === "") {
    alert("Please enter a topic.");
    return;
  }

  topicTitle.textContent = "Loading...";
  explanationText.textContent = "Generating your study guide...";
  keyPointsList.innerHTML = "";
  questionsList.innerHTML = "";
  codingTasksList.innerHTML = "";

  resultSection.classList.remove("hidden");
  emptyMessage.classList.add("hidden");

  try {
    const response = await fetch("http://127.0.0.1:5000/api/study", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ topic: userTopic })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong.");
    }

    topicTitle.textContent = data.title;
    explanationText.textContent = data.explanation;

    displayList(keyPointsList, data.keyPoints || []);
    displayList(questionsList, data.questions || []);
    displayList(codingTasksList, data.codingTasks || []);
  } catch (error) {
    topicTitle.textContent = "Error";
    explanationText.textContent = error.message;
    keyPointsList.innerHTML = "";
    questionsList.innerHTML = "";
    codingTasksList.innerHTML = "";
  }
}

searchBtn.addEventListener("click", generateStudyGuide);

topicInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    generateStudyGuide();
  }
});