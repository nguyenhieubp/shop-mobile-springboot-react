package com.example.shopmobile.Category;

import jakarta.persistence.*;

@Entity
@Table(name = "categories")
public class Category implements  CategoryActions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String image;

    @Column(name = "is_show_home")
    private boolean isShowHome;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }


    public boolean getIsShowHome() {
        return isShowHome;
    }

    public void setIsShowHome(boolean showHome) {
        isShowHome = showHome;
    }


}
