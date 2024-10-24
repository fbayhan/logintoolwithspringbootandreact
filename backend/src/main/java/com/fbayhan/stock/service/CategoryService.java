package com.fbayhan.stock.service;

import com.fbayhan.stock.dto.requestdto.CategoryRequest;
import com.fbayhan.stock.dto.responsedto.CategoryResponse;
import com.fbayhan.stock.dto.responsedto.CategorySearchResponse;
import com.fbayhan.stock.mapper.CategoryMapperImpl;
import com.fbayhan.stock.model.Category;
import com.fbayhan.stock.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    /*
        private final AuthenticationManager authenticationManager;

     */
    private final CategoryRepository categoryRepository;

    private final CategoryMapperImpl categoryMapper;

    public CategoryResponse category(CategoryRequest request) {
        Category category = Category.builder().categoryName(request.getCategoryName()).build();
        if (request.getUppperCategoryId() != null) {
            Category upperCategory = categoryRepository.findById(request.getUppperCategoryId()).orElse(null);
            category.setUpperCategory(upperCategory);
        }
        categoryRepository.save(category);
        CategoryResponse categoryResponse = CategoryResponse.builder().categoryId(category.getId()).categoryName(category.getCategoryName()).upperCategoryId(request.getUppperCategoryId()).build();
        return categoryResponse;


    }


    public List<CategoryResponse> categories() {
        List<Category> categories = categoryRepository.findAll();
        List<CategoryResponse> categoryResponses = categoryMapper.categoryListToCategoryResponse(categories);
        return categoryResponses;
    }

    public CategoryResponse getCategoryById(Long id) {
        Category category = categoryRepository.findById(id).orElse(null);
        CategoryResponse categoryResponse = categoryMapper.categoryToCategoryResponse(category);
        return categoryResponse;
    }

    public List<CategorySearchResponse> searchCategory(String searchparametre) {
        List<Category> categories = categoryRepository.findCategoryByCategoryNameLike("%" + searchparametre + "%");
        List<CategorySearchResponse> categoryResponses = categoryMapper.categoryListToCategorySearchResponse(categories);

        return categoryResponses;

    }
}
