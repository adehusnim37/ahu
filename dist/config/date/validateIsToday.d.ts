import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare class IsBeforeEndOfDayTodayConstraint implements ValidatorConstraintInterface {
    validate(dateValue: any, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare function IsBeforeEndOfDayToday(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
