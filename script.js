
const div1 = document.querySelector(".div1")
const div2 = document.querySelector(".div2")
const err = document.querySelector(".neterror")
const dodanyDoKoszyka = sessionStorage.getItem("item") || []
const supportTicket = document.querySelector("text");
const getRandomTime = (min,max)=>{
const time = Math.floor(Math.random() * (max - min + 1) + min)
return time
}
const czas= getRandomTime(900,4000)

function addJavascript(jsname,pos) {
var th = document.getElementsByTagName(pos)[0];
var s = document.createElement('script');
s.setAttribute('type','module');
s.setAttribute('src',jsname);
th.appendChild(s);
}

function captchaSolver(){
const script = document.createElement("script");
script.innerHTML = `

Tesseract.recognize(
  'https://tesseract.projectnaptha.com/img/eng_bw.png',
  'eng',
  { logger: m => console.log(m) }
).then(({ data: { text } }) => {
  console.log(text);
})

`
document.body.appendChild(script)
}

function check(){

if(dodanyDoKoszyka.length > 0){
console.log(dodanyDoKoszyka)

return
}

const p = document.getElementById("al-t")
if(p){
p.lastChild.click()
}
if(!p){
let elements = [...document.querySelectorAll(".row.mt-4.justify-content-center")];
let koszyk1
let text1
let k1 = elements.map((element,index)=>{
    if((element.children[1].children[0].children[0].textContent.includes("Kostka - Ziemowit"))){
        koszyk1 =  element
        text1=element.children[1].children[0].children[0].textContent
    }
})

let koszyk2
let text2
let k2 = elements.map((element,index)=>{
    if((element.children[1].children[0].children[0].textContent.includes("Orzech - Ziemowit"))){
        koszyk2 = element
        text2=element.children[1].children[0].children[0].textContent
    }
})

if(koszyk1 || koszyk2){
koszyk1 = koszyk1.querySelector("button.btn")
koszyk2 = koszyk2.querySelector("button.btn")

  if(koszyk1.disabled !==true){
    koszyk1.parentElement.parentElement.parentElement.scrollIntoView()
    koszyk1.style.backgroundColor = "purple"
    koszyk1.click()
    console.log(koszyk1)
        sessionStorage.setItem("item", text1)

    console.log(`Dodano do koszyka ${text1}`)
    }else if(koszyk2.disabled!==true){

    koszyk2.click()
    sessionStorage.setItem("item", text2)

    console.log(`Dodano do koszyka ${text2}`)
    
        koszyk2.parentElement.parentElement.parentElement.scrollIntoView()
        koszyk2.style.backgroundColor = "purple"
    }
        
    
}
if(koszyk1.disabled && koszyk2.disabled){
console.log("Brak wyboru!")
sessionStorage.clear()
}

}}


let time
if(div1 && div2 || err || supportTicket){
  time = setTimeout(()=>{
  location.reload()

  },czas)
    console.log("Przeładowanie strony za " + (czas/1000).toFixed(2) + " sekundy")


}else if(document.body.textContent.includes("Przepisz kod")){
addJavascript("https://cdnjs.cloudflare.com/ajax/libs/tesseract.js/3.0.3/tesseract.min.js", "head")
captchaSolver()
}
else{
clearTimeout(time)
check()
}
