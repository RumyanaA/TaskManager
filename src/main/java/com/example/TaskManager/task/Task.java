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
    @ManyToOne( optional = false)
    @JoinColumn(name = "status_id", insertable=false, updatable=false)
    private Status status;
    @Column(name = "status_id")
    private Long status_id;
    @ManyToOne()
    @JoinColumn(name="user_id", insertable=false, updatable=false)
    private Users user;
    @Column(name = "user_id")
    private Long user_id;

    public Task() {
    }

    public Task(Long id, String title, String description) {
        this.id = id;
        this.title = title;
        this.description = description;

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

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Long getStatus_id() {
        return status_id;
    }

    public void setStatus_id(Long status_id) {
        this.status_id = status_id;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }
}
