package utils

import "strconv"

func CheckIsInt(value interface{}) bool {
	switch v := value.(type) {
	case int, int32, int64:
		return true
	case string:
		_, err := strconv.Atoi(v)
		return err == nil
	default:
		return false
	}
}
