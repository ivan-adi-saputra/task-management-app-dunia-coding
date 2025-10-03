package task

import "gorm.io/gorm"

type Repository interface {
	GetAll(filter TaskFilterRequest) ([]Task, error)
	GetById(id int) (Task, error)
	Create(task Task) (Task, error)
}

type repository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) GetAll(filter TaskFilterRequest) ([]Task, error) {
	var tasks []Task
	query := r.db.Model(&Task{})

	if filter.Status != "" {
		query = query.Where("status = ?", filter.Status)
	}
	if filter.Title != "" {
		query = query.Where("title LIKE ?", "%"+filter.Title+"%")
	}
	if filter.DueDate != "" {
		query = query.Where("DATE(due_date) = ?", filter.DueDate)
	}

	offset := (filter.Page - 1) * filter.Limit
	err := query.Offset(offset).Limit(filter.Limit).Find(&tasks).Error
	if err != nil {
		return nil, err
	}
	return tasks, nil
}

func (r *repository) GetById(id int) (Task, error) {
	var task Task

	err := r.db.Where("id = ?", id).Find(&task).Error
	if err != nil {
		return Task{}, err
	}

	return task, nil
}

func (r *repository) Create(task Task) (Task, error) {
	err := r.db.Save(&task).Error
	if err != nil {
		return task, err
	}

	return task, nil
}
