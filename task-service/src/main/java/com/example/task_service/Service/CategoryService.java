package com.example.task_service.Service;

import com.example.task_service.Entity.Category;
import com.example.task_service.Repostitory.CategoryRepository;
import com.example.task_service.Repostitory.TaskRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final TaskRepository taskRepository;

    public Category createCategory(Category category, String userId) {
        category.setUserId(userId);
        return categoryRepository.save(category);
    }

    public List<Category> getAllCategories(String userId) {
        return categoryRepository.findByUserId(userId);
    }

    public Optional<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id);
    }

    public Optional<Category> updateCategory(Long id, Category categoryDetails) {
        return categoryRepository.findById(id).map(category -> {
            category.setTitle(categoryDetails.getTitle());
            return categoryRepository.save(category);
        });
    }

    public boolean deleteTask(Long id) {
        if (!categoryRepository.existsById(id)) {
            return false; // Категории не существует
        }

        if (taskRepository.existsByCategory_Id(id)) {
            throw new IllegalStateException("Нельзя удалить категорию, так как она используется в задачах");
        }

        categoryRepository.deleteById(id);
        return true;
    }

}
