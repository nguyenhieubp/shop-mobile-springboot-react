package com.example.shopmobile.Admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public Admin findAdminById(Long id) {
        Optional<Admin> admin = adminRepository.findById(id);
        return admin.orElse(null);
    }

    public Admin saveAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    public List<Admin> getAllAdmin() {
        return  adminRepository.findAll();
    }
}
