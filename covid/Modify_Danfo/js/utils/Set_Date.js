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

export {Set_Date}
