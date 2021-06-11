import {url} from './utils/Data.js'

let Cancel_Plot_Button = document.getElementById('cancel_plot');
let Cancel_Bar_Button = document.getElementById('cancel_bar');

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



Cancel_Plot_Button.addEventListener('click',function(){
  if(document.getElementById('plot_div').childNodes[0]==undefined){
    alert('삭제할 내용이 없어');
    return 0;
  }

  let chart = confirm("원 차트를 지우겠습니까?");
  if (chart == false)
    alert('지우기 취소')
  else
    document.getElementById('plot_div').childNodes[0].remove();
})

Cancel_Bar_Button.addEventListener('click',function(){
  if(document.getElementById('bar_div').childNodes[0]==undefined){
    alert('삭제할 내용이 없어');
    return 0;
  }

  let chart = confirm("막대 차트를 지우겠습니까?");
  if(chart == false)
    alert('지우기 취소')
  else
    document.getElementById('bar_div').childNodes[0].remove();
})

document.querySelector('#submitBtn').addEventListener('click',()=>{
  let start = document.querySelector('#startDate').value;
  let end = document.querySelector('#endDate').value;
  if(new Date(start) - new Date(end) >= 0 ){
    alert('시작날짜가 종료날짜보다 느립니다.')
  }
  else if(new Date(end)=='Invalid Date' || new Date(end)=='Invalid Date'){
    alert('날짜를 제대로 입력하지 않았습니다.')
  }
  else {
    document.querySelector('#range').setAttribute('min', new Date(start).getTime() / 1000);
    document.querySelector('#range').setAttribute('max', new Date(end).getTime() / 1000);
    document.querySelector('#range').setAttribute('step', 86400);

    document.querySelector('#range2').setAttribute('min', new Date(start).getTime() / 1000);
    document.querySelector('#range2').setAttribute('max', new Date(end).getTime() / 1000);
    document.querySelector('#range2').setAttribute('step', 86400);
    alert('날짜 범위 수정 적용')
  }
})


$(document).ready(function() {
  $('#range').change(function(){

    var val = $(this).val();
    let result =(Unix_timestamp(val));
    document.querySelector('#div1').innerHTML= result;
    dfd.read_csv(`${url}${result.replace(/-/gi,'').slice(2,8)}.csv`)
      .then(
        function(data) {
          const incDec_Length_Except_Sum = data.body__items__item__incDec.data.length-1;
          const gubun_Length_Except_Sum = data.body__items__item__gubun.data.length-1;

          let df = new dfd.DataFrame({
            Price: data.body__items__item__incDec.data.slice(0,incDec_Length_Except_Sum),   //표의 맨 아래 합계를 제거한 내용들
            Location : data.body__items__item__gubun.data.slice(0,gubun_Length_Except_Sum),
            Type: data.body__items__item__gubun.data.slice(0,gubun_Length_Except_Sum)
          })

          document.querySelector('.but').addEventListener('click',()=>downloadCSV(df.Location.data,df.Price.data));
          df.plot("plot_div").pie({ values: "Price", labels: "Type" })

        }
      )
      .catch(() => {

        alert('저장된 데이터 이외의 날짜를 클릭했습니다.');
      })

  });

});


$(document).ready(function() {
  $('#range2').change(function() {

    var val = $(this).val();
    let result =(Unix_timestamp(val));
    document.querySelector('#div2').innerHTML= result;
    dfd.read_csv(`${url}${result.replace(/-/gi, '').slice(2, 8)}.csv`)
      .then(
        function (data) {
          const incDec_Length_Except_Sum = data.body__items__item__incDec.data.length - 1;
          const gubun_Length_Except_Sum = data.body__items__item__gubun.data.length - 1;

          let df = new dfd.DataFrame(
            {
              '확진자수': data.body__items__item__incDec.data.slice(0, incDec_Length_Except_Sum),   //표의 맨 아래 합계를 제거한 내용들
              Type  : data.body__items__item__gubun.data.slice(0, gubun_Length_Except_Sum)
            },
            {index: data.body__items__item__gubun.data.slice(0, gubun_Length_Except_Sum)}
          )

          document.querySelector('.but').addEventListener('click', () => downloadCSV(df.Location.data, df.Price.data));
          df.plot("bar_div").bar()
        }
      )
      .catch(() => {
        alert('저장된 데이터 이외의 날짜를 클릭했습니다.');
      })

  })})


function Unix_timestamp(t){
  var date = new Date(t*1000);
  var year = date.getFullYear();
  var month = "0" + (date.getMonth()+1);
  var day = "0" + date.getDate();
  return year + "-" + month.substr(-2) + "-"+ day.substr(-2)
}


