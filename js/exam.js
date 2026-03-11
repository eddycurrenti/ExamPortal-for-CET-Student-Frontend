const token = localStorage.getItem("token")

if (!token) {
    window.location.href = "login.html"
}

const urlParams = new URLSearchParams(window.location.search)
const examId = urlParams.get("examId")

let questions = []
let filteredQuestions = []
let currentIndex = 0



/* LOAD WHOLE EXAM */

async function loadExam() {

    const res = await fetch(
        BASE_URL + "/MyStudent/getAllQuestions/" + examId,
        {
            headers: authHeader()
        }
    )

    questions = await res.json()

    filteredQuestions = [...questions]

    renderPalette()
    renderQuestion()

}



/* RENDER QUESTION */

function renderQuestion() {

    const q = filteredQuestions[currentIndex]

    document.getElementById("questionNumber").innerText =
        "Question " + (currentIndex + 1)

    document.getElementById("questionText").innerText =
        q.questionText

    const options = document.getElementById("options")

    options.innerHTML = ""

    q.options.forEach((o, i) => {

        options.innerHTML += `

<div class="option">

<input type="radio"
name="opt"
value="${i}"
${q.selectedOption === i ? "checked" : ""}
onclick="saveAnswer(${i})">

${o}

</div>

`

    })

}



/* SAVE ANSWER */

async function saveAnswer(opt) {

    const q = filteredQuestions[currentIndex]

    q.selectedOption = opt
    q.status = "Answered"

    await fetch(
        BASE_URL + "/MyStudent/saveAnswer",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...authHeader()
            },
            body: JSON.stringify({
                examId,
                questionId: q.questionId,
                selectedOption: opt
            })
        }
    )

    renderPalette()

}



/* SAVE & NEXT */

function saveAndNext() {

    nextQuestion()

}



/* MARK REVIEW */

async function markReview() {

    const q = filteredQuestions[currentIndex]

    q.status = "MarkedForReview"

    await fetch(
        BASE_URL + "/MyStudent/markReview",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...authHeader()
            },
            body: JSON.stringify({
                examId,
                questionId: q.questionId
            })
        }
    )

    renderPalette()

}



/* CLEAR */

function clearAnswer() {

    const q = filteredQuestions[currentIndex]

    q.selectedOption = null
    q.status = "NotAnswered"

    renderQuestion()
    renderPalette()

}



/* NAVIGATION */

function nextQuestion() {

    if (currentIndex < filteredQuestions.length - 1) {
        currentIndex++
        renderQuestion()
    }

}

function prevQuestion() {

    if (currentIndex > 0) {
        currentIndex--
        renderQuestion()
    }

}



/* PALETTE */

function renderPalette() {

    const palette = document.getElementById("palette")

    palette.innerHTML = ""

    filteredQuestions.forEach((q, i) => {

        let cls = "notVisited"

        if (q.status === "Answered") cls = "answered"
        if (q.status === "MarkedForReview") cls = "review"

        palette.innerHTML += `

<button class="${cls}" onclick="goToQuestion(${i})">
${i + 1}
</button>

`

    })

}



function goToQuestion(i) {

    currentIndex = i
    renderQuestion()

}



/* SUBJECT FILTER */

function filterSubject(subject) {

    filteredQuestions = questions.filter(q => q.subject === subject)

    currentIndex = 0

    renderPalette()
    renderQuestion()

}



/* SUBMIT */

async function submitExam() {

    if (!confirm("Submit exam?")) return

    const res = await fetch(
        BASE_URL + "/MyStudent/submit",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...authHeader()
            },
            body: JSON.stringify({ examId })
        }
    )

    const data = await res.json()

    alert("Score: " + data.totalMarks)

    window.location.href = "exams.html"

}



/* TIMER */

async function startTimer(){

const res = await fetch(
BASE_URL + "/MyStudent/examStatus/" + examId,
{headers:authHeader()}
)

const data = await res.json()

let remaining = Math.floor(data.remainingSeconds)

const timer = document.getElementById("timer")

const interval = setInterval(()=>{

if(remaining <= 0){

clearInterval(interval)

alert("Time finished. Submitting exam.")

submitExam()

return
}

let m = Math.floor(remaining / 60)
let s = remaining % 60

timer.innerText =
String(m).padStart(2,'0') + ":" +
String(s).padStart(2,'0')

remaining--

},1000)

}


loadExam()
startTimer()