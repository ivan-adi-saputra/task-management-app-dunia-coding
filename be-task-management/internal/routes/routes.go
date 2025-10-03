package routes

import (
	"be-task-management/internal/app/task"
	"be-task-management/internal/config"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupRoutes(r *gin.RouterGroup, db *gorm.DB, cfg *config.Config) {
	// task
	taskRepository := task.NewRepository(db)
	taskService := task.NewService(taskRepository)
	taskHandler := task.NewHandler(taskService)

	task := r.Group("task")
	task.GET("/", taskHandler.GetAll)
	task.GET("/:id", taskHandler.GetById)
	task.POST("/", taskHandler.Create)
}
