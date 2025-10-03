package task

import (
	"be-task-management/internal/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type handler struct {
	s Service
}

func NewHandler(s Service) *handler {
	return &handler{s}
}

func (h *handler) GetAll(c *gin.Context) {
	var filter TaskFilterRequest
	err := c.ShouldBindQuery(&filter)
	if err != nil {
		errors := utils.ValidationError(err, TaskRequest{})

		c.JSON(http.StatusBadRequest, utils.ErrorApiResponse("Get all task failed", errors))
		return
	}

	tasks, err := h.s.GetAll(filter)
	if err != nil {
		c.JSON(http.StatusBadRequest, utils.ErrorApiResponse("Get all task failed", gin.H{
			"error": err.Error(),
		}))
		return
	}

	c.JSON(http.StatusOK, utils.SuccessApiResponse("Get all task successfully", TasksFormatter(tasks)))
}

func (h *handler) GetById(c *gin.Context) {
	var param ParamTaskRequest
	err := c.ShouldBindUri(&param)
	if err != nil {
		errors := utils.ValidationError(err, TaskRequest{})

		c.JSON(http.StatusBadRequest, utils.ErrorApiResponse("Get task failed", errors))
		return
	}

	task, err := h.s.GetById(param)
	if err != nil {
		c.JSON(http.StatusBadRequest, utils.ErrorApiResponse("Get task failed", gin.H{
			"error": err.Error(),
		}))
		return
	}

	c.JSON(http.StatusOK, utils.SuccessApiResponse("Get task successfully", TaskFormatter(task)))
}

func (h *handler) Create(c *gin.Context) {
	var input TaskRequest
	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := utils.ValidationError(err, TaskRequest{})

		c.JSON(http.StatusBadRequest, utils.ErrorApiResponse("Create task failed", errors))
		return
	}

	task, err := h.s.Create(input)
	if err != nil {
		c.JSON(http.StatusBadRequest, utils.ErrorApiResponse("Create task failed", gin.H{
			"error": err.Error(),
		}))
		return
	}

	c.JSON(http.StatusCreated, utils.SuccessApiResponse("Create task successfully", TaskFormatter(task)))
}
