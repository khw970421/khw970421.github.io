import {url} from './utils/Data.js'
const cityTag = document.getElementById('city')
const addButton = document.getElementById('addButton');
const cityTitle = document.querySelector('.cityMember');
let button = document.getElementById('but');

let cityMember=[];

const addEventListener1 = ()=>{
  let isNotDuplicate=true;
  cityTitle.childNodes.forEach(Dom=>{
    if(Dom.innerHTML ===`${cityTag.value}`) {
      alert('이미 존재하는 도시입니다');
      isNotDuplicate = false;
    }
  })

  if(isNotDuplicate) {
    cityTitle.insertAdjacentHTML('beforeend', `<button type="button" id="${cityTag.value}" class="m-1 btn btn-primary">${cityTag.value}</button>`);
    document.querySelector(`#${cityTag.value}`).addEventListener('click', (e) => {
      if (confirm('삭제하시겠습니까?')) {
        e.path[0].remove();
        cityMember.splice(cityMember.indexOf(e.path[0].innerHTML), 1);
      }
    })
    cityMember.push(cityTag.value)
  }
}

addButton.addEventListener('click',addEventListener1);
button.addEventListener('click',getServerData);

function getServerData() {
  async function load() {
    try {
      let cityIndex =[],getDate=[];
      let totalContent={};

      const datas = await Promise.all(setDate().map(date => {
          return dfd.read_csv(`${url}${date}.csv`)
        }
      ));         //모든 데이터 값 읽어오기

      console.log(datas);

      addCityIndex(datas,cityMember,cityIndex); //해당 지역을 가진 index 찾기
      checkIndex(datas,cityIndex,totalContent); //해당 지역을 가진 인덱스마다의 객체의 프로퍼티인 배열에 값을 넣는다
      addCityDate(datas,getDate);               //해당 지역을 가진 index를 통해 날짜 배열인 get_date저장

      const df_sum1 = new dfd.DataFrame(totalContent, {index: getDate});  // totalContent와 날짜인 get_date를 통해 df_sum 생성
      df_sum1.plot('plot').line();      //결과 출력

      // 해야할 부분 : 추가한 도시 버튼 클릭시 삭제기능 구현 , 전반적 코드 정리 필요

    }
    catch(err){
      alert('데이터가 존재하지 않거나 잘못되었습니다.');
    }
  }
  load();
}

const addCityIndex = (datas,cityMember,cityIndex)=>{
  datas[0].body__items__item__gubun.data.forEach((data) => {
    if (cityMember.indexOf(data) !== -1)
      cityIndex.push(datas[0].body__items__item__gubun.data.indexOf(data))
  });
}


const checkIndex = (datas,cityIndex,totalContent)=>{
  datas[0].body__items__item__gubun.data.forEach((data) => {
    cityIndex.map(index=>{
      if(data === datas[0].body__items__item__gubun.data[index])   //해당 지역을 가진 인덱스라면
        pushValue(totalContent,datas,data,index); //객체의 프로퍼티인 배열에 값을 추가
    })
  });
}

const pushValue = (totalContent,datas,data,index)=>{
  for(let i=0;i<datas.length;i++) {
    if(i===0)     //첫값은 배열 형태로 넣고
      totalContent[data] = [datas[i].body__items__item__incDec.data[index]];
    else          //배열형태이므로 나머지는 push메소드를 이용해 넣는다.
      totalContent[data].push(datas[i].body__items__item__incDec.data[index]);
  }
}

const addCityDate = (datas,getDate)=>{
  datas.forEach(data => {
    getDate.push(data.body__items__item__stdDay.data[0]);
  })
}

const setDate = ()=>{
  let input = document.getElementById('input')
  let days = document.getElementById('days');
  let returnDay = checkDuring(days.options[days.selectedIndex].text);
  let tDate = new Date(input.value); // 2020년 03월 04일 부터 시작
  let Year,Month,Day;                 // 각 날짜별 날짜 생성
  const date_array = [];              // 해당 필요부분 넣을 배열 생성

  for(let i=0;i<returnDay;i++)
  {
    tDate.setDate(tDate.getDate()+1)        // 3월 4일 계산 후 하루씩 증가
    let stringMonth = (tDate.getMonth()+1).toString();
    Year = tDate.getFullYear().toString().slice(2,4);       // 2020년이 아닌 뒤의 두자리 수만 필요하므로 slice 사용
    Month = stringMonth.length==1 ? '0' + stringMonth.toString() :stringMonth.toString() ; // 한자리 수 인경우 앞에 0을 붙인다.
    Day = tDate.getDate().toString().length==1? '0'+tDate.getDate().toString() : tDate.getDate().toString();
    date_array.push(Year+Month+Day);    //합친 내용을 배열로 만들어 준다.
  }
  return date_array;     //해당 배열을 반환한다.
}

const checkDuring = (day) => {
  const $sample = {
    '1주일' : 7,
    '2주일' :  14,
    '3주일' : 21,
    '한달' : 30
  }
  return $sample[day];
}
