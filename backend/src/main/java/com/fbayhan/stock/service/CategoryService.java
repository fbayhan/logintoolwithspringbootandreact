package com.fbayhan.stock.service;

import com.fbayhan.stock.dto.requestdto.CategoryRequest;
import com.fbayhan.stock.dto.responsedto.CategoryResponse;
import com.fbayhan.stock.model.Category;
import com.fbayhan.stock.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryService {
    /*
        private final AuthenticationManager authenticationManager;

     */
    private final CategoryRepository categoryRepository;

    public CategoryResponse category(CategoryRequest request) {
        Category category = Category.builder().categoryName(request.getCategoryName()).build();
        categoryRepository.save(category);
        CategoryResponse categoryResponse = CategoryResponse.builder().categoryId(category.getId()).categoryName(category.getCategoryName()).build();
        return categoryResponse;
    }
}
