from bs4 import BeautifulSoup as bs
import requests
import csv
import re
from datetime import datetime


# html로 작성된 웹페이지 코드를 반환
# html언어 구조: <태그 속성=속성값> 텍스트 </태그>



html = requests.get('http://ncov.mohw.go.kr/')
soup = bs(html.text,'html.parser')

# find(태그, {속성: 속성값})
# 처음 매칭된 1개의 값만 반환
data1 = soup.find('div',{'class':'datalist'})   #


# findAll(태그)
# 매칭된 모든 값을 리스트 형태로 반환
data2 = data1.findAll('li')

# 국내 코로나 출력
fine_dust = data2[0].find('span',{'class':'data'}).text
print("일일 국내 코로나 발생자",fine_dust)


# 해외 유입 확진자
ultra_fine_dust = data2[1].find('span',{'class':'data'}).text
print("해외 유입 확진자", ultra_fine_dust)


#누적확진자
data3 = soup.find('ul',{'class':'liveNum'})   #
data4 = data3.findAll('li')
mini = data4[0].find('span',{'class':'num'}).text   #index1부터 시작한 이유는 (누적)을 없애기 위해서
print("누적확진환자",mini)
mini2 = data4[0].find('span',{'class':'before'}).text
print("전일대비",mini2)

#사망자
dead = data4[3].find('span',{'class':'num'}).text   #index1부터 시작한 이유는 (누적)을 없애기 위해서
print("사망자",dead)
dead_today = data4[3].find('span',{'class':'before'}).text
print("오늘 사망자",dead_today)

#누적확진자 숫자만 추출하기위해
result = [int(d) for d in re.findall(r'-?\d+', mini)]   # -? : 음수, \d+ : 여러자리 숫자
print(result[0],result[1])
#전일대비 확진자 숫자만 추출
result2 = [int(d) for d in re.findall(r'-?\d+', mini2)]   # -? : 음수, \d+ : 여러자리 숫자
print(result2[0])

#격리해제, 당일 격리 해제
tit = data4[1].find('span',{'class':'num'}).text   #index1부터 시작한 이유는 (누적)을 없애기 위해서
print("격리해제",tit)
tit2 = data4[1].find('span',{'class':'before'}).text
print("당일 격리해제",tit2)

#치료 중
tit3 = data4[2].find('span',{'class':'num'}).text   #index1부터 시작한 이유는 (누적)을 없애기 위해서
print("치료중",tit3)
tit4 = data4[2].find('span',{'class':'before'}).text
print("격리 중",tit4)

today = datetime.today()
todaytime = datetime.today().hour
# 현재 날짜 가져오기
print(today.strftime("%Y-%m-%d"))
print(today.strftime("%Y/%m/%d %H:%M:%S"))

#16개 지역
data5 = soup.find('div',{'class':'rssm_graph'})
data6 = data5.findAll('button')

Seoul  = data6[0].find('span',{'class':'name'}).text
Seoul_num= data6[0].find('span',{'class':'num'}).text
Busan = data6[1].find('span',{'class':'name'}).text
Busan_num = data6[1].find('span',{'class':'num'}).text
Daegu = data6[2].find('span',{'class':'name'}).text
Daegu_num =data6[2].find('span',{'class':'num'}).text
Incheon = data6[3].find('span',{'class':'name'}).text
Incheon_num = data6[3].find('span',{'class':'num'}).text
Gwangju = data6[4].find('span',{'class':'name'}).text
Gwangju_num = data6[4].find('span',{'class':'num'}).text
Daejeon =data6[5].find('span',{'class':'name'}).text
Daejeon_num = data6[5].find('span',{'class':'num'}).text
Ulsan = data6[6].find('span',{'class':'name'}).text
Ulsan_num =data6[6].find('span',{'class':'num'}).text
Sejong =data6[7].find('span',{'class':'name'}).text
Sejong_num = data6[7].find('span',{'class':'num'}).text
Gyeonggi =data6[8].find('span',{'class':'name'}).text
Gyeonggi_num =data6[8].find('span',{'class':'num'}).text
Gangwon =data6[9].find('span',{'class':'name'}).text
Gangwon_num =data6[9].find('span',{'class':'num'}).text
Chungbuk = data6[10].find('span',{'class':'name'}).text
Chungbuk_num = data6[10].find('span',{'class':'num'}).text
Chungcheongnam = data6[11].find('span',{'class':'name'}).text
Chungcheongnam_num = data6[11].find('span',{'class':'num'}).text
Jeonbuk = data6[12].find('span',{'class':'name'}).text
Jeonbuk_num = data6[12].find('span',{'class':'num'}).text
Jeonnam = data6[13].find('span',{'class':'name'}).text
Jeonnam_num = data6[13].find('span',{'class':'num'}).text
Gyeongbuk = data6[14].find('span',{'class':'name'}).text
Gyeongbuk_num = data6[14].find('span',{'class':'num'}).text
Gyeongsangnam = data6[15].find('span',{'class':'name'}).text
Gyeongsangnam_num = data6[15].find('span',{'class':'num'}).text
Jeju = data6[16].find('span',{'class':'name'}).text
Jeju_num =  data6[16].find('span',{'class':'num'}).text

