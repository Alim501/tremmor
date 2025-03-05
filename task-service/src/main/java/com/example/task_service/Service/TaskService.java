package com.example.task_service.Service;

import com.example.task_service.Entity.Task;
import com.example.task_service.Repostitory.TaskRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;

    public Task createTask(Task taskDto, String userId) {
        Task task = new Task();
        task.setTitle(taskDto.getTitle());
        task.setStatus(taskDto.getStatus());
        task.setCycles(taskDto.getCycles());
        task.setCyclesCurrent(0);
        task.setCategory(taskDto.getCategory());
        task.setPriority(taskDto.getPriority());
        task.setUserId(userId);
        return taskRepository.save(task);
    }

    public List<Task> getAllTasks(String userId) {
        return taskRepository.findByUserId(userId);
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public Optional<Task> updateTask(Long id, Task taskDetails, String userId) {
        return taskRepository.findById(id).map(task -> {
            task.setTitle(taskDetails.getTitle());
            task.setStatus(taskDetails.getStatus());
            task.setCycles(taskDetails.getCycles());
            task.setCyclesCurrent(taskDetails.getCyclesCurrent());
            task.setCategory(taskDetails.getCategory());
            task.setPriority(taskDetails.getPriority());
            task.setUserId(userId);
            return taskRepository.save(task);
        });
    }

    public boolean deleteTask(Long id) {
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
