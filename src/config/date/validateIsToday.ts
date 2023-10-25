import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsBeforeEndOfDayTodayConstraint implements ValidatorConstraintInterface {
    validate(dateValue: any, args: ValidationArguments) {
        let date: Date;

        if (dateValue instanceof Date) {
            date = dateValue;
        } else {
            date = new Date(dateValue);
        }

        if (isNaN(date.getTime())) {
            return false; // not a valid date
        }

        const now = new Date();
        // convert both dates to yyyy-mm-dd format for comparison
        const inputDateStr = date.toISOString().split('T')[0];
        const nowDateStr = now.toISOString().split('T')[0];
        return inputDateStr <= nowDateStr;
    }

    defaultMessage(args: ValidationArguments) {
        return 'Tanggal tidak boleh melebihi akhir hari ini.';
    }
}



export function IsBeforeEndOfDayToday(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isBeforeEndOfDayToday',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: IsBeforeEndOfDayTodayConstraint
        });
    };
}
