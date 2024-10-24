package com.example.shopmobile.Cart;

import com.example.shopmobile.User.User;
import java.util.List;

public interface CartActions {

    Long getId();
    void setId(Long id);

    User getUser();
    void setUser(User user);

    Long getUserId();
    void setUserId(Long userId);

    String getTitle();
    void setTitle(String title);

    String getCategory();
    void setCategory(String category);

    String getDescription();
    void setDescription(String description);

    Double getPrice();
    void setPrice(Double price);

    List<String> getImages();
    void setImages(List<String> images);

    Integer getQuantity();
    void setQuantity(Integer quantity);

}
