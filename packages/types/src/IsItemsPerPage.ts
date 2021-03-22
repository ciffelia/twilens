import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  isInt
} from 'class-validator'

@ValidatorConstraint({ name: 'isItemsPerPage', async: false })
class IsItemsPerPageConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    return isInt(value) && (value === -1 || value > 0)
  }
}

const IsItemsPerPage = (validationOptions?: ValidationOptions) => {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isItemsPerPage',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsItemsPerPageConstraint
    })
  }
}

export { IsItemsPerPageConstraint, IsItemsPerPage }
