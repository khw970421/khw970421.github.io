import {url} from './Data.js'

const lineButton = document.getElementById('lineButton')
const barButton = document.getElementById('barButton')
const cancelLine = document.getElementById('cancelLine')
const cancelBar = document.getElementById('cancelBar')

function downloadCSV(location, increase){
  let array = [];
  array.push(location);
  array.push(increase);

  let val = "";

  // jquery 사용하지 않는 경우
  for (let j = 0; j < location.length; j++) {
    val += array[0][j]+',';
  }
  val +=  "\r\n";
  for(let k=0;k<increase.length;k++){
    val += array[1][k]+',';
  }
  val +=  "\r\n";

  let downloadLink = document.createElement("a");
  let blob = new Blob(["\ufeff"+val], { type: "text/csv;charset=utf-8" });
  let url = URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.download = "data.csv";

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}



const startLineChart = function(){
  load().then((value)=>{value.plot('line').line();})
}
const startBarChart = function(){
  load().then((value)=>{value.plot('bar').bar();})
}

const cancelLineChart = function(){
  if(document.getElementById('line').childNodes[0]==undefined){
    alert('삭제할 내용이 없어');
    return 0;
  }

  const chart = confirm("Line 차트를 지우겠습니까?");
  if (chart == false)
    alert('지우기 취소')
  else
    document.querySelector('#line > .plot-container').remove();
}

const cancelBarChart = function(){
  if(document.getElementById('bar').childNodes[0]==undefined){
    alert('삭제할 내용이 없어');
    return 0;
  }

  const chart = confirm("Bar 차트를 지우겠습니까?");
  if (chart == false)
    alert('지우기 취소')
  else
    document.querySelector('#bar > .plot-container').remove();
}


lineButton.addEventListener('click',startLineChart);
barButton.addEventListener('click',startBarChart);
cancelLine.addEventListener('click',cancelLineChart);
cancelBar.addEventListener('click',cancelBarChart);

async function load () {
  const get_date = [];
  const get_sum = [];

  const datas = await Promise.all(Set_Date().map(date =>
    dfd.read_csv(`${url}${date}.csv`)
  ));
  datas.forEach(data => {
    get_sum.push(data.body__items__item__incDec.data[data.body__items__item__incDec.data.length - 1]);
    get_date.push(data.body__items__item__createDt.data[0].slice(2,10));
  })

  let df_sum = new dfd.DataFrame({'sum':get_sum},{index:get_date});  //df_sum은 Series 형태이므로 DataFrame 형태로 변환

  document.querySelector('.but').addEventListener('click',()=>downloadCSV(df_sum.index_arr,df_sum.data));

  return df_sum;
  //df_sum.plot('bar').bar();
}

function Set_Date(){
  let tDate = new Date('2020-03-03'); // 2020년 03월 04일 부터 시작
  let Year,Month,Day;                 // 각 날짜별 날짜 생성
  const date_array = [];              // 해당 필요부분 넣을 배열 생성
  for(let i=0;i<150;i++)
  {
    tDate.setDate(tDate.getDate()+1)        // 3월 4일 계산 후 하루씩 증가
    Year = tDate.getFullYear().toString().slice(2,4);       // 2020년이 아닌 뒤의 두자리 수만 필요하므로 slice 사용
    Month = (tDate.getMonth()+1).toString().length==1 ? '0'+ (tDate.getMonth()+1).toString() :(tDate.getMonth()+1).toString() ; // 한자리 수 인경우 앞에 0을 붙인다.
    Day = tDate.getDate().toString().length==1? '0'+tDate.getDate().toString() : tDate.getDate().toString();
    date_array.push(Year+Month+Day);    //합친 내용을 배열로 만들어 준다.
  }
  return date_array;     //해당 배열을 반환한다.
}



