package utils

import (
	"fmt"
	"reflect"

	"github.com/go-playground/validator/v10"
)

func PanicIfError(err error, message string) {
	if err != nil {
		panic(fmt.Sprintf("%s : %s", message, err.Error()))
	}
}

func ValidationError(err error, obj any) map[string]string {
	errors := make(map[string]string)

	if errs, ok := err.(validator.ValidationErrors); ok {
		t := reflect.TypeOf(obj)

		for _, e := range errs {
			field, _ := t.FieldByName(e.Field())
			jsonTag := field.Tag.Get("json")
			if jsonTag == "" {
				jsonTag = e.Field()
			}

			switch e.Tag() {
			case "required":
				errors[jsonTag] = fmt.Sprintf("%s is required", jsonTag)
			case "min":
				errors[jsonTag] = fmt.Sprintf("%s must be at least %s characters", jsonTag, e.Param())
			case "datetime":
				errors[jsonTag] = fmt.Sprintf("%s must be a valid date with format YYYY-MM-DD", jsonTag)
			case "oneof":
				errors[jsonTag] = fmt.Sprintf("%s must be one of [%s]", jsonTag, e.Param())
			default:
				errors[jsonTag] = fmt.Sprintf("%s is not valid", jsonTag)
			}
		}
	} else {
		errors["error"] = err.Error()
	}

	return errors
}
