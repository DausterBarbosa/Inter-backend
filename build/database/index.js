"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
typeorm_1.createConnection()
    .then(function () {
    console.log("Conexão com o banco de dados realizada com sucesso!!!");
})
    .catch(function (error) {
    console.log(error);
});
//# sourceMappingURL=index.js.map