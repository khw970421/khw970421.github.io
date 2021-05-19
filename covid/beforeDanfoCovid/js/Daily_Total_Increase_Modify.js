import {url} from '../../Modify_Danfo/js/utils/Data.js'
async function load () {
  const get_date = [];
  const get_sum = [];
  const datas = await Promise.all(['200304','200305','200306','200307','200308','200309','200310','200311','200312','200313'].map(date =>
    dfd.read_csv(`${url}${date}.csv`)
  ));
  datas.forEach(data => {
    get_sum.push(data.body__items__item__incDec.data[data.body__items__item__incDec.data.length - 1]);
    get_date.push(data.body__items__item__stdDay.data[0]);
  })
  let df_sum1 = new dfd.DataFrame({'sum':get_sum},{index:get_date});  //df_sum은 Series 형태이므로 DataFrame 형태로 변환
  df_sum1.plot('plot').line();
}

load();
