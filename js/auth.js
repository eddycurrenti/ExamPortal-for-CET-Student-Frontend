function authHeader(){
return {
"Authorization":"Bearer " + localStorage.getItem("token")
}
}

function logout(){
localStorage.removeItem("token")
window.location.href = "login.html"
}
function blockMobile(){

const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent)

if(isMobile || window.innerWidth < 900){

document.body.innerHTML = `
<div style="
display:flex;
justify-content:center;
align-items:center;
height:100vh;
font-family:Arial;
text-align:center;
">
<div>
<h2>Desktop Required</h2>
<p>This exam platform can only be used on desktop.</p>
</div>
</div>
`

throw new Error("Mobile blocked")

}

}

blockMobile()