package com.example.shopmobile.Cart;

import com.example.shopmobile.User.User;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "carts")
public class Cart implements CartActions {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "user_id", insertable = false, updatable = false)
    private Long userId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;


    @Column(name = "title")
    private String title;

    @Column(name = "category")
    private String category;

    @Column(name = "description", length = 2000) // Tùy chỉnh độ dài mô tả nếu cần
    private String description;

    @Column(name = "price")
    private Double price;

    @ElementCollection
    @CollectionTable(name = "cart_images", joinColumns = @JoinColumn(name = "cart_id"))
    private List<String> images;

    @Column(name = "quantity")
    private Integer quantity;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}

