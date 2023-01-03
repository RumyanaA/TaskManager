package com.example.TaskManager.repositories;

import com.example.TaskManager.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    @Transactional
    @Modifying
    @Query("update Task t set t.status_id = :status_id where t.id = :id")
    int updateStatusIdByTaskId(@Param("status_id") Long status_id, @Param("id") Long id);

    List<Task> findAllByUserId(Long userId);
}
