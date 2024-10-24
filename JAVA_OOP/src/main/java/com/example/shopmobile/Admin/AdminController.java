package com.example.shopmobile.Admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admins")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping
    public Admin createAdmin(@RequestBody Admin admin){
        return adminService.saveAdmin(admin);
    }

    @GetMapping(params = "id")
    public ResponseEntity<Admin> getAdminById(@RequestParam Long id) {
        Admin admin = adminService.findAdminById(id);
        if (admin == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(admin, HttpStatus.OK);
    }

    @GetMapping()
    public List<Admin> getALlAdmin(){
        return adminService.getAllAdmin();
    }
}
