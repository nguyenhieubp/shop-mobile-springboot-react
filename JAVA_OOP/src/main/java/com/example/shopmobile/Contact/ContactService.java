package com.example.shopmobile.Contact;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ContactService {
    @Autowired
    private ContactRepository contactRepository;

    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    public Optional<Contact> getContactById(UUID id) {
        return contactRepository.findById(id);
    }

    public Contact saveContact(Contact contact) {
        return contactRepository.save(contact);
    }

    public void deleteContact(UUID id) {
        contactRepository.deleteById(id);
    }
}

