package task

// request
type TaskRequest struct {
	Title       string `json:"title" binding:"required,min=3"`
	DueDate     string `json:"due_date" binding:"required,datetime=2006-01-02"`
	Description string `json:"description,omitempty"`
	Status      string `json:"status,omitempty" binding:"omitempty,oneof=pending in-progress completed"`
}

// response
type taskFormatter struct {
	Title       string `json:"title"`
	DueDate     string `json:"due_date"`
	Description string `json:"description"`
	Status      string `json:"status"`
}

func TaskFormatter(task Task) taskFormatter {
	return taskFormatter{
		Title:       task.Title,
		DueDate:     task.DueDate.Format("2006-01-02"),
		Description: task.Description,
		Status:      task.Status,
	}
}
