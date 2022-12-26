package com.example.TaskManager.repositories;

import com.example.TaskManager.task.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    @Query("select t from Task t where t.user.id = :user_id")
    List<Task> getTasks(@Param("user_id") Long user_id);

    @Transactional
    @Modifying
    @Query("delete from Task t where t.id = :id")
    int deleteTask(Long id);

    @Query("select t from Task t where t.id = :id")
    Task getTaskById(@Param("id") Long id);

    @Transactional
    @Modifying
    @Query("update Task t set t.title = :title, t.description = :description where t.id = :id")
    int updateTaskById(@Param("title") String title, @Param("description") String description, @Param("id") Long id);

    @Transactional
    @Modifying
    @Query("update Task t set t.status_id = :status_id where t.id = :id")
    int updateStatusIdByTaskId(@Param("status_id") Long status_id, @Param("id") Long id);


}
