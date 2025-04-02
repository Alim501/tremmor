package com.example.task_service.Repostitory;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.task_service.Entity.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUserId(String userId);

    boolean existsByCategory_Id(Long category_id);

    boolean existsByPriority_Id(Long priority_id);
}
