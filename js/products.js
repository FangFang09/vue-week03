import {createApp} from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";


let productModal = null;
let delProductModal = null;

const app = {
  data(){
    return {
      apiUrl:"https://vue3-course-api.hexschool.io",
      apiPath:"fang-vueclass",
      products: [],
      isNew:false,
      tempProduct:{
        imgUrl:[],
      },

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

    //取得產品列表
    getProducts(){
      const api = `${this.apiUrl}/v2/api/${this.apiPath}/admin/products`;
      axios.get(api)
        .then((res)=>{
          this.products = [...res.data.products];
        })
        .catch((err)=>{
          alert(err.response.data.message);
        })

    },

    //開啟modal視窗
    openModal(status,item){
      if(status === 'new'){  //新增
        this.tempProduct = {};
        this.isNew = true;
        productModal.show();
      } else if (status === 'edit'){ //編輯
        this.tempProduct = {...item};
        this.isNew = false;
        productModal.show();
      } else if (status === 'delete'){ //刪除
        this.tempProduct = {...item};
        delProductModal.show();
      }
    },
    updateProduct(){
      //讓post和put透過判斷式執行,就不用寫兩遍
      let url = `${this.apiUrl}/v2/api/${this.apiPath}/admin/product/{${this.tempProduct.id}`;
      let http = 'put';

      if(this.isNew){
        url = `${this.apiUrl}/v2/api/${this.apiPath}/admin/product/`;
        http = 'post';
      }
      axios[http](url,{data:this.tempProduct})
        .then((res)=>{
          alert(res.data.message);
          openModal.hide();
          this.getProducts();
        })
        .catch((err)=>{
          alert(err.response.data.message);
        })



    },
    //刪除
    delProduct(){
      const url = `${this.apiUrl}/v2/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
      axios.delete(url)
        .then((res)=>{
          alert(res.data.message);
          delProductModal.hide();
          this.getProducts();
        })
        .catch((err)=>{
          alert(err.response.data.message);
        })
    }
  },

  mounted(){
    //從cookie取token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)vueToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;

    this.checkLogin();


    //modal實體化
    productModal = new bootstrap.Modal(
      document.querySelector("#productModal"),
      {
        keyboard:false,
        backdrop:'static'
      }
    );
    //delProductModal實體化
    delProductModal = new bootstrap.Modal(
      document.querySelector("#delProductModal"),
      {
        keyboard:false,
        backdrop:'static'
      }
    );

  }
};

createApp(app).mount("#app");