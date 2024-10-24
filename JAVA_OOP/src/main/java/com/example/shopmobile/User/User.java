package com.example.shopmobile.User;
import com.example.shopmobile.Cart.Cart;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
public class User implements  UserActions {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "password")
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Cart> carts;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public List<Cart> getCarts() {
        return null;
    }

    @Override
    public void setCarts(List<Cart> carts) {

    }
}
