!function () {
    "use strict";
    new Vue({
        el: "#app",
        data: {
            gas: "https://script.google.com/macros/s/AKfycbxar9kWxhTU-PrWvKDdPQvEGBTlp3jqP4ogJ_WnBZoDrMHdqEGxY4BlAqd26kNvUZTRiw/exec",
            //id: "AKfycbxar9kWxhTU-PrWvKDdPQvEGBTlp3jqP4ogJ_WnBZoDrMHdqEGxY4BlAqd26kNvUZTRiw",
            //id: "1nqfxp8go8VwSElfGb4nTqRbJwX3PLBvikgdnNCeWV-o0B2Q69Ra03Tyd",
            id:"",
            persons: {},
            person: {},
            formAction: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdjqlBsYS1fm1fPim3-OTC7FC7IRyCIVBSY0I80QRcSu0F7SA/formResponse",
            input: {
                //隊編
                id: "entry.143599827",
                //姓名
                name: "entry.34207673",
                //性別
                //gender: "entry.1813787574",
                //車牌號碼
                carNum: "entry.1164978269",
                //分隊小隊
                site: "entry.335294457",
                //車款
                carType: "entry.345524945"
            }, loading: !1
        },
        methods: {
            limitIdLen: function (t) {
                if (t.length > 5) return this.id = this.id.slice(0, 5)
            },
            submit: function () {
                var t = this;
                if (void 0 !== this.person.name)
                {
                    var n = ""
                        .concat(this.input.id, "=")
                        .concat(this.person.id, "&")
                        .concat(this.input.name, "=")
                        .concat(this.person.name, "&")
                        //.concat(this.input.gender, "=")
                        //.concat(this.person.gender, "&")
                        .concat(this.input.carNum, "=")
                        .concat(this.person.carNum, "&")
                        .concat(this.input.site, "=")
                        .concat(this.person.site, "&")
                        .concat(this.input.carType, "=")
                        .concat(this.person.carType);
                    fetch(this.formAction + "?" + n, { method: "POST", credentials: "include" })
                        .catch((function (n) {
                            alert("提交成功。"),
                                t.id = "",
                            t.person = {}
                        }))
                }

            }
        },
        watch: {
            id: function (t) {
                var n = this;
                if (5 === t.length || 4=== t.length) if (void 0 === this.persons[this.id]) {
                    this.loading = !0;
                    var i = this.gas + "?id=" + this.id;
                    fetch(i, { method: "POST" })
                        .then((function (t) { return t.json() }))
                        .then((function (t) { n.persons[n.id] = t, n.person = t, n.loading = !1 }))
                } else this.person = this.persons[this.id]
            }
        }
    })
}();
