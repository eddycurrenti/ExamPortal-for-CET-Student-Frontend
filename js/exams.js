// const token = localStorage.getItem("token")

// if(!token){
// window.location.href="login.html"
// }

// async function loadExams(){

// const res = await fetch(
// BASE_URL+"/MyStudent/getExam",
// {
// headers:authHeader()
// }
// )

// const data = await res.json()

// const list = document.getElementById("examList")

// list.innerHTML=""

// if(data.message){
// list.innerHTML=data.message
// return
// }

// data.forEach(e=>{

// list.innerHTML+=`

// <div class="card exam">

// <div>

// <h3>${e.title}</h3>

// <p>Duration: ${e.duration} minutes</p>

// </div>

// <button class="primary"
// onclick="startExam('${e._id}')">

// Start Exam

// </button>

// </div>

// `

// })

// }

// async function startExam(examId){

// const res = await fetch(
// BASE_URL+"/MyStudent/startTheExam",
// {
// method:"POST",
// headers:{
// "Content-Type":"application/json",
// ...authHeader()
// },
// body:JSON.stringify({examId})
// })

// const data = await res.json()

// alert(data.message)

// window.location.href="exam.html?examId="+examId

// }

// loadExams()

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

list.innerHTML += `

<div class="exam-card">

<div class="exam-card-left">

<h3>${exam.title}</h3>

<p class="exam-duration">
Duration: ${exam.duration} minutes
</p>

</div>

<div class="exam-card-right">

<button class="start-btn"
onclick="startExam('${exam._id}')">
Start Exam
</button>

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

loadExams()