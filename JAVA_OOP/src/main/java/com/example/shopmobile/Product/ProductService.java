package com.example.shopmobile.Product;

import com.example.shopmobile.Category.Category;
import com.example.shopmobile.Category.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;


    public Product saveProduct(Product product) {
        if (product.getCategoryId() != null) {
            Category category = categoryRepository.findById(product.getCategoryId()).orElse(null);
            if (category == null) {
                throw new RuntimeException("Category not found with ID: " + product.getCategoryId());
            }
            product.setCategory(category);
        }
        return productRepository.save(product);
    }

    public Product findProductById(Long id) {
        Optional<Product> product = productRepository.findById(id);
        return product.orElse(null);
    }

    public List<Product> findAllProducts() {
        return productRepository.findAll();
    }

    public Product updateProduct(Long id, Product product) {
        if (productRepository.existsById(id)) {
            if (product.getCategoryId() != null) {
                Category category = categoryRepository.findById(product.getCategoryId()).orElse(null);
                if (category == null) {
                    throw new RuntimeException("Category not found with ID: " + product.getCategoryId());
                }
                product.setCategory(category);
            }
            product.setId(id);
            return productRepository.save(product);
        }
        return null;
    }

    public boolean deleteProduct(Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<Product> findProductsByCategoryId(Long categoryId) {
        return productRepository.findByCategory_Id(categoryId);
    }

    public List<Product> findAllProductsSortedByPriceLambda() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .sorted((p1, p2) -> Double.compare(p1.getPrice(), p2.getPrice()))
                .collect(Collectors.toList());
    }



}
