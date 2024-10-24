package com.example.shopmobile.Category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    public boolean existsById(Long categoryId) {
        return categoryRepository.existsById(categoryId);
    }

    public void deleteById(Long categoryId) {
        categoryRepository.deleteById(categoryId);
    }

    public Category updateIsShowHomeStatus(Long categoryId, boolean isShowHome) {
        Category category = categoryRepository.findById(categoryId).orElse(null);
        if (category != null) {
            category.setIsShowHome(isShowHome);
            categoryRepository.save(category);
        }
        return category;
    }
}
