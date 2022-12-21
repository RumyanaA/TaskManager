package com.example.TaskManager.task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {
    @Query("select t from Task t where t.user.id = :user_id")
    List<Task> getTasks(@Param("user_id") Long user_id);

    @Transactional
    @Modifying
    @Query("delete from Task t where t.id = :id")
    int deleteTask(Long id);

    @Query("select t from Task t where t.id = :id")
    Task getTaskById(@Param("id") Long id);



}