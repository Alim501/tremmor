package com.example.task_service.Service;

import com.example.task_service.Entity.Priority;
import com.example.task_service.Repostitory.PriorityRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PriorityService {
    private final PriorityRepository priorityRepository;

    public Priority createPriorityk(Priority priority, String userId) {
        priority.setUserId(userId);
        return priorityRepository.save(priority);
    }

    public List<Priority> getAllPriority(String userId) {
        return priorityRepository.findByUserId(userId);
    }

    public Optional<Priority> getPriorityById(Long id) {
        return priorityRepository.findById(id);
    }

    public Optional<Priority> updatePriority(Long id, Priority priorityDetails) {
        return priorityRepository.findById(id).map(priority -> {
            priority.setTitle(priorityDetails.getTitle());
            priority.setColor(priorityDetails.getColor());
            priority.setUserId(priorityDetails.getUserId());
            return priorityRepository.save(priority);
        });
    }

    public boolean deletePriority(Long id) {
        if (priorityRepository.existsById(id)) {
            priorityRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
