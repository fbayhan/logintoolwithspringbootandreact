package com.fbayhan.stock.service;

import com.fbayhan.stock.dto.requestdto.ItemRequest;
import com.fbayhan.stock.dto.responsedto.ItemResponse;
import com.fbayhan.stock.model.Item;
import com.fbayhan.stock.repository.CategoryRepository;
import com.fbayhan.stock.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ItemService {
    private final CategoryRepository categoryRepository;
    private final ItemRepository itemRepository;

    public ItemResponse item(ItemRequest request) {
        Item item = new Item();
        item.setItemName(request.getItemName());
        item.setCategory(categoryRepository.findById(request.getCategoryId()).orElse(null));
        itemRepository.save(item);
        ItemResponse itemResponse = new ItemResponse();
        itemResponse.setItemId(item.getId());
        itemResponse.setCategoryId(item.getCategory().getId());
        itemResponse.setItemName(item.getItemName());
        itemResponse.setCategoryName(item.getCategory().getCategoryName());

        return itemResponse;
    }
}
