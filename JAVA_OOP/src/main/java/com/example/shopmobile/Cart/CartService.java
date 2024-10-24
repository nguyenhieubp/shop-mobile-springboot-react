package com.example.shopmobile.Cart;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    public Cart save(Cart cart) {
        return cartRepository.save(cart);
    }

    public Optional<Cart> findById(Long id) {
        return cartRepository.findById(id);
    }

    public List<Cart> findByUserId(Long userId) {
        return cartRepository.findByUserId(userId);
    }

    public Optional<Cart> updateQuantity(Long cartId, Integer quantity) {
        if (quantity == null || quantity < 0) {
            return Optional.empty();
        }
        Optional<Cart> optionalCart = cartRepository.findById(cartId);
        if (optionalCart.isPresent()) {
            Cart cart = optionalCart.get();
            cart.setQuantity(quantity);
            return Optional.of(cartRepository.save(cart));
        }
        return Optional.empty();
    }

    public boolean existsById(Long cartId) {
        return cartRepository.existsById(cartId);
    }

    @Transactional
    public void deleteById(Long id) {
        cartRepository.deleteById(id);
    }

    @Transactional
    public void deleteByUserId(Long userId) {
        cartRepository.deleteByUserId(userId);
    }


}

