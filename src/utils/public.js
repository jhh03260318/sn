export const sntype = (temp,data)=>{
    // 判断授权类型
    switch (data) {
        case '0':
            temp.sntype = '60天试用';
            break;
        case '1':
            temp.sntype = '90天试用';
            break;
        case '2':
            temp.sntype = '180天试用';
            break;
        case '3':
            temp.sntype = '360天试用';
            break;
        case '4':
            temp.sntype = '正式(4)';
            break;
        case '5':
            temp.sntype = '正式(5)';
            break;
        case '6':
            temp.sntype = '正式(6)';
            break;
        case '7':
            temp.sntype = '正式(80)';
            break;
        case '8':
            temp.sntype = '正式(100)';
            break;
        default:
            temp.sntype = '未知';
            break;
    }
}