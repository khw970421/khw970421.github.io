코로나 관련 내용 진행상황

2021/03/04

### 현재 완성된 결과물 (총 5개)

(1) Compare_City2.html , Compare_City2.js (다운로드 미구현, 가장 어려울듯 선택지마다 혼자만 Series형태가 아닌 dataframe 형태이다.)
> 두 지역간의 어떤 기간동안의 증가량 비교 그래프 출력 (여러지역 추가 가능)

(2) Daily_Increase_Day.html, Daily_Increase_Day.js (다운로드 미구현, 쉽긴 할듯)
> 숫자를 입력 후 enter를 치면 해당 숫자보다 많은 일일 코로나 확진자를 가진 날짜가 표로 출력

(3) Daily_Total_Increase_Modify2.html, Daily_Total_Increase_Modify2.js (다운로드 구현)
> 일일 코로나 확진자 수를 20년 3월 3일부터 데이터를 가져온 때까지의 그래프 결과 출력, 혹은 Bar 결과 출력 (취소 가능)
 
 
(4) Pi_Chart_Bar_Chart.html, Pi_Chart_Bar_Chart.js (다운로드 구현)
> 원하는 날짜를 지정한 후 해당날짜의 원차트 혹은 막대차트 출력 (취소 가능) 
 
  (4-1) Pi_Chart_Modify.html (다운로드 구현)
  > Pi_Chart_Bar_Chart.html 하위 버전으로 Pi_chart만 가능하나 현재 다운로드 기능은 여기에만 구현
  
 
 
 (5) d3_koreaMap-master
 >원하는 날짜 적용 후 해당 도시 마우스 hover시 확진자 수 확인


 ### 해야할 일 
 1. 데이터 최신화
 2. Daily_Total_Increase_Modify2.html 와 유사한 형태로
 어떤 날짜 입력시 그때까지의 
 격리해제 + 치료 중  +  사망 = 확진자 토탈 수 형태로 만들기
  

#### 난이도 1~10

1. 다운로드 기능 2개 구현 - 7

2. 데이터 증가 - 1

3. for문 차이값 계산 하는 함수추가 - 4

4. 모듈화 - 5

5. css꾸미기 - 6

6. 관리자형 문제 처리 - 10

7. 크롤링 문제 고민하여 동적인 형태 생각 고민 - 10


### 같이 해야할 것

1. web1.io -> choiwonseok9.github.io, khw970421.github.io에 영향을
한번에 하나의 레퍼지토리로 바꾸기


### 2020/05/19

1. Set_Date 부분의 날짜만 데이터가 추가되면 end변수만 바꾸면 나머지 js파일들도 적용되게 변경
2. 공유버튼 기능 추가
3. 슬라이더로 Pi_Chart_Bar_Chart 수정완료 

### 2021/05/29
1. index.html에 button 태그 추가 ( 위치는 막 잡음 기능구현 목적으로), scripts로 index.js 코드 연결
2. index.js 파일 추가
3. Modify_Danfo/js/utils/Set_Date.js 의 코드 fetch 코드 추가
`fetch('https://coronaproject.herokuapp.com/api/covidDate').then(res=>res.json()).then(obj=>{end = obj.data})`

버튼 사용방법
1. 버튼 클릭
2. 1234 비밀번호 누르고 엔터
3. 날짜 입력 ex) 2020-05-31
4. 해당 값이 서버로 요청되어 날짜 값 수정
5. 그때 언급했던 3가지 통계관련 내용들이 해당 날짜가지만 가져온다. 
 => 즉, 관리자가 버튼만 눌러서 날짜를 설정하면 
 통계는 해당 날짜까지만 가져올 수 있다. 
 
 주의 : 막 데이터보다 더 먼 날짜인 2021년 12월 31일 이렇게 설정하면 나머지 통계도 불러오기 할때 오류뜨니 관리자 부분은 주의
 
### 2021/05/30
현재 분리된 진행상황

https://khw970421.github.io/covid/Modify_Danfo/main/Corona%20Core/01_%EC%BD%94%EB%93%9C/index.html
위의 url은 현재 관리자모드가 추가된 내용과 관련한 js코드가 수정된 내용으로 heroku를 사용하여
Node.js의 express가 서버에서 돌아가 상황이다. 

http://coronacore.site/main/CoronaCore/01_code/index.html
or
http://choiwonseok9.github.io/main/CoronaCore/01_code/index.html
위의 url은 현재 관리자모드가 추가되지않았고 단지 end변수로 인해 데이터를 추가할 경우 
end변수를 수정하면 해당 만큼 데이터가 통계관련 웹에서 처리된다. 

