import {url} from './utils/Data.js'
import {Set_Date} from "./utils/Set_Date.js";

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






