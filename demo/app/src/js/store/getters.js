/**
 * getters 用来对state的延伸，即当现有state不足以用来满足业务的时候使用
 * 与ng的filter类似
 * 与vuex结合使用需要在入口模板处使用mapGetters方法混入
  */
export const changeMessage = state => {
    return `test message: ${state.list.message}`;
};