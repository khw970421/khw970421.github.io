import {url} from '../../Modify_Danfo/js/utils/Data.js'
let input1 = document.getElementById('city1')
let input2 = document.getElementById('city2')
let button = document.getElementById('but');

button.addEventListener('click',getServerData);

function getServerData() {

    async function load() {
      try {
        const get_date = [];
        const get1 = [], get2 = [];
        let city_index1, city_index2;
        let city_name1 = input1.options[input1.selectedIndex].text;
        let city_name2 = input2.options[input2.selectedIndex].text;

        const datas = await Promise.all(setDate().map(date => {
            return dfd.read_csv(`${url}${date}.csv`)
          }
        ));         //모든 데이터 값 읽어오기

        datas[0].body__items__item__gubun.data.forEach((data) => {
          if (data == city_name1)
            city_index1 = datas[0].body__items__item__gubun.data.indexOf(data);
          if (data == city_name2)
            city_index2 = datas[0].body__items__item__gubun.data.indexOf(data);
        });         //해당 지역을 가진 index 찾기

        datas.forEach(data => {
          get1.push(data.body__items__item__incDec.data[city_index1]);
          get2.push(data.body__items__item__incDec.data[city_index2]);
          get_date.push(data.body__items__item__stdDay.data[0]);
        })      //해당 지역을 가진 index를 통해 날짜별 증가량 배열에 저장

        let df_sum1 = new dfd.DataFrame({city_name1: get1, city_name2: get2}, {index: get_date});  //df_sum은 Series 형태이므로 DataFrame 형태로 변환
        df_sum1.plot('plot').line();        // 각각의 지역의 증가량 출력
      }
      catch(err){
        alert('데이터가 존재하지 않거나 잘못되었습니다.');
      }
    }

  load();
}

function setDate(){
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

function checkDuring(day){
  const $sample = {
    '1주일' : 7,
    '2주일' :  14,
    '3주일' : 21,
    '한달' : 30
  }
  return $sample[day];
}
