package com.example.TaskManager.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository){this.taskRepository = taskRepository;}

    public Long addNewTask(Task task){
        taskRepository.save(task);
        return task.getId();
    }
}
