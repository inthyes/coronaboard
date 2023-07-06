const axios = require('axios');
const cheerio = require('cheerio');

async function main(){
    const resp = await axios.get(
        'https://yjiq150.github.io/coronaboard-crawling-sample/dom'
    );
    
    // HTML을 파싱하고 DOM생성
    const $ = cheerio.load(resp.data);
    // CSS셀렉터로 원하는 요소 찾기
    const elemnets = $('.slide p');

    // 찾은 요소를 순회하면서 요소가 가진 텍스트 출력
    elemnets.each((idx, el) =>{
        // text()메서드를 사용하기 위해 Node 객체인el을 $로 감싸서 cherrio 객체로 변환
        console.log($(el).text());
    })
}

main();