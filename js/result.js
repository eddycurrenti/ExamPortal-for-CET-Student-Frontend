// const urlParams = new URLSearchParams(window.location.search)
// const examId = urlParams.get("examId")

// async function loadResult(){

// const res = await fetch(
// BASE_URL + "/MyStudent/result/" + examId,
// { headers: authHeader() }
// )

// const data = await res.json()

// document.getElementById("physics").innerText = data.physics_Marks
// document.getElementById("chemistry").innerText = data.chemistry_Marks
// document.getElementById("math").innerText = data.math_Marks
// document.getElementById("total").innerText = data.totalMarks

// }

// loadResult()

const token = localStorage.getItem("token")

if(!token){
window.location.href="login.html"
}

const urlParams = new URLSearchParams(window.location.search)
const examId = urlParams.get("examId")

async function loadResult(){

const res = await fetch(
BASE_URL + "/MyStudent/resultDetails/" + examId,
{
headers: authHeader()
}
)

if(!res.ok){
const text = await res.text()
console.error(text)
document.getElementById("resultList").innerHTML =
"<p>Failed to load result</p>"
return
}

const data = await res.json()

const list = document.getElementById("resultList")

list.innerHTML=""

data.forEach((q,index)=>{

const correctText = q.options[q.correctAnswer]

const selectedText =
q.selectedOption !== null
? q.options[q.selectedOption]
: "Not Answered"

const color =
q.selectedOption === q.correctAnswer
? "green"
: "red"

list.innerHTML += `

<div style="
background:white;
padding:20px;
margin-bottom:15px;
border-radius:8px;
box-shadow:0 3px 10px rgba(0,0,0,0.06);
">

<h3>${index+1}. ${q.questionText}</h3>

<p>
<b>Your Answer:</b>
<span style="color:${color}">
${selectedText}
</span>
</p>

<p>
<b>Correct Answer:</b>
<span style="color:green">
${correctText}
</span>
</p>

</div>

`

})

}

loadResult()