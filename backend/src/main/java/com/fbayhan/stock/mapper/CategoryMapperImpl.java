package com.fbayhan.stock.mapper;

import com.fbayhan.stock.dto.responsedto.CategoryResponse;
import com.fbayhan.stock.dto.responsedto.CategorySearchResponse;
import com.fbayhan.stock.model.Category;
import com.fbayhan.stock.repository.CategoryRepository;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryMapperImpl implements CategoryMapper {

    private final CategoryRepository categoryRepository;

    public CategoryMapperImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Category categoryResponseToCategory(CategoryResponse categoryResponse) {
        Category category = new Category();
        category.setCategoryName(categoryResponse.getCategoryName());
        category.setUpperCategory(categoryRepository.findById(categoryResponse.getCategoryId()).orElse(null));
        return category;
    }

    @Override
    public CategoryResponse categoryToCategoryResponse(Category category) {

        CategoryResponse categoryResponse = new CategoryResponse();
        categoryResponse.setCategoryId(category.getId());

        categoryResponse.setCategoryName(category.getCategoryName());
        if (category.getUpperCategory() != null) {
            categoryResponse.setUpperCategoryId(category.getUpperCategory().getId());
            CategoryResponse upperCategory = this.categoryToCategoryResponse(category.getUpperCategory());
            categoryResponse.setUpperCategory(upperCategory);
        }
        return categoryResponse;
    }


    @Override
    public List<CategoryResponse> categoryListToCategoryResponse(List<Category> categories) {
        List<CategoryResponse> categoryResponses = new ArrayList<>();
        for (Category category : categories) {
            CategoryResponse categoryResponse = categoryToCategoryResponse(category);
            categoryResponses.add(categoryResponse);
        }

        return categoryResponses;
    }

    @Override
    public List<CategorySearchResponse> categoryListToCategorySearchResponse(List<Category> categories) {
        List<CategorySearchResponse> categoryResponses = new ArrayList<>();
        for (Category category : categories) {
            CategorySearchResponse categoryResponse = new CategorySearchResponse();
            categoryResponse.setCategoryId(category.getId());
            if (category.getUpperCategory() != null) {
                categoryResponse.setCategoryName(category.getCategoryName() + " >>> " + category.getUpperCategory().getCategoryName());
                categoryResponse.setUpperCategoryId(category.getUpperCategory().getId());
            } else {
                categoryResponse.setCategoryName(category.getCategoryName());
            }

            categoryResponses.add(categoryResponse);
        }

        return categoryResponses;
    }
}
