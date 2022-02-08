function statement(invoice, plays) {

    function totalAmount(){
        let result = 0;
        for (let perf of invoice[0].performances){
            result += amountFor(perf);
        }
        return result;
    }

    function totalVolumeCredits(){
        let result = 0;
        for (let perf of invoice[0].performances){ // 반복문 쪼개기
            result += volumeCreditsFor(perf); // 함수 적용
        }
        return result;
    }

    function usd(aNumber){
        return new Intl.NumberFormat("en-US",
                                    {style : "currency",currency: "USD",
                                minimumFractionDigits:2}).format(aNumber/100);

    }
    function volumeCreditsFor(aPerformance){
        let result = 0;
        // 포인트 적립
        result += Math.max(aPerformance.audience - 30, 0);
        // 희극 관객 5명마다 추가 포인트를 제공
        if ("comedy" === playFor(aPerformance).type) result += Math.floor(aPerformance.audience/5); // 함수로 변환

        return result;

    }

    function playFor(aPerformance){
        return plays[aPerformance.playID];
    }
    // function amountFor(perf, play){ // 값이 바뀌지 않는 변수는 매개변수로 전달
    // function amountFor(aPerformance, play){ // 값이 바뀌지 않는 변수는 매개변수로 전달
    function amountFor(aPerformance){ // 값이 바뀌지 않는 변수는 매개변수로 전달
        // let thisAmount = 0; // 변수를 초기화 하는코드
        let result = 0; // 명확한 이름으로 변경
        // switch (play.type) {
        switch (playFor(aPerformance).type) {
        case "tragedy": // 비극
            result = 40000;
            if(aPerformance.audience > 30){
                result += 1000 * ( aPerformance.audience - 30);
            }
            break;
        case "comedy": // 희극
            result = 30000;
            if(aPerformance.audience > 20){
                result += 10000 + 500 * ( aPerformance.audience - 20);
            }
            result += 300 * aPerformance.audience;
            break;
        default:
            // throw new Error(`알수없는장르 : ${play.type}`);
            throw new Error(`알수없는장르 : ${playFor(aPerformance).type}`);
        }
        return result; // 함수안에서 값이 바뀌는 변수 변환
    }

    // let totalAmount = totalAmount();
    let result = `청구 내역 ( 고객명 : ${invoice[0].customer})\n`;
    // const format = new Intl.NumberFormat("en-US",
    //                                 {style : "currency",currency: "USD",
    //                             minimumFractionDigits:2}).format;
    for (let perf of invoice[0].performances){
        // const play = plays[perf.playID];
        // const play = playFor(perf); // 함수로 변환
        // let thisAmount = amountFor(perf,play); // 추출한 함수를 이용
        // let thisAmount = amountFor(perf,playFor(perf)); // 함수로 변환
        // let thisAmount = amountFor(perf); // 함수로 변환

        // 포인트 적립
        // volumeCredits += Math.max(perf.audience - 30, 0);
        // volumeCredits += volumeCreditsFor(perf); // 함수 적용
        // 희극 관객 5명마다 추가 포인트를 제공
        // if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience/5);
        // if ("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience/5); // 함수로 변환

        // 청구내역을 출력
        // result += ` ${play.name}: ${format(thisAmount/100)} (${perf.audience} 석) \n`;
        // result += ` ${playFor(perf).name}: ${format(thisAmount/100)} (${perf.audience} 석) \n`; // 함수로 변환
        // result += ` ${playFor(perf).name}: ${format(amountFor(perf)/100)} (${perf.audience} 석) \n`; // 함수로 변환
        result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} 석) \n`; // 함수로 변환
        // totalAmount += thisAmount;
        // totalAmount += amountFor(perf);
    }

    let volumeCredits = totalVolumeCredits();
    // for (let perf of invoice[0].performances){ // 반복문 쪼개기
    //     volumeCredits += volumeCreditsFor(perf); // 함수 적용
    // }
    

    // result += ` 총액 : ${format(totalAmount/100)}\n`;
    result += ` 총액 : ${usd(totalAmount())}\n`;
    result += ` 적립포인트 : ${volumeCredits} 점 \n`;
    return result;
}


export default statement;