package task

import (
	"be-task-management/internal/utils"
	"errors"
	"fmt"
)

type Service interface {
	GetAll(filter TaskFilterRequest) ([]Task, error)
	GetById(param ParamTaskRequest) (Task, error)
	Create(input TaskRequest) (Task, error)
}

type service struct {
	r Repository
}

func NewService(r Repository) *service {
	return &service{r}
}

func (s *service) GetAll(filter TaskFilterRequest) ([]Task, error) {
	tasks, err := s.r.GetAll(filter)
	if err != nil {
		return []Task{}, errors.New("An error occurred while retrieving data")
	}

	return tasks, nil
}

func (s *service) GetById(param ParamTaskRequest) (Task, error) {
	if isInt := utils.CheckIsInt(param.ID); !isInt {
		return Task{}, errors.New("The parameters passed must be integers.")
	}

	task, err := s.r.GetById(param.ID)
	if err != nil {
		return Task{}, errors.New("An error occurred while retrieving data")
	}

	if task.ID == 0 {
		message := fmt.Sprintf("Task with id: %d not found", param.ID) // Task with id: %!s(int=1) not found
		return Task{}, errors.New(message)
	}

	return task, nil
}

func (s *service) Create(input TaskRequest) (Task, error) {
	date, err := utils.ParseDate(input.DueDate)
	if err != nil {
		return Task{}, errors.New("an error occurred while parsing the date")
	}

	data := Task{
		Title:       input.Title,
		DueDate:     date,
		Description: input.Description,
		Status:      input.Status,
	}

	task, err := s.r.Create(data)
	if err != nil {
		return Task{}, errors.New("An error occurred while saving data")
	}

	return task, nil
}
