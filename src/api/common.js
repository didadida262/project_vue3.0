import axios from 'axios';
import { Root } from '../url/url';
var service = axios.create({
    baseURL: Root,
    timeout: 5000
});
var commonAPI = {
    getStart: function () {
        return service.get('/word');
    },
    login: function (userInfo) {
        return service.post('/signIn', userInfo);
    },
    getUser: function () {
        return service.get('/users');
    }
};
service.interceptors.response.use(function (res) {
    if (res.status === 200) {
        var resData = res.data;
        return resData;
    }
});
export { commonAPI };
//# sourceMappingURL=common.js.map