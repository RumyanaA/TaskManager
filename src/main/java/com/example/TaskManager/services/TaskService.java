package com.example.TaskManager.services;

import com.example.TaskManager.entity.Task;
import com.example.TaskManager.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    private final TaskRepository taskRepository;


    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Long addNewTask(Task task) {
        taskRepository.saveAndFlush(task);
        return task.getId();
    }

    public List<Task> getUserTasks(Long userId) {
        return taskRepository.findAllByUserId(userId);
    }

    public List<Task> findTasksByTitle(String taskTitle, Long userId) {
        return taskRepository.findByTitleContainingIgnoreCaseAndUserId(taskTitle, userId);
    }

    public Task getTask(Long taskId) {
        return taskRepository.findById(taskId).get();
    }

    public int updateTask(Task task) {
        Task taskToUpdate = taskRepository.getReferenceById(task.getId());
        taskToUpdate.setTitle(task.getTitle());
        taskToUpdate.setDescription(task.getDescription());
        taskRepository.save(taskToUpdate);
        return 1;
    }

    public int updateStatusId(Task task) {
        return taskRepository.updateStatusIdByTaskId(task.getStatus_id(), task.getId());
    }

    public int deleteTask(Long taskId) {
        taskRepository.deleteById(taskId);
        return 1;
    }
}
