const FormAutoFill = new Vue({
  el: '#app',
  data: {

    // Google Apps Script 部署為網路應用程式後的 URL
    gas: 'https://script.google.com/macros/s/AKfycbwyY7oLpoZ4lbcIwIWniLZ8U_pY8e7YBK9fakeszgR_77S2u1SV/exec',

    id: '',

    // 避免重複 POST，存資料用的
    persons: {},

    // 頁面上吐資料的 data
    person: {},

    // Google Form 的 action URL
    formAction: 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSdjqlBsYS1fm1fPim3-OTC7FC7IRyCIVBSY0I80QRcSu0F7SA/formResponse',
    
    // Google Form 各個 input 的 name
    input: {
      id: 'entry.143599827',
      name: 'entry.34207673',
      gender: 'entry.1164978269',
      phone: 'entry.335294457',
      site: 'entry.1644592734995',
      msg: 'entry.1782841550'
    },

    // loading 效果要不要顯示
    loading: false
  },
  methods: {
    // ID 限填 5 碼
    limitIdLen(val) {
      if(val.length > 5) {
        return this.id =  this.id.slice(0, 5);
      }
    },
    // 送出表單
    submit() {
      // 再一次判斷是不是可以送出資料
      if(this.person.name !== undefined) {
        let params = `${this.input.id}=${this.person.id}&${this.input.name}=${this.person.name}&${this.input.gender}=${this.person.gender}&${this.input.phone}=${this.person.phone}&${this.input.site}=${this.person.site}&${this.input.msg}=${this.person.message || '無'}`;
        fetch(this.formAction + '?' + params, {
          method: 'POST'
        }).catch(err => {
            alert('提交成功。');
            this.id = '';
            this.person = {};
          })
      }
    }
  },
  watch: {
    id: function(val) {
      // ID 輸入到 5 碼就查詢資料
      if(val.length === 5) {

        // this.persons 裡沒這筆資料，才 POST
        if(this.persons[this.id] === undefined) {
          this.loading = true;
          let uri = this.gas + '?id=' + this.id;
          fetch(uri, {
            method: 'POST'
          }).then(res => res.json())
            .then(res => {
              this.persons[this.id] = res; // 把這次查詢的 id 結果存下來
              this.person = res;
              this.loading = false;
            })
        }
        // this.persons 裡有資料就吐資料
        else {
          this.person = this.persons[this.id];
        }

      }
    }
  }
})
