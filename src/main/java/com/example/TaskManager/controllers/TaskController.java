package com.example.TaskManager.controllers;

import com.example.TaskManager.services.TaskService;
import com.example.TaskManager.entity.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/task")
public class TaskController {
    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping("saveTask")
    public Long addNewTask(@RequestBody Task task) {
        return taskService.addNewTask(task);
    }

    @GetMapping("getTasks")
    public List<Task> getUserTasks(@RequestParam Long userId) {
        return taskService.getUserTasks(userId);
    }

    @GetMapping("getTasksByTitle")
    public List<Task> getTasksByTitle(@RequestParam String title, Long userId) {
        return taskService.findTasksByTitle(title, userId);
    }

    @PutMapping("updateTask")
    public int updateTask(@RequestBody Task task) {
        return taskService.updateTask(task);
    }

    @PutMapping("updateTaskStatus")
    public int updateStatusId(@RequestBody Task task) {
        return taskService.updateStatusId(task);
    }

    @GetMapping("getTaskById")
    public Task getTask(@RequestParam Long taskId) {
        return taskService.getTask(taskId);
    }

    @DeleteMapping("deleteTask")
    public int deleteTask(@RequestParam Long taskId) {
        return taskService.deleteTask(taskId);
    }
}
