package task

import (
	"be-task-management/internal/utils"
	"errors"
)

type Service interface {
	Create(input TaskRequest) (Task, error)
}

type service struct {
	r Repository
}

func NewService(r Repository) *service {
	return &service{r}
}

func (s *service) Create(input TaskRequest) (Task, error) {
	date, err := utils.ParseDate(input.DueDate)
	if err != nil {
		return Task{}, errors.New("Terjadi kesalahan saat parsing tanggal")
	}

	data := Task{
		Title:       input.Title,
		DueDate:     date,
		Description: input.Description,
		Status:      input.Status,
	}

	task, err := s.r.Create(data)
	if err != nil {
		return Task{}, errors.New("Terjadi kesalahan saat menyimpan data")
	}

	return task, nil
}
