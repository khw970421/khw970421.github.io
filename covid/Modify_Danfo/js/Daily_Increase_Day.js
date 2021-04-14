import {url} from './Data.js'

const numberInput = document.getElementById('numberInput');

numberInput.addEventListener('keyup',(e)=>checkClick(e))
const checkClick = function(e){
  if(e.key === 'Enter' && Number.isInteger(Number(numberInput.value)))
  {
    load(numberInput.value);
  }
}

async function load (value) {
  const get_date = [];
  const get_sum = [];
  try {
    const datas = await Promise.all(Set_Date().map(date =>
      dfd.read_csv(`${url}${date}.csv`)
    ));
    datas.forEach(data => {
      get_sum.push(data.body__items__item__incDec.data[data.body__items__item__incDec.data.length - 1]);
      get_date.push(data.body__items__item__createDt.data[0].slice(2, 10));
    })
    let newSum = [];
    let newDate = [];
    get_sum.forEach((sum, index) => {
      if (sum > value) {
        newSum.push(sum);
        newDate.push(get_date[index]);
      }
    })
    const dataFrame = {'sum': newSum, 'data': newDate};
    const df = new dfd.DataFrame(dataFrame);
    df.plot('table').table();
  }
  catch(err){
    alert(err);
  }
}

function Set_Date(){
  let tDate = new Date('2020-03-03'); // 2020년 03월 04일 부터 시작
  let Year,Month,Day;                 // 각 날짜별 날짜 생성
  const date_array = [];              // 해당 필요부분 넣을 배열 생성
  for(let i=0;i<119;i++)
  {
    tDate.setDate(tDate.getDate()+1)        // 3월 4일 계산 후 하루씩 증가
    Year = tDate.getFullYear().toString().slice(2,4);       // 2020년이 아닌 뒤의 두자리 수만 필요하므로 slice 사용
    Month = (tDate.getMonth()+1).toString().length==1 ? '0'+ (tDate.getMonth()+1).toString() :(tDate.getMonth()+1).toString() ; // 한자리 수 인경우 앞에 0을 붙인다.
    Day = tDate.getDate().toString().length==1? '0'+tDate.getDate().toString() : tDate.getDate().toString();
    date_array.push(Year+Month+Day);    //합친 내용을 배열로 만들어 준다.
  }
  return date_array;     //해당 배열을 반환한다.
}




