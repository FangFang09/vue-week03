import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
const app = {
  data(){
    return{
      user:{
        username:'',
        password:''
      },
      apiUrl:"https://vue3-course-api.hexschool.io",

    }
  },
  methods:{
    //登入
    login(){
      axios.post(`${this.apiUrl}/v2/admin/signin`,this.user)
        .then((res)=>{
          const { token,expired } = res.data;
          //token和expired存到cookie
          document.cookie = `vueToken=${token}; expires=${new Date(expired)}; `;
          window.location = "products.html"; //到products頁面

        })
        .catch((error)=>{
          alert(error.data.message);
        })
    },

  },
};

createApp(app).mount("#app");
