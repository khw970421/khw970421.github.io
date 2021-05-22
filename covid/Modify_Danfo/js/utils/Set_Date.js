let start = '2020-03-03'
let end = '2020-12-31'

function Set_Date(){
  let sdt = new Date(start); // 2020년 03월 04일 부터 시작
  let edt = new Date(end);
  let dateDiff = Math.ceil((edt.getTime()-sdt.getTime())/(1000*3600*24));

  let Year,Month,Day;                 // 각 날짜별 날짜 생성
  const date_array = [];              // 해당 필요부분 넣을 배열 생성
  for(let i=0;i<dateDiff;i++)              // 2020년 3월 4일부터 마지막 데이터 csv까지의 날짜의 차이에서 +1 한 값이 150 (ex 현재는 7월 31일까지)
  {
    sdt.setDate(sdt.getDate()+1)        // 3월 4일 계산 후 하루씩 증가
    Year = sdt.getFullYear().toString().slice(2,4);       // 2020년이 아닌 뒤의 두자리 수만 필요하므로 slice 사용
    Month = (sdt.getMonth()+1).toString().length==1 ? '0'+ (sdt.getMonth()+1).toString() :(sdt.getMonth()+1).toString() ; // 한자리 수 인경우 앞에 0을 붙인다.
    Day = sdt.getDate().toString().length==1? '0'+sdt.getDate().toString() : sdt.getDate().toString();
    date_array.push(Year+Month+Day);    //합친 내용을 배열로 만들어 준다.
  }
  return date_array;     //해당 배열을 반환한다.
}

export {Set_Date,end}
