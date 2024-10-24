package com.example.shopmobile.Cart;

import com.example.shopmobile.User.User;
import com.example.shopmobile.User.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/carts")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<Cart> createCart(@RequestBody Cart cart) {
        User user = userService.findById(cart.getUserId()).orElse(null);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        cart.setUser(user);
        return new ResponseEntity<>(cartService.save(cart), HttpStatus.CREATED);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Cart> getCartById(@PathVariable Long id) {
        return cartService.findById(id)
                .map(cart -> new ResponseEntity<>(cart, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping
    public ResponseEntity<List<Cart>> getCartsByUserId(@RequestParam("userId") Long userId) {
        return new ResponseEntity<>(cartService.findByUserId(userId), HttpStatus.OK);
    }


    @PatchMapping("/{cartId}")
    public ResponseEntity<Cart> updateCartQuantity(@PathVariable Long cartId, @RequestBody Map<String, Integer> request) {
        return cartService.updateQuantity(cartId, request.get("quantity"))
                .map(cart -> new ResponseEntity<>(cart, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{cartId}")
    public ResponseEntity<Void> deleteCart(@PathVariable Long cartId) {
        if (cartService.existsById(cartId)) {
            cartService.deleteById(cartId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/user/{userId}")
    public ResponseEntity<Void> deleteCartsByUserId(@PathVariable Long userId) {
        cartService.deleteByUserId(userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}

