import {createApp} from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
const app = {
  data(){
    return {
      apiUrl:"https://vue3-course-api.hexschool.io",
      apiPath:"fang-vueclass",
      products: [],
      tempProducts:{},
    }
  },
  methods:{
    //確認登入狀態
    checkLogin(){
      const api = `${this.apiUrl}/v2/api/user/check`;
      axios.post(api)
        .then((res)=>{
          if(res.data.success){
            alert("登入成功!");
          }
          this.getProducts();
        })
        .catch((err)=>{
          alert(err.response.data.message);
          window.location = "login.html";
        })
    },

    //產品列表
    getProducts(){
      const api = `${this.apiUrl}/v2/api/${this.apiPath}/admin/products`;
      axios.get(api)
        .then((res)=>{
          this.products = res.data.products;
        })
        .catch((err)=>{
          alert(err.response.data.message);
        })

    },
    //查看產品細節
    checkDetail(detail){
      this.tempProducts = {...detail};
    },
  },

  mounted(){
    //從cookie取token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)vueToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;

    this.checkLogin();
  }
};

createApp(app).mount("#app");