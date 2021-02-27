// 引入axios
import axios from 'axios';
//基础路径
const baseUrl = "/api";
// const baseUrl = "";
// 响应拦截
axios.interceptors.response.use(res => {
    // console.group("本次请求的路径为:" + res.config.url)
    // console.log(res);
    return res;
});
//注册信息列表
export const resignList = () => {
    return axios({
        method: 'get',
        url: baseUrl + '/all',
    });
};
// 授权注册信息列表
export const authorized = (data) => {
    return axios({
        method: 'post',
        url: baseUrl + '/search',
        data: data
    });
};
// 注册
export const resign = (data) => {
    return axios({
        method: 'post',
        url: baseUrl + '/mksn',
        data: data
    });
};
// 登录
export const login = (data) => {
    return axios({
        method: 'post',
        url: baseUrl + '/auth',
        data
    })
}
