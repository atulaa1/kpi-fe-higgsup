"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var base_constant_1 = require("../glossary/base.constant");
var ClubService = /** @class */ (function () {
    function ClubService(http, httpService) {
        this.http = http;
        this.httpService = httpService;
        this.clubUrl = base_constant_1.BaseConstant.protocol.toString() + base_constant_1.BaseConstant.server.toString()
            + base_constant_1.BaseConstant.standardServicePort.toString() + '/api/clubs';
        this.createdClubUrl = base_constant_1.BaseConstant.protocol.toString() + base_constant_1.BaseConstant.server.toString()
            + base_constant_1.BaseConstant.standardServicePort.toString() + '/api/groups/clubs';
        this.httpOptions = this.httpService.setHeaderToken();
    }
    ClubService.prototype.addClub = function (club) {
        return this.http.post(this.clubUrl, club, this.httpOptions);
    };
    ClubService.prototype.updateClub = function (id, club) {
        return this.http.put(this.createdClubUrl + "/" + id, club, this.httpOptions);
    };
    ClubService = __decorate([
        core_1.Injectable({
            providedIn: 'root',
        })
    ], ClubService);
    return ClubService;
}());
exports.ClubService = ClubService;