print(Gyeongbuk,Gyeongbuk_num)
#data1 = soup.find('div',{'class':'datalist'})   
#data2 = data1.findAll('li')
#fine_dust = data2[0].find('span',{'class':'data'}).text
#print("일일 국내 코로나 발생자",fine_dust)



#file = open('hello.txt', 'w')    # hello.txt 파일을 쓰기 모드(w)로 열기. 파일 객체 반환
#file.write(str(fine_dust)+","+str(ultra_fine_dust))      # 파일에 문자열 저장
#file.close()

#f = open('hello.csv','w', newline='')
#wr = csv.writer(f)
#wr.writerow([1,str(fine_dust)])
#wr.writerow([2,str(ultra_fine_dust)])
#f.close()

file = open('crawler/korea_corona.html', 'w')    # 일일 코로나 확진자
file.write('<div class="daydata">'+'<h1>'+'<p style ="color:rgb(255, 255, 255)">'+'+'+str(fine_dust)+'</p></h1>'+'</div>')      # 파일에 문자열 저장
file.close()

file = open('crawler/world_corona.html', 'w')    # 해외 유입 확진자
file.write('<div class="daydata">'+'<h1>'+'<p style ="color:rgb(255, 255, 255)">'+'+'+str(ultra_fine_dust)+'</p></h1>'+'</div>')
file.close()

file = open('crawler/mini_corona.html', 'w')    # 누적확진자
file.write('<div class="daydata">'+'<h2>'+'<p style ="color:rgb(255, 255, 255)">'+str(result[0])+','+str(result[1])+'(+ '+str(result2[0])+')'+'</p></h2>'+'</div>')
file.close()

file = open('crawler/dead_corona.html', 'w')    # 사망자
file.write('<div class="daydata">'+'<h1>'+'<p style ="color:rgb(255, 255, 255)">'+str(dead)+str(dead_today)+'</p></h1>'+'</div>')
file.close()

file = open('crawler/tit.html', 'w')    # 격리해제
file.write('<div class="daydata">'+'<h2>'+'<p style ="color:rgb(255, 255, 255)">'+str(tit)+str(tit2)+'</p></h2>'+'</div>')
file.close()

file = open('crawler/tit2.html', 'w')    # 치료중
file.write('<div class="daydata">'+'<h2>'+'<p style ="color:rgb(255, 255, 255)">'+str(tit3)+str(tit4)+'</p></h2>'+'</div>')
file.close()

file = open('crawler/date2.html', 'w', encoding="UTF-8")    # 업데이트 날짜
file.write('<div class="daydata">'+'<h4>'+'<p style ="color:rgb(0, 0, 0)">'+'Update : '+str(today.strftime("%Y/%m/%d %H:%M:%S"))+'</p></h4>'+'</div>')
file.close()

file = open('crawler/stage.html', 'w', encoding="UTF-8")    # 업데이트 날짜
file.write('<div class="daydata">'+'<h4>'+'<p style ="color:rgb(0, 0, 0)">'

+str(Seoul)+' : '+str(Seoul_num)+'단계<br>'
+str(Busan)+' : '+str(Busan_num)+'단계<br>'
+str(Daegu)+' : '+str(Daegu_num)+'단계<br>'
+str(Incheon)+' : '+str(Incheon_num)+'단계<br>'
+str(Gwangju)+' : '+str(Gwangju_num)+'단계<br>'
+str(Daejeon)+' : '+str(Daejeon_num)+'단계<br>'
+str(Ulsan)+' : '+str(Ulsan_num)+'단계<br>'
+str(Sejong)+' : '+str(Sejong_num)+'단계<br>'
+str(Gyeonggi)+' : '+str(Gyeonggi_num)+'단계<br>'
+str(Gangwon)+' : '+str(Gangwon_num)+'단계<br>'
+str(Chungbuk)+' : '+str(Chungbuk_num)+'단계<br>'
+str(Chungcheongnam)+' : '+str(Chungcheongnam_num)+'단계<br>'
+str(Jeonbuk)+' : '+str(Jeonbuk_num)+'단계<br>'
+str(Jeonnam)+' : '+str(Jeonnam_num)+'단계<br>'
+str(Gyeongbuk)+' : '+str(Gyeongbuk_num)+'단계<br>'
+str(Gyeongsangnam)+' : '+str(Gyeongsangnam_num)+'단계<br>'
+str(Jeju)+' : '+str(Jeju_num)+'단계<br>'

+'</p></h4>'+'</div>')
file.close()

###########################################
