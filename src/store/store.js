import { __assign } from "tslib";
import { createStore } from 'vuex';
var store = createStore({
    state: {
        age: 1,
        user: {
            id: 0,
            userName: '',
            isLogin: false,
            userPd: ''
        },
        loading: false
    },
    mutations: {
        addAge: function (state, data) {
            state.age = data;
        },
        login: function (state, userInfo) {
            state.user.userName = userInfo.userName;
            state.user.isLogin = true;
        },
        loginOut: function (state) {
            state.user = __assign(__assign({}, state.user), { isLogin: false, userName: '' });
        },
        handelLoading: function (state, flag) {
            state.loading = flag;
        }
    },
    actions: {
        asaddAge: function (_a, data) {
            var commit = _a.commit;
            setTimeout(function () {
                commit('addAge', data);
            }, 2000);
        }
    }
});
export default store;
//# sourceMappingURL=store.js.map