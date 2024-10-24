package com.example.shopmobile.Order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public boolean existsById(Long orderId) {
        return orderRepository.existsById(String.valueOf(orderId));
    }

    public void deleteById(Long id) {
        orderRepository.deleteById(String.valueOf(id));
    }
}

