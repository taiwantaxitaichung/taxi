!function () {
    "use strict";
    new Vue({
        el: "#app",
        data: {
            gas: "https://script.google.com/macros/s/AKfycbxar9kWxhTU-PrWvKDdPQvEGBTlp3jqP4ogJ_WnBZoDrMHdqEGxY4BlAqd26kNvUZTRiw/exec",
            id: "AKfycbxar9kWxhTU-PrWvKDdPQvEGBTlp3jqP4ogJ_WnBZoDrMHdqEGxY4BlAqd26kNvUZTRiw",
            persons: {},
            person: {},
            formAction: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdjqlBsYS1fm1fPim3-OTC7FC7IRyCIVBSY0I80QRcSu0F7SA/formResponse",
            input: {
                id: "entry.143599827",
                name: "entry.34207673",
                gender: "entry.1813787574",
                phone: "entry.1164978269",
                site: "entry.335294457",
                msg: "entry.345524945"
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
                        .concat(this.input.gender, "=")
                        .concat(this.person.gender, "&")
                        .concat(this.input.phone, "=")
                        .concat(this.person.phone, "&")
                        .concat(this.input.site, "=")
                        .concat(this.person.site, "&")
                        .concat(this.input.msg, "=")
                    .concat(this.person.message || "無");
                    fetch(this.formAction + "?" + n, { method: "POST" })
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
                if (5 === t.length) if (void 0 === this.persons[this.id]) {
                    this.loading = !0;
                    var i = this.gas + "?id=" + this.id;
                    fetch(i, { method: "POST" }).then((function (t) {
                        return t.json()
                    }))
                        .then((function (t) {
                            n.persons[n.id] = t, n.person = t, n.loading = !1
                        }))
                } else this.person = this.persons[this.id]
            }
        }
    })
}();
