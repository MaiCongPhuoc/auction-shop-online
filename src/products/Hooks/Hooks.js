
export const FormatMoney = (money) => {
    let str = money.toString();
    return str.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + ' ')) + prev;
    });
}

