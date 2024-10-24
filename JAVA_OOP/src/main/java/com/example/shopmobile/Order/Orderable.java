package com.example.shopmobile.Order;
import com.example.shopmobile.Cart.Cart;

import java.util.Date;
import java.util.List;

public interface Orderable {

    Long getId();
    void setId(Long id);

    String getCustomerName();
    void setCustomerName(String customerName);

    String getPhone();
    void setPhone(String phone);

    String getAddress();
    void setAddress(String address);

    Date getDateCreated();
    void setDateCreated(Date dateCreated);

    List<Cart> getDetail();
    void setDetail(List<Cart> detail);

}
