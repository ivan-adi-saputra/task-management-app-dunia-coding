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
			"errors": err.Error(),
		}))
		return
	}

	c.JSON(http.StatusCreated, utils.SuccessApiResponse("Create task successfully", TaskFormatter(task)))
}
