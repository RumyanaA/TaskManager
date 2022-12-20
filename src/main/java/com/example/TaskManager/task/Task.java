package com.example.TaskManager.task;

import com.example.TaskManager.status.Status;
import com.example.TaskManager.user.Users;
import jakarta.persistence.*;

@Entity
@Table(name="tasks")
public class Task {
    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private String description;
    @ManyToOne(targetEntity = Status.class, fetch = FetchType.LAZY)
    @JoinColumn(name="status_id",insertable = false, updatable = false, referencedColumnName = "id")
    private Long status_id;
    @ManyToOne(targetEntity = Users.class, fetch = FetchType.LAZY)
    @JoinColumn(name="user_id", insertable = false, updatable = false, referencedColumnName = "id")
    private Long user_id;


    public Task() {
    }

    public Task(Long id, String title, String description, Long status_id, Long user_id) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status_id = status_id;
        this.user_id = user_id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getStatus_id() {
        return status_id;
    }

    public void setStatus_id(Long status_id) {
        this.status_id = status_id;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }
}
