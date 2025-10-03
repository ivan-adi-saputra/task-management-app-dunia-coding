package task

// request
type TaskRequest struct {
	Title       string `json:"title" binding:"required,min=3"`
	DueDate     string `json:"due_date" binding:"required,datetime=2006-01-02"`
	Description string `json:"description,omitempty"`
	Status      string `json:"status,omitempty" binding:"omitempty,oneof=pending in-progress completed"`
}

type TaskFilterRequest struct {
	Status  string `form:"status" binding:"omitempty,oneof=pending in-progress completed"`
	Title   string `form:"title" binding:"omitempty"`
	DueDate string `form:"due_date" binding:"omitempty,datetime=2006-01-02"`
	Page    int    `form:"page,default=1"`
	Limit   int    `form:"limit,default=10"`
}

type ParamTaskRequest struct {
	ID int `uri:"id"`
}

type TaskStatusRequest struct {
	Status string `json:"status" binding:"required,oneof=pending in-progress completed"`
}

// response
type taskFormatter struct {
	ID          uint   `json:"id"`
	Title       string `json:"title"`
	DueDate     string `json:"due_date"`
	Description string `json:"description"`
	Status      string `json:"status"`
}

func TaskFormatter(task Task) taskFormatter {
	return taskFormatter{
		ID:          task.ID,
		Title:       task.Title,
		DueDate:     task.DueDate.Format("2006-01-02"),
		Description: task.Description,
		Status:      task.Status,
	}
}

func TasksFormatter(tasks []Task) []taskFormatter {
	var tasksData []taskFormatter

	for _, task := range tasks {
		tasksData = append(tasksData, taskFormatter{
			ID:          task.ID,
			Title:       task.Title,
			DueDate:     task.DueDate.Format("2006-01-02"),
			Description: task.Description,
			Status:      task.Status,
		})
	}

	if len(tasksData) == 0 {
		return []taskFormatter{}
	}

	return tasksData
}
