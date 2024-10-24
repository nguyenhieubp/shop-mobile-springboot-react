package com.example.shopmobile.Product;

import com.example.shopmobile.Category.Category;
import java.util.List;

public interface ProductActions {

    Long getId();
    void setId(Long id);

    String getTitle();
    void setTitle(String title);

    String getDescription();
    void setDescription(String description);

    Double getPrice();
    void setPrice(Double price);

    Long getCategoryId();
    void setCategoryId(Long categoryId);

    Category getCategory();
    void setCategory(Category category);

    List<String> getImages();
    void setImages(List<String> images);

}
