document.querySelector('#admin').addEventListener('click',()=>{
  let password = prompt('비밀번호를 입력해주세요');
  if(password != Number(1234))
    alert('관리자 접속 불가');
  else{
    let date = prompt('업데이트에 적용할 날짜를 입력해주세요(yyyy-mm-dd)');
    fetch('https://coronaproject.herokuapp.com/api/covidDate',{
      method:"PUT",
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify({"date":date})}).then(res=>res.json()).then(data=>console.log(data))
  }
})
