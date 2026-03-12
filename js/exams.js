const token = localStorage.getItem("token")

if(!token){
window.location.href = "login.html"
}

async function loadExams(){

const res = await fetch(
BASE_URL + "/MyStudent/getExam",
{headers:authHeader()}
)

const data = await res.json()

const list = document.getElementById("examList")

list.innerHTML = ""

if(data.message){
list.innerHTML = `<p>${data.message}</p>`
return
}

data.forEach(exam=>{

let actionButton = ""

if(exam.status === "Completed"){

actionButton = `
<button class="start-btn"
onclick="viewResult('${exam._id}')">
View Result
</button>
`

}
else{

actionButton = `
<button class="start-btn"
onclick="startExam('${exam._id}')">
Start Exam
</button>
`

}

list.innerHTML += `

<div class="exam-card">

<div class="exam-card-left">

<h3>${exam.title}</h3>

<p class="exam-duration">
Duration: ${exam.duration} minutes
</p>

</div>

<div class="exam-card-right">

${actionButton}

</div>

</div>

`

})

}

async function startExam(examId){

const res = await fetch(
BASE_URL + "/MyStudent/startTheExam",
{
method:"POST",
headers:{
"Content-Type":"application/json",
...authHeader()
},
body:JSON.stringify({examId})
}
)

const data = await res.json()

if(!res.ok){
alert(data.message)
return
}

window.location.href = "exam.html?examId=" + examId

}

function viewResult(examId){
window.location.href = "result.html?examId=" + examId
}

loadExams()