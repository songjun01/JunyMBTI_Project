const main=document.querySelector("#main");
const qna=document.querySelector("#qna");
const result=document.querySelector("#result");

const endPoint=12;
const select=[];

let resultWord="";

var selectValue="basic";
var click="false";
var showValue=(target)=>{
  selectValue=target.value;
  //const text
  console.log(selectValue);
}

function calResult(){//E/I S/N T/F P/J 가장 높은 네개를 mbti로 설정.

  var pointArray=[
    {name:'E',value:0,key:0},
    {name:'I',value:0,key:1},
    {name:'S',value:0,key:2},
    {name:'N',value:0,key:3},
    {name:'T',value:0,key:4},
    {name:'F',value:0,key:5},
    {name:'P',value:0,key:6},
    {name:'J',value:0,key:7}]

    //console.log(select);
    if(selectValue==="male"){
      for(let i=0;i<endPoint;i++){
        var target=qnaList[i].a[select[i]];
        for(let j=0;j<target.type.length;j++){
          for(let k=0;k<pointArray.length;k++){
            if(target.type[j]===pointArray[k].name){
              pointArray[k].value+=1;
            }
          }
        }
      }
    }
    else if(selectValue==="female"){
      for(let i=0;i<endPoint;i++){
        var target=qnaListFe[i].a[select[i]];
        for(let j=0;j<target.type.length;j++){
          for(let k=0;k<pointArray.length;k++){
            if(target.type[j]===pointArray[k].name){
              pointArray[k].value+=1;
            }
          }
        }
      }
    }


    let resultValue=0;
    if(pointArray[0].value>=pointArray[1].value){//E>I
      resultValue+=1000;
      //console.log('1000');
    }
    else if(pointArray[0].value<pointArray[1].value){//E<I
      resultValue+=2000;
      //console.log('2000');
    }
    if(pointArray[2].value>=pointArray[3].value){//S>N
      resultValue+=100;
      //console.log('100');
    }
    else if(pointArray[2].value<pointArray[3].value){//S<N
      resultValue+=200;
      //console.log('200');
    }
    if(pointArray[4].value>=pointArray[5].value){//T>F
      resultValue+=10;
      //console.log('10');
    }
    else if(pointArray[4].value<pointArray[5].value){//T<F
      resultValue+=20;
      //console.log('20');
    }
    if(pointArray[6].value>=pointArray[7].value){//P>J
      resultValue+=1;
      //console.log('1');
    }
    else if(pointArray[6].value<pointArray[7].value){//P<J
      resultValue+=2;
      //console.log('2');
    }

    //console.log(resultValue);
    let resultNumber=0;
    switch(resultValue){
      case 1111:
        resultWord="ESTP";
        resultNumber=0;
        break;
      case 1211:
        resultWord="ENTP";
        resultNumber=1;
        break;
      case 1121:
        resultWord="ESFP";
        resultNumber=2;
        break;
      case 1112:
        resultWord="ESTJ";
        resultNumber=3;
        break;
      case 1221:
        resultWord="ENFP";
        resultNumber=4;
        break;
      case 1212:
        resultWord="ENTJ";
        resultNumber=5;
        break;
      case 1122:
        resultWord="ESFJ";
        resultNumber=6;
        break;
      case 1222:
        resultWord="ENFJ";
        resultNumber=7;
        break;

      case 2111:
        resultWord="ISTP";
        resultNumber=8;
        break;
      case 2211:
        resultWord="INTP";
        resultNumber=9;
        break;
      case 2121:
        resultWord="ISFP";
        resultNumber=10;
        break;
      case 2112:
        resultWord="ISTJ";
        resultNumber=11;
        break;
      case 2221:
        resultWord="INFP";
        resultNumber=12;
        break;
      case 2212:
        resultWord="INTJ";
        resultNumber=13;
        break;
      case 2122:
        resultWord="ISFJ";
        resultNumber=14;
        break;
      case 2222:
        resultWord="INFJ";
        resultNumber=15;
        break;
    }
    return resultNumber;
}
function setResult(){
  let point=calResult();
  const resultName=document.querySelector('.resultName');
  resultName.innerHTML=infoList[point].name;
  const resultDesc=document.querySelector('.resultDesc');
  resultDesc.innerHTML=infoList[point].desc;
  var resultImg=document.createElement('img');
  const imgDiv=document.querySelector('#resultImg');
  var imgURL='img/image-'+resultWord+'.png';
  resultImg.src=imgURL;
  resultImg.alt=point;
  resultImg.width='300';
  resultImg.height='300';
  resultImg.classList.add('img-fluid');
  imgDiv.appendChild(resultImg);

  /*const resultName=document.querySelector('.resultName');
  resultName.innerHTML=infoList[point].name;
  var resultImg=document.createElement('img');
  const imgDiv=document.querySelector('#resultImg');
  var imgURL='img/image-'+point+'.png';
  resultImg.src=imgURL;
  resultImg.alt=point;
  resultImg.classList.add('img-fluid');
  imgDiv.appendChild(resultImg);
  const resultDesc=document.querySelector('.resultDesc');
  resultDesc.innerHTML=infoList[point].desc;*/
}
function goResult(){
  qna.style.webkitAnimation="fadeOut 1s";
  qna.style.animation="fadeOut 1s";
  setTimeout(()=>{
    result.style.webkitAnimation="fadeIn 1s";
    result.style.animation="fadeIn 1s";
    setTimeout(()=>{
      qna.style.display="none";
      result.style.display="block";
    },450)
  })
  setResult();

}
function addAnswer(answerText,qIdx,idx){
  var a=document.querySelector('.answerBox');
  var answer=document.createElement('button');
  answer.classList.add('answerList');
  answer.classList.add('my-3');
  answer.classList.add('py-3');
  answer.classList.add('mx-auto');
  answer.classList.add('fadeIn');
  a.appendChild(answer);
  answer.innerHTML=answerText;

  answer.addEventListener("click",function(){
    var children=document.querySelectorAll('.answerList');
    for(let i=0;i<children.length;i++){
      children[i].disabled=true;
      children[i].style.webkitAnimation="fadeOut 0.5s";
      children[i].style.animation="fadeOut 0.5s";

    }
    setTimeout(()=>{
      select[qIdx]=idx;
      for(let i=0;i<children.length;i++){
        children[i].style.display='none';
      }
      goNext(++qIdx);
    },450)
  },false);
}
function goNext(qIdx){
  if(selectValue==="male"){
    if(qIdx===endPoint){
      goResult();
      return;
    }
    var q=document.querySelector('.qBox');
    q.innerHTML=qnaList[qIdx].q;
    for(let i in qnaList[qIdx].a){
      addAnswer(qnaList[qIdx].a[i].answer,qIdx,i);
    }
    var status=document.querySelector('.statusBar');
    status.style.width=(100/endPoint)*(qIdx+1)+'%';
  }
  else if(selectValue==="female"){
    if(qIdx===endPoint){
      goResult();
      return;
    }
    var q=document.querySelector('.qBox');
    q.innerHTML=qnaListFe[qIdx].q;
    for(let i in qnaListFe[qIdx].a){
      addAnswer(qnaListFe[qIdx].a[i].answer,qIdx,i);
    }
    var status=document.querySelector('.statusBar');
    status.style.width=(100/endPoint)*(qIdx+1)+'%';
  }
}
function beginMale(){
  const target = document.getElementById('maleStartButton');
  target.disabled = true;
  selectValue='male';
  begin();
}
function beginFemale(){
  const target = document.getElementById('femaleStartButton');
  target.disabled = true;
  selectValue='female';
  begin();
}
function begin(){
  console.log(selectValue);
  if(selectValue==='male' || selectValue==="female"){
    main.style.webkitAnimation="fadeOut 1s";
    main.style.animation="fadeOut 1s";
    setTimeout(()=>{
      qna.style.webkitAnimation="fadeIn 1s";
      qna.style.animation="fadeIn 1s";
      setTimeout(()=>{
        main.style.display="none";
        qna.style.display="block";
      },450)
      let qIdx=0;
      goNext(qIdx);
    },450);
  }
}
