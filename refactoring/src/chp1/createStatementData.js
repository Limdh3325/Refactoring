export {createStatementData}


class PerformanceCalculator {
    constructor(aPerformance, aPlay) {
        this.performance = aPerformance;
        this.play = aPlay;
    }
    
    get amount() {
        throw new Error('서브클래스에서 처리하도록 설계');
    }
}

class TragedyCalculator extends PerformanceCalculator {
    get amount() {
        let result = 40000;
        if (this.performance.audience > 30) {
            result += 1000 * (this.performance.audience - 30);
        }
        return result;
    }

    get volumeCredits() {
        return Math.max(this.performance.audience - 30, 0);
    }
}

class ComedyCalculator extends PerformanceCalculator {
    get amount() {
        let result = 30000;
        if (this.performance.audience > 20) {
            result += 10000 + 500 * (this.performance.audience - 20);
        }
        result += 300 * this.performance.audience;
        return result;
    }

    get volumeCredits() {
        let volumeCredits = Math.max(this.performance.audience - 30, 0);
        // add extra credit for every ten comedy attendees
        volumeCredits += Math.floor(this.performance.audience / 5);
        return volumeCredits
    }
}

function createPerformanceCalculator(aPerformance, aPlay) {
    switch (aPlay.type) {
        case "tragedy":
            return new TragedyCalculator(aPerformance, aPlay);
        case "comedy" :
            return new ComedyCalculator(aPerformance, aPlay);
        default:
            throw new Error(`알수없는경로: ${aPlay.type}`);
    }
}
export default function createStatementData(invoice, plays) {
    const statementData = {};
    statementData.customer = invoice[0].customer;
    statementData.performances = invoice[0].performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);
    // return renderPlainText(statementData,invoice,plays); // 중간 데이터 인수로전달
    return statementData;

    // function enrichPerformance(aPerformance){
    //     const result = Object.assign({},aPerformance); // 얕은복사 수행
    //     result.play = playFor(result);
    //     result.amount = amountFor(result);
    //     result.volumeCredits = volumeCreditsFor(result);
    //     return result;

    // }

    function enrichPerformance(aPerformance) {
        const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance));
        const result = Object.assign({}, aPerformance);
        result.play = calculator.play
        result.amount = calculator.amount;
        result.volumeCredits = calculator.volumeCredits;
        return result;
    }


    function totalVolumeCredits(statementData) {
        return statementData.performances.reduce((total, performance) => total + performance.volumeCredits, 0)
    }

    function totalAmount(statementData) {
        return statementData.performances.reduce((total, aPerformance) => total + aPerformance.amount, 0)
    }

    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }

    // // function amountFor(perf, play){ // 값이 바뀌지 않는 변수는 매개변수로 전달
    // // function amountFor(aPerformance, play){ // 값이 바뀌지 않는 변수는 매개변수로 전달
    // function amountFor(aPerformance){ // 값이 바뀌지 않는 변수는 매개변수로 전달
    //     // let thisAmount = 0; // 변수를 초기화 하는코드
    //     let result = 0; // 명확한 이름으로 변경
    //     // switch (play.type) {
    //     switch (aPerformance.play.type) {
    //     case "tragedy": // 비극
    //         result = 40000;
    //         if(aPerformance.audience > 30){
    //             result += 1000 * ( aPerformance.audience - 30);
    //         }
    //         break;
    //     case "comedy": // 희극
    //         result = 30000;
    //         if(aPerformance.audience > 20){
    //             result += 10000 + 500 * ( aPerformance.audience - 20);
    //         }
    //         result += 300 * aPerformance.audience;
    //         break;
    //     default:
    //         // throw new Error(`알수없는장르 : ${play.type}`);
    //         throw new Error(`알수없는장르 : ${aPerformance.play.type}`);
    //     }
    //     return result; // 함수안에서 값이 바뀌는 변수 변환
    // }
    // function volumeCreditsFor(aPerformance){
    //     let result = 0;
    //     // 포인트 적립
    //     result += Math.max(aPerformance.audience - 30, 0);
    //     // 희극 관객 5명마다 추가 포인트를 제공
    //     if ("comedy" === aPerformance.play.type) result += Math.floor(aPerformance.audience/5); // 함수로 변환
    //     return result;
    // }

}
