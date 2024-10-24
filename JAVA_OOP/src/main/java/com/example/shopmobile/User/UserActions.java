package com.example.shopmobile.User;

import com.example.shopmobile.Cart.Cart;

import java.util.List;

public interface UserActions {
    Long getId();
    void setId(Long id);

    String getEmail();
    void setEmail(String email);

    String getPassword();
    void setPassword(String password);

    List<Cart> getCarts();
    void setCarts(List<Cart> carts);

    String toString();
}
