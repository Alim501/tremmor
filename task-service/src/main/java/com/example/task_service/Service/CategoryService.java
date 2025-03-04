package com.example.task_service.Service;

import com.example.task_service.Entity.Category;
import com.example.task_service.Repostitory.CategoryRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

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
            category.setUserId(categoryDetails.getUserId());
            return categoryRepository.save(category);
        });
    }

    public boolean deleteTask(Long id) {
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
