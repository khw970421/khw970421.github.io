window.onload = function() {
    drawMap('#container');
};

//지도
function drawMap(target) {
    var width = 700; //지도의 넓이
    var height = 700; //지도의 높이
    var initialScale = 5500; //확대시킬 값
    var initialX = -11900; //초기 위치값 X
    var initialY = 4050; //초기 위치값 Y
    var labels;

    var projection = d3.geo
        .mercator()
        .scale(initialScale)
        .translate([initialX, initialY]);
    var path = d3.geo.path().projection(projection);
    var zoom = d3.behavior
        .zoom()
        .translate(projection.translate())
        .scale(projection.scale())
        .scaleExtent([height, 800 * height])
        .on('zoom', zoom);

    var svg = d3
        .select(target)
        .append('svg')
        .attr('width', width + 'px')
        .attr('height', height + 'px')
        .attr('id', 'map')
        .attr('class', 'map');

    var states = svg
        .append('g')
        .attr('id', 'states')
        .call(zoom);

    states
        .append('rect')
        .attr('class', 'background')
        .attr('width', width + 'px')
        .attr('height', height + 'px');

    //geoJson데이터를 파싱하여 지도그리기
    d3.json('json/korea.json', function(json) {
        states
            .selectAll('path') //지역 설정
            .data(json.features)
            .enter()
            .append('path')
            .attr('d', path)
            .attr('id', function(d) {
                return 'path-' + d.properties.name_eng;
            });

        labels = states
            .selectAll('text')
            .data(json.features) //라벨표시
            .enter()
            .append('text')
            .attr('transform', translateTolabel)
            .attr('id', function(d) {
                return 'label-' + d.properties.name_eng;
            })
            .attr('text-anchor', 'middle')
            .attr('dy', '.35em')
            .text(function(d) {
                return d.properties.name;
            });
    });

    //텍스트 위치 조절 - 하드코딩으로 위치 조절을 했습니다.
    function translateTolabel(d) {
        var arr = path.centroid(d);
        if (d.properties.code == 31) {
            //서울 경기도 이름 겹쳐서 경기도 내리기
            arr[1] +=
                d3.event && d3.event.scale
                    ? d3.event.scale / height + 20
                    : initialScale / height + 20;
        } else if (d.properties.code == 34) {
            //충남은 조금 더 내리기
            arr[1] +=
                d3.event && d3.event.scale
                    ? d3.event.scale / height + 10
                    : initialScale / height + 10;
        }
        return 'translate(' + arr + ')';
    }

    function zoom() {
        projection.translate(d3.event.translate).scale(d3.event.scale);
        states.selectAll('path').attr('d', path);
        labels.attr('transform', translateTolabel);
    }



    let input = document.getElementById('input')
    let Plot_Button = document.getElementById('plot');
    let service;

    Plot_Button.addEventListener('click',function(){
        dfd.read_csv(`https://khw970421.github.io/covid/Modify_Danfo/Data/Date/${input.value.replace(/-/gi,'').slice(2,8)}.csv`)
            .then(
                function(data) {
                    const incDec_Length_Except_Sum = data.body__items__item__incDec.data.length-1;
                    const gubun_Length_Except_Sum = data.body__items__item__gubun.data.length-1;

                    df = new dfd.DataFrame({
                        Price: data.body__items__item__incDec.data.slice(0,incDec_Length_Except_Sum),   //표의 맨 아래 합계를 제거한 내용들
                    })

                    service = df.Price.data;
                    let isGunyeok = service.length == 18 ? 1 : 0;

                    let j = document.getElementById('label-Jeju-do')
                    let gn = document.getElementById('label-Gyeongsangnam-do')
                    let gb= document.getElementById('label-Gyeongsangbuk-do')
                    let jb = document.getElementById('label-Jeollabuk-do')
                    let jn = document.getElementById('label-Jeollanam-do')
                    let  cb= document.getElementById('label-Chungcheongbuk-do')
                    let  cn= document.getElementById('label-Chungcheongnam-do')
                    let  gw= document.getElementById('label-Gangwon-do')
                    let gg = document.getElementById('label-Gyeonggi-do')
                    let sj = document.getElementById('label-Sejong')
                    let us = document.getElementById('label-Ulsan')
                    let  dj= document.getElementById('label-Daejeon')
                    let  gj= document.getElementById('label-Gwangju')
                    let  ic= document.getElementById('label-Incheon')
                    let  dg= document.getElementById('label-Daegu')
                    let  bs= document.getElementById('label-Busan')
                    let  su= document.getElementById('label-Seoul')

                    j.addEventListener('mouseover',function(){
                        j.setAttribute('title',service[0+isGunyeok]);
                    });
                    gn.addEventListener('mouseover',function(){
                        gn.setAttribute('title',service[1+isGunyeok]);

                    });
                    gb.addEventListener('mouseover',function(){
                        gb.setAttribute('title',service[2+isGunyeok]);

                    });
                    jb.addEventListener('mouseover',function(){
                        jb.setAttribute('title',service[3+isGunyeok]);

                    });
                    jn.addEventListener('mouseover',function(){
                        jn.setAttribute('title',service[4+isGunyeok]);

                    });
                    cb.addEventListener('mouseover',function(){
                        cb.setAttribute('title',service[5+isGunyeok]);

                    });
                    cn.addEventListener('mouseover',function(){
                        cn.setAttribute('title',service[6+isGunyeok]);

                    });
                    gw.addEventListener('mouseover',function(){
                        gw.setAttribute('title',service[7+isGunyeok]);

                    });
                    gg.addEventListener('mouseover',function(){
                        gg.setAttribute('title',service[8+isGunyeok]);

                    });
                    sj.addEventListener('mouseover',function(){
                        sj.setAttribute('title',service[9+isGunyeok]);

                    });
                    us.addEventListener('mouseover',function(){
                        us.setAttribute('title',service[10+isGunyeok]);

                    });
                    dj.addEventListener('mouseover',function(){

                        dj.setAttribute('title',service[11+isGunyeok]);
                    });
                    gj.addEventListener('mouseover',function(){

                        gj.setAttribute('title',service[12+isGunyeok]);
                    });
                    ic.addEventListener('mouseover',function(){
                        ic.setAttribute('title',service[13+isGunyeok]);

                    });
                    dg.addEventListener('mouseover',function(){
                        dg.setAttribute('title',service[14+isGunyeok]);

                    });
                    bs.addEventListener('mouseover',function(){
                        bs.setAttribute('title',service[15+isGunyeok]);

                    });
                    su.addEventListener('mouseover',function(){
                        su.setAttribute('title',service[16+isGunyeok]);

                    });
                }
            )
            .catch(() => {

                alert('저장된 데이터 이외의 날짜를 클릭했습니다. 가능한 날짜는 20년 3월 4일 ~ 21년 6월 9일입니다.');
            })


    });

}

