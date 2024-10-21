package com.fbayhan.stock.mapper;

import com.fbayhan.stock.dto.responsedto.CategoryResponse;
import com.fbayhan.stock.model.Category;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface CategoryMapper {
    Category categoryResponseToCategory(CategoryResponse categoryResponse);
    CategoryResponse categoryToCategoryResponse(Category category);
    List<CategoryResponse> categoryListToCategoryResponse(List<Category> categories);

}
