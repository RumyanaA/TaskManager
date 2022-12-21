package com.example.TaskManager.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    private final TaskRepository taskRepository;


    @Autowired
    public TaskService(TaskRepository taskRepository){
        this.taskRepository = taskRepository;
    }
    public Long addNewTask(Task task){
        taskRepository.save(task);
        return task.getId();
    }

    public List<Task> getUserTasks(Long userId){
        return taskRepository.getTasks(userId);
    }

    public Task getTask(Long taskId){
        return taskRepository.getTaskById(taskId);
    }
    public int deleteTask(Long taskId){
        return taskRepository.deleteTask(taskId);
    }
}