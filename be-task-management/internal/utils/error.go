package utils

import (
	"fmt"
)

func PanicIfError(err error, message string) {
	if err != nil {
		panic(fmt.Sprintf("%s : %s", message, err.Error()))
	}
}
