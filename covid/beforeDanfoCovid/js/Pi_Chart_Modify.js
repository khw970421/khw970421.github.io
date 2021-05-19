import {url} from '../../Modify_Danfo/js/utils/Data.js'

let input = document.getElementById('input')
let button = document.getElementById('but');


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


button.addEventListener('click',function(){
  dfd.read_csv(`${url}${input.value.replace(/-/gi,'').slice(2,8)}.csv`)
    .then(
      function(data) {
        const incDec_Length_Except_Sum = data.body__items__item__incDec.data.length-1;
        const gubun_Length_Except_Sum = data.body__items__item__gubun.data.length-1;

        let df = new dfd.DataFrame({
          Increase: data.body__items__item__incDec.data.slice(0,incDec_Length_Except_Sum),   //표의 맨 아래 합계를 제거한 내용들
          Location : data.body__items__item__gubun.data.slice(0,gubun_Length_Except_Sum),
          Type: data.body__items__item__gubun.data.slice(0,gubun_Length_Except_Sum)
        })

        const location = df.Location.data;
        const Increase = df.Increase.data;
        document.querySelector('.but').addEventListener('click',()=>downloadCSV(location,Increase));

        df.plot("plot_div").pie({ values: "Increase", labels: "Type" })
      }
    )
    .catch(() => {
      alert('저장된 데이터 이외의 날짜를 클릭했습니다.');
    })
});
