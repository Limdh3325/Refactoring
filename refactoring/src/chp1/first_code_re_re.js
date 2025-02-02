// export {statement}
// export {htmlStatement}

import { createStatementData } from "./createStatementData";

// function htmlStatement(invoice, plays) {
//     return renderHtml(createStatementData(invoice, plays));
// }
// function renderHtml(data) {
//     let result = `<h1>Statement for ${data.customer}</h1>\n`;
//     result += "<table>\n";
//     result += "<tr><th>play</th><th>seats</th><th>cost</th></tr>";
//     for (let perf of data.performances) {
//         result += `  <tr><td>${perf.play.name}</td><td>${perf.audience}</td>`;
//         result += `<td>${usd(perf.amount)}</td></tr>\n`;
//     }
//     result += "</table>\n";
//     result += `<p>Amount owed is <em>${usd(data.totalAmount)}</em></p>\n`;
//     result += `<p>You earned <em>${data.totalVolumeCredits}</em> credits</p>\n`;
//     return result;
// }

function usd(aNumber){
    return new Intl.NumberFormat("en-US",
                                {style : "currency",currency: "USD",
                            minimumFractionDigits:2}).format(aNumber/100);
}

function statement(invoice, plays) {
    return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainText(data){ // 중간 데이터 인수로전달

    let result = `청구 내역 ( 고객명 : ${data.customer})\n`;
    for (let perf of data.performances){
        result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} 석) \n`; // 함수로 변환
    }
    result += ` 총액 : ${usd(data.totalAmount)}\n`;
    result += ` 적립포인트 : ${data.totalVolumeCredits} 점 \n`;

    return result;
}

export default statement;