"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsBeforeEndOfDayToday = exports.IsBeforeEndOfDayTodayConstraint = void 0;
const class_validator_1 = require("class-validator");
let IsBeforeEndOfDayTodayConstraint = class IsBeforeEndOfDayTodayConstraint {
    validate(dateValue, args) {
        let date;
        if (dateValue instanceof Date) {
            date = dateValue;
        }
        else {
            date = new Date(dateValue);
        }
        if (isNaN(date.getTime())) {
            return false;
        }
        const now = new Date();
        const inputDateStr = date.toISOString().split('T')[0];
        const nowDateStr = now.toISOString().split('T')[0];
        return inputDateStr <= nowDateStr;
    }
    defaultMessage(args) {
        return 'Tanggal tidak boleh melebihi akhir hari ini.';
    }
};
exports.IsBeforeEndOfDayTodayConstraint = IsBeforeEndOfDayTodayConstraint;
exports.IsBeforeEndOfDayTodayConstraint = IsBeforeEndOfDayTodayConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: false })
], IsBeforeEndOfDayTodayConstraint);
function IsBeforeEndOfDayToday(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isBeforeEndOfDayToday',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: IsBeforeEndOfDayTodayConstraint
        });
    };
}
exports.IsBeforeEndOfDayToday = IsBeforeEndOfDayToday;
//# sourceMappingURL=validateIsToday.js.map