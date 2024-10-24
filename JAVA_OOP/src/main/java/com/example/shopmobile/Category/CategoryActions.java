package com.example.shopmobile.Category;

public interface CategoryActions {

    Long getId();
    void setId(Long id);

    String getName();
    void setName(String name);

    String getImage();
    void setImage(String image);

    boolean getIsShowHome();
    void setIsShowHome(boolean showHome);

}
