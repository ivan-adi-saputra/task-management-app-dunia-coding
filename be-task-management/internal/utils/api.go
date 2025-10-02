package utils

const (
	StatusSuccess = "success"
	StatusFailed  = "failed"
)

// success
type successFormatter struct {
	Message string `json:"message"`
	Status  string `json:"status"`
	Data    any    `json:"data"`
}

func SuccessApiResponse(message string, data any) successFormatter {
	return successFormatter{
		Message: message,
		Status:  StatusSuccess,
		Data:    data,
	}
}

// error
type errorFormatter struct {
	Message string `json:"message"`
	Status  string `json:"status"`
	Errors  any    `json:"errors"`
}

func ErrorApiResponse(message string, errors any) errorFormatter {
	return errorFormatter{
		Message: message,
		Status:  StatusFailed,
		Errors:  errors,
	}
}
