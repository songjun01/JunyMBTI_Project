const url='https://junymbti.netlify.app/';

function setShare(){
  var resultImg=document.querySelector('#resultImg');
  var resultAlt=resultImg.firstElementChild.alt;
  const shareTitle='상황으로 알아보는 MBTI 결과';
  const shareDes=infoList[resultAlt].name;
  //console.log('resultAlt === '+resultAlt);
  let resultName='';
  switch(resultAlt){
    case '0':
      resultName='ESTP';
      break;
    case '1':
      resultName='ENTP';
      break;
    case '2':
      resultName='ESFP';
      break;
    case '3':
      resultName='ESTJ';
      break;
    case '4':
      resultName='ENFP';
      break;
    case '5':
      resultName='ENTJ';
      break;
    case '6':
      resultName='ESFJ';
      break;
    case '7':
      resultName='ENFJ';
      break;
    case '8':
      resultName='ISTP';
      break;
    case '9':
      resultName='INTP';
      break;
    case '10':
      resultName='ISFP';
      break;
    case '11':
      resultName='ISTJ';
      break;
    case '12':
      resultName='INFP';
      break;
    case '13':
      resultName='INTJ';
      break;
    case '14':
      resultName='ISFJ';
      break;
    case '15':
      resultName='INFJ';
      break;
    default:
      resultName='결과없음.';
      break;
  }
  //console.log('resultName === '+resultName);

  const shareImage=url+'img/image-'+resultName+'.png';
  const shareURL=url+'page/result-'+resultName+'.html';

  Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title: shareTitle,
      description: shareDes,
      imageUrl:
        shareImage,
      link: {
        mobileWebUrl: shareURL,
        webUrl: shareURL
      },
    },
    buttons: [
      {
        title: '결과 확인하기',
        link: {
          mobileWebUrl: shareURL,
          webUrl: shareURL
        },
      },
    ]
  });
}
